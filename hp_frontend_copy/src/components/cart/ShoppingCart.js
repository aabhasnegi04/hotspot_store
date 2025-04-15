import React, { useEffect } from 'react';
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
    const [cartItems, setCartItems] = React.useState([]);
    const [orderSummary, setOrderSummary] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${API_BASE_URL}/api/cart/get-cart-items`, {
                params: {
                    sessionId: localStorage.getItem('sessionId')
                },
                withCredentials: true
            });

            if (response.data.success) {
                console.log('API Response:', response.data.data); // Debug log
                console.log('Cart Items:', response.data.data.cartItems); // Debug cart items

                // Validate and transform the cart items data
                const validatedCartItems = (response.data.data.cartItems || []).map(item => ({
                    ...item,
                    price: typeof item.SalePrice === 'number' ? item.SalePrice : 0,
                    quantity: typeof item.UNIT === 'number' ? item.UNIT : 0,
                    total: (item.SalePrice || 0) * (item.UNIT || 0), // Calculate total from SalePrice and UNIT
                    product_name: item.ItemName || 'Unknown Product',
                    image_url: item.Imagepath || 'https://via.placeholder.com/100'
                }));

                console.log('Validated Cart Items:', validatedCartItems); // Debug validated items

                // Validate order summary
                const validatedOrderSummary = response.data.data.orderSummary?.[0] ? {
                    ...response.data.data.orderSummary[0],
                    total: typeof response.data.data.orderSummary[0].total === 'number' 
                        ? response.data.data.orderSummary[0].total 
                        : 0
                } : { total: 0 };

                setCartItems(validatedCartItems);
                setOrderSummary(validatedOrderSummary);
            } else {
                setError('Failed to fetch cart items');
            }
        } catch (error) {
            console.error('Cart fetch error:', error);
            setError(error.message || 'An error occurred while fetching cart items');
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (id, change) => {
        // You'll need to implement the API call to update quantity
        // For now, we'll just update the UI
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const handleRemoveItem = async (id) => {
        // You'll need to implement the API call to remove item
        // For now, we'll just update the UI
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        if (!cartItems || cartItems.length === 0) return 0;
        return cartItems.reduce((sum, item) => sum + ((item.SalePrice || 0) * (item.UNIT || 0)), 0);
    };

    const handleCheckout = () => {
        // Add checkout logic here
        navigate('/checkout');
    };

    const formatPrice = (price) => {
        return `₹${Math.round(price || 0).toLocaleString('en-IN')}`;
    };

    const paperStyle = {
        p: 4,
        borderRadius: '20px',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
    };

    const buttonStyle = {
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
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ mt: 0, mb: 8, textAlign: 'center' }}>
                <CircularProgress sx={{ color: '#FFD700' }} />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 0, mb: 8 }}>
            <Paper elevation={3} sx={paperStyle}>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    align="center"
                    sx={{
                        fontWeight: 700,
                        color: '#000000',
                        mb: 4,
                        background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Shopping Cart
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {(!cartItems || cartItems.length === 0) ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <ShoppingCartIcon sx={{ fontSize: 64, color: '#FFD700', mb: 2 }} />
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Your cart is empty
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/')}
                            sx={buttonStyle}
                        >
                            Continue Shopping
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {cartItems.map((item) => (
                                <React.Fragment key={item.id}>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <img
                                                src={item.image_url || 'https://via.placeholder.com/100'} // Use actual image URL from API
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
                                                    Total: {formatPrice((item.SalePrice || 0) * (item.UNIT || 0))}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                        sx={{ color: '#FFD700' }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography sx={{ mx: 1 }}>{item.UNIT}</Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                        sx={{ color: '#FFD700' }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        sx={{ color: '#FFD700', ml: 'auto' }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>

                        {orderSummary && (
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
                                            onClick={handleCheckout}
                                            sx={buttonStyle}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default ShoppingCart; 