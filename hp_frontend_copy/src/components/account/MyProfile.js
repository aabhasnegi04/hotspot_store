import React, { useState } from 'react';
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
    Input
} from '@mui/material';
import {
    Edit as EditIcon,
    PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';

const MyProfile = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const [formData, setFormData] = useState({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        dateOfBirth: userData.dateOfBirth || '',
        profilePicture: userData.profilePicture || ''
    });

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

    const handleSave = () => {
        localStorage.setItem('userData', JSON.stringify({
            ...userData,
            ...formData
        }));
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
                            {formData.firstName?.[0]?.toUpperCase() || 'U'}
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
                            {formData.firstName} {formData.lastName}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {formData.email || 'Add your email'}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 4 }} />

                {/* Profile Form */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
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
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
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
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
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
                            label="Date of Birth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
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
        </Container>
    );
};

export default MyProfile;
