const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../../config/db');

// Route to get products by price range
router.get('/:priceRange', async (req, res) => {
    try {
        const { priceRange } = req.params;
        
        // Split the price range using hyphen
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        
        // Get pool connection
        const pool = await poolPromise;
        
        // Execute stored procedure
        const result = await pool.request()
            .input('minprice1', sql.Numeric(28, 0), minPrice)
            .input('maxprice1', sql.Numeric(28, 0), maxPrice)
            .execute('proc_getdefaultproducts_bypriceHS');

        // Send the results
        res.json(result.recordset);

    } catch (error) {
        console.error('Error fetching products by price range:', error);
        res.status(500).json({ 
            error: 'Error fetching products',
            details: error.message 
        });
    }
});

module.exports = router;
