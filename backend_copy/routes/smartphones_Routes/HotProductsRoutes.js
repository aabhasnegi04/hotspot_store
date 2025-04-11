const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../../config/db');

router.get('/', async (req, res) => {
    try {
        // Get the pool connection
        const pool = await poolPromise;
        
        // Try with different case
        const result = await pool.request()
            .execute('PROC_GETDEFAULTPRODUCTS_HSHOTPRODUCT');  // Changed to uppercase

        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            console.log('No hot products found');
            // Log the entire result for debugging
            console.log('Result:', result);
            res.json([]);
        }

    } catch (err) {
        console.error('Error fetching hot products:', err);
        // Log more details about the error
        console.log('Error details:', err.message);
        res.status(500).json({ message: 'Error fetching hot products' });
    }
});

module.exports = router;
