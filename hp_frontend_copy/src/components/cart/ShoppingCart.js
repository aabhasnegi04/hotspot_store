import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Button,
    Grid,
    IconButton,
    Box,
    Divider
} from '@mui/material';
import {
    Delete as DeleteIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
    ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

const ShoppingCart = () => {
    const navigate = useNavigate();
    
    // Sample cart data - replace with actual cart state management
    const [cartItems, setCartItems] = React.useState([
        {
            id: 1,
            name: 'Product 1',
            price: 29.99,
            quantity: 2,
            image: 'https://via.placeholder.com/100'
        },
        {
            id: 2,
            name: 'Product 2',
            price: 39.99,
            quantity: 1,
            image: 'https://via.placeholder.com/100'
        }
    ]);

    const handleQuantityChange = (id, change) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        // Add checkout logic here
        navigate('/checkout');
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

    return (
        <Container maxWidth="md" sx={{ mt: 16, mb: 8 }}>
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

                {cartItems.length === 0 ? (
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
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="h6" sx={{ mb: 1 }}>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                                    ${item.price.toFixed(2)}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                        sx={{ color: '#FFD700' }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
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

                        <Box sx={{ mt: 4 }}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h6">
                                        Subtotal: ${calculateSubtotal().toFixed(2)}
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
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default ShoppingCart; 