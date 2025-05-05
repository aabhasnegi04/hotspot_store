const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../../config/db');

// Route to get featured phones
router.get('/', async (req, res) => {
    try {
        // Get pool connection
        const pool = await poolPromise;
        
        // Execute the stored procedure
        const result = await pool.request()
            .execute('proc_getdefaultproducts_hsfeature');

        // Map the results to a simpler format
        const products = result.recordset.map(({
            ItemCode,
            Brand,
            MODEL,
            QUANTITY,
            ItemName,
            imgname11,
            ALTKEY,
            CurrentMRP,
            SalePrice,
            currentRate,
            DiscountValue
        }) => ({
            itemCode: ItemCode,
            brand: Brand,
            model: MODEL,
            quantity: QUANTITY,
            itemName: ItemName,
            image: imgname11,
            altKey: ALTKEY,
            currentMRP: CurrentMRP,
            salePrice: SalePrice,
            currentRate: currentRate,
            discountValue: DiscountValue
        }));

        res.json(products);
    } catch (error) {
        console.error('Error fetching featured phones:', error);
        res.status(500).json({ 
            error: 'Error fetching featured phones',
            details: error.message 
        });
    }
});

module.exports = router;
