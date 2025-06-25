import React from 'react';
import { Box, Grid, Card, CardMedia, Typography, useTheme, useMediaQuery } from '@mui/material';
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Debug log to check the data structure
    console.log('Best Sellers Data:', bestSellers);

    const handleProductClick = (product) => {
        // Debug log to check the clicked product
        console.log('Clicked Product:', product);
        
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
                                key={product.ItemCode || product.itemCode || product.itemcode || product.id}
                                onClick={() => handleProductClick(product)}
                                sx={{
                                    height: { xs: '300px', sm: '320px' },
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
                                        height: { xs: '120px', sm: '140px' },
                                        objectFit: 'contain',
                                        mb: { xs: 1, sm: 1.5 },
                                        background: 'rgba(255, 255, 255, 0.7)'
                                    }}
                                />
                                
                                <Box sx={{ 
                                    flexGrow: 1,
                                    background: 'rgba(255,255,255,0.7)',
                                    p: { xs: 1, sm: 2 },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: { xs: 0.5, sm: 0.75 }
                                }}>
                                    <Box>
                                        <Typography 
                                            variant="h6" 
                                            sx={{
                                                fontWeight: 600,
                                                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                fontSize: { xs: '0.75rem', sm: '1rem' },
                                                lineHeight: { xs: 1.2, sm: 1.4 },
                                                height: { xs: '2.4em', sm: '2.8em' },
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                mb: { xs: 0.25, sm: 0.5 },
                                                wordBreak: 'break-word',
                                                maxWidth: '100%'
                                            }}
                                        >
                                            {product.itemName}
                                        </Typography>

                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5
                                        }}>
                                            <Typography 
                                                sx={{
                                                    color: '#b7950b',
                                                    fontWeight: 800,
                                                    fontSize: { xs: '0.8rem', sm: '1.1rem' }
                                                }}
                                            >
                                                {product.brand}
                                            </Typography>
                                            <Typography 
                                                sx={{
                                                    color: '#666',
                                                    fontSize: { xs: '0.8rem', sm: '1.1rem' },
                                                    mx: 0.5
                                                }}
                                            >
                                                •
                                            </Typography>
                                            <Typography 
                                                sx={{
                                                    color: '#b7950b',
                                                    fontWeight: 700,
                                                    fontSize: { xs: '0.7rem', sm: '0.9rem' }
                                                }}
                                            >
                                                {product.model || 'Smartwatch'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box>
                                        <Typography 
                                            variant="h6" 
                                            sx={{
                                                color: '#b7950b',
                                                fontWeight: 700,
                                                fontSize: { xs: '0.9rem', sm: '1.2rem' },
                                                mb: 0.25
                                            }}
                                        >
                                            ₹{Number(product.salePrice).toLocaleString('en-IN')}
                                        </Typography>

                                        {Number(product.currentMRP) > Number(product.salePrice) && (
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: 1,
                                                minHeight: { xs: '16px', sm: '24px' }
                                            }}>
                                                <Typography sx={{ 
                                                    textDecoration: 'line-through',
                                                    color: '#666',
                                                    fontSize: { xs: '0.7rem', sm: '0.9rem' }
                                                }}>
                                                    ₹{Number(product.currentMRP).toLocaleString('en-IN')}
                                                </Typography>
                                                <Typography sx={{ 
                                                    color: '#4CAF50',
                                                    fontWeight: 600,
                                                    fontSize: { xs: '0.7rem', sm: '0.9rem' }
                                                }}>
                                                    {Math.round(((Number(product.currentMRP) - Number(product.salePrice)) / Number(product.currentMRP)) * 100)}% OFF
                                                </Typography>
                                            </Box>
                                        )}
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

export default HotWearablesCarousel; 