const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/db');

// Route to add a new address
router.post('/add-address', async (req, res) => {
    try {
        const {
            category,
            mobileNo,  // Will come from localStorage
            email,     // Will come from localStorage
            addressLine1,
            addressLine2,
            state,
            city,
            district,
            pincode,
            landmark,
            region
        } = req.body;

        if (!mobileNo || !email || !addressLine1) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        // Get user info from session
        const entryUser = email;  // Using the email from localStorage
        const entrySession = req.sessionID || 'DEFAULT_SESSION';

        const pool = await poolPromise;
        const result = await pool.request()
            .input('CATEGORY', category)
            .input('EMAIL', email)
            .input('MOBILENO', mobileNo)
            .input('ADDRESSLINE1', addressLine1)
            .input('ADDRESSLINE2', addressLine2)
            .input('STATE', state)
            .input('CITY', city)
            .input('DISTRICT', district)
            .input('PINCODE', pincode)
            .input('LANDMARK', landmark)
            .input('REGION', region)
            .input('ENTRYUSER', entryUser)
            .input('ENTRYSESSION', entrySession)
            .execute('proc_add_new_address');

        res.json({ 
            message: 'Address added successfully',
            success: true
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
