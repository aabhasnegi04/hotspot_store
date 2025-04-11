import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Container, 
    Grid, 
    Card, 
    CardMedia, 
    CardContent, 
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LuxuryLoader from '../../common/LuxuryLoader';
import { API_BASE_URL } from '../../../config';

const BestSeller = () => {
    
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        console.log('BestSeller component mounted');
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/api/bestsellers`);
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (itemCode) => {
        navigate(`/product/${itemCode}`);
    };

    if (loading) return <LuxuryLoader message="Loading Best Sellers" />;
    if (error) return <div style={{ marginTop: '80px' }}>{error}</div>;

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)',
            minHeight: '100vh',
            mt: { xs: 0, sm: 0, md: 0 },
            position: 'relative',
            zIndex: 0
        }}>
            <Container maxWidth="xl" sx={{ 
                py: { xs: 2, sm: 3, md: 4 },
                px: { xs: 2, sm: 3, md: 4 }
            }}>
                {/* Title Section */}
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textTransform: 'capitalize',
                            fontFamily: "'Outfit', sans-serif",
                            mb: 1,
                            letterSpacing: '-0.5px'
                        }}
                    >
                        Best Sellers
                    </Typography>
                    <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            color: '#666',
                            maxWidth: '600px',
                            margin: '0 auto',
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: '1.1rem',
                            lineHeight: 1.6
                        }}
                    >
                        Discover our most popular and trending products
                    </Typography>
                </Box>

                {/* Products Grid */}
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.itemCode}>
                            <Card 
                                elevation={0}
                                onClick={() => handleProductClick(product.itemCode)}
                                sx={{ 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    border: '1px solid rgba(255, 215, 0, 0.1)',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(20px)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        borderRadius: '20px',
                                        border: '1px solid transparent',
                                        background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.2))',
                                        WebkitMask: 
                                            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                        WebkitMaskComposite: 'xor',
                                        maskComposite: 'exclude',
                                    },
                                    '&:hover': {
                                        transform: 'translateY(-12px) scale(1.02)',
                                        boxShadow: '0 20px 40px rgba(255, 215, 0, 0.15)',
                                        '& .product-image': {
                                            transform: 'scale(1.08)'
                                        },
                                        '&::before': {
                                            borderColor: 'rgba(255, 215, 0, 0.3)',
                                        }
                                    },
                                    maxWidth: '300px',
                                    margin: '0 auto',
                                }}
                            >
                                <Box 
                                    sx={{ 
                                        position: 'relative', 
                                        paddingTop: '90%',
                                        borderBottom: '1px solid rgba(255, 215, 0, 0.05)',
                                        background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.image || 'https://via.placeholder.com/200'}
                                        alt={product.itemName}
                                        className="product-image"
                                        sx={{ 
                                            position: 'absolute',
                                            top: 0,
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'contain',
                                            padding: '15px',
                                            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    />
                                </Box>
                                <CardContent 
                                    sx={{ 
                                        flexGrow: 1, 
                                        bgcolor: 'transparent', 
                                        p: 2,
                                        '&:last-child': { 
                                            paddingBottom: 2 
                                        }
                                    }}
                                >
                                    <Typography 
                                        variant="h6" 
                                        sx={{ 
                                            fontWeight: 600,
                                            mb: 1,
                                            background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontFamily: "'Outfit', sans-serif",
                                            fontSize: '1rem',
                                            lineHeight: 1.3,
                                            minHeight: '2.4rem'
                                        }}
                                    >
                                        {product.itemName}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            mb: 2,
                                            color: 'text.secondary',
                                            fontFamily: "'Outfit', sans-serif",
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        {product.brand} • {product.model}
                                    </Typography>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        gap: 0.5,
                                        mb: 1
                                    }}>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                textDecoration: 'line-through',
                                                color: 'text.secondary',
                                                fontFamily: "'Outfit', sans-serif",
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            MRP: ₹{product.currentMRP.toLocaleString('en-IN')}
                                        </Typography>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center',
                                            gap: 1 
                                        }}>
                                            <Typography 
                                                variant="h6" 
                                                sx={{ 
                                                    fontWeight: 700,
                                                    color: '#b7950b',
                                                    fontFamily: "'Outfit', sans-serif",
                                                    fontSize: '1.2rem'
                                                }}
                                            >
                                                ₹{product.salePrice.toLocaleString('en-IN')}
                                            </Typography>
                                            {product.discountValue > 0 && (
                                                <Typography 
                                                    variant="body2" 
                                                    sx={{ 
                                                        color: '#4CAF50',
                                                        fontWeight: 600,
                                                        bgcolor: 'rgba(76, 175, 80, 0.1)',
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: '4px',
                                                        fontSize: '0.75rem'
                                                    }}
                                                >
                                                    {Math.round(((product.currentMRP - product.salePrice) / product.currentMRP) * 100)}% OFF
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default BestSeller;
