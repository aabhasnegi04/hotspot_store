const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET /api/product/:itemId
router.get('/:itemId', async (req, res) => {
    try {
        const { itemId } = req.params;
        console.log('Fetching details for item:', itemId);
        
        const pool = await poolPromise;
        
        // Execute the stored procedure proc_getsingleprod_detail
        const result = await pool.request()
            .input('itemid1', sql.VarChar(100), itemId)
            .execute('proc_getsingleprod_detail');

        // First recordset: Product details with images and pricing
        const productDetails = result.recordsets[0]?.[0];
        
        // Second recordset: Product descriptions
        const descriptions = result.recordsets[1]?.[0];

        if (!productDetails) {
            return res.status(404).json({ 
                message: 'Product not found',
                itemId: itemId
            });
        }

        // Format the response
        const response = {
            productDetails: {
                ...productDetails,
                // Add image URLs with proper paths
                imgname1: productDetails.IMG_PATH,
                imgname2: productDetails.IMG_PATH2,
                imgname3: productDetails.IMG_PATH3,
                imgname4: productDetails.IMG_PATH4,
                imgname5: productDetails.IMG_PATH5,
                imgname11: productDetails.L_IMG_PATH,
                imgname22: productDetails.L_IMG_PATH2,
                imgname33: productDetails.L_IMG_PATH3,
                imgname44: productDetails.L_IMG_PATH4,
                imgname55: productDetails.L_IMG_PATH5,
                // Format numeric values
                CurrentMRP: parseFloat(productDetails.CurrentMRP || 0).toFixed(2),
                SalePrice: parseFloat(productDetails.SalePrice || 0).toFixed(2),
                currentRate: parseFloat(productDetails.currentRate || 0).toFixed(2),
                DiscountValue: parseFloat(productDetails.DiscountValue || 0).toFixed(2),
                DISCPER: parseFloat(productDetails.DISCPER || 0).toFixed(2),
                QUANTITY: parseInt(productDetails.QUANTITY || 0)
            },
            descriptions: descriptions ? {
                ...descriptions,
                DESCRIPTIONS: descriptions.DESCRIPTIONS || '',
                DESCRIPTION_NEW: descriptions.DESCRIPTION_NEW || ''
            } : null
        };

        // Log success
        console.log('Successfully fetched product details:', {
            itemCode: response.productDetails.ItemCode,
            itemName: response.productDetails.ItemName,
            brand: response.productDetails.Brand,
            hasDescriptions: !!response.descriptions
        });

        res.json(response);

    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ 
            message: 'Server error', 
            error: error.message,
            itemId: req.params.itemId
        });
    }
});

module.exports = router;