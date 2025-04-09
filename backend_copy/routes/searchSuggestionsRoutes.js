const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// GET /api/search/suggestions?query=searchterm
router.get('/suggestions', async (req, res) => {
    try {
        const { query } = req.query;
        
        // Get pool connection
        const pool = await poolPromise;
        
        // Execute stored procedure
        const result = await pool.request()
            .input('item1', sql.VarChar(100), query)
            .execute('proc_dropdown_itemsearch');

        // Send the suggestions array with separate ItemName and ItemCode
        res.json(result.recordset.map(item => ({
            ItemName: item.ItemName,
            ItemCode: item.ItemCode
        })));

    } catch (error) {
        console.error('Error fetching search suggestions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
