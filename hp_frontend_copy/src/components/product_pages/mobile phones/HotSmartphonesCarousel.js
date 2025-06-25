import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { API_BASE_URL } from '../../../config';
import LuxuryLoader from '../../common/LuxuryLoader';

const styles = {
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

const HotSmartphonesCarousel = ({ navigate }) => {
    const [hotProducts, setHotProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/hot-products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch hot products');
                }
                const data = await response.json();
                
                const transformedProducts = data.map(product => ({
                    itemcode: product.ItemCode,
                    ItemName: product.ItemName,
                    image: product.imgname11,
                    brand: product.Brand,
                    model: product.MODEL,
                    salePrice: parseFloat(product.SalePrice) || 0,
                    currentMRP: parseFloat(product.CurrentMRP) || 0
                }));
                
                setHotProducts(transformedProducts);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchHotProducts();
    }, []);

    if (loading) return <LuxuryLoader message="Loading Hot Products" />;
    if (error) return <div style={{ marginTop: '80px' }}>{error}</div>;
    if (!hotProducts.length) return null;

    return (
        <Box sx={{ 
            mb: 6,
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            overflow: 'hidden'
        }}>
            <Carousel
                animation="slide"
                navButtonsAlwaysVisible
                autoPlay={true}
                interval={3000}
                duration={800}
                swipe={true}
                sx={{
                    ...styles.carouselNav,
                    width: '100%',
                    '& .MuiBox-root': {
                        width: '100%'
                    },
                    '& .CarouselItem': {
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }
                }}
                indicators={false}
            >
                {Array.from({ length: Math.ceil(hotProducts.length / (window.innerWidth <= 600 ? 2 : 4)) }, (_, index) => (
                    <Box sx={{ 
                        display: 'flex', 
                        gap: { xs: 1, sm: 3 },
                        px: { xs: 1, sm: 2 }
                    }} key={index}>
                        {hotProducts.slice(index * (window.innerWidth <= 600 ? 2 : 4), (index + 1) * (window.innerWidth <= 600 ? 2 : 4)).map((product) => (
                            <Card 
                                key={product.itemcode}
                                onClick={() => navigate(`/product/${product.itemcode}`)}
                                sx={{
                                    height: { xs: '300px', sm: '400px' },
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid rgba(255, 215, 0, 0.1)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    p: { xs: 1, sm: 2 },
                                    flex: { xs: '0 0 48%', sm: '1' },
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={product.image || 'https://via.placeholder.com/300'}
                                    alt={product.ItemName}
                                    sx={{
                                        height: { xs: '140px', sm: '200px' },
                                        objectFit: 'contain',
                                        mb: { xs: 1, sm: 3 }
                                    }}
                                />
                                
                                <Box sx={{ 
                                    flexGrow: 1,
                                    mt: { xs: 1, sm: 2 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    width: '100%',
                                    px: 1
                                }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            fontWeight: 600,
                                            mb: { xs: 0.5, sm: 1.5 },
                                            color: '#b7950b',
                                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                            height: { xs: '2.4em', sm: '3.6em' },
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: { xs: 2, sm: 3 },
                                            WebkitBoxOrient: 'vertical',
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: 0,
                                            margin: 0
                                        }}
                                    >
                                        {product.ItemName}
                                    </Typography>

                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mb: 0.5,
                                        gap: 0.5
                                    }}>
                                        <Typography 
                                            sx={{
                                                color: '#b7950b',
                                                fontWeight: 800,
                                                fontSize: { xs: '0.9rem', sm: '1.1rem' }
                                            }}
                                        >
                                            {product.brand}
                                        </Typography>
                                        <Typography 
                                            sx={{
                                                color: '#666',
                                                fontSize: { xs: '0.9rem', sm: '1.1rem' },
                                                mx: 0.5
                                            }}
                                        >
                                            •
                                        </Typography>
                                        <Typography 
                                            sx={{
                                                color: '#b7950b',
                                                fontWeight: 700,
                                                fontSize: { xs: '0.8rem', sm: '0.9rem' }
                                            }}
                                        >
                                            {product.model || 'Latest Model'}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mt: 'auto' }}>
                                        <Typography 
                                            variant="h6" 
                                            sx={{
                                                color: '#b7950b',
                                                fontWeight: 700,
                                                fontSize: { xs: '1rem', sm: '1.2rem' },
                                                mb: 0.5
                                            }}
                                        >
                                            ₹{product.salePrice?.toLocaleString('en-IN') || '0'}
                                        </Typography>

                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: 1,
                                            minHeight: { xs: '20px', sm: '24px' }
                                        }}>
                                            {product.currentMRP > product.salePrice ? (
                                                <>
                                                    <Typography sx={{ 
                                                        textDecoration: 'line-through',
                                                        color: '#666',
                                                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                                                    }}>
                                                        ₹{product.currentMRP?.toLocaleString('en-IN') || '0'}
                                                    </Typography>
                                                    <Typography sx={{ 
                                                        color: '#4CAF50',
                                                        fontWeight: 600,
                                                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                                                    }}>
                                                        {Math.round(((product.currentMRP - product.salePrice) / product.currentMRP) * 100)}% OFF
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Box sx={{ height: { xs: '20px', sm: '24px' } }} />
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default HotSmartphonesCarousel;
