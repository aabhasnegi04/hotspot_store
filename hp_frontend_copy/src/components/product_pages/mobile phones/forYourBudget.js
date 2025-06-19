import React from 'react';
import { Box, Grid, Card, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForYourBudget = () => {
    const navigate = useNavigate();

    const handleClick = (range) => {
        // Navigate to the price range page
        navigate(`/price-range/${range}`);
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const priceRanges = [
        {
            range: '0-15000',
            image: '/Image/price range/under 15,000.png'
        },
        {
            range: '15000-20000',
            image: '/Image/price range/under 20,000.png'
        },
        {
            range: '20000-30000',
            image: '/Image/price range/under 30,000.png'
        },
        {
            range: '30000-50000',
            image: '/Image/price range/under 50,000.png'
        },
        {
            range: '50000-999999',
            image: '/Image/price range/above 50,000.png'
        }
    ];

    return (
        <Box sx={{ 
            mb: 6,
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)'
        }}>
            <Typography variant="h4" sx={{
                mb: 3,
                fontWeight: 600,
                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                pl: 2,
            }}>
                For Your Budget
            </Typography>

            <Box sx={{ 
                display: 'flex',
                gap: 3,
                width: '100%'
            }}>
                {priceRanges.map((range, index) => (
                    <Card 
                        key={index}
                        onClick={() => handleClick(range.range)}
                        sx={{
                            height: 200,
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                            borderRadius: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(183, 149, 11, 0.1)',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            flex: 1
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={range.image}
                            alt={`Price range ${range.range}`}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ForYourBudget;
