const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../../config/db');

// Get cart items route
router.get('/get-cart-items', async (req, res) => {
    try {
        const sessionId = req.query.sessionId;
        
        // Validate session ID
        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: 'Session ID is required'
            });
        }

        // Get database connection
        const pool = await poolPromise;
        
        // Execute stored procedure
        const result = await pool.request()
            .input('sessionid', sql.VarChar(500), sessionId)
            .execute('proc_getcartitems');

        // The stored procedure returns two result sets:
        // 1. Cart items with details
        // 2. Order summary
        const cartItems = result.recordsets[0];
        const orderSummary = result.recordsets[1];

        // Return success response
        res.status(200).json({
            success: true,
            data: {
                cartItems,
                orderSummary
            }
        });

    } catch (error) {
        console.error('Error in get cart items:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get cart items',
            error: error.message
        });
    }
});

module.exports = router;
