const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../../config/db');

// Route to get tablets by price range in the format /1000-2000
router.get('/:range', async (req, res) => {
    try {
        const range = req.params.range;
        const [minStr, maxStr] = range.split('-');
        const minprice = parseFloat(minStr);
        const maxprice = parseFloat(maxStr);

        if (isNaN(minprice) || isNaN(maxprice)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid price range format. Use /api/price-range-tablets/1000-2000'
            });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input('minprice1', sql.Numeric(28, 0), minprice)
            .input('maxprice1', sql.Numeric(28, 0), maxprice)
            .execute('proc_getdefaultproducts_bypricetablet');

        res.json({
            success: true,
            data: {
                tablets: result.recordset
            }
        });
    } catch (error) {
        console.error('Error fetching tablets by price range:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tablets by price range',
            error: error.message
        });
    }
});

module.exports = router;
