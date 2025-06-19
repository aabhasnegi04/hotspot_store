import React from 'react';
import { Box, Grid, Card, Typography, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PopularWearablesAd = () => {
    const navigate = useNavigate();

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
            mb: 6,
            overflow: 'hidden'
        }}>
            <Grid 
                container 
                spacing={0}
                sx={{
                    width: '100%',
                    m: 0,
                    p: 0
                }}
            >
                {brands.map((brand, index) => (
                    <Grid 
                        item 
                        xs={12} 
                        md={4} 
                        key={index}
                        sx={{
                            px: { xs: 0, md: index === 1 ? 3 : 0 },
                            mb: { xs: 3, md: 0 }
                        }}
                    >
                        <Card 
                            onClick={() => handleClick(brand.brand)}
                            sx={{
                                height: '100%',
                                minHeight: '350px',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                borderRadius: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid rgba(183, 149, 11, 0.1)',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2
                            }}>
                                <CardMedia
                                    component="img"
                                    image={brand.image}
                                    alt={brand.title}
                                    sx={{
                                        width: '100%',
                                        height: '160px',
                                        objectFit: 'contain',
                                        p: 2,
                                        background: 'rgba(255, 255, 255, 0.7)'
                                    }}
                                />
                                <Box sx={{ 
                                    p: 3, 
                                    flexGrow: 1, 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                                }}>
                                    <Typography variant="h5" sx={{ 
                                        mb: 1,
                                        fontWeight: 600,
                                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontSize: '1.2rem'
                                    }}>
                                        {brand.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ 
                                        mb: 2,
                                        color: '#666',
                                        flexGrow: 1,
                                        fontSize: '0.9rem'
                                    }}>
                                        {brand.description}
                                    </Typography>
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
                                            borderRadius: 0,
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