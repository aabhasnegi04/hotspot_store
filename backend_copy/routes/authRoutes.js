const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, poolPromise } = require('../config/db');
const auth = require('../middleware/auth');

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please enter all required fields' });
        }

        const pool = await poolPromise;
        
        // Check if user already exists
        const userCheck = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (userCheck.recordset.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .query('INSERT INTO Users (username, email, password) VALUES (@username, @email, @password); SELECT SCOPE_IDENTITY() AS userId');

        const userId = result.recordset[0].userId;

        // Create JWT token
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: userId,
                username,
                email
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all required fields' });
        }

        const pool = await poolPromise;

        // Find user
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = result.recordset[0];

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user data endpoint (protected route)
router.get('/user', auth, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, req.user.id)
            .query('SELECT id, username, email FROM Users WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
