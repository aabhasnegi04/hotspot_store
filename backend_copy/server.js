const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

// Fix Buffer deprecation warning by using the new methods
const { Buffer } = require('buffer');
global.Buffer = Buffer;

const app = express();

// Session configuration
app.use(session({
    secret: '12345ABCDE', // Change this to a secure secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Middleware
app.use(cors({
  origin: [
    'http://veneersoft.in',
    'http://localhost:8001',
    'http://api.veneersoft.in:8001',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true
}));
app.use(express.json());

// Root route for a friendly message
app.get('/', (req, res) => {
    res.send('Welcome to the Veneersoft API! The server is running successfully.');
});

// authRoutes
app.use('/api', require('./routes/authRoutes'));

// cartRoutes
app.use('/api/cart', require('./routes/cartRoutes/addToCartRoute'));
app.use('/api/cart', require('./routes/cartRoutes/getCartItemsRoute'));
app.use('/api/cart', require('./routes/cartRoutes/deleteCartItemRoute.js'));

// bestSellerRoutes
app.use('/api/bestsellers', require('./routes/bestSeller_Routes/bestsellerRoutes'));

// best seller accessories routes
app.use('/api/bestseller-accessories', require('./routes/accessories_Routes/bestSellerAccessoriesRoutes'));

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

// Add featured phones routes
app.use('/api/featured-phones', require('./routes/smartphones_Routes/featuredPhonesRoutes'));

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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`Server is accessible at http://api.veneersoft.in:${PORT}`);
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