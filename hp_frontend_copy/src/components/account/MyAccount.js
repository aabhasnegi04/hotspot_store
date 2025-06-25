import React from 'react';
import { 
    Container, 
    Paper, 
    Grid, 
    Typography, 
    Card, 
    CardContent, 
    Box 
} from '@mui/material';
import { 
    Person as PersonIcon,
    LocationOn as LocationIcon,
    ShoppingBag as ShoppingBagIcon,
    Favorite as FavoriteIcon,
    Payment as PaymentIcon,
    Security as SecurityIcon,
    Notifications as NotificationsIcon,
    Help as HelpIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    const accountOptions = [
        {
            title: 'My Profile',
            icon: <PersonIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
            description: 'Manage your personal information',
            path: '/profile'
        },
        {
            title: 'My Addresses',
            icon: <LocationIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
            description: 'Manage your delivery addresses',
            path: '/addresses'
        },
        {
            title: 'My Orders',
            icon: <ShoppingBagIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
            description: 'Track and manage your orders',
            path: '/orders'
        },
        {
            title: 'My Wishlist',
            icon: <FavoriteIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
            description: 'View your saved items',
            path: '/wishlist'
        },
        {
            title: 'Payment Methods',
            icon: <PaymentIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
            description: 'Manage your payment options',
            path: '/payments'
        },
        {
            title: 'Security',
            icon: <SecurityIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
            description: 'Update password and security settings',
            path: '/security'
        },
        {
            title: 'Notifications',
            icon: <NotificationsIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
            description: 'Manage your notifications',
            path: '/notifications'
        },
        {
            title: 'Help & Support',
            icon: <HelpIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
            description: 'Get help with your account',
            path: '/contact'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ 
            mt: { xs: 1, sm: 2, md: 4 },
            mb: { xs: 4, sm: 6, md: 8 },
            px: { xs: 1, sm: 2, md: 0 },
            position: 'relative',
            zIndex: 0
        }}>
            {/* Welcome Section */}
            <Paper 
                elevation={0}
                sx={{
                    p: { xs: 1.5, sm: 2.5, md: 3 },
                    mb: { xs: 1, sm: 1.5 },
                    borderRadius: { xs: '14px', sm: '20px' },
                    background: 'linear-gradient(145deg, #FFD700 0%, #FFA500 100%)',
                    color: '#000000',
                    boxShadow: '0 4px 20px rgba(255, 184, 0, 0.15)'
                }}
            >
                <Typography variant="h4" sx={{ 
                    fontWeight: 600,
                    fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.25rem' }
                }}>
                    Welcome, {userData.name}!
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.8, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                    Manage your account settings and preferences
                </Typography>
            </Paper>

            {/* Options Grid */}
            <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                {accountOptions.map((option) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={option.title}>
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: { xs: '10px', sm: '16px' },
                                cursor: 'pointer',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                },
                                boxShadow: { xs: '0 2px 8px rgba(0,0,0,0.06)', sm: '0 4px 16px rgba(0,0,0,0.10)' }
                            }}
                            onClick={() => navigate(option.path)}
                        >
                            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    p: 0
                                }}>
                                    {React.cloneElement(option.icon, { sx: { fontSize: { xs: 32, sm: 40 }, color: '#FFD700' } })}
                                    <Typography variant="h6" sx={{ mt: { xs: 1.2, sm: 2 }, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.15rem' } }}>
                                        {option.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: { xs: 0.7, sm: 1 }, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                                        {option.description}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MyAccount; 