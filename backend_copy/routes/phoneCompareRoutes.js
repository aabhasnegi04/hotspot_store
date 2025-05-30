const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');
const sql = require('mssql');

// Get all phones for comparison selection
router.get('/phones', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT PhoneID, Brand, Model, Price, RAM, Storage, Processor, Battery, CameraSpecs, Display, OS, ReleaseDate FROM MobilePhones WHERE InStock = 1');
        
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching phones:', err);
        res.status(500).json({ error: 'Failed to fetch phones' });
    }
});

// Get specific phone details by ID
router.get('/phone/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM MobilePhones WHERE PhoneID = @id');
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Phone not found' });
        }
        
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Error fetching phone details:', err);
        res.status(500).json({ error: 'Failed to fetch phone details' });
    }
});

// Compare multiple phones by their IDs
router.post('/compare', async (req, res) => {
    try {
        const { phoneIds } = req.body;
        
        if (!Array.isArray(phoneIds) || phoneIds.length < 2) {
            return res.status(400).json({ error: 'Please provide at least 2 phone IDs to compare' });
        }

        const pool = await poolPromise;
        const query = `
            SELECT PhoneID, Brand, Model, Price, RAM, Storage, Processor, 
                   Battery, CameraSpecs, Display, OS, ReleaseDate, Description
            FROM MobilePhones 
            WHERE PhoneID IN (${phoneIds.join(',')})
        `;
        
        const result = await pool.request().query(query);
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'No phones found for comparison' });
        }
        
        res.json(result.recordset);
    } catch (err) {
        console.error('Error comparing phones:', err);
        res.status(500).json({ error: 'Failed to compare phones' });
    }
});

module.exports = router;
