const express = require("express");
const router = express.Router();
const { poolPromise, sql } = require("../../config/db");

// GET smartwatch products by brand using stored procedure
router.get("/:brand", async (req, res) => {
    try {
        const { brand } = req.params;
        console.log('Fetching wearables for brand:', brand); // Debug log

        const pool = await poolPromise;
        const result = await pool.request()
            .input('prod1', sql.VarChar(100), brand.toUpperCase()) // Convert to uppercase for database matching
            .execute("proc_getdefaultproducts_SMARTWATCHbrand");

        console.log('Query result:', result.recordset.length, 'items found'); // Debug log

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
    } catch (err) {
        console.error('Error in brand smartwatch route:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
