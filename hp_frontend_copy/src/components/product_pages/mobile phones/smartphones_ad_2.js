import React from 'react';
import { Grid, Card, Box, useTheme, useMediaQuery } from '@mui/material';

const SmartphonesAd2 = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box sx={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5
        }}>
            {/* Main Ad */}
            <Card sx={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '0',
                display: 'block',
                border: '1px solid rgba(255, 215, 0, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'none',
                p: 0
            }}>
                <Box
                    component="img"
                    src="/Image/banner/handset_banner/hsbanner3_8806095296241.jpg"
                    alt="Samsung S24 Ultra Banner"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block',
                        m: 0
                    }}
                />
            </Card>

            {/* Secondary Ads Container */}
            {isMobile ? (
                <Box sx={{
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1.5,
                    mt: 1,
                    mb: 1,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    position: 'relative',
                }}>
                    {[
                        {
                            src: "/Image/banner/handset_banner/hsbanner1_8806095701950.jpg",
                            alt: "Galaxy Buds3 Pro"
                        },
                        {
                            src: "/Image/banner/handset_banner/hsbanner2_8806095743592.jpg",
                            alt: "Galaxy S24 FE"
                        }
                    ].map((ad, index) => (
                        <Card
                            key={index}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.8)',
                                borderRadius: '0',
                                display: 'block',
                                border: '1px solid rgba(255, 215, 0, 0.1)',
                                overflow: 'hidden',
                                position: 'relative',
                                flex: 1,
                                boxShadow: 'none',
                                p: 0,
                                width: '50%',
                                minWidth: 0
                            }}
                        >
                            <Box
                                component="img"
                                src={ad.src}
                                alt={ad.alt}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                    display: 'block',
                                    m: 0
                                }}
                            />
                        </Card>
                    ))}
                </Box>
            ) : (
                <Grid container spacing={2} alignItems="stretch" sx={{ width: '100%', m: 0, mt: 1, mb: 1 }}>
                    {[
                        {
                            src: "/Image/banner/handset_banner/hsbanner1_8806095701950.jpg",
                            alt: "Galaxy Buds3 Pro"
                        },
                        {
                            src: "/Image/banner/handset_banner/hsbanner2_8806095743592.jpg",
                            alt: "Galaxy S24 FE"
                        }
                    ].map((ad, index) => (
                        <Grid item xs={6} md={6} key={index} sx={{ display: 'flex' }}>
                            <Card
                                sx={{
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    borderRadius: '0',
                                    display: 'block',
                                    border: '1px solid rgba(255, 215, 0, 0.1)',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    flex: 1,
                                    boxShadow: 'none',
                                    p: 0
                                }}
                            >
                                <Box
                                    component="img"
                                    src={ad.src}
                                    alt={ad.alt}
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                        objectPosition: 'center',
                                        display: 'block',
                                        m: 0
                                    }}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Full Width Ad */}
            <Card sx={{
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '0',
                display: 'block',
                border: '1px solid rgba(255, 215, 0, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'none',
                p: 0
            }}>
                <Box
                    component="img"
                    src="/Image/banner/handset_banner/xiomi 14 Web Banner 1920x500 Px.jpg"
                    alt="Xiaomi 14 Banner"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block',
                        m: 0
                    }}
                />
            </Card>
        </Box>
    );
};

export default SmartphonesAd2;
