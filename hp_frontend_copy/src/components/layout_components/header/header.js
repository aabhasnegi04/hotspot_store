import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Container, IconButton, Menu, MenuItem, Badge, useMediaQuery, useTheme, Typography, CircularProgress } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import './header.css';
import AddressSelectionModal from './AddressSelectionModal';
import SearchBar from '../../searchBar/searchbar';

const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

    const [anchorEl, setAnchorEl] = useState(null);
    const [cartCount, setCartCount] = useState(() => parseInt(localStorage.getItem('cartCount') || '0'));
    const [userName, setUserName] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const [locationDialogOpen, setLocationDialogOpen] = useState(false);

    useEffect(() => {
        // Listen for cart updates
        const handleCartUpdate = () => {
            setCartCount(parseInt(localStorage.getItem('cartCount') || '0'));
        };

        window.addEventListener('cartUpdated', handleCartUpdate);
        
        // Initial cart count
        setCartCount(parseInt(localStorage.getItem('cartCount') || '0'));

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            if (userData.name) {
                setUserName(userData.name.split(' ')[0]); // Get first name
            }
            setUserLocation(userData.location || 'New Delhi 110064');
        };
        
        checkAuth();
        
        window.addEventListener('storage', checkAuth);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLocationClick = () => {
        setLocationDialogOpen(true);
    };

    const handleLocationDialogClose = () => {
        setLocationDialogOpen(false);
        setIsLoading(false);
    };

    const detectCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9890e03df8d346d5b63c43d3ab094e64`
                    );
                    const data = await response.json();
                    
                    if (data.results && data.results.length > 0) {
                        const locationData = data.results[0].components;
                        const formattedLocation = `${locationData.city || locationData.town || locationData.suburb || ''} ${locationData.postcode || ''}`.trim();
                        
                        setUserLocation(formattedLocation);
                        
                        // Update localStorage
                        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                        userData.location = formattedLocation;
                        localStorage.setItem('userData', JSON.stringify(userData));
                        
                        handleLocationDialogClose();
                    }
                } catch (error) {
                    console.error('Error getting location:', error);
                    alert('Unable to get your location. Please try again.');
                } finally {
                    setIsLoading(false);
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                setIsLoading(false);
                alert('Unable to get your location. Please check your location permissions.');
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleLogin = () => {
        handleClose();
        navigate('/login');
    };

    const handleSignUp = () => {
        handleClose();
        navigate('/signup');
    };

    const handleProfile = () => {
        handleClose();
        navigate('/account');
    };

    const handleLogout = () => {
        handleClose();
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const handleLogoClick = () => {
        navigate('/');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Responsive styles
    const logoStyle = {
        height: { xs: '35px', sm: '40px', md: '45px' },
        mr: { xs: 2, sm: 3, md: 4 },
        mt: { xs: -1.5, sm: 0.5 },
        cursor: 'pointer'
    };

    const iconButtonStyle = {
        color: '#000000',
        width: { xs: '35px', sm: '38px', md: '40px' },
        height: { xs: '35px', sm: '38px', md: '40px' },
        borderRadius: '12px',
        mt: { xs: -1.5, sm: 0 },
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
        }
    };

    const iconStyle = {
        fontSize: { xs: '1.3rem', sm: '1.5rem' },
        transition: 'all 0.3s ease-in-out',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
    };

    const badgeStyle = {
        '& .MuiBadge-badge': {
            backgroundColor: '#FF4B4B',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
            minWidth: '18px',
            height: '18px',
            padding: '0 4px',
            boxShadow: '0 2px 4px rgba(255, 75, 75, 0.3)',
        }
    };

    const userButtonStyle = {
        color: '#000000',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mt: { xs: -1.5, sm: 0 },
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        borderRadius: '12px',
        padding: { xs: '4px 8px', sm: '6px 12px' },
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textTransform: 'none',
        '& .MuiSvgIcon-root': {
            fontSize: { xs: '1.3rem', sm: '1.5rem' }
        },
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
        }
    };

    // Update the location button style
    const locationButtonStyle = {
        color: '#000000',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        borderRadius: '12px',
        padding: '6px 12px',
        transition: 'all 0.3s ease-in-out',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
        }
    };

    // Add this menuItemStyle object to your styles
    const menuItemStyle = {
        borderRadius: '8px',
        margin: '4px 8px',
        padding: '10px 16px',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: 'rgba(255, 184, 0, 0.08)',
            transform: 'translateX(4px)',
        }
    };

    return (
        <>
            <AppBar 
                position="fixed" 
                sx={{ 
                    background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)',
                    color: '#000000',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    height: { xs: '110px', sm: '60px', md: '64px' },
                    backdropFilter: 'blur(8px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                elevation={1}
            >
                <Container maxWidth={false} sx={{ px: { xs: 1.5, sm: 3, md: 6 } }}>
                    <Toolbar 
                        disableGutters 
                        sx={{ 
                            py: { xs: 0.25, sm: 0.5 }, 
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            minHeight: { xs: '110px', sm: '60px', md: '64px' },
                            gap: { xs: 0, sm: 0 }
                        }}
                    >
                        <Box sx={{ 
                            width: '100%',
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: { xs: 0, sm: 0 },
                            mt: { xs: 2.5, sm: 0 }
                        }}>
                            <Box
                                component="img"
                                src="/Hotspot Logo smart (1) - Copy.png"
                                alt="Hotspot Logo"
                                sx={logoStyle}
                                onClick={handleLogoClick}
                            />
                            
                            {/* Desktop Search Bar */}
                            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                                <SearchBar />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5, md: 2 } }}>
                            {!isTablet && isAuthenticated && (
                                <Button 
                                    onClick={handleLocationClick}
                                    sx={locationButtonStyle}
                                    startIcon={
                                        isLoading ? (
                                            <CircularProgress size={20} thickness={4} sx={{ color: '#ffb800' }} />
                                        ) : (
                                            <LocationOnOutlinedIcon sx={iconStyle} />
                                        )
                                    }
                                    disabled={isLoading}
                                >
                                    <Box sx={{ textAlign: 'left' }}>
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                display: 'block', 
                                                color: '#000',
                                                fontSize: '0.75rem',
                                                lineHeight: 1,
                                                opacity: 0.8
                                            }}
                                        >
                                            {`Deliver to ${userName}`}
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                fontWeight: 500,
                                                color: '#000',
                                                fontSize: '0.85rem',
                                                lineHeight: 1.2
                                            }}
                                        >
                                            {userLocation}
                                        </Typography>
                                    </Box>
                                </Button>
                            )}
                            {isAuthenticated ? (
                                    <>
                                <Button
                                    onClick={handleUserClick}
                                    sx={userButtonStyle}
                                >
                                    <PersonOutlineIcon sx={iconStyle} />
                                    <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        My Account
                                    </Box>
                                </Button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            sx={{
                                                '& .MuiPaper-root': {
                                                    marginTop: '12px',
                                                    minWidth: '220px',
                                                    borderRadius: '16px',
                                                    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                                                    border: '1px solid rgba(255, 184, 0, 0.1)',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                                    backdropFilter: 'blur(10px)',
                                                    padding: '8px',
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'rgba(255, 255, 255, 0.98)',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                        borderLeft: '1px solid rgba(255, 184, 0, 0.1)',
                                                        borderTop: '1px solid rgba(255, 184, 0, 0.1)',
                                                    }
                                                }
                                            }}
                                        >
                                            <MenuItem onClick={handleProfile} sx={menuItemStyle}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <PersonIcon sx={{ color: '#ffb800', fontSize: '1.2rem' }} />
                                                    <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>
                                                        Profile
                                                    </Typography>
                                                </Box>
                                            </MenuItem>
                                            <MenuItem onClick={handleLogout} sx={menuItemStyle}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <LogoutIcon sx={{ color: '#ff4b4b', fontSize: '1.2rem' }} />
                                                    <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>
                                                        Logout
                                                    </Typography>
                                                </Box>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                ) : (
                                    <>
                                        <Button 
                                            sx={userButtonStyle}
                                    onClick={handleUserClick}
                                >
                                    <PersonOutlineIcon sx={iconStyle} />
                                            <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                My Account
                                            </Box>
                                        </Button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                            sx={{
                                                '& .MuiPaper-root': {
                                                    marginTop: '12px',
                                                    minWidth: '220px',
                                                    borderRadius: '16px',
                                                    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                                                    border: '1px solid rgba(255, 184, 0, 0.1)',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                                    backdropFilter: 'blur(10px)',
                                                    padding: '8px',
                                                    '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'rgba(255, 255, 255, 0.98)',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                        borderLeft: '1px solid rgba(255, 184, 0, 0.1)',
                                                        borderTop: '1px solid rgba(255, 184, 0, 0.1)',
                                                    }
                                                }
                                            }}
                                        >
                                            <MenuItem onClick={handleLogin} sx={menuItemStyle}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <LoginIcon sx={{ color: '#ffb800', fontSize: '1.2rem' }} />
                                                    <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>
                                                        Login
                                                    </Typography>
                                                </Box>
                                            </MenuItem>
                                            <MenuItem onClick={handleSignUp} sx={menuItemStyle}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <PersonAddIcon sx={{ color: '#ffb800', fontSize: '1.2rem' }} />
                                                    <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>
                                                        Sign Up
                                                    </Typography>
                                                </Box>
                                            </MenuItem>
                                        </Menu>
                                    </>
                            )}
                            <IconButton
                                sx={iconButtonStyle}
                                onClick={handleCartClick}
                            >
                                <Badge 
                                    badgeContent={cartCount} 
                                    sx={badgeStyle}
                                >
                                    <ShoppingCartOutlinedIcon sx={iconStyle} />
                                </Badge>
                            </IconButton>
                        </Box>
                                        </Box>

                        {/* Mobile Search Bar */}
                        <Box sx={{ 
                            width: '100%',
                            display: { xs: 'flex', sm: 'none' },
                            mt: { xs: -6, sm: 0 },
                            position: 'relative',
                            top: { xs: '-10px', sm: 0 }
                        }}>
                            <SearchBar />
                                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <AddressSelectionModal
                open={locationDialogOpen}
                onClose={handleLocationDialogClose}
                onDetectLocation={detectCurrentLocation}
                isLoading={isLoading}
            />
        </>
    );
};

export default Header; 