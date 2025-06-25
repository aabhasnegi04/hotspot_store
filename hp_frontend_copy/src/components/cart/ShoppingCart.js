import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import {
    Container,
    Paper,
    Typography,
    Button,
    Grid,
    IconButton,
    Box,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    Add as AddIcon,
    ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import ShippingCart from "./shippingCart";

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [step, setStep] = useState('cart'); // 'cart' or 'shipping'

    // Helper function to update cart count and trigger header update
    const updateCartState = useCallback((items) => {
        localStorage.setItem('cartCount', items.length);
        window.dispatchEvent(new Event('cartUpdated'));
    }, []);

    // Helper function to format price
    const formatPrice = useCallback((price) => 
        `₹${Math.round(price || 0).toLocaleString('en-IN')}`, []);

    // Helper function to calculate subtotal
    const calculateSubtotal = useCallback(() => 
        cartItems.reduce((sum, item) => sum + ((item.SalePrice || 0) * (item.UNIT || 0)), 0), [cartItems]);

    const fetchCartItems = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const sessionId = localStorage.getItem('sessionId');
            
            const { data } = await axios.get(`${API_BASE_URL}/api/cart/get-cart-items`, {
                params: { sessionId },
                withCredentials: true
            });

            if (!data.success) {
                throw new Error('Failed to fetch cart items');
            }

            const validatedCartItems = (data.data.cartItems || []).map(item => ({
                ...item,
                ORDERID: Number(item.ORDERID),
                price: Number(item.SalePrice) || 0,
                quantity: Number(item.UNIT) || 0,
                total: (Number(item.SalePrice) || 0) * (Number(item.UNIT) || 0),
                product_name: item.ItemName || 'Unknown Product',
                image_url: item.Imagepath || 'https://via.placeholder.com/100'
            }));

            setCartItems(validatedCartItems);
            updateCartState(validatedCartItems);
        } catch (error) {
            setError(error.message || 'An error occurred while fetching cart items');
        } finally {
            setLoading(false);
        }
    }, [updateCartState]);

    const handleRemoveItem = useCallback(async (orderid, itemCode) => {
        try {
            const sessionId = localStorage.getItem('sessionId');
            
            const { data } = await axios({
                method: 'DELETE',
                url: `${API_BASE_URL}/api/cart/delete-cart-item`,
                data: { itemCode, sessionId },
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (!data.success) {
                throw new Error(data.message || 'Failed to remove item from cart');
            }

            await fetchCartItems(); // Refresh cart after successful deletion
        } catch (error) {
            setError(error.message || 'Failed to remove item from cart');
        }
    }, [fetchCartItems]);

    const handleProductClick = (itemCode) => {
        navigate(`/product/${itemCode}`);
    };

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ mt: 0, mb: 8, textAlign: 'center' }}>
                <CircularProgress sx={{ color: '#FFD700' }} />
            </Container>
        );
    }

    if (step === 'shipping') {
        return (
            <>
                <ShippingCart 
                    cartItems={cartItems} 
                    orderSummary={{
                        itemCount: cartItems.length,
                        subtotal: calculateSubtotal(),
                    }}
                    onBackToCart={() => setStep('cart')}
                />
            </>
        );
    }

    const styles = {
        paper: {
            p: 4,
            borderRadius: '20px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
        },
        button: {
            mt: 2,
            mb: 2,
            py: 1.5,
            borderRadius: '12px',
            background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
            color: '#000000',
            fontWeight: 600,
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: '0 3px 5px 2px rgba(255, 215, 0, .3)',
            '&:hover': {
                background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
                boxShadow: '0 4px 8px 2px rgba(255, 215, 0, .4)',
                transform: 'translateY(-1px)',
            }
        },
        title: {
            fontWeight: 700,
            color: '#000000',
            mb: 4,
            background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        }
    };

    const EmptyCart = () => (
        <Box sx={{ textAlign: 'center', py: 4 }}>
            <ShoppingCartIcon sx={{ fontSize: 64, color: '#FFD700', mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
                Your cart is empty
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate('/')}
                sx={styles.button}
            >
                Continue Shopping
            </Button>
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 0, mb: 8, px: { xs: 0.5, sm: 1, md: 2 } }}>
            <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
                {/* Left Column: Cart Items and Coupon */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ ...styles.paper, p: { xs: 1, sm: 2, md: 4 } }}>
                        <Typography variant="h4" component="h1" gutterBottom align="left" sx={{ ...styles.title, WebkitTextFillColor: 'black', color: 'black', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' }, mb: { xs: 2, md: 4 } }}>
                            Your Cart
                        </Typography>

                        {/* Coupon Section */}
                        <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 }, mb: { xs: 2, md: 4 }, borderRadius: '12px', display: 'flex', alignItems: 'center', background: '#fff', boxShadow: '0 2px 8px rgba(255, 215, 0, 0.05)', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 0 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 } }}>
                                <Box sx={{
                                    width: 32, height: 32, borderRadius: '50%', background: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 2
                                }}>
                                    <Typography sx={{ fontWeight: 700, color: '#fff' }}>%</Typography>
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: '#000', fontSize: { xs: '1rem', sm: '1.25rem' } }}>Apply Coupon</Typography>
                            </Box>
                            <Box sx={{ flex: 1 }} />
                            <IconButton>
                                <AddIcon sx={{ color: '#FFD700' }} />
                            </IconButton>
                        </Paper>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {!cartItems.length ? <EmptyCart /> : (
                            <>
                                <Paper elevation={0} sx={{ p: { xs: 0, sm: 2 }, mb: 2, background: 'transparent', boxShadow: 'none' }}>
                                    {cartItems.map(item => (
                                        <Box key={`${item.ORDERID}-${item.ITEMCODE}`} sx={{ mb: 2 }}>
                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: { xs: 'column', sm: 'row' },
                                                alignItems: { xs: 'stretch', sm: 'center' },
                                                gap: 2,
                                                p: { xs: 2, sm: 0 },
                                                borderRadius: { xs: '12px', sm: 0 },
                                                background: { xs: '#fff', sm: 'none' },
                                                boxShadow: { xs: '0 2px 8px rgba(0,0,0,0.04)', sm: 'none' },
                                                border: { xs: '1px solid #f3f3f3', sm: 'none' }
                                            }}>
                                                <Box 
                                                    component="img"
                                                    src={item.image_url}
                                                    alt={item.product_name}
                                                    onClick={() => handleProductClick(item.ITEMCODE)}
                                                    sx={{
                                                        width: { xs: '90px', sm: '100px' },
                                                        height: { xs: '90px', sm: '100px' },
                                                        objectFit: 'cover',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        alignSelf: { xs: 'center', sm: 'flex-start' },
                                                        mb: { xs: 1, sm: 0 },
                                                        transition: 'transform 0.2s ease',
                                                        '&:hover': {
                                                            transform: 'scale(1.05)'
                                                        }
                                                    }}
                                                />
                                                <Box sx={{ flex: 1, width: '100%' }}>
                                                    <Typography 
                                                        variant="h6" 
                                                        sx={{ 
                                                            mb: 0.5,
                                                            cursor: 'pointer',
                                                            fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.25rem' },
                                                            fontWeight: 600,
                                                            textAlign: { xs: 'center', sm: 'left' },
                                                            '&:hover': {
                                                                color: '#B7950B'
                                                            }
                                                        }}
                                                        onClick={() => handleProductClick(item.ITEMCODE)}
                                                    >
                                                        {item.ItemName}
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            {[1,2,3,4,5].map(i => (
                                                                <span key={i} style={{ color: '#FFD700', fontSize: 18 }}>&#9733;</span>
                                                            ))}
                                                        </Box>
                                                    </Box>
                                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, textAlign: { xs: 'center', sm: 'left' } }}>
                                                        Standard Delivery in 2 days | Free
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', gap: 2, mt: 1, flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
                                                        <Button variant="outlined" sx={{ borderRadius: '8px', fontWeight: 500, color: '#FFD700', borderColor: '#FFD700', textTransform: 'none', width: '100%', maxWidth: { sm: '180px' }, mx: { xs: 'auto', sm: 0 }, '&:hover': { borderColor: '#FFA500', color: '#FFA500' } }}>
                                                            Move to Wishlist
                                                        </Button>
                                                        <Button variant="outlined" sx={{ borderRadius: '8px', fontWeight: 500, color: '#FF0000', borderColor: '#FF0000', textTransform: 'none', width: '100%', maxWidth: { sm: '180px' }, mx: { xs: 'auto', sm: 0 }, '&:hover': { borderColor: '#FFA500', color: '#FFA500' } }}
                                                            onClick={() => handleRemoveItem(item.ORDERID, item.ITEMCODE)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Box>
                                                </Box>
                                                <Box sx={{
                                                    minWidth: { xs: 0, sm: 140 },
                                                    textAlign: { xs: 'center', sm: 'right' },
                                                    width: { xs: '100%', sm: 'auto' },
                                                    mt: { xs: 2, sm: 0 },
                                                    p: { xs: 1, sm: 0 },
                                                    background: { xs: '#f9f9f9', sm: 'none' },
                                                    borderRadius: { xs: '8px', sm: 0 },
                                                    boxShadow: { xs: '0 1px 4px rgba(0,0,0,0.03)', sm: 'none' }
                                                }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#000', fontSize: { xs: '1.1rem', sm: '1.15rem', md: '1.25rem' }, mb: 0.5 }}>{formatPrice(item.SalePrice)}</Typography>
                                                    <Typography variant="body2" color="text.secondary">(Incl. all Taxes)</Typography>
                                                    <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#888', mt: 1 }}>
                                                        MRP ₹{(item.SalePrice + 6000).toLocaleString('en-IN')}
                                                    </Typography>
                                                    <Typography variant="caption" color="success.main">Save ₹6,000.00</Typography>
                                                    <Typography variant="body2" sx={{ mt: 1, fontWeight: 600, color: '#000' }}>₹1695/mo*</Typography>
                                                    <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', textDecoration: 'underline' }}>EMI Options</Typography>
                                                </Box>
                                            </Box>
                                            <Divider sx={{ my: 2, display: { xs: 'none', sm: 'block' } }} />
                                        </Box>
                                    ))}
                                </Paper>
                            </>
                        )}
                    </Paper>
                </Grid>

                {/* Right Column: Order Summary */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ ...styles.paper, p: { xs: 2, sm: 3 }, position: { md: 'sticky' }, top: { md: 32 }, mt: { xs: 2, md: 0 }, mb: { xs: 2, md: 0 } }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.15rem' } }}>
                            Order Summary ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body1" color="text.secondary">Original Price</Typography>
                            <Typography variant="body1">{formatPrice(calculateSubtotal())}</Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{formatPrice(calculateSubtotal())}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => setStep('shipping')}
                            sx={{ ...styles.button, mt: 2 }}
                        >
                            Checkout
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ShoppingCart; 