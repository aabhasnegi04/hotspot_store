import React from 'react';
import { Box, Grid, Card, Typography, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PopularWearablesAd = () => {
    const navigate = useNavigate();

    const handleClick = (brand) => {
        // Navigate to the brand page
        navigate(`/wearables/brand/${brand}`);
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
        <Box sx={{ mb: 4, maxWidth: '97%', mx: 'auto' }}>
            <Grid container spacing={2}>
                {brands.map((brand, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card 
                            onClick={() => handleClick(brand.brand)}
                            sx={{
                                height: '100%',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                borderRadius: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                border: '2px solid rgba(183, 149, 11, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.4s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 10px 20px rgba(183, 149, 11, 0.05)',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    border: '2px solid rgba(183, 149, 11, 0.2)',
                                    boxShadow: '0 15px 30px rgba(183, 149, 11, 0.1)'
                                }
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={brand.image}
                                alt={brand.title}
                                sx={{
                                    width: '100%',
                                    height: '160px',
                                    objectFit: 'contain',
                                    p: 2
                                }}
                            />
                            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" sx={{ 
                                    mb: 1,
                                    fontWeight: 600,
                                    color: '#b7950b',
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
                                    sx={{
                                        backgroundColor: '#b7950b',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#8B7355'
                                        }
                                    }}
                                >
                                    Shop Now
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PopularWearablesAd; 