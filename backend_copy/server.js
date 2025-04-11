const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Fix Buffer deprecation warning by using the new methods
const { Buffer } = require('buffer');
global.Buffer = Buffer;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// authRoutes
app.use('/api', require('./routes/authRoutes'));

// bestSellerRoutes
app.use('/api/bestsellers', require('./routes/smartphones_Routes/bestSellerRoutes'));

// contactRoutes
app.use('/api/contact', require('./routes/ContactRoutes'));

// Add pincode routes
app.use('/api/pincode', require('./routes/pincodeRoutes'));

// Add search suggestions routes
app.use('/api/search', require('./routes/searchSuggestionsRoutes'));

// Add brand accessories routes
app.use('/api/brand-accessories', require('./routes/accessories_Routes/brandAccessoryRoutes'));

// Add new category accessories route
app.use('/api/category-accessories', require('./routes/accessories_Routes/categoryAccessoryRoutes'));

// Add price range accessories route
app.use('/api/price-range-accessories', require('./routes/accessories_Routes/priceRangeAccessoryRoutes'));

// Add price range routes
app.use('/api/price-range', require('./routes/smartphones_Routes/priceRangeRoutesHandset'));

// Add brand handset routes
app.use('/api/brand-handsets', require('./routes/smartphones_Routes/brandHandsetRoutes'));

// Add product details routes
app.use('/api/product', require('./routes/product_Routes/productDetailsRoutes'));

// Add product list routes
app.use('/api/products', require('./routes/product_Routes/productListRoutes'));

// Add hot products routes
app.use('/api/hot-products', require('./routes/smartphones_Routes/HotProductsRoutes'));

// Add smartwatch routes
app.use('/api/smartwatches', require('./routes/wearables_Routes/allWearablesRoutes'));

// Add brand smartwatch routes
app.use('/api/brand-smartwatches', require('./routes/wearables_Routes/brandWearablesRoutes'));

// Add best-selling smartwatch routes
app.use('/api/bestseller-smartwatches', require('./routes/wearables_Routes/bestSellerWearablesRoutes'));

// Add price range smartwatch routes
app.use('/api/price-range-smartwatches', require('./routes/wearables_Routes/priceRangeWearablesRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Suppress deprecation warnings
process.removeAllListeners('warning'); 