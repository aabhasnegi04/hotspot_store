import React from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';

const SmartphonesAd2 = () => {
    return (
        <Grid container spacing={3} sx={{ mb: 6 }}>
            {/* Main Ad */}
            <Grid item xs={12}>
                <Card sx={{ 
                    height: 500,
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 215, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                        transform: 'translateY(-5px)'
                    }
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 3,
                        background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                    }}>
                        <Typography variant="h5" sx={{
                            background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textAlign: 'center',
                            mb: 2
                        }}>
                            Best Selling phones ad #1
                        </Typography>
                        <Typography variant="body1" sx={{ 
                            color: '#666',
                            textAlign: 'center'
                        }}>
                            Advertisement Space
                        </Typography>
                    </Box>
                </Card>
            </Grid>

            {/* Secondary Ads */}
            {[2, 3].map((num) => (
                <Grid item xs={12} md={6} key={num}>
                    <Card sx={{ 
                        height: 400,
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 215, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        overflow: 'hidden',
                        position: 'relative',
                        '&:hover': {
                            transform: 'translateY(-5px)'
                        }
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 3,
                            background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                        }}>
                            <Typography variant="h6" sx={{
                                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textAlign: 'center',
                                mb: 2
                            }}>
                                Advertisement #{num}
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: '#666',
                                textAlign: 'center'
                            }}>
                                Ad Space {num}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            ))}

            {/* Full Width Ad */}
            <Grid item xs={12}>
                <Card sx={{ 
                    height: 500,
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 215, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                        transform: 'translateY(-5px)'
                    }
                }}>
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 3,
                        background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                    }}>
                        <Typography variant="h5" sx={{
                            background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textAlign: 'center',
                            mb: 2
                        }}>
                            Advertisement #4
                        </Typography>
                        <Typography variant="body1" sx={{ 
                            color: '#666',
                            textAlign: 'center'
                        }}>
                            Wide Advertisement Space
                        </Typography>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

export default SmartphonesAd2;
