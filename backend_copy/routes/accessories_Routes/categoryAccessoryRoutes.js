const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../../config/db');

// Route to get accessories by category
router.get('/:category', async (req, res) => {
    try {
        const { category } = req.params;
        
        // Get the connection pool
        const pool = await poolPromise;
        
        // Execute stored procedure
        const result = await pool.request()
            .input('category1', sql.VarChar(100), category)
            .execute('proc_getdefaultproducts_AccCat');

        // Send the results
        res.json(result.recordset);

    } catch (error) {
        console.error('Error fetching category accessories:', error);
        res.status(500).json({ 
            error: 'Error fetching accessories',
            details: error.message 
        });
    }
});

module.exports = router;
