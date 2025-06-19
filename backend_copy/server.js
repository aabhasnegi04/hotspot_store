const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

// Fix Buffer deprecation warning by using the new methods
const { Buffer } = require('buffer');
global.Buffer = Buffer;

const PORT = process.env.PORT || 5000;

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
    'https://hotspotstore.com',
    'http://localhost:8001',
    'https://api.hotspotstore.com:8001',
    'http://localhost:3000',
  ],
  credentials: true
}));
app.use(express.json());

// Root route for a friendly message
app.get('/', (req, res) => {
    res.send('Welcome to the Hotspotstore API! The server is running successfully.');
});

// Authentication Routes
app.use('/api', require('./routes/userRoutes/authRoutes'));

// Address Routes
app.use('/api/address', require('./routes/userRoutes/addAddressRoutes'));
app.use('/api/address', require('./routes/userRoutes/getAddressRoutes'));

// Reset Password Routes
app.use('/api', require('./routes/userRoutes/resetPasswordRoutes'));

// Update Profile Routes
app.use('/api', require('./routes/userRoutes/updateProfileRoutes'));

// Cart Routes
app.use('/api/cart', require('./routes/cartRoutes/addToCartRoute'));
app.use('/api/cart', require('./routes/cartRoutes/getCartItemsRoute'));
app.use('/api/cart', require('./routes/cartRoutes/deleteCartItemRoute.js'));
app.use('/api/cart', require('./routes/cartRoutes/plus_minus_CartRoutes'));

// Contact Routes
app.use('/api/contact', require('./routes/ContactRoutes'));

// Search Routes
app.use('/api/search', require('./routes/searchSuggestionsRoutes'));

// Pincode Routes
app.use('/api/pincode', require('./routes/userRoutes/pincodeRoutes'));

// Product Routes
app.use('/api/product', require('./routes/product_Routes/productDetailsRoutes'));
app.use('/api/products', require('./routes/product_Routes/productListRoutes'));

// Smartphone Routes
app.use('/api/brand-handsets', require('./routes/smartphones_Routes/brandHandsetRoutes'));
app.use('/api/price-range', require('./routes/smartphones_Routes/priceRangeRoutesHandset'));
app.use('/api/hot-products', require('./routes/smartphones_Routes/HotProductsRoutes'));
app.use('/api/featured-phones', require('./routes/smartphones_Routes/featuredPhonesRoutes'));

// Phone Comparison Routes
app.use('/api/phone-compare', require('./routes/phoneCompareRoutes'));

// Tablet Routes
app.use('/api', require('./routes/tablets_routes/bestSellerTabletsRoutes'));
app.use('/api/brand-tablets', require('./routes/tablets_routes/brandTabletsRoutes'));
app.use('/api/price-range-tablets', require('./routes/tablets_routes/priceRangeTabletsRoutes'));
app.use('/api/all-tablets', require('./routes/tablets_routes/allProductsTabletsRoutes'));

// Accessory Routes
app.use('/api/brand-accessories', require('./routes/accessories_Routes/brandAccessoryRoutes'));
app.use('/api/category-accessories', require('./routes/accessories_Routes/categoryAccessoryRoutes'));
app.use('/api/price-range-accessories', require('./routes/accessories_Routes/priceRangeAccessoryRoutes'));
app.use('/api/bestseller-accessories', require('./routes/accessories_Routes/bestSellerAccessoriesRoutes'));

// Smartwatch/Wearable Routes
app.use('/api/smartwatches', require('./routes/wearables_Routes/allWearablesRoutes'));
app.use('/api/brand-smartwatches', require('./routes/wearables_Routes/brandWearablesRoutes'));
app.use('/api/bestseller-smartwatches', require('./routes/wearables_Routes/bestSellerWearablesRoutes'));
app.use('/api/price-range-smartwatches', require('./routes/wearables_Routes/priceRangeWearablesRoutes'));

// Best Seller Routes
app.use('/api/bestsellers', require('./routes/bestSeller_Routes/bestsellerRoutes'));

// Register payment routes
app.use('/api/payment', require('./routes/paymentRoutes'));

// Serve static files from the React app build directory
const path = require('path');
app.use(express.static('C:/inetpub/hotspotstore.com'));

// The "catchall" handler: for any request that doesn't match an API route, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join('C:/inetpub/hotspotstore.com', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

// Start server

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port http://localhost:${PORT}`);
  console.log(`Server is accessible at http://api.hotspotstore.com:${PORT}`);
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