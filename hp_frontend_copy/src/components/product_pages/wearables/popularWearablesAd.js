import React from 'react';
import { Box, Grid, Card, Typography, CardMedia, Button, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PopularWearablesAd = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClick = (brand) => {
        // Navigate to the brand page
        navigate(`/wearables/brand/${brand.toLowerCase()}`);
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const brands = [
        {
            brand: 'apple',
            image: '/Image/img/brands/hs/apple.png',
            title: 'Apple Wearables',
            description: 'Experience the seamless integration of Apple ecosystem'
        },
        {
            brand: 'samsung',
            image: '/Image/img/brands/hs/samsung.png',
            title: 'Samsung Wearables',
            description: 'Innovative technology for your daily life'
        },
        {
            brand: 'sony',
            image: 'https://1000logos.net/wp-content/uploads/2021/05/Sony-logo.png',
            title: 'Sony Wearables',
            description: 'Premium audio and gaming experience'
        }
    ];

    return (
        <Box sx={{ 
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            mb: { xs: 3, md: 6 },
            overflow: 'hidden'
        }}>
            <Grid 
                container 
                spacing={2}
                sx={{
                    width: '100%',
                    m: 0,
                    p: { xs: 1.5, md: 0 },
                    background: { xs: 'rgba(255, 250, 227, 0.5)', md: 'transparent' }
                }}
            >
                {brands.map((brand, index) => (
                    <Grid 
                        item 
                        xs={4}
                        key={index}
                    >
                        <Card 
                            onClick={() => handleClick(brand.brand)}
                            sx={{
                                height: '100%',
                                minHeight: { xs: '160px', sm: '300px', md: '350px' },
                                background: '#fff',
                                borderRadius: { xs: 1, md: 2 },
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid rgba(183, 149, 11, 0.1)',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                p: { xs: 1.5, sm: 3 }
                            }}>
                                <CardMedia
                                    component="img"
                                    image={brand.image}
                                    alt={brand.title}
                                    sx={{
                                        width: '100%',
                                        height: { xs: '40px', sm: '100px', md: '160px' },
                                        objectFit: 'contain',
                                        p: { xs: 1, sm: 3 },
                                        mb: { xs: 1, sm: 2 }
                                    }}
                                />
                                <Box sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    gap: { xs: 1, sm: 2 }
                                }}>
                                    <Typography 
                                        variant="h5" 
                                        sx={{ 
                                            fontWeight: 600,
                                            background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontSize: { xs: '0.75rem', sm: '1.2rem', md: '1.4rem' },
                                            textAlign: 'center',
                                            mb: { xs: 0.5, sm: 1 }
                                        }}
                                    >
                                        {brand.title}
                                    </Typography>
                                    {!isMobile && (
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                color: '#666',
                                                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                                                textAlign: 'center',
                                                maxWidth: '90%'
                                            }}
                                        >
                                            {brand.description}
                                        </Typography>
                                    )}
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClick(brand.brand);
                                        }}
                                        sx={{
                                            backgroundColor: '#b7950b',
                                            color: 'white',
                                            borderRadius: { xs: 0.5, sm: 1 },
                                            padding: { xs: '3px 12px', sm: '6px 20px' },
                                            fontSize: { xs: '0.65rem', sm: '0.875rem' },
                                            textTransform: 'uppercase',
                                            fontWeight: 600,
                                            minWidth: 'unset',
                                            whiteSpace: 'nowrap',
                                            '&:hover': {
                                                backgroundColor: '#8B7355'
                                            }
                                        }}
                                    >
                                        Shop Now
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PopularWearablesAd; 