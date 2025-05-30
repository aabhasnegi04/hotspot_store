import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';

const styles = {
    gradientText: {
        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    card: {
        cursor: 'pointer',
        position: 'relative',
        height: '500px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgba(255, 215, 0, 0.1)',
    },
    carouselNav: {
        '& .MuiIconButton-root': {
            color: '#b7950b',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }
        }
    }
};

const ProductBanner = ({ product, handleProductClick }) => (
    <Card onClick={() => handleProductClick(product.itemCode)} sx={styles.card}>
        <Grid container sx={{ height: '100%' }}>
            <Grid item xs={12} md={6} sx={{ p: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        ...styles.gradientText, 
                        fontWeight: 700, 
                        mb: 2,
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                        lineHeight: 1.2,
                        whiteSpace: 'normal',
                        overflow: 'visible',
                        textOverflow: 'clip',
                        wordWrap: 'break-word',
                        minHeight: '4rem'
                    }}
                >
                    {product.itemName}
                </Typography>
                
                <Typography variant="h6" sx={{ 
                    mb: 3, 
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}>
                    <span style={{ 
                        color: '#b7950b',
                        fontWeight: 800,
                        fontSize: '1.8rem',
                        textShadow: '0 0 1px rgba(183, 149, 11, 0.3)'
                    }}>
                        {product.brand}
                    </span> 
                    <span style={{
                        color: '#666',
                        fontSize: '1.8rem'
                    }}>
                        •
                    </span>
                    <span style={{ 
                        color: '#b7950b',
                        fontWeight: 700,
                        fontSize: '1.6rem',
                        textShadow: '0 0 1px rgba(255, 215, 0, 0.3)'
                    }}>
                        {product.model || 'Premium Wearable'}
                    </span>
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: '#666',
                            mb: 1,
                            fontSize: '1.2rem',
                            fontFamily: "'Outfit', sans-serif",
                        }}
                    >
                        Special Price
                    </Typography>
                    
                    <Typography variant="h3" sx={{ 
                        color: '#b7950b', 
                        fontWeight: 700, 
                        mb: 1,
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 1
                    }}>
                        ₹{product.salePrice.toLocaleString('en-IN')}
                        <Typography 
                            component="span" 
                            sx={{ 
                                fontSize: '1rem',
                                color: '#4CAF50',
                                fontWeight: 600,
                                ml: 2
                            }}
                        >
                            limited time offer
                        </Typography>
                    </Typography>
                    
                    {product.currentMRP > product.salePrice && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h6" sx={{ 
                                textDecoration: 'line-through', 
                                color: '#666'
                            }}>
                                ₹{product.currentMRP.toLocaleString('en-IN')}
                            </Typography>
                            <Typography variant="h6" sx={{ 
                                color: '#4CAF50', 
                                fontWeight: 600 
                            }}>
                                {Math.round(((product.currentMRP - product.salePrice) / product.currentMRP) * 100)}% OFF
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Typography variant="body1" sx={{ color: '#666', mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
                    Elevate your lifestyle with our premium wearables collection.
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                height: '100%',
                p: 4
            }}>
                <CardMedia
                    component="img"
                    image={product.image || 'https://via.placeholder.com/500'}
                    alt={product.itemName}
                    sx={{ 
                        maxWidth: '100%',
                        maxHeight: '400px',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                    }}
                />
            </Grid>
        </Grid>
    </Card>
);

const WearablesBigBanner = ({ navigate }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/bestseller-smartwatches`);
                // Get one product per brand
                const uniqueBrandProducts = response.data.reduce((acc, product) => {
                    if (!acc[product.brand]) {
                        acc[product.brand] = product;
                    }
                    return acc;
                }, {});
                setProducts(Object.values(uniqueBrandProducts));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching best seller wearables:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return null;

    return (
        <Box sx={{ 
            mb: 3,
            borderRadius: '20px',
            overflow: 'hidden',
            maxWidth: '100vw',
            width: '98vw',
            px: 0,
            mx: 'auto',
            ml: { xs: 1, sm: 2, md: 3 }
        }}>
            <Carousel
                animation="slide"
                navButtonsAlwaysVisible
                autoPlay={true}
                interval={5000}
                sx={styles.carouselNav}
            >
                {products.map((product) => (
                    <ProductBanner 
                        key={product.itemCode} 
                        product={product} 
                        handleProductClick={() => navigate(`/product/${product.itemCode}`)} 
                    />
                ))}
            </Carousel>
        </Box>
    );
};

export default WearablesBigBanner; 