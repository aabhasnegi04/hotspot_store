import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, Typography } from '@mui/material';
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
            mb: 6,
            borderRadius: '20px',
            overflow: 'hidden',
            maxWidth: '98%',
            ml: '0%'
        }}>
            <Carousel
                animation="slide"
                navButtonsAlwaysVisible
                autoPlay={true}
                interval={5000}
                sx={styles.carouselNav}
                indicators={false}
            >
                {/* Group products into chunks of 4 */}
                {Array.from({ length: Math.ceil(bestSellers.length / 4) }, (_, index) => (
                    <Grid container spacing={2} key={index} sx={{ px: 1 }}>
                        {bestSellers.slice(index * 4, (index + 1) * 4).map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.itemCode}>
                                <Card 
                                    onClick={() => navigate(`/product/${product.itemCode}`)}
                                    sx={{
                                        height: '350px',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        p: 1.5,
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.image || 'https://via.placeholder.com/300'}
                                        alt={product.itemName}
                                        sx={{
                                            height: '160px',
                                            objectFit: 'contain',
                                            mb: 1.5,
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)'
                                            }
                                        }}
                                    />
                                    
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography 
                                            variant="h6" 
                                            sx={{
                                                fontWeight: 600,
                                                mb: 0.8,
                                                color: '#b7950b',
                                                fontSize: '0.95rem',
                                                height: '2.4em',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {product.itemName}
                                        </Typography>

                                        <Typography sx={{ 
                                            mb: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            fontSize: '1rem',
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
                                            fontSize: '1.2rem'
                                        }}>
                                            ₹{product.salePrice.toLocaleString('en-IN')}
                                        </Typography>

                                        {product.currentMRP > product.salePrice && (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography sx={{ 
                                                    textDecoration: 'line-through',
                                                    color: '#666',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    ₹{product.currentMRP.toLocaleString('en-IN')}
                                                </Typography>
                                                <Typography sx={{ 
                                                    color: '#4CAF50',
                                                    fontWeight: 600,
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {Math.round(((product.currentMRP - product.salePrice) / product.currentMRP) * 100)}% OFF
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ))}
            </Carousel>
        </Box>
    );
};

export default HotAccessoriesCarousel;