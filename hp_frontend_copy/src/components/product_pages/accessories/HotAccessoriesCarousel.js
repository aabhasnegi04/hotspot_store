import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, Typography, useTheme, useMediaQuery } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';

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

const HotAccessoriesCarousel = ({ navigate }) => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/bestseller-accessories`);
                setBestSellers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching best seller accessories:', error);
                setLoading(false);
            }
        };

        fetchBestSellers();
    }, []);

    if (loading || bestSellers.length === 0) return null;

    return (
        <Box sx={{ 
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            mb: 6,
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
                {Array.from({ length: Math.ceil(bestSellers.length / (isMobile ? 2 : 4)) }, (_, index) => (
                    <Box sx={{ 
                        display: 'flex', 
                        gap: { xs: 1, sm: 3 },
                        px: { xs: 1, sm: 2 }
                    }} key={index}>
                        {bestSellers.slice(index * (isMobile ? 2 : 4), (index + 1) * (isMobile ? 2 : 4)).map((product) => (
                            <Card 
                                key={product.itemCode}
                                onClick={() => navigate(`/product/${product.itemCode}`)}
                                sx={{
                                    height: { xs: '300px', sm: '350px' },
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    borderRadius: { xs: '8px', sm: '12px' },
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
                                    alt={product.itemName}
                                    sx={{
                                        height: { xs: '120px', sm: '160px' },
                                        objectFit: 'contain',
                                        mb: { xs: 1, sm: 1.5 },
                                        background: 'rgba(255, 255, 255, 0.7)'
                                    }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{
                                            fontWeight: 600,
                                            mb: 0.8,
                                            color: '#b7950b',
                                            fontSize: { xs: '0.85rem', sm: '0.95rem' },
                                            height: '2.4em',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                    >
                                        {product.itemName}
                                    </Typography>
                                    <Typography sx={{ 
                                        mb: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        fontSize: { xs: '0.9rem', sm: '1rem' }
                                    }}>
                                        <span style={{ 
                                            color: '#b7950b',
                                            fontWeight: 800,
                                            fontSize: '1.1rem'
                                        }}>
                                            {product.brand}
                                        </span> 
                                        <span style={{
                                            color: '#666',
                                            fontSize: '1.1rem'
                                        }}>
                                            •
                                        </span>
                                        <span style={{ 
                                            color: '#b7950b',
                                            fontWeight: 700,
                                            fontSize: '1.1rem'
                                        }}>
                                            Accessory
                                        </span>
                                    </Typography>
                                    <Typography variant="h6" sx={{
                                        color: '#b7950b',
                                        fontWeight: 700,
                                        fontSize: { xs: '1rem', sm: '1.2rem' }
                                    }}>
                                        ₹{product.salePrice.toLocaleString('en-IN')}
                                    </Typography>
                                    {product.currentMRP > product.salePrice && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography sx={{ 
                                                textDecoration: 'line-through',
                                                color: '#666',
                                                fontSize: { xs: '0.8rem', sm: '0.9rem' }
                                            }}>
                                                ₹{product.currentMRP.toLocaleString('en-IN')}
                                            </Typography>
                                            <Typography sx={{ 
                                                color: '#4CAF50',
                                                fontWeight: 600,
                                                fontSize: { xs: '0.8rem', sm: '0.9rem' }
                                            }}>
                                                {Math.round(((product.currentMRP - product.salePrice) / product.currentMRP) * 100)}% OFF
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Card>
                        ))}
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default HotAccessoriesCarousel;