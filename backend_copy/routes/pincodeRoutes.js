const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET /api/pincode/:pincode
router.get('/:pincode', async (req, res) => {
    try {
        const { pincode } = req.params;
        
        // Get pool connection
        const pool = await poolPromise;
        
        // Execute stored procedure
        const result = await pool.request()
            .input('pincode1', sql.VarChar(10), pincode)
            .execute('proc_getpincodelocation');

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Pincode not found' });
        }

    } catch (error) {
        console.error('Error fetching pincode details:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
