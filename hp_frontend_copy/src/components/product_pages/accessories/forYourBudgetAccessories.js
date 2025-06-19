import React from 'react';
import { Box, Grid, Card, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForYourBudgetAccessories = () => {
    const navigate = useNavigate();

    const handleClick = (range) => {
        // Navigate to the price range page
        navigate(`/accessories/price-range/${range}`);
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const priceRanges = [
        {
            range: '0-1000',
            image: '/Image/price range/accessories/under-1000.png',
            label: 'Under ₹1,000'
        },
        {
            range: '1000-2000',
            image: '/Image/price range/accessories/under-2000.png',
            label: 'Under ₹2,000'
        },
        {
            range: '2000-5000',
            image: '/Image/price range/accessories/under-5000.png',
            label: 'Under ₹5,000'
        },
        {
            range: '5000-10000',
            image: '/Image/price range/accessories/under-10000.png',
            label: 'Under ₹10,000'
        },
        {
            range: '10000-999999',
            image: '/Image/price range/accessories/above-10000.png',
            label: 'Above ₹10,000'
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
            <Typography variant="h4" sx={{
                mb: 3,
                fontWeight: 600,
                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                pl: { xs: 2, sm: 3 }
            }}>
                For Your Budget
            </Typography>

            <Grid container spacing={0} sx={{ width: '100%' }}>
                {priceRanges.map((range, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={index} sx={{
                        pl: { 
                            xs: 0,
                            md: index === 0 ? 0 : 1.5
                        },
                        pr: {
                            xs: 0,
                            md: index === priceRanges.length - 1 ? 0 : 1.5
                        },
                        mb: { 
                            xs: 3,
                            md: 0
                        }
                    }}>
                        <Card 
                            onClick={() => handleClick(range.range)}
                            sx={{
                                height: 200,
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                borderRadius: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(183, 149, 11, 0.1)',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: 'none'
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
                                fontSize: { xs: '1rem', sm: '1.1rem' },
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

export default ForYourBudgetAccessories; 