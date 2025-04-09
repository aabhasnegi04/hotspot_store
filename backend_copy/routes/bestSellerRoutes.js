const express = require("express");
const router = express.Router();
const { poolPromise, sql } = require("../config/db");

// GET all products using stored procedure
router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute("proc_getdefaultproducts_hsbestseller");

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
        res.status(500).json({ error: err.message });
    }
});

// GET a single product by ItemCode
router.get("/:itemCode", async (req, res) => {
    try {
        const { itemCode } = req.params;
        const pool = await poolPromise;
        const result = await pool.request()
            .execute("proc_getdefaultproducts_hsbestseller");

        const product = result.recordset.find(({ ItemCode }) => ItemCode === itemCode);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Use the same mapping structure as the main route
        const {
            ItemCode: id,
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
        } = product;

        res.json({
            itemCode: id,
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
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
