import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Grid, 
    Card, 
    CardContent,
    Avatar,
    Fade
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SecurityIcon from '@mui/icons-material/Security';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const AboutPage = () => {
    const features = [
        {
            icon: <StorefrontIcon sx={{ fontSize: 40, color: '#ad1b1b' }} />,
            title: 'Wide Selection',
            description: 'Discover our extensive range of premium electronics from leading brands worldwide.'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 40, color: '#ad1b1b' }} />,
            title: 'Secure Shopping',
            description: 'Shop with confidence knowing your transactions are protected by state-of-the-art security.'
        },
        {
            icon: <LocalShippingIcon sx={{ fontSize: 40, color: '#ad1b1b' }} />,
            title: 'Fast Delivery',
            description: 'Enjoy quick and reliable delivery services across India with real-time tracking.'
        },
        {
            icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#ad1b1b' }} />,
            title: '24/7 Support',
            description: 'Our dedicated customer service team is always here to help you with any queries.'
        }
    ];

    return (
        <Fade in={true} timeout={800}>
            <Box sx={{ 
                minHeight: '100vh', 
                pt: { xs: 1, sm: '5px' },
                pb: { xs: 3, sm: 8 },
                background: 'linear-gradient(180deg, #fff9c4 0%, rgba(255, 249, 196, 0.3) 100%)'
            }}>
                <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 0 } }}>
                    {/* Hero Section with Logo */}
                    <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 8 }, mt: { xs: 2, sm: 4 } }}>
                        <Box
                            component="img"
                            src="/Hotspot Logo smart 1.png"
                            alt="Hotspot Logo"
                            sx={{
                                height: { xs: '60px', sm: '100px', md: '160px' },
                                width: 'auto',
                                mb: { xs: 3, sm: 5 },
                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}
                        />
                        <Typography 
                            variant="h5" 
                            sx={{ 
                                color: '#666',
                                maxWidth: '800px',
                                margin: '0 auto',
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { xs: '1.1rem', sm: '1.3rem' }
                            }}
                        >
                            Your trusted destination for premium electronics and cutting-edge technology
                        </Typography>
                    </Box>

                    {/* Mission Statement */}
                    <Box sx={{ 
                        textAlign: 'center', 
                        mb: { xs: 4, sm: 8 },
                        p: { xs: 2, sm: 4 },
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: { xs: 2, sm: 4 },
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 600,
                                color: '#333',
                                mb: { xs: 2, sm: 3 },
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { xs: '1.2rem', sm: '2rem' }
                            }}
                        >
                            Our Mission
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                color: '#555',
                                maxWidth: '900px',
                                margin: '0 auto',
                                lineHeight: 1.8,
                                fontFamily: "'Outfit', sans-serif"
                            }}
                        >
                            At Hotspot, we're committed to bringing you the latest and greatest in technology. 
                            Our mission is to provide high-quality electronics at competitive prices while 
                            delivering exceptional customer service. We believe in making premium technology 
                            accessible to everyone and creating a seamless shopping experience for our valued customers.
                        </Typography>
                    </Box>

                    {/* Features Grid */}
                    <Grid container spacing={{ xs: 2, sm: 4 }} sx={{ mb: { xs: 4, sm: 8 } }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card 
                                    elevation={0}
                                    sx={{ 
                                        height: '100%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-8px)'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 3 } }}>
                                        <Avatar 
                                            sx={{ 
                                                width: { xs: 56, sm: 80 }, 
                                                height: { xs: 56, sm: 80 }, 
                                                bgcolor: 'rgba(173, 27, 27, 0.1)',
                                                margin: '0 auto 16px'
                                            }}
                                        >
                                            {React.cloneElement(feature.icon, { sx: { fontSize: { xs: 28, sm: 40 }, color: '#ad1b1b' } })}
                                        </Avatar>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                mb: { xs: 1, sm: 2 },
                                                fontWeight: 600,
                                                color: '#333',
                                                fontFamily: "'Outfit', sans-serif",
                                                fontSize: { xs: '1rem', sm: '1.15rem' }
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography 
                                            variant="body2"
                                            sx={{ 
                                                color: '#666',
                                                fontFamily: "'Outfit', sans-serif",
                                                fontSize: { xs: '0.95rem', sm: '1rem' }
                                            }}
                                        >
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Contact Information */}
                    <Box sx={{ 
                        textAlign: 'center',
                        p: { xs: 2, sm: 4 },
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: { xs: 2, sm: 4 },
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 600,
                                color: '#333',
                                mb: { xs: 2, sm: 3 },
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { xs: '1.2rem', sm: '2rem' }
                            }}
                        >
                            Get in Touch
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: '#555',
                                mb: 2,
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { xs: '0.98rem', sm: '1.05rem' }
                            }}
                        >
                            Email: care@hotspotretail.in
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: '#555',
                                mb: 2,
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { xs: '0.98rem', sm: '1.05rem' }
                            }}
                        >
                            Phone: +91 7042343404
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: '#555',
                                fontFamily: "'Outfit', sans-serif",
                                fontSize: { xs: '0.98rem', sm: '1.05rem' }
                            }}
                        >
                            Address: F-14 2nd Floor, Okhla Industrial Area Phase 1,
                            New Delhi, IN 110020
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Fade>
    );
};

export default AboutPage; 