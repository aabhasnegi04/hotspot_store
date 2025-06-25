import React from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';

const PopularAccessoriesAd = () => {
    const accessoryTypes = [
        { title: 'Premium Cases', description: 'Stylish Protection' },
        { title: 'Power Banks', description: 'Stay Charged' },
        { title: 'Wireless Earbuds', description: 'Crystal Clear Audio' },
        { title: 'Screen Guards', description: 'Ultimate Protection' },
        { title: 'Car Chargers', description: 'On-the-go Power' },
        { title: 'Phone Holders', description: 'Perfect Grip' }
    ];

    return (
        <Box sx={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            overflow: 'hidden'
        }}>
            <Grid container spacing={1}>
                {accessoryTypes.map((item, index) => (
                    <Grid 
                        item 
                        xs={6} 
                        sm={index < 2 ? 6 : 6} 
                        md={index < 2 ? 6 : 3} 
                        key={index}
                    >
                        <Card sx={{ 
                            height: { xs: 120, sm: 200, md: 250 },
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 215, 0, 0.1)'
                        }}>
                            <Typography 
                                variant={index < 2 ? 'h6' : 'subtitle1'} 
                                sx={{
                                    background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 1,
                                    fontSize: index < 2 ? { xs: '1rem', sm: '1.2rem', md: '1.5rem' } : { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
                                    textAlign: 'center'
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Typography 
                                variant={index < 2 ? 'subtitle2' : 'body2'} 
                                sx={{ 
                                    color: '#666', 
                                    fontSize: index < 2 ? { xs: '0.8rem', sm: '1rem' } : { xs: '0.7rem', sm: '0.9rem' },
                                    textAlign: 'center' 
                                }}
                            >
                                {item.description}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PopularAccessoriesAd; 