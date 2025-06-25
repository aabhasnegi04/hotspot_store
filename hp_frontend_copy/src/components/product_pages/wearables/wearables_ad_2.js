import React from 'react';
import { Grid, Card, Typography, Box, useTheme, useMediaQuery } from '@mui/material';

const WearablesAd2 = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            mb: { xs: 3, sm: 6 },
            overflow: 'hidden'
        }}>
            <Grid 
                container 
                spacing={0}
                sx={{
                    width: '100%'
                }}
            >
                {/* Main Ad */}
                <Grid item xs={12}>
                    <Card sx={{ 
                        height: { xs: 180, sm: 300, md: 500 },
                        width: '100%',
                        borderRadius: 0,
                        background: 'rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 215, 0, 0.1)',
                        overflow: 'hidden',
                        position: 'relative',
                        mb: { xs: 1, sm: 3 }
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
                            padding: { xs: 2, sm: 3 },
                            background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                        }}>
                            <Typography 
                                variant={isMobile ? "h6" : "h5"} 
                                sx={{
                                    background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textAlign: 'center',
                                    mb: { xs: 1, sm: 2 },
                                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }
                                }}
                            >
                                Premium Smartwatches Collection
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: '#666',
                                    textAlign: 'center',
                                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                                }}
                            >
                                Discover Our Latest Wearables
                            </Typography>
                        </Box>
                    </Card>
                </Grid>

                {/* Secondary Ads */}
                <Grid container item spacing={1} sx={{ mb: { xs: 1, sm: 3 } }}>
                    <Grid item xs={6} md={6}>
                        <Card sx={{ 
                            height: { xs: 120, sm: 250, md: 400 },
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 215, 0, 0.1)',
                            overflow: 'hidden',
                            position: 'relative'
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
                                padding: { xs: 1.5, sm: 3 },
                                background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                            }}>
                                <Typography 
                                    variant={isMobile ? "subtitle1" : "h6"} 
                                    sx={{
                                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textAlign: 'center',
                                        mb: { xs: 0.5, sm: 2 },
                                        fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
                                    }}
                                >
                                    Fitness Trackers
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: '#666',
                                        textAlign: 'center',
                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Track Your Health & Fitness
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={6} md={6}>
                        <Card sx={{ 
                            height: { xs: 120, sm: 250, md: 400 },
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 215, 0, 0.1)',
                            overflow: 'hidden',
                            position: 'relative'
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
                                padding: { xs: 1.5, sm: 3 },
                                background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                            }}>
                                <Typography 
                                    variant={isMobile ? "subtitle1" : "h6"} 
                                    sx={{
                                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textAlign: 'center',
                                        mb: { xs: 0.5, sm: 2 },
                                        fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
                                    }}
                                >
                                    Smart Bands
                                </Typography>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: '#666',
                                        textAlign: 'center',
                                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                                    }}
                                >
                                    Stylish & Functional
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>

                {/* Full Width Ad */}
                <Grid item xs={12}>
                    <Card sx={{ 
                        height: { xs: 180, sm: 300, md: 500 },
                        width: '100%',
                        borderRadius: 0,
                        background: 'rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 215, 0, 0.1)',
                        overflow: 'hidden',
                        position: 'relative'
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
                            padding: { xs: 2, sm: 3 },
                            background: 'linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.7))'
                        }}>
                            <Typography 
                                variant={isMobile ? "h6" : "h5"} 
                                sx={{
                                    background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    textAlign: 'center',
                                    mb: { xs: 1, sm: 2 },
                                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' }
                                }}
                            >
                                Smart Rings
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    color: '#666',
                                    textAlign: 'center',
                                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                                }}
                            >
                                Next Generation Wearable Technology
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default WearablesAd2;
