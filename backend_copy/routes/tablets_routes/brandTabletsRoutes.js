const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../../config/db');

// Route to get tablets by brand
router.get('/:brand', async (req, res) => {
    try {
        const { brand } = req.params;
        
        // Get pool connection
        const pool = await poolPromise;
        
        // Execute stored procedure
        const result = await pool.request()
            .input('prod1', sql.VarChar(100), brand)
            .execute('proc_getdefaultproducts_TABLETbrand');

        // Send the response
        res.json({
            success: true,
            data: {
                tablets: result.recordset
            }
        });

    } catch (error) {
        console.error('Error fetching brand tablets:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching brand tablets',
            error: error.message
        });
    }
});

module.exports = router;
