const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../../config/db');

// Add to cart route
router.post('/add-to-cart', async (req, res) => {
    try {
        const { itemCode, salePrice, sessionId } = req.body;
        
        // Validate required parameters
        if (!itemCode || !salePrice || !sessionId) {
            return res.status(400).json({
                success: false,
                message: 'Item code, sale price, and session ID are required'
            });
        }

        // Get database connection
        const pool = await poolPromise;
        
        // Execute stored procedure
        const result = await pool.request()
            .input('itemcode1', sql.VarChar(100), itemCode)
            .input('saleprice1', sql.Numeric(28, 2), salePrice)
            .input('sessionid', sql.VarChar(500), sessionId)
            .execute('proc_addtocart');

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Item added to cart successfully',
            data: {
                itemCode,
                salePrice,
                sessionId
            }
        });

    } catch (error) {
        console.error('Error in add to cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add item to cart',
            error: error.message
        });
    }
});

module.exports = router;
