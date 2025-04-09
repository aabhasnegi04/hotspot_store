import React from 'react';
import { Box, Typography, Card, CardMedia, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

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
    <Card onClick={() => handleProductClick(product.itemcode)} sx={styles.card}>
        <Grid container sx={{ height: '100%' }}>
            <Grid item xs={12} md={6} sx={{ p: 6, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h4" sx={{ ...styles.gradientText, fontWeight: 700, mb: 2 }}>
                    {product.ItemName}
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
                        {product.category || 'Premium Accessory'}
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
                    Elevate your mobile experience with our premium accessories collection.
                </Typography>
            </Grid>

            <Grid item xs={12} md={6} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',
                top: '-20px',
            }}>
                <CardMedia
                    component="img"
                    image={product.image || 'https://via.placeholder.com/500'}
                    alt={product.ItemName}
                    sx={{ 
                        width: '80%',
                        height: '80%',
                        objectFit: 'contain',
                        transform: 'scale(1.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.15)' }
                    }}
                />
            </Grid>
        </Grid>
    </Card>
);

const AccessoriesBigBanner = ({ bestSellers, navigate }) => {
    return (
        <Box sx={{ 
            mb: 3,
            borderRadius: '20px',
            overflow: 'hidden',
            maxWidth: '97%',
            mx: 'auto'
        }}>
            <Carousel
                animation="slide"
                navButtonsAlwaysVisible
                autoPlay={true}
                interval={5000}
                sx={styles.carouselNav}
            >
                {bestSellers.map((product) => (
                    <ProductBanner 
                        key={product.itemcode} 
                        product={product} 
                        handleProductClick={() => navigate(`/product/${product.itemcode}`)} 
                    />
                ))}
            </Carousel>
        </Box>
    );
};

export default AccessoriesBigBanner; 