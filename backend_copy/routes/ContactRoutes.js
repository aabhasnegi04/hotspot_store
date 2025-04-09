const express = require("express");
const router = express.Router();
const { poolPromise, sql } = require("../config/db");

// POST contact form data
router.post("/", async (req, res) => {
    try {
        const { name, email, mobileNo, address, message } = req.body;

        // Input validation
        if (!name || !email || !mobileNo || !message) {
            return res.status(400).json({ 
                message: 'Please provide name, email, mobile number and message' 
            });
        }

        const pool = await poolPromise;
        
        await pool.request()
            .input('name1', sql.NVarChar(100), name)
            .input('email1', sql.NVarChar(100), email)
            .input('mobile1', sql.NVarChar(15), mobileNo)
            .input('address1', sql.NVarChar(500), address || null)
            .input('message1', sql.NVarChar(1000), message)
            .execute('proc_contactusentry');

        res.status(201).json({ 
            success: true, 
            message: 'Thank you for contacting us. We will get back to you soon!' 
        });

    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to submit contact form. Please try again later.'
        });
    }
});

module.exports = router; 