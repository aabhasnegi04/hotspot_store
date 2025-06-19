import React from 'react';
import { Box, Typography, Card, CardMedia, Grid, Fade, useTheme, useMediaQuery } from '@mui/material';
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
        height: { xs: 'auto', md: '500px' },
        minHeight: { xs: '600px', md: '500px' },
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))',
        borderRadius: '0',
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
            }
        }
    }
};

const normalizeProduct = (product) => ({
    ...product,
    id: product.id || product.itemcode || product.ItemCode,
    salePrice: Number(product.salePrice || product.SalePrice || product.price || 0),
    currentMRP: Number(product.currentMRP || product.MRP || product.mrp || 0),
});

const ProductBanner = ({ product, handleProductClick }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card onClick={() => handleProductClick(product.id)} sx={{
            ...styles.card,
            height: { xs: 'auto', md: '500px' },
            minHeight: { xs: '320px', md: '500px' },
            p: 0
        }}>
            <Grid container sx={{
                height: '100%',
                width: '100%',
                maxWidth: 'none',
                m: 0,
                flexDirection: { xs: 'column-reverse', md: 'row' }
            }}>
                <Grid item xs={12} md={6} sx={{
                    p: { xs: 1, md: 6 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <Typography
                        variant={isMobile ? 'subtitle1' : 'h4'}
                        sx={{
                            ...styles.gradientText,
                            fontWeight: 700,
                            mb: { xs: 0.5, md: 2 },
                            fontSize: { xs: '1rem', md: '2rem' }
                        }}
                    >
                        {product.ItemName}
                    </Typography>
                    <Typography
                        variant={isMobile ? 'body2' : 'h6'}
                        sx={{
                            mb: { xs: 0.5, md: 3 },
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: { xs: '0.9rem', md: '1.5rem' },
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 0.5, md: 2 },
                            flexWrap: 'wrap'
                        }}
                    >
                        <span style={{ color: '#b7950b', fontWeight: 800, fontSize: isMobile ? '0.95rem' : '1.8rem' }}>{product.brand}</span>
                        <span style={{ color: '#666', fontSize: isMobile ? '0.95rem' : '1.8rem' }}>•</span>
                        <span style={{ color: '#b7950b', fontWeight: 700, fontSize: isMobile ? '0.9rem' : '1.6rem' }}>{product.model || 'Latest Model'}</span>
                    </Typography>
                    <Box sx={{ mb: { xs: 0.5, md: 4 } }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#666',
                                mb: 0.5,
                                fontSize: { xs: '0.85rem', md: '1.2rem' },
                                fontFamily: "'Outfit', sans-serif"
                            }}
                        >
                            Starting at
                        </Typography>
                        <Typography
                            variant={isMobile ? 'subtitle1' : 'h3'}
                            sx={{
                                color: '#b7950b',
                                fontWeight: 700,
                                mb: 0.5,
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: 1,
                                flexWrap: 'wrap',
                                fontSize: { xs: '1.1rem', md: '2.5rem' }
                            }}
                        >
                            ₹{typeof product.salePrice === 'number' ? product.salePrice.toLocaleString('en-IN') : ''}
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: { xs: '0.7rem', md: '1rem' },
                                    color: '#4CAF50',
                                    fontWeight: 600,
                                    ml: { xs: 0.5, md: 2 }
                                }}
                            >
                                inclusive of all offers
                            </Typography>
                        </Typography>
                        {typeof product.currentMRP === 'number' && typeof product.salePrice === 'number' && product.currentMRP > product.salePrice && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 2 } }}>
                                <Typography
                                    variant={isMobile ? 'body2' : 'h6'}
                                    sx={{
                                        textDecoration: 'line-through',
                                        color: '#666',
                                        fontSize: { xs: '0.8rem', md: '1rem' }
                                    }}
                                >
                                    ₹{product.currentMRP.toLocaleString('en-IN')}
                                </Typography>
                                <Typography
                                    variant={isMobile ? 'body2' : 'h6'}
                                    sx={{
                                        color: '#4CAF50',
                                        fontWeight: 600,
                                        fontSize: { xs: '0.8rem', md: '1rem' }
                                    }}
                                >
                                    {Math.round(((product.currentMRP - product.salePrice) / product.currentMRP) * 100)}% OFF
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#666',
                            mb: { xs: 0.5, md: 3 },
                            fontSize: { xs: '0.8rem', md: '1.1rem' },
                            lineHeight: 1.4
                        }}
                    >
                        Experience the next level of mobile technology with our best-selling smartphone.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    top: { xs: 0, md: '-20px' },
                    width: '100%',
                    p: { xs: 0.5, md: 2 }
                }}>
                    <CardMedia
                        component="img"
                        image={product.image || 'https://via.placeholder.com/500'}
                        alt={product.ItemName}
                        sx={{
                            width: { xs: '70%', md: '80%' },
                            height: { xs: 'auto', md: '80%' },
                            objectFit: 'contain',
                            transform: { xs: 'scale(0.9)', md: 'scale(1.1)' }
                        }}
                    />
                </Grid>
            </Grid>
        </Card>
    );
};

const SmartphonesBigBanner = ({ bestSellers, navigate }) => {
    const safeBestSellers = Array.isArray(bestSellers)
        ? bestSellers.map(normalizeProduct)
        : [];

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <Fade in={safeBestSellers.length > 0} timeout={800}>
            <Box sx={{
                width: '100vw',
                position: 'relative',
                left: '50%',
                right: '50%',
                transform: 'translateX(-50%)',
                borderRadius: 0,
                overflow: 'visible',
                m: 0,
                p: 0,
                '& .MuiPaper-root': {
                    width: '100%',
                    maxWidth: 'none',
                    borderRadius: 0
                }
            }}>
                {safeBestSellers.length > 0 && (
                    <Carousel
                        animation="slide"
                        navButtonsAlwaysVisible
                        autoPlay={true}
                        interval={5000}
                        sx={{
                            ...styles.carouselNav,
                            width: '100%',
                            '& .MuiBox-root': {
                                width: '100%'
                            }
                        }}
                    >
                        {safeBestSellers.map((product) => (
                            <ProductBanner
                                key={product.id}
                                product={product}
                                handleProductClick={handleProductClick}
                            />
                        ))}
                    </Carousel>
                )}
            </Box>
        </Fade>
    );
};

export default SmartphonesBigBanner;
