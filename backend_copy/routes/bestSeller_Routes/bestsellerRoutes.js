const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/db');

// Get best sellers and banner images
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        
        // Call the stored procedure
        const result = await pool.request()
            .execute('proc_getdefaultproducts');

        // Format the results
        const response = {
            bestSellers: result.recordsets[0],
            brandBestSellers: {
                SAMSUNG: result.recordsets[1],
                APPLE: result.recordsets[2],
                VIVO: result.recordsets[3],
                OPPO: result.recordsets[4]
            },
            bannerImages: {
                BD: result.recordsets[5],
                BM: result.recordsets[6],
                SG: result.recordsets[7],
                HPB: result.recordsets[8],
                HPG: result.recordsets[9],
                HPO: result.recordsets[10]
            }
        };

        res.json(response);

    } catch (error) {
        console.error('Error in bestsellers route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
