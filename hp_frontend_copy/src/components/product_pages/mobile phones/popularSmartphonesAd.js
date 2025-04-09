import React from 'react';
import { Grid, Card, Typography } from '@mui/material';

const PopularSmartphonesAd = () => {
    return (
        <>
            {/* First row - 2 large ads */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {[1, 2].map((num) => (
                    <Grid item xs={12} sm={6} key={num}>
                        <Card sx={{ 
                            height: 300,
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 215, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}>
                            <Typography variant="h6" sx={{
                                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Ad {num}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Second row - 4 smaller ads */}
            <Grid container spacing={3}>
                {[3, 4, 5, 6].map((num) => (
                    <Grid item xs={12} sm={6} md={3} key={num}>
                        <Card sx={{ 
                            height: 250,
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 215, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-5px)'
                            }
                        }}>
                            <Typography variant="h6" sx={{
                                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Ad {num}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default PopularSmartphonesAd;
