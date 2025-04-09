import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const FeaturedProducts = () => {
    const featuredBanners = [
        // Top row images
        {
            id: 1,
            title: "Redmi & Motorola",
            image: "https://i.ytimg.com/vi/MxjgTaRrq_U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDs45xZIQcMGDB80Cr-bf8o5m2nuw",
            link: "#",
            gridConfig: { xs: 12, sm: 6 },
            height: "400px"
        },
        {
            id: 2,
            title: "Samsung & Apple",
            image: "https://www.digitaltrends.com/wp-content/uploads/2025/01/Samsung-Galaxy-S25-Ultra-vs-iPhone-16-Pro-Max.jpg?resize=1200%2C720&p=1",
            link: "#",
            gridConfig: { xs: 12, sm: 6 },
            height: "400px"
        },
        // Middle banner
        {
            id: 3,
            title: "Holi Special",
            image: "https://www.shutterstock.com/image-vector/vector-illustration-holi-banner-sale-260nw-1915157344.jpg",
            link: "#",
            gridConfig: { xs: 12 },
            height: "500px"
        },
        // Bottom row images
        {
            id: 4,
            title: "Special sale",
            image: "https://images.xtracover.com/Mobil1622_ALDU_1735363766.PNG",
            link: "#",
            gridConfig: { xs: 12, sm: 6 },
            height: "400px"
        },
        {
            id: 5,
            title: "Xiaomi & OnePlus",
            image: "https://assets.mspimages.in/gear/wp-content/uploads/2024/12/OnePlus-Community-Sale.jpg?tr=w-725",
            link: "#",
            gridConfig: { xs: 12, sm: 6 },
            height: "400px"
        }
    ];

    return (
        <Box
            sx={{
                py: 6,
                backgroundColor: '#ffffff',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }
            }}
        >
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
                <Typography
                    variant="h4"
                    sx={{
                        mb: 4,
                        textAlign: 'center',
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        color: '#333333',
                        position: 'relative',
                        display: 'inline-block',
                        width: '100%',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            bottom: '-8px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60px',
                            height: '3px',
                            backgroundColor: '#ffb800',
                            borderRadius: '2px',
                        }
                    }}
                >
                    Featured Products
                </Typography>

                <Grid container spacing={3}>
                    {/* Top Row */}
                    <Grid item container spacing={3} xs={12}>
                        {featuredBanners.slice(0, 2).map((banner) => (
                            <Grid item {...banner.gridConfig} key={banner.id}>
                                <Box
                                    component="a"
                                    href={banner.link}
                                    sx={{
                                        display: 'block',
                                        position: 'relative',
                                        height: banner.height,
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s ease',
                                        border: '1px solid rgba(255, 184, 0, 0.1)',
                                        padding: '8px',
                                        background: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(255,248,235,1) 100%)',
                                        '&:hover': {
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                                            border: '1px solid rgba(255, 184, 0, 0.3)',
                                            '& .overlay': {
                                                opacity: 0.3
                                            }
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            border: '2px solid transparent',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(45deg, rgba(255,184,0,0.2), transparent 30%)',
                                            zIndex: 1,
                                            pointerEvents: 'none'
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={banner.image}
                                        alt={banner.title}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Box
                                        className="overlay"
                                        sx={{
                                            position: 'absolute',
                                            top: '8px',
                                            left: '8px',
                                            right: '8px',
                                            bottom: '8px',
                                            borderRadius: '8px',
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))',
                                            transition: 'all 0.3s ease',
                                            zIndex: 2
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: '8px',
                                            left: '8px',
                                            right: '8px',
                                            p: 3,
                                            color: '#ffffff',
                                            textAlign: 'center',
                                            zIndex: 3
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontFamily: "'Outfit', sans-serif",
                                                fontWeight: 600,
                                                fontSize: '1.5rem',
                                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                            }}
                                        >
                                            {banner.title}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Middle Banner */}
                    <Grid item xs={12}>
                        <Box
                            component="a"
                            href={featuredBanners[2].link}
                            sx={{
                                display: 'block',
                                position: 'relative',
                                height: featuredBanners[2].height,
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                transition: 'all 0.3s ease',
                                border: '1px solid rgba(255, 184, 0, 0.1)',
                                padding: '8px',
                                background: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(255,248,235,1) 100%)',
                                '&:hover': {
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                                    border: '1px solid rgba(255, 184, 0, 0.3)'
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    border: '2px solid transparent',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(45deg, rgba(255,184,0,0.2), transparent 30%)',
                                    zIndex: 1,
                                    pointerEvents: 'none'
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={featuredBanners[2].image}
                                alt={featuredBanners[2].title}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                    borderRadius: '8px'
                                }}
                            />
                            <Box
                                className="overlay"
                                sx={{
                                    position: 'absolute',
                                    top: '8px',
                                    left: '8px',
                                    right: '8px',
                                    bottom: '8px',
                                    borderRadius: '8px',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))',
                                    transition: 'all 0.3s ease',
                                    zIndex: 2
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: '8px',
                                    left: '8px',
                                    right: '8px',
                                    p: 3,
                                    color: '#ffffff',
                                    textAlign: 'center',
                                    zIndex: 3
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 700,
                                        fontSize: '2rem',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    {featuredBanners[2].title}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Bottom Row */}
                    <Grid item container spacing={3} xs={12}>
                        {featuredBanners.slice(3).map((banner) => (
                            <Grid item {...banner.gridConfig} key={banner.id}>
                                <Box
                                    component="a"
                                    href={banner.link}
                                    sx={{
                                        display: 'block',
                                        position: 'relative',
                                        height: banner.height,
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                        transition: 'all 0.3s ease',
                                        border: '1px solid rgba(255, 184, 0, 0.1)',
                                        padding: '8px',
                                        background: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(255,248,235,1) 100%)',
                                        '&:hover': {
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                                            border: '1px solid rgba(255, 184, 0, 0.3)',
                                            '& .overlay': {
                                                opacity: 0.3
                                            }
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            border: '2px solid transparent',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(45deg, rgba(255,184,0,0.2), transparent 30%)',
                                            zIndex: 1,
                                            pointerEvents: 'none'
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={banner.image}
                                        alt={banner.title}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Box
                                        className="overlay"
                                        sx={{
                                            position: 'absolute',
                                            top: '8px',
                                            left: '8px',
                                            right: '8px',
                                            bottom: '8px',
                                            borderRadius: '8px',
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))',
                                            transition: 'all 0.3s ease',
                                            zIndex: 2
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: '8px',
                                            left: '8px',
                                            right: '8px',
                                            p: 3,
                                            color: '#ffffff',
                                            textAlign: 'center',
                                            zIndex: 3
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontFamily: "'Outfit', sans-serif",
                                                fontWeight: 600,
                                                fontSize: '1.5rem',
                                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                            }}
                                        >
                                            {banner.title}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FeaturedProducts; 