const express = require("express");
const router = express.Router();
const { poolPromise, sql } = require("../../config/db");

// GET smartwatch products by price range using stored procedure
router.get("/:priceRange", async (req, res) => {
    try {
        const { priceRange } = req.params;
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);

        if (isNaN(minPrice) || isNaN(maxPrice)) {
            return res.status(400).json({ error: 'Invalid price range format. Use format: minPrice-maxPrice (e.g., 1000-5000)' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('minprice1', sql.Numeric(28, 0), minPrice)
            .input('maxprice1', sql.Numeric(28, 0), maxPrice)
            .execute("proc_getdefaultproducts_bypriceSmartWatch");

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
        console.error('Error in price range smartwatch route:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
