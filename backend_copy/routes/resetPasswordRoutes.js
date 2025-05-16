const express = require('express');
const router = express.Router();
const sql = require('mssql');
const bcrypt = require('bcrypt');
const { poolPromise } = require('../config/db'); // Use poolPromise

// Route to handle password reset
router.post('/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Validate input
        if (!email || !newPassword) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and new password are required' 
            });
        }

        // Validate password strength
        if (newPassword.length < 8) {
            return res.status(400).json({ 
                success: false, 
                message: 'Password must be at least 8 characters long' 
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Get the pool from poolPromise
        const pool = await poolPromise;
        const request = pool.request();
        request.input('email2', sql.VarChar(200), email);
        request.input('newpassword', sql.VarChar(100), hashedPassword);

        const result = await request.execute('proc_newpasswordset');

        // Check if any rows were affected
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'Password has been reset successfully' 
        });

    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred while resetting the password' 
        });
    }
});

module.exports = router;
