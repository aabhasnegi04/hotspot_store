const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/db');

// Route to get best selling tablets
router.get('/bestseller-tablets', async (req, res) => {
    try {
        // Get pool connection
        const pool = await poolPromise;
        
        // Execute the stored procedure
        const result = await pool.request()
            .execute('proc_getdefaultproducts_TABLETTOPMODEL');

        // Send the response
        res.json({
            success: true,
            data: {
                tablets: result.recordset
            }
        });

    } catch (error) {
        console.error('Error fetching best seller tablets:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching best seller tablets',
            error: error.message
        });
    }
});

module.exports = router;
