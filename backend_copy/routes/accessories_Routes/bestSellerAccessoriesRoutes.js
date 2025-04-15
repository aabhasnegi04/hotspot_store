const express = require("express");
const router = express.Router();
const { poolPromise, sql } = require("../../config/db");

// GET best selling accessories using stored procedure
router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute("proc_getdefaultproducts_accessoriesbestseller");

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
        console.error('Error in best seller accessories route:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
