import React from 'react';
import { Box, Grid, Card, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChooseYourTypeWearable = () => {
    const navigate = useNavigate();

    const handleClick = (type) => {
        // Navigate to the type page
        navigate(`/wearables/type/${type}`);
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const types = [
        {
            type: 'smartwatch',
            image: '/Image/wearables/smartwatch.png',
            label: 'Smart Watches'
        },
        {
            type: 'fitness-band',
            image: '/Image/wearables/fitness-band.png',
            label: 'Fitness Bands'
        },
        {
            type: 'headphones',
            image: '/Image/wearables/headphones.png',
            label: 'Headphones'
        },
        {
            type: 'earbuds',
            image: '/Image/wearables/earbuds.png',
            label: 'Earbuds'
        },
        {
            type: 'vr-headset',
            image: '/Image/wearables/vr-headset.png',
            label: 'VR Headsets'
        }
    ];

    return (
        <Box sx={{ mb: 6 }}>
            <Grid container spacing={3} sx={{ px: 2 }}>
                {types.map((type, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={index}>
                        <Card 
                            onClick={() => handleClick(type.type)}
                            sx={{
                                height: 200,
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
                                image={type.image}
                                alt={`Wearable type ${type.label}`}
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
                                {type.label}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ChooseYourTypeWearable; 