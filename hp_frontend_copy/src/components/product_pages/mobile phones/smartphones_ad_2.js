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
                    <Box
                        component="img"
                        src="/Image/banner/handset_banner/S24 Ultra Web Banner 1920x500 Px.jpg"
                        alt="Samsung S24 Ultra Banner"
                        sx={{
                            width: '130%',
                            height: '110%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                            display: 'block'
                        }}
                    />
                </Card>
            </Grid>

            {/* Secondary Ads */}
            {[
                {
                    src: "/Image/banner/handset_banner/Galaxy Buds3 Pro 900x400 px.jpg",
                    alt: "Galaxy Buds3 Pro"
                },
                {
                    src: "/Image/banner/handset_banner/Galaxy S24 FE 900x400 Px.jpg",
                    alt: "Galaxy S24 FE"
                }
            ].map((ad, index) => (
                <Grid item xs={12} md={6} key={index}>
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
                        <Box
                            component="img"
                            src={ad.src}
                            alt={ad.alt}
                            sx={{
                                width: '125%',
                                height: '125%',
                                objectFit: 'contain',
                                objectPosition: 'center',
                                display: 'block',
                                transform: 'translateX(4%)'
                            }}
                        />
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
                    <Box
                        component="img"
                        src="/Image/banner/handset_banner/xiomi 14 Web Banner 1920x500 Px.jpg"
                        alt="Xiaomi 14 Banner"
                        sx={{
                            width: '130%',
                            height: '130%',
                            objectFit: 'contain',
                            objectPosition: 'center',
                            display: 'block',
                            transform: 'translateX(10%)'
                        }}
                    />
                </Card>
            </Grid>
        </Grid>
    );
};

export default SmartphonesAd2;
