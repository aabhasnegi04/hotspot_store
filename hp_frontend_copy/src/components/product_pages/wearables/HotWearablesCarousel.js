import React from 'react';
import { Box, Grid, Card, CardMedia, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';

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

const HotWearablesCarousel = ({ bestSellers }) => {
    const navigate = useNavigate();

    // Debug log to check the data structure
    console.log('Best Sellers Data:', bestSellers);

    const handleProductClick = (product) => {
        // Debug log to check the clicked product
        console.log('Clicked Product:', product);
        
        // Check all possible property names for the item code
        const itemCode = product.ItemCode || product.itemCode || product.itemcode || product.id;
        if (itemCode) {
            console.log('Navigating to product:', itemCode);
            navigate(`/product/${itemCode}`);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            console.error('No item code found for product:', product);
        }
    };

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
                navButtonsAlwaysVisible
                autoPlay={true}
                interval={3000}
                sx={{
                    ...styles.carouselNav,
                    '& .MuiPaper-root': {
                        borderRadius: 0
                    }
                }}
                indicators={false}
            >
                {/* Group products into chunks of 4 */}
                {Array.from({ length: Math.ceil(bestSellers.length / 4) }, (_, index) => {
                    const pageItems = bestSellers.slice(index * 4, (index + 1) * 4);
                    return (
                        <Grid 
                            container 
                            spacing={0} 
                            key={`page-${index}`}
                            sx={{
                                width: '100%',
                                m: 0,
                                p: 0
                            }}
                        >
                            {pageItems.map((product, productIndex) => (
                                <Grid 
                                    item 
                                    xs={12} 
                                    sm={6} 
                                    md={3} 
                                    key={`product-${product.ItemCode || product.itemCode || product.itemcode || product.id || `${index}-${productIndex}`}`}
                                    sx={{
                                        px: { xs: 0, md: productIndex === 0 ? 0 : (productIndex === 3 ? 0 : 3) },
                                        mb: { xs: 3, md: 0 }
                                    }}
                                >
                                    <Card 
                                        onClick={() => handleProductClick(product)}
                                        sx={{
                                            height: '320px',
                                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                            borderRadius: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            border: '1px solid rgba(255, 215, 0, 0.1)',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            p: 2
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={product.image || 'https://via.placeholder.com/300'}
                                            alt={product.itemName}
                                            sx={{
                                                height: '140px',
                                                objectFit: 'contain',
                                                mb: 1.5,
                                                background: 'rgba(255, 255, 255, 0.7)'
                                            }}
                                        />
                                        
                                        <Box sx={{ 
                                            flexGrow: 1,
                                            background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                                            p: 2,
                                            mt: -2
                                        }}>
                                            <Typography 
                                                variant="h6" 
                                                sx={{
                                                    fontWeight: 600,
                                                    mb: 1,
                                                    background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    fontSize: '1rem',
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
                                                    {product.model || 'Smartwatch'}
                                                </span>
                                            </Typography>

                                            <Typography variant="h6" sx={{
                                                color: '#b7950b',
                                                fontWeight: 700,
                                                fontSize: '1.2rem'
                                            }}>
                                                ₹{Number(product.salePrice).toLocaleString('en-IN')}
                                            </Typography>

                                            {Number(product.currentMRP) > Number(product.salePrice) && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography sx={{ 
                                                        textDecoration: 'line-through',
                                                        color: '#666',
                                                        fontSize: '0.9rem'
                                                    }}>
                                                        ₹{Number(product.currentMRP).toLocaleString('en-IN')}
                                                    </Typography>
                                                    <Typography sx={{ 
                                                        color: '#4CAF50',
                                                        fontWeight: 600,
                                                        fontSize: '0.9rem'
                                                    }}>
                                                        {Math.round(((Number(product.currentMRP) - Number(product.salePrice)) / Number(product.currentMRP)) * 100)}% OFF
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    );
                })}
            </Carousel>
        </Box>
    );
};

export default HotWearablesCarousel; 