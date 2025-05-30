import React from 'react';
import { Box, Grid, Card, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForYourBudgetWearables = () => {
    const navigate = useNavigate();

    const handleClick = (range) => {
        // Navigate to the price range page
        navigate(`/wearables/price-range/${range}`);
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const priceRanges = [
        {
            range: '0-1000',
            image: '/Image/price range/wearables/under-1000.png',
            label: 'Under ₹1,000'
        },
        {
            range: '1000-2000',
            image: '/Image/price range/wearables/under-2000.png',
            label: 'Under ₹2,000'
        },
        {
            range: '2000-5000',
            image: '/Image/price range/wearables/under-5000.png',
            label: 'Under ₹5,000'
        },
        {
            range: '5000-10000',
            image: '/Image/price range/wearables/under-10000.png',
            label: 'Under ₹10,000'
        },
        {
            range: '10000-999999',
            image: '/Image/price range/wearables/above-10000.png',
            label: 'Above ₹10,000'
        }
    ];

    return (
        <Box sx={{ mb: 6, maxWidth: '1500px', width: '100%', mx: 'auto', px: { xs: 1, sm: 2, md: 3 } }}>
            <Typography variant="h4" sx={{
                mb: 3,
                fontWeight: 600,
                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>
                For Your Budget
            </Typography>

            <Grid container spacing={3}>
                {priceRanges.map((range, index) => (
                    <Grid item xs={12} sm={6} md={2.35} key={index}>
                        <Card 
                            onClick={() => handleClick(range.range)}
                            sx={{
                                height: 180,
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                borderRadius: '20px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
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
                                image={range.image}
                                alt={`Price range ${range.label}`}
                                sx={{
                                    width: '100%',
                                    height: '70%',
                                    objectFit: 'contain',
                                    mb: 2
                                }}
                            />
                            <Typography variant="h6" sx={{
                                color: '#b7950b',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                textAlign: 'center'
                            }}>
                                {range.label}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ForYourBudgetWearables; 