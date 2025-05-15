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
                pt: '5px',
                pb: 8,
                background: 'linear-gradient(180deg, #fff9c4 0%, rgba(255, 249, 196, 0.3) 100%)'
            }}>
                <Container maxWidth="lg">
                    {/* Hero Section with Logo */}
                    <Box sx={{ textAlign: 'center', mb: 8, mt: 4 }}>
                        <Box
                            component="img"
                            src="/Hotspot Logo smart 1.png"
                            alt="Hotspot Logo"
                            sx={{
                                height: { xs: '80px', sm: '120px', md: '160px' },
                                width: 'auto',
                                mb: 5,
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
                                fontFamily: "'Outfit', sans-serif"
                            }}
                        >
                            Your trusted destination for premium electronics and cutting-edge technology
                        </Typography>
                    </Box>

                    {/* Mission Statement */}
                    <Box sx={{ 
                        textAlign: 'center', 
                        mb: 8,
                        p: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: 4,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 600,
                                color: '#333',
                                mb: 3,
                                fontFamily: "'Outfit', sans-serif"
                            }}
                        >
                            Our Mission
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontSize: '1.1rem',
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
                    <Grid container spacing={4} sx={{ mb: 8 }}>
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
                                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                        <Avatar 
                                            sx={{ 
                                                width: 80, 
                                                height: 80, 
                                                bgcolor: 'rgba(173, 27, 27, 0.1)',
                                                margin: '0 auto 16px'
                                            }}
                                        >
                                            {feature.icon}
                                        </Avatar>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                mb: 2,
                                                fontWeight: 600,
                                                color: '#333',
                                                fontFamily: "'Outfit', sans-serif"
                                            }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography 
                                            variant="body2"
                                            sx={{ 
                                                color: '#666',
                                                fontFamily: "'Outfit', sans-serif"
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
                        p: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: 4,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                fontWeight: 600,
                                color: '#333',
                                mb: 3,
                                fontFamily: "'Outfit', sans-serif"
                            }}
                        >
                            Get in Touch
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: '#555',
                                mb: 2,
                                fontFamily: "'Outfit', sans-serif"
                            }}
                        >
                            Email: care@hotspotretail.in
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: '#555',
                                mb: 2,
                                fontFamily: "'Outfit', sans-serif"
                            }}
                        >
                            Phone: +91 7042343404
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                color: '#555',
                                fontFamily: "'Outfit', sans-serif"
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