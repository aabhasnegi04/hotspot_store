import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Avatar,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    TextField,
    IconButton,
    Badge,
    Tab,
    Tabs
} from '@mui/material';
import {
    Person,
    Settings,
    ShoppingBag,
    Favorite,
    LocationOn,
    Edit,
    PhotoCamera,
    History,
    ExitToApp
} from '@mui/icons-material';
import LuxuryLoader from '../common/LuxuryLoader';

const ProfileDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const response = await fetch('${API_BASE_URL}/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userData');
                    navigate('/login');
                    return;
                }
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUserData(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('${API_BASE_URL}/api/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            setEditMode(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        window.dispatchEvent(new Event('storage'));
        navigate('/login');
    };

    const menuItems = [
        { text: 'Orders', icon: <ShoppingBag />, count: 5 },
        { text: 'Wishlist', icon: <Favorite />, count: 3 },
        { text: 'Addresses', icon: <LocationOn />, count: 2 },
        { text: 'Purchase History', icon: <History /> },
        { text: 'Settings', icon: <Settings /> },
    ];

    if (loading) {
        return <LuxuryLoader message="Loading Profile" />;
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    if (!userData) {
        return null;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Grid container spacing={4}>
                {/* Left Sidebar */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: '20px',
                            bgcolor: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 215, 0, 0.2)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <IconButton
                                        sx={{
                                            bgcolor: '#FFD700',
                                            '&:hover': { bgcolor: '#FFA500' }
                                        }}
                                        size="small"
                                    >
                                        <PhotoCamera fontSize="small" />
                                    </IconButton>
                                }
                            >
                                <Avatar
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        mb: 2,
                                        mx: 'auto',
                                        bgcolor: '#FFD700',
                                        fontSize: '2.5rem'
                                    }}
                                >
                                    {userData.username[0]}
                                </Avatar>
                            </Badge>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    fontFamily: "'Outfit', sans-serif"
                                }}
                            >
                                {userData.username}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666',
                                    fontFamily: "'Outfit', sans-serif"
                                }}
                            >
                                {userData.email}
                            </Typography>
                        </Box>

                        <List>
                            {menuItems.map((item, index) => (
                                <React.Fragment key={item.text}>
                                    <ListItem
                                        button
                                        sx={{
                                            borderRadius: '12px',
                                            mb: 1,
                                            '&:hover': {
                                                bgcolor: 'rgba(255, 215, 0, 0.05)',
                                            }
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: '#FFD700' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.text}
                                            primaryTypographyProps={{
                                                fontFamily: "'Outfit', sans-serif"
                                            }}
                                        />
                                        {item.count && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    bgcolor: 'rgba(255, 215, 0, 0.1)',
                                                    color: '#000',
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: '12px',
                                                    fontWeight: 600
                                                }}
                                            >
                                                {item.count}
                                            </Typography>
                                        )}
                                    </ListItem>
                                    {index < menuItems.length - 1 && (
                                        <Divider sx={{ my: 1 }} />
                                    )}
                                </React.Fragment>
                            ))}
                        </List>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<ExitToApp />}
                            onClick={handleLogout}
                            sx={{
                                mt: 3,
                                borderRadius: '12px',
                                borderColor: 'rgba(255, 0, 0, 0.3)',
                                color: '#FF4B4B',
                                '&:hover': {
                                    borderColor: '#FF4B4B',
                                    bgcolor: 'rgba(255, 75, 75, 0.05)',
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </Paper>
                </Grid>

                {/* Main Content */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: '20px',
                            bgcolor: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 215, 0, 0.2)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                sx={{
                                    '& .MuiTab-root': {
                                        fontFamily: "'Outfit', sans-serif",
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                    },
                                    '& .Mui-selected': {
                                        color: '#FFD700',
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#FFD700',
                                    }
                                }}
                            >
                                <Tab label="Profile" />
                                <Tab label="Orders" />
                                <Tab label="Settings" />
                            </Tabs>
                        </Box>

                        {activeTab === 0 && (
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            fontFamily: "'Outfit', sans-serif"
                                        }}
                                    >
                                        Personal Information
                                    </Typography>
                                    <Button
                                        startIcon={<Edit />}
                                        onClick={editMode ? handleSave : handleEdit}
                                        sx={{
                                            color: editMode ? '#4CAF50' : '#666',
                                            '&:hover': {
                                                bgcolor: editMode ? 'rgba(76, 175, 80, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                                            }
                                        }}
                                    >
                                        {editMode ? 'Save' : 'Edit'}
                                    </Button>
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Username"
                                            name="username"
                                            value={userData.username}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            value={userData.email}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {activeTab === 1 && (
                            <Typography>Orders content</Typography>
                        )}

                        {activeTab === 2 && (
                            <Typography>Settings content</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProfileDashboard; 