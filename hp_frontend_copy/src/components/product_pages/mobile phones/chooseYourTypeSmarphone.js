import React from 'react';
import { Box, Grid, Card, Typography, CardMedia, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChooseYourTypeSmartphone = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const phoneTypes = [
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
            path: '/smartphones/iphone',
            label: 'iPhone'
        },
        {
            image: 'https://images.vexels.com/media/users/3/139556/isolated/preview/1718a076e29822051df8bcf8b5ce1124-android-logo.png',
            path: '/smartphones/android',
            label: 'Android'
        },
        {
            image: 'https://static.thenounproject.com/png/3376213-200.png',
            path: '/featured-phones',
            label: 'Featured Phones'
        }
    ];

    return (
        <Box sx={{ 
            mb: { xs: 4, sm: 6 },
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            px: { xs: 0, sm: 2 }
        }}>
            <Typography 
                variant={isMobile ? "h5" : "h4"} 
                sx={{
                    mb: { xs: 2, sm: 3 },
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    pl: { xs: 2, sm: 2 },
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    textAlign: { xs: 'left', sm: 'left' }
                }}>
                Choose your type of smartphone
            </Typography>

            <Box sx={{ 
                display: 'flex',
                flexDirection: 'row',
                gap: { xs: '10px', sm: 3 },
                justifyContent: 'space-between',
                px: { xs: '10px', sm: 2 },
                width: '100%'
            }}>
                {phoneTypes.map((type, index) => (
                    <Card 
                        key={index}
                        onClick={() => navigate(type.path)}
                        sx={{
                            height: { xs: 130, sm: 180, md: 200 },
                            flex: { xs: 1, sm: '0 0 30%' },
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                            borderRadius: { xs: '12px', sm: '20px' },
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
                            '&:before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(45deg, rgba(183, 149, 11, 0.05), rgba(255, 215, 0, 0.05))',
                                borderRadius: 'inherit',
                            },
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                border: '2px solid rgba(183, 149, 11, 0.2)',
                                boxShadow: '0 15px 30px rgba(183, 149, 11, 0.1)',
                                '& .card-media': {
                                    transform: 'scale(1.1)',
                                }
                            }
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={type.image}
                            alt={type.label}
                            className="card-media"
                            sx={{
                                width: type.image.includes('Apple_logo') ? '50%' : '70%',
                                height: type.image.includes('Apple_logo') ? '50%' : '70%',
                                objectFit: 'contain',
                                padding: { 
                                    xs: type.image.includes('Apple_logo') ? '10px' : '8px',
                                    sm: type.image.includes('Apple_logo') ? '20px' : '15px'
                                },
                                transition: 'transform 0.4s ease',
                                filter: type.image.includes('Apple_logo') ? 'none' : 'drop-shadow(0 4px 8px rgba(183, 149, 11, 0.2))',
                                zIndex: 1,
                                opacity: type.image.includes('Apple_logo') ? 1 : 1
                            }}
                        />
                        <Typography
                            variant="subtitle1"
                            sx={{
                                mt: { xs: 0.5, sm: 2 },
                                color: '#b7950b',
                                fontWeight: 600,
                                fontSize: { xs: '0.8rem', sm: '1rem' },
                                textAlign: 'center',
                                zIndex: 1,
                                px: 0.5
                            }}
                        >
                            {type.label}
                        </Typography>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default ChooseYourTypeSmartphone;
