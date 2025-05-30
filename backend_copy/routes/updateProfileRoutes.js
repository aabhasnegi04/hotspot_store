const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');

// Get user profile
router.get('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', userId)
            .query('SELECT NAME, EMAIL, MOBILENO, ADDRESS, COUNTRY, STATE, CITY, PINCODE, LANDMARK FROM tb_user_master WHERE SRNO = @userId');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update user profile
router.put('/profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const {
            name,
            mobileno,
            address,
            country,
            state,
            city,
            pincode,
            landmark
        } = req.body;

        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', userId)
            .input('name', name)
            .input('mobileno', mobileno)
            .input('address', address)
            .input('country', country)
            .input('state', state)
            .input('city', city)
            .input('pincode', pincode)
            .input('landmark', landmark)
            .query(`
                UPDATE tb_user_master 
                SET 
                    NAME = @name,
                    MOBILENO = @mobileno,
                    ADDRESS = @address,
                    COUNTRY = @country,
                    STATE = @state,
                    CITY = @city,
                    PINCODE = @pincode,
                    LANDMARK = @landmark
                WHERE SRNO = @userId
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ 
            message: 'Profile updated successfully',
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
