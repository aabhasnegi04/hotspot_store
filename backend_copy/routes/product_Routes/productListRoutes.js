const express = require('express');
const router = express.Router();
const {sql, poolPromise} = require('../../config/db');

// Get paginated product list
router.get('/', async (req, res) => {
    try {
        // Get query parameters
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = 24;
        const offset = (page - 1) * itemsPerPage;
        const brand = req.query.brand;
        const groupName = req.query.group;
        const minPrice = parseFloat(req.query.minPrice);
        const maxPrice = parseFloat(req.query.maxPrice);
        const search = req.query.search;

        // Get the pool
        const pool = await poolPromise;

        // First, execute the stored procedure to update the rate master table
        await pool.request().execute('tb_FCA_UPDATE_ITEMMOP_RATEMASTER');

        // Build WHERE clause based on filters
        let whereClause = 'WHERE 1=1';
        if (brand) {
            whereClause += ` AND brand = '${brand}'`;
        }
        if (groupName) {
            whereClause += ` AND GroupName = '${groupName}'`;
        }
        if (!isNaN(minPrice)) {
            whereClause += ` AND currentRate >= ${minPrice}`;
        }
        if (!isNaN(maxPrice)) {
            whereClause += ` AND currentRate <= ${maxPrice}`;
        }
        if (search) {
            whereClause += ` AND (ItemName LIKE '%${search}%' OR brand LIKE '%${search}%')`;
        }

        // Then get the paginated results and total count
        const result = await pool.request()
            .query(`
                SELECT COUNT(*) as totalCount 
                FROM tb_FCA_ITEMMOP_RATEMASTER
                ${whereClause};

                SELECT 
                    ItemName,
                    itemcode,
                    brand,
                    itemtype,
                    subgroup,
                    GroupName,
                    currentRate as salePrice,
                    CurrentMRP as currentMRP,
                    Ratelist,
                    EffectiveFrom,
                    ValidUpto,
                    Stockqty as stockQuantity
                FROM tb_FCA_ITEMMOP_RATEMASTER
                ${whereClause}
                ORDER BY ItemName
                OFFSET ${offset} ROWS
                FETCH NEXT ${itemsPerPage} ROWS ONLY;
            `);

        // Extract results
        const totalCount = result.recordsets[0][0].totalCount;
        const products = result.recordsets[1];

        // Calculate total pages
        const totalPages = Math.ceil(totalCount / itemsPerPage);

        // Send response
        res.json({
            success: true,
            data: {
                products,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: totalCount,
                    itemsPerPage
                },
                filters: {
                    brand,
                    group: groupName,
                    minPrice,
                    maxPrice,
                    search
                }
            }
        });

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch products'
        });
    }
});

module.exports = router;
