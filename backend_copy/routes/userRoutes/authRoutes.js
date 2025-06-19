const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sql, poolPromise } = require('../../config/db');
const auth = require('../../middleware/auth');

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, mobileno } = req.body;

        // Input validation
        if (!name || !email || !password || !mobileno) {
            return res.status(400).json({ message: 'Please enter all required fields' });
        }

        const pool = await poolPromise;
        
        // Check if user already exists
        const userCheck = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM tb_user_master WHERE EMAIL = @email');

        if (userCheck.recordset.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword)
            .input('mobileno', sql.VarChar, mobileno)
            .query(`INSERT INTO tb_user_master (NAME, EMAIL, PASSWORD, MOBILENO, ENTRY_TIME, ACTIVE_STATUS)
                    VALUES (@name, @email, @password, @mobileno, GETDATE(), 1);
                    SELECT SCOPE_IDENTITY() AS userId`);

        const userId = result.recordset[0].userId;

        // Create JWT token
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: userId,
                name,
                email,
                mobileno
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Input validation
        if (!identifier || !password) {
            return res.status(400).json({ message: 'Please enter all required fields' });
        }

        const pool = await poolPromise;

        // Determine if identifier is email or mobile number
        let query;
        if (identifier.includes('@')) {
            query = 'SELECT * FROM tb_user_master WHERE EMAIL = @identifier AND ACTIVE_STATUS = 1';
        } else {
            query = 'SELECT * FROM tb_user_master WHERE MOBILENO = @identifier AND ACTIVE_STATUS = 1';
        }

        // Find user
        const result = await pool.request()
            .input('identifier', sql.VarChar, identifier)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = result.recordset[0];

        // Validate password
        const isMatch = await bcrypt.compare(password, user.PASSWORD);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.SRNO }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user.SRNO,
                name: user.NAME,
                email: user.EMAIL,
                mobileno: user.MOBILENO
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
            .input('id', sql.Numeric(28, 0), req.user.id)
            .query('SELECT SRNO as id, NAME as name, EMAIL as email, MOBILENO as mobileno FROM tb_user_master WHERE SRNO = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
