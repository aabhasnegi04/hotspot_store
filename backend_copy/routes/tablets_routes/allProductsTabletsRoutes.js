const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/db');

// Route to get all tablets
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute('proc_getdefaultproducts_TABLET');

        res.json({
            success: true,
            data: {
                tablets: result.recordset
            }
        });
    } catch (error) {
        console.error('Error fetching all tablets:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching all tablets',
            error: error.message
        });
    }
});

module.exports = router;
