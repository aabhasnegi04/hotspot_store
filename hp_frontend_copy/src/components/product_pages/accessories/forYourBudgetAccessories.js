import React from 'react';
import { Box, Card, Typography, CardMedia, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForYourBudgetAccessories = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            <Typography 
                variant={isMobile ? "h5" : "h4"}
                sx={{
                    mb: { xs: 2, sm: 3 },
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    pl: 2,
                    fontSize: { xs: '1.5rem', sm: '2rem' }
                }}
            >
                For Your Budget
            </Typography>

            <Box sx={{ 
                display: 'flex',
                gap: { xs: '10px', sm: 3 },
                width: '100%',
                overflowX: { xs: 'auto', sm: 'visible' },
                px: { xs: '10px', sm: 2 },
                pb: { xs: 1, sm: 0 },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
            }}>
                {priceRanges.map((range, index) => (
                    <Card 
                        key={index}
                        onClick={() => handleClick(range.range)}
                        sx={{
                            height: { xs: 120, sm: 180 },
                            minWidth: { xs: '180px', sm: 'auto' },
                            flex: { xs: '0 0 auto', sm: 1 },
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                            borderRadius: { xs: '12px', sm: 0 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(183, 149, 11, 0.1)',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: { xs: 'none', sm: 'translateY(-5px)' },
                                boxShadow: { xs: 'none', sm: '0 8px 16px rgba(183, 149, 11, 0.1)' }
                            }
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
                            p: { xs: 1, sm: 2 }
                        }}>
                            <CardMedia
                                component="img"
                                image={range.image}
                                alt={`Price range ${range.label}`}
                                sx={{
                                    width: '100%',
                                    height: { xs: '60%', sm: '70%' },
                                    objectFit: 'contain',
                                    mb: { xs: 1, sm: 2 }
                                }}
                            />
                            <Typography 
                                variant="h6" 
                                sx={{
                                    color: '#b7950b',
                                    fontWeight: 600,
                                    fontSize: { xs: '0.9rem', sm: '1.1rem' },
                                    textAlign: 'center',
                                    background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {range.label}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ForYourBudgetAccessories; 