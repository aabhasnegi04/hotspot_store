import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const styles = {
    mainBox: {
        py: 6,
        backgroundColor: '#ffffff',
        position: 'relative',
        width: '100vw',
        px: { xs: 0, sm: 0 },
        '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
            pointerEvents: 'none'
        }
    },
    container: {
        px: { xs: 0, sm: 4, md: 6 },
        width: '100%',
        mx: 'auto'
    },
    title: {
        mb: 4,
        textAlign: 'center',
        fontWeight: 700,
        color: '#333333',
        fontFamily: "'Outfit', sans-serif",
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80px',
            height: '3px',
            backgroundColor: '#ffb800',
            borderRadius: '2px',
        }
    },
    adCard: {
        position: 'relative',
        height: { xs: '200px', sm: '400px' },
        overflow: 'hidden',
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            '& .ad-image': { transform: 'scale(1.05)' },
            '& .ad-overlay': { backgroundColor: 'rgba(0,0,0,0.2)' }
        }
    },
    adImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease',
    },
    overlay: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 3,
        textAlign: 'center',
    },
    adTitle: {
        color: '#ffffff',
        fontWeight: 700,
        mb: 1,
        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        fontFamily: "'Outfit', sans-serif",
    },
    adSubtitle: {
        color: '#ffffff',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
    }
};

const ads = [
    {
        id: 1,
        title: "Summer Sale",
        subtitle: "Up to 40% off on Electronics",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        link: "/summer-sale",
    },
    {
        id: 2,
        title: "New Arrivals",
        subtitle: "Latest Smartphones",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        link: "/new-arrivals",
    },
    {
        id: 3,
        title: "Premium Brands",
        subtitle: "Luxury Gadgets",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        link: "/premium",
    },
    {
        id: 4,
        title: "Special Offers",
        subtitle: "Limited Time Deals",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        link: "/offers",
    }
];

const AdBanner = () => (
    <Box sx={styles.mainBox}>
        <Container maxWidth={false} sx={styles.container}>
            <Typography variant="h4" sx={styles.title}>
                Special Offers
            </Typography>

            <Grid container spacing={3}>
                {ads.map(ad => (
                    <Grid item xs={12} sm={6} key={ad.id}>
                        <Paper elevation={0} sx={styles.adCard}>
                            <Box
                                component="img"
                                src={ad.image}
                                alt={ad.title}
                                className="ad-image"
                                sx={styles.adImage}
                            />
                            <Box className="ad-overlay" sx={styles.overlay}>
                                <Typography variant="h5" sx={styles.adTitle}>
                                    {ad.title}
                                </Typography>
                                <Typography variant="subtitle1" sx={styles.adSubtitle}>
                                    {ad.subtitle}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

export default AdBanner; 