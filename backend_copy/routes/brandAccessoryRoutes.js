const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('../config/db');

// @route   GET api/brand-accessories/:brand
// @desc    Get accessories by brand
// @access  Public
router.get('/:brand', async (req, res) => {
    try {
        let { brand } = req.params;
        
        // Convert brand name to uppercase to match database
        brand = brand.toUpperCase();
        
        // Get pool connection
        const pool = await poolPromise;
        
        const result = await pool.request()
            .input('prod1', sql.VarChar(100), brand)
            .execute('proc_getdefaultproducts_Accbrand');

        // Send the results
        res.json(result.recordset);

    } catch (error) {
        console.error('Error fetching brand accessories:', error);
        res.status(500).json({ 
            error: 'Error fetching accessories',
            details: error.message,
            brand: req.params.brand 
        });
    }
});

module.exports = router;
