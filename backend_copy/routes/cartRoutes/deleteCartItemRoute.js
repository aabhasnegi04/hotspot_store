const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../../config/db');

// Delete cart item route
router.delete('/delete-cart-item', async (req, res) => {
    try {
        const { itemCode, sessionId } = req.body;
        
        // Validate required parameters
        if (!itemCode || !sessionId) {
            return res.status(400).json({
                success: false,
                message: 'Item code and session ID are required'
            });
        }

        // Get database connection
        const pool = await poolPromise;
        
        // Execute stored procedure
        const result = await pool.request()
            .input('itemcode1', sql.VarChar(100), itemCode)
            .input('sessionid', sql.VarChar(500), sessionId)
            .execute('proc_deletecartitem');

        // Return success response
        res.status(200).json({
            success: true,
            message: 'Item removed from cart successfully',
            data: {
                itemCode,
                sessionId
            }
        });

    } catch (error) {
        console.error('Error in delete cart item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove item from cart',
            error: error.message
        });
    }
});

module.exports = router;
