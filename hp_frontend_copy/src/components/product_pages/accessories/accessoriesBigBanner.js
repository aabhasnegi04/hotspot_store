import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, Grid, useTheme, useMediaQuery } from '@mui/material';
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
        height: { xs: '280px', sm: '450px', md: '500px' },
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
        borderRadius: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgba(255, 215, 0, 0.1)',
        width: '100%',
        maxWidth: 'none'
    },
    carouselNav: {
        '& .MuiIconButton-root': {
            color: '#b7950b',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
            width: { xs: '30px', sm: '40px' },
            height: { xs: '30px', sm: '40px' }
        },
        '& .MuiPaginationItem-root': {
            color: '#b7950b',
        },
        '& .css-1m9128y': {
            display: 'none'
        },
        '& .MuiPaper-root': {
            borderRadius: 0
        },
        '& .CarouselItem': {
            position: 'relative'
        },
        '& .MuiBox-root': {
            position: 'relative'
        },
        '& .css-1abc02a': {
            color: '#b7950b'
        },
        '& .css-hn784z button': {
            color: '#b7950b'
        }
    }
};

const ProductBanner = ({ product, handleProductClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card 
            onClick={() => handleProductClick(product.itemCode)}
            sx={styles.card}
        >
            <Grid container spacing={0}>
                <Grid item xs={6} sx={{ 
                    p: { xs: 2, sm: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Typography variant="h4" sx={{ 
                        ...styles.gradientText,
                        fontWeight: 700,
                        mb: { xs: 1, sm: 2 },
                        fontSize: { xs: '0.9rem', sm: '1.4rem', md: '1.5rem' },
                        lineHeight: 1.2,
                        whiteSpace: 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: { xs: 'auto', sm: '3rem', md: '4rem' }
                    }}>
                        {product.itemName}
                    </Typography>

                    <Typography variant="h6" sx={{ 
                        mb: { xs: 1, sm: 2, md: 3 }, 
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: { xs: '0.8rem', sm: '1.2rem', md: '1.5rem' },
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1, sm: 2 },
                    }}>
                        <span style={{ 
                            color: '#b7950b',
                            fontWeight: 800,
                            fontSize: isMobile ? '1rem' : '1.8rem',
                            textShadow: '0 0 1px rgba(183, 149, 11, 0.3)'
                        }}>
                            {product.brand}
                        </span> 
                        <span style={{
                            color: '#666',
                            fontSize: isMobile ? '1rem' : '1.8rem'
                        }}>
                            •
                        </span>
                        <span style={{ 
                            color: '#b7950b',
                            fontWeight: 700,
                            fontSize: isMobile ? '0.9rem' : '1.6rem',
                            textShadow: '0 0 1px rgba(255, 215, 0, 0.3)'
                        }}>
                            {product.model || 'Premium Accessory'}
                        </span>
                    </Typography>

                    <Box sx={{ mb: { xs: 1, sm: 2, md: 4 } }}>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: '#666',
                                mb: 0.5,
                                fontSize: { xs: '0.7rem', sm: '1rem', md: '1.2rem' },
                                fontFamily: "'Outfit', sans-serif"
                            }}
                        >
                            Special Price
                        </Typography>
                        
                        <Typography variant="h3" sx={{ 
                            color: '#b7950b', 
                            fontWeight: 700, 
                            mb: 0.5,
                            fontSize: { xs: '1.2rem', sm: '2rem', md: '2.2rem' },
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 1
                        }}>
                            ₹{product.salePrice.toLocaleString('en-IN')}
                            <Typography 
                                component="span" 
                                sx={{ 
                                    fontSize: { xs: '0.6rem', sm: '0.8rem', md: '1rem' },
                                    color: '#4CAF50',
                                    fontWeight: 600,
                                    ml: { xs: 1, sm: 2 }
                                }}
                            >
                                limited time offer
                            </Typography>
                        </Typography>
                        
                        {product.currentMRP > product.salePrice && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="h6" sx={{ 
                                    textDecoration: 'line-through', 
                                    color: '#666',
                                    fontSize: { xs: '0.8rem', sm: '1.1rem', md: '1.2rem' }
                                }}>
                                    ₹{product.currentMRP.toLocaleString('en-IN')}
                                </Typography>
                                <Typography variant="h6" sx={{ 
                                    color: '#4CAF50', 
                                    fontWeight: 600,
                                    fontSize: { xs: '0.8rem', sm: '1.1rem', md: '1.2rem' }
                                }}>
                                    {Math.round(((product.currentMRP - product.salePrice) / product.currentMRP) * 100)}% OFF
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <Typography variant="body1" sx={{ 
                        color: '#666', 
                        mb: { xs: 1, sm: 2, md: 3 }, 
                        fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1.1rem' }, 
                        lineHeight: 1.6 
                    }}>
                        Elevate your mobile experience with our premium accessories collection.
                    </Typography>
                </Grid>

                <Grid item xs={6} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    position: 'relative',
                    height: '100%',
                    p: { xs: 2, sm: 3, md: 4 }
                }}>
                    <CardMedia
                        component="img"
                        image={product.image || 'https://via.placeholder.com/500'}
                        alt={product.itemName}
                        sx={{ 
                            maxWidth: '100%',
                            maxHeight: { xs: '140px', sm: '300px', md: '400px' },
                            objectFit: 'contain',
                            mx: 'auto'
                        }}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};

const AccessoriesBigBanner = ({ navigate }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/bestseller-accessories`);
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
                console.error('Error fetching best seller accessories:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return null;

    return (
        <Box sx={{ 
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            mb: { xs: 0.5, sm: 1 },
            overflow: 'hidden'
        }}>
            <Carousel
                animation="slide"
                navButtonsAlwaysVisible={!isMobile}
                navButtonsProps={{
                    style: {
                        display: isMobile ? 'none' : 'flex'
                    }
                }}
                autoPlay={true}
                interval={3000}
                indicatorContainerProps={{
                    style: {
                        marginTop: '-20px',
                        position: 'relative',
                        zIndex: 1
                    }
                }}
                indicatorIconButtonProps={{
                    style: {
                        color: '#b7950b',
                        padding: '3px',
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: '#b7950b',
                        backgroundColor: '#b7950b'
                    }
                }}
                sx={{
                    ...styles.carouselNav
                }}
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

export default AccessoriesBigBanner; 