import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Avatar,
    Box,
    IconButton,
    Divider,
    Input,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Edit as EditIcon,
    PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import { API_BASE_URL } from '../../config';

const MyProfile = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log('UserData from localStorage:', userData); // Debug log

    const [formData, setFormData] = useState({
        name: userData.name || '',
        email: userData.email || '',
        mobileno: userData.mobileno || '',
        address: userData.address || '',
        country: userData.country || '',
        state: userData.state || '',
        city: userData.city || '',
        pincode: userData.pincode || '',
        landmark: userData.landmark || '',
        profilePicture: userData.profilePicture || ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const fetchProfile = useCallback(async () => {
        try {
            console.log('Fetching profile for user ID:', userData.id); // Debug log
            const response = await fetch(`${API_BASE_URL}/api/profile/${userData.id}`);
            console.log('API Response status:', response.status); // Debug log
            
            if (response.ok) {
                const data = await response.json();
                console.log('Profile data received:', data); // Debug log
                setFormData(prev => ({
                    ...prev,
                    ...data
                }));
            } else {
                const errorData = await response.json();
                console.error('API Error:', errorData); // Debug log
                setSnackbar({
                    open: true,
                    message: errorData.message || 'Error fetching profile data',
                    severity: 'error'
                });
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setSnackbar({
                open: true,
                message: 'Error fetching profile data',
                severity: 'error'
            });
        }
    }, [userData.id]);

    useEffect(() => {
        if (userData.id) {
            console.log('useEffect triggered with user ID:', userData.id); // Debug log
            fetchProfile();
        } else {
            console.log('No user ID found in localStorage'); // Debug log
            setSnackbar({
                open: true,
                message: 'Please log in to view your profile',
                severity: 'error'
            });
        }
    }, [userData.id, fetchProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/profile/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Update local storage
                localStorage.setItem('userData', JSON.stringify({
                    ...userData,
                    ...formData
                }));

                setSnackbar({
                    open: true,
                    message: 'Profile updated successfully',
                    severity: 'success'
                });
            } else {
                setSnackbar({
                    open: true,
                    message: data.message || 'Failed to update profile',
                    severity: 'error'
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'An error occurred while updating profile',
                severity: 'error'
            });
        }
    };

    return (
        <Container maxWidth="md" sx={{ 
            mt: { xs: -2, sm: -1, md: 0 },
            mb: 8,
            position: 'relative',
            zIndex: 0
        }}>
            <Paper 
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 2.5, md: 3 },
                    borderRadius: '20px',
                    backgroundColor: '#fff'
                }}
            >
                {/* Profile Header */}
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    gap: 3,
                    mb: 4 
                }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={formData.profilePicture}
                            sx={{
                                width: 120,
                                height: 120,
                                bgcolor: '#FFB800',
                                fontSize: '3rem'
                            }}
                        >
                            {formData.name?.[0]?.toUpperCase() || 'U'}
                        </Avatar>
                        <Input
                            type="file"
                            accept="image/*"
                            id="photo-upload"
                            style={{ display: 'none' }}
                            onChange={handlePhotoUpload}
                        />
                        <label htmlFor="photo-upload">
                            <IconButton
                                component="span"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: '#FFB800',
                                    '&:hover': { backgroundColor: '#FFA000' }
                                }}
                                size="small"
                            >
                                <PhotoCameraIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </label>
                    </Box>
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography variant="h4" sx={{ fontWeight: 600, color: '#FFB800', mb: 1 }}>
                            {formData.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {formData.email || 'Add your email'}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* Profile Form */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: '#FFB800', opacity: 0.5 }} />
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            disabled
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: '#FFB800', opacity: 0.5 }} />
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mobile Number"
                            name="mobileno"
                            value={formData.mobileno}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: '#FFB800', opacity: 0.5 }} />
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: '#FFB800', opacity: 0.5 }} />
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: '#FFB800', opacity: 0.5 }} />
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: '#FFB800', opacity: 0.5 }} />
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: '#FFB800', opacity: 0.5 }} />
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: '#FFB800', opacity: 0.5 }} />
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Landmark"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: <EditIcon sx={{ color: '#FFB800', opacity: 0.5 }} />
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                                backgroundColor: '#FFB800',
                                color: 'white',
                                px: 4,
                                '&:hover': {
                                    backgroundColor: '#FFA000',
                                }
                            }}
                        >
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default MyProfile;
