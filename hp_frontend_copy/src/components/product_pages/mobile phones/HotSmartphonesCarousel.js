import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, Typography } from '@mui/material';
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
                
                // Transform the data to match our component's expected structure
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
            borderRadius: '20px',
            overflow: 'hidden',
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
                {Array.from({ length: Math.ceil(hotProducts.length / 4) }, (_, index) => (
                    <Grid container spacing={2} key={index}>
                        {hotProducts.slice(index * 4, (index + 1) * 4).map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.itemcode}>
                                <Card 
                                    onClick={() => navigate(`/product/${product.itemcode}`)}
                                    sx={{
                                        height: '400px',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        p: 2,
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={product.image || 'https://via.placeholder.com/300'}
                                        alt={product.ItemName}
                                        sx={{
                                            height: '200px',
                                            objectFit: 'contain',
                                            mb: 3,
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)'
                                            }
                                        }}
                                    />
                                    
                                    <Box sx={{ 
                                        flexGrow: 1,
                                        mt: 2,
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
                                                mb: 1.5,
                                                color: '#b7950b',
                                                fontSize: '0.9rem',
                                                height: '3.6em',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
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
                                                    fontSize: '1.1rem'
                                                }}
                                            >
                                                {product.brand}
                                            </Typography>
                                            <Typography 
                                                sx={{
                                                    color: '#666',
                                                    fontSize: '1.1rem',
                                                    mx: 0.5
                                                }}
                                            >
                                                •
                                            </Typography>
                                            <Typography 
                                                sx={{
                                                    color: '#b7950b',
                                                    fontWeight: 700,
                                                    fontSize: '0.9rem'
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
                                                    fontSize: '1.2rem',
                                                    mb: 0.5
                                                }}
                                            >
                                                ₹{product.salePrice?.toLocaleString('en-IN') || '0'}
                                            </Typography>

                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: 1,
                                                minHeight: '24px'
                                            }}>
                                                {product.currentMRP > product.salePrice ? (
                                                    <>
                                                        <Typography sx={{ 
                                                            textDecoration: 'line-through',
                                                            color: '#666',
                                                            fontSize: '0.9rem'
                                                        }}>
                                                            ₹{product.currentMRP?.toLocaleString('en-IN') || '0'}
                                                        </Typography>
                                                        <Typography sx={{ 
                                                            color: '#4CAF50',
                                                            fontWeight: 600,
                                                            fontSize: '0.9rem'
                                                        }}>
                                                            {Math.round(((product.currentMRP - product.salePrice) / product.currentMRP) * 100)}% OFF
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <Box sx={{ height: '24px' }} />
                                                )}
                                            </Box>
                                        </Box>
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

export default HotSmartphonesCarousel;
