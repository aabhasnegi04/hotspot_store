const express = require('express');
const router = express.Router();
const sql = require('mssql');
const { poolPromise } = require('../../config/db');

// Route to increase item quantity in cart
router.post('/increase-cart-item', async (req, res) => {
    try {
        const { itemcode, sessionid } = req.body;

        // Validate input
        if (!itemcode || !sessionid) {
            return res.status(400).json({
                success: false,
                message: 'Item code and session ID are required'
            });
        }

        const pool = await poolPromise;
        const request = pool.request();
        
        // Set parameters for the stored procedure
        request.input('itemcode1', sql.VarChar(100), itemcode);
        request.input('sessionid', sql.VarChar(500), sessionid);

        // Execute the stored procedure
        await request.execute('proc_updateaddcartitem');

        res.status(200).json({
            success: true,
            message: 'Item quantity increased in cart successfully'
        });

    } catch (error) {
        console.error('Error increasing item quantity in cart:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while increasing item quantity in cart'
        });
    }
});

// Route to decrease item quantity in cart
router.post('/decrease-cart-item', async (req, res) => {
    try {
        const { itemcode, sessionid } = req.body;

        // Validate input
        if (!itemcode || !sessionid) {
            return res.status(400).json({
                success: false,
                message: 'Item code and session ID are required'
            });
        }

        const pool = await poolPromise;
        const request = pool.request();
        
        // Set parameters for the stored procedure
        request.input('itemcode1', sql.VarChar(100), itemcode);
        request.input('sessionid', sql.VarChar(500), sessionid);

        // Execute the stored procedure
        await request.execute('proc_updateminuscartitem');

        res.status(200).json({
            success: true,
            message: 'Item quantity decreased in cart successfully'
        });

    } catch (error) {
        console.error('Error decreasing item quantity in cart:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while decreasing item quantity in cart'
        });
    }
});

module.exports = router; 