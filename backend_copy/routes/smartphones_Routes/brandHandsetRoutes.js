const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../../config/db');

// GET products by brand
router.get('/:brand', async (req, res) => {
    try {
        const { brand } = req.params;
        
        // Get pool connection
        const pool = await poolPromise;
        
        // Execute stored procedure
        const result = await pool.request()
            .input('prod1', sql.VarChar(100), brand)
            .execute('proc_getdefaultproducts_hsbrand');
            
        // Send results
        res.json(result.recordset);
        
    } catch (error) {
        console.error('Error fetching brand handsets:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

module.exports = router;
