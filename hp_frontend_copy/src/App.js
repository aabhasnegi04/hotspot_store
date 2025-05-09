// Import necessary dependencies from React and Material-UI
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
// Import custom components
import Header from './components/layout_components/header/header';
import SubHeader from './components/layout_components/header/subheader';
import Hero from './components/homepage_components/hero/Hero';
import Footer from './components/layout_components/footer/footer';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ShoppingCart from './components/cart/ShoppingCart';
import ProductListingPage from './components/product_pages/ProductListingPage';
import AboutPage from './components/about/AboutPage';
import MyAccount from './components/account/MyAccount';
import MyProfile from './components/account/MyProfile';
import MyAddresses from './components/account/MyAddresses';
import Security from './components/account/Security';
import ProductDetail from './components/product_pages/ProductDetail';
import Contact from './components/layout_components/footer/Contact';
import PrivacyPolicy from './components/layout_components/footer/PrivacyPolicy';
import TermsOfService from './components/layout_components/footer/TermsOfService';
import CookiePolicy from './components/layout_components/footer/CookiePolicy';
import BestSellerAccessories from './components/product_pages/accessories/bestSellerAccessories';
import BrandAccessories from './components/product_pages/accessories/brandAccessories';
import CategoryAccessory from './components/product_pages/accessories/categoryAccessory';
import PriceRange from './components/product_pages/mobile phones/priceRangeHandsets';
import PriceRangeAccessories from './components/product_pages/accessories/priceRangeAccessories';
import PriceRangeWearables from './components/product_pages/wearables/priceRangeWearables';
import BrandHandsets from './components/product_pages/mobile phones/brandHandsets';
import AllProducts from './components/product_pages/allProducts';
import MobilesHomepage from './components/product_pages/mobile phones/mobilesHomepage';
import AccessoriesHomepage from './components/product_pages/accessories/accessoriesHomepage';
import WearablesHomepage from './components/product_pages/wearables/wearablesHomepage';
import BrandWearables from './components/product_pages/wearables/brandWearables';
import FeaturedPhones from './components/product_pages/mobile phones/FeaturedPhones';
import BestsellersHomepage from './components/product_pages/bestsellers/bestsellersHomepage';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Define the application's theme configuration
// This creates a consistent color scheme and styling across the app
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Main primary color for the application
    },
    background: {
      default: '#ffffff', // Default background color
    },
  },
  typography: {
    fontFamily: "'Outfit', sans-serif",
  },
});

// Main App component that serves as the root of the application
function App() {
  
  return (
    // ThemeProvider wraps the entire app to provide consistent theming
    <ThemeProvider theme={theme}>
      {/* CssBaseline normalizes CSS across different browsers */}
      <CssBaseline />
      <Router>
        <div className="App">
          {/* Header component for the main navigation */}
          <Header />
          {/* SubHeader component for secondary navigation or additional controls */}
          <SubHeader />
          <Box sx={{ 
            mt: { 
              xs: 'calc(110px + 48px)', // header height + subheader height for mobile
              sm: 'calc(60px + 48px)',  // header height + subheader height for tablet
              md: 'calc(64px + 48px)'   // header height + subheader height for desktop
            }
          }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/bestsellers" element={<BestsellersHomepage />} />
              <Route path="/bestseller-accessories" element={<BestSellerAccessories />} />
              <Route path="/featured-phones" element={<FeaturedPhones />} />
              <Route path="/" element={
                <main className="main-content">
                  <Hero />
                  {/* Add other homepage components here */}
                </main>
              } />
              <Route path="/products/:category" element={<ProductListingPage />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/account" element={<MyAccount />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/addresses" element={<MyAddresses />} />
              <Route path="/security" element={<Security />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/brand-accessories/:brand" element={<BrandAccessories />} />
              <Route path="/category-accessories/:category" element={<CategoryAccessory />} />
              <Route path="/price-range/:range" element={<PriceRange />} />
              <Route path="/accessories/price-range/:range" element={<PriceRangeAccessories />} />
              <Route path="/wearables/price-range/:range" element={<PriceRangeWearables />} />
              <Route path="/brand-handsets/:brand" element={<BrandHandsets />} />
              <Route path="/brand-wearables/:brand" element={<BrandWearables />} />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/smartphones" element={<MobilesHomepage />} />
              <Route path="/accessories" element={<AccessoriesHomepage />} />
              <Route path="/wearables" element={<WearablesHomepage />} />
            </Routes>
          </Box>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
