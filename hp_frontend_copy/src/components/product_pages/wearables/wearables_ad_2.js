import React from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';

const WearablesAd2 = () => {
    return (
        <Box sx={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            mb: 6,
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
                        height: 500,
                        width: '100%',
                        borderRadius: 0,
                        background: 'rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 215, 0, 0.1)',
                        overflow: 'hidden',
                        position: 'relative',
                        mb: 3
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
                                Premium Smartwatches Collection
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: '#666',
                                textAlign: 'center'
                            }}>
                                Discover Our Latest Wearables
                            </Typography>
                        </Box>
                    </Card>
                </Grid>

                {/* Secondary Ads */}
                <Grid item xs={12} md={6} sx={{ pr: { xs: 0, md: 1.5 } }}>
                    <Card sx={{ 
                        height: 400,
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 215, 0, 0.1)',
                        overflow: 'hidden',
                        position: 'relative',
                        mb: { xs: 3, md: 0 }
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
                                Fitness Trackers
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: '#666',
                                textAlign: 'center'
                            }}>
                                Track Your Health & Fitness
                            </Typography>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} sx={{ pl: { xs: 0, md: 1.5 } }}>
                    <Card sx={{ 
                        height: 400,
                        background: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255, 215, 0, 0.1)',
                        overflow: 'hidden',
                        position: 'relative',
                        mb: 3
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
                                Smart Bands
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: '#666',
                                textAlign: 'center'
                            }}>
                                Stylish & Functional
                            </Typography>
                        </Box>
                    </Card>
                </Grid>

                {/* Full Width Ad */}
                <Grid item xs={12}>
                    <Card sx={{ 
                        height: 500,
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
                                Smart Rings
                            </Typography>
                            <Typography variant="body1" sx={{ 
                                color: '#666',
                                textAlign: 'center'
                            }}>
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
