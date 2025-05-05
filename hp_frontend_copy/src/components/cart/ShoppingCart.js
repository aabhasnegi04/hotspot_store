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
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

const ShoppingCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [orderSummary, setOrderSummary] = useState({ total: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

            const validatedOrderSummary = data.data.orderSummary?.[0] 
                ? { total: Number(data.data.orderSummary[0].total) || 0 }
                : { total: 0 };

            setCartItems(validatedCartItems);
            setOrderSummary(validatedOrderSummary);
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

    const CartItem = ({ item }) => (
        <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img
                    src={item.image_url}
                    alt={item.product_name}
                    style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        {item.ItemName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        Price: {formatPrice(item.SalePrice)}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        Total: {formatPrice(item.SalePrice * item.UNIT)}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ mx: 1 }}>{item.UNIT}</Typography>
                        <IconButton
                            size="small"
                            onClick={() => handleRemoveItem(item.ORDERID, item.ITEMCODE)}
                            sx={{ color: '#FFD700', ml: 'auto' }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
        </Grid>
    );

    return (
        <Container maxWidth="md" sx={{ mt: 0, mb: 8 }}>
            <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={styles.title}>
                    Shopping Cart
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {!cartItems.length ? <EmptyCart /> : (
                    <>
                        <Grid container spacing={3}>
                            {cartItems.map(item => (
                                <CartItem key={`${item.ORDERID}-${item.ITEMCODE}`} item={item} />
                            ))}
                        </Grid>

                        <Box sx={{ mt: 4 }}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h6">
                                        Subtotal: {formatPrice(calculateSubtotal())}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate('/checkout')}
                                        sx={styles.button}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default ShoppingCart; 