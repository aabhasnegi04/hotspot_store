import React from 'react';
import { Box, Grid, Card, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChooseYourTypeSmartphone = () => {
    const navigate = useNavigate();

    const phoneTypes = [
        {
            image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
            path: '/smartphones/iphone'
        },
        {
            image: 'https://images.vexels.com/media/users/3/139556/isolated/preview/1718a076e29822051df8bcf8b5ce1124-android-logo.png',
            path: '/smartphones/android'
        },
        {
            image: 'https://static.thenounproject.com/png/3376213-200.png',
            path: '/featured-phones'
        }
    ];

    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{
                mb: 3,
                fontWeight: 600,
                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                pl: 2,
            }}>
                Choose your type of smartphone
            </Typography>

            <Grid container spacing={3}>
                {phoneTypes.map((type, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card 
                            onClick={() => navigate(type.path)}
                            sx={{
                                height: 200,
                                maxWidth: '80%',
                                margin: '0 auto',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                borderRadius: '20px',
                                display: 'flex',
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
                                    borderRadius: '20px',
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
                                alt="Phone type"
                                className="card-media"
                                sx={{
                                    width: type.image.includes('Apple_logo') ? '65%' : '90%',
                                    height: type.image.includes('Apple_logo') ? '65%' : '90%',
                                    objectFit: 'contain',
                                    padding: type.image.includes('Apple_logo') ? '20px' : '15px',
                                    transition: 'transform 0.4s ease',
                                    filter: type.image.includes('Apple_logo') ? 'none' : 'drop-shadow(0 4px 8px rgba(183, 149, 11, 0.2))',
                                    zIndex: 1,
                                    opacity: type.image.includes('Apple_logo') ? 1 : 1
                                }}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ChooseYourTypeSmartphone;
