const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/db');

// Route to get user details and address
router.post('/get-addresses', async (req, res) => {
    try {
        const { mobileNo } = req.body;

        if (!mobileNo) {
            return res.status(400).json({
                success: false,
                message: 'Mobile number is required'
            });
        }
        
        // Get connection from pool
        const pool = await poolPromise;
        
        // Execute stored procedure
        const result = await pool.request()
            .input('mobileno', mobileNo)
            .execute('proc_getuserdetail');

        // The stored procedure returns two result sets
        const addressData = result.recordsets[0];
        const userData = result.recordsets[1];

        res.json({
            success: true,
            addresses: addressData, // All addresses for the user
            userDetails: userData[0] // Single user record
        });

    } catch (error) {
        console.error('Error in getAddressRoutes:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

module.exports = router;
