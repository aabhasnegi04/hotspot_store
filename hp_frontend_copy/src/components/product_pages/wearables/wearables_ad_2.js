import React from 'react';
import { Box, Grid, Card, Typography, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WearablesAd2 = () => {
    const navigate = useNavigate();

    const handleClick = (category) => {
        // Navigate to the category page
        navigate(`/wearables/category/${category}`);
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const categories = [
        {
            category: 'fitness',
            image: '/Image/wearables/fitness.png',
            title: 'Fitness & Health',
            description: 'Track your fitness goals with our advanced wearables'
        },
        {
            category: 'audio',
            image: '/Image/wearables/audio.png',
            title: 'Audio Experience',
            description: 'Immerse yourself in premium sound quality'
        },
        {
            category: 'gaming',
            image: '/Image/wearables/gaming.png',
            title: 'Gaming Gear',
            description: 'Enhance your gaming experience with our wearables'
        }
    ];

    return (
        <Box sx={{ mb: 6 }}>
            <Grid container spacing={3}>
                {categories.map((category, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card 
                            onClick={() => handleClick(category.category)}
                            sx={{
                                height: '100%',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                borderRadius: '20px',
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
                                image={category.image}
                                alt={category.title}
                                sx={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover'
                                }}
                            />
                            <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h5" sx={{ 
                                    mb: 2,
                                    fontWeight: 600,
                                    color: '#b7950b'
                                }}>
                                    {category.title}
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                    mb: 3,
                                    color: '#666',
                                    flexGrow: 1
                                }}>
                                    {category.description}
                                </Typography>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#b7950b',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#8B7355'
                                        }
                                    }}
                                >
                                    Explore Now
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default WearablesAd2; 