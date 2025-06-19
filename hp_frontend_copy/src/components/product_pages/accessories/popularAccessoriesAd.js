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
            {/* First row - 2 large ads */}
            <Grid container spacing={0} sx={{ mb: 3 }}>
                {accessoryTypes.slice(0, 2).map((item, index) => (
                    <Grid item xs={12} sm={6} key={index} sx={{
                        pl: { 
                            xs: 0,
                            sm: index === 0 ? 0 : 1.5
                        },
                        pr: {
                            xs: 0,
                            sm: index === 0 ? 1.5 : 0
                        },
                        mb: { xs: 3, sm: 0 }
                    }}>
                        <Card sx={{ 
                            height: 300,
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 215, 0, 0.1)'
                        }}>
                            <Typography variant="h5" sx={{
                                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}>
                                {item.title}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: '#666' }}>
                                {item.description}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Second row - 4 smaller ads */}
            <Grid container spacing={0}>
                {accessoryTypes.slice(2).map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index} sx={{
                        pl: { 
                            xs: 0,
                            md: index === 0 ? 0 : 1.5
                        },
                        pr: {
                            xs: 0,
                            md: index === 3 ? 0 : 1.5
                        },
                        mb: { 
                            xs: index !== 5 ? 3 : 0,
                            sm: index >= 4 ? 0 : 3,
                            md: 0
                        }
                    }}>
                        <Card sx={{ 
                            height: 250,
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 215, 0, 0.1)'
                        }}>
                            <Typography variant="h6" sx={{
                                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2
                            }}>
                                {item.title}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: '#666' }}>
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