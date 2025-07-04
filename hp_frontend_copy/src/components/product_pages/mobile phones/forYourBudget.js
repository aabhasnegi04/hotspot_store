import React from 'react';
import { Box, Card, Typography, CardMedia, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForYourBudget = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            transform: 'translateX(-50%)',
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
                }}>
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
                            height: { xs: 120, sm: 200 },
                            minWidth: { xs: '180px', sm: 'auto' },
                            flex: { xs: '0 0 auto', sm: 1 },
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                            borderRadius: { xs: '12px', sm: 0 },
                            display: 'flex',
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
