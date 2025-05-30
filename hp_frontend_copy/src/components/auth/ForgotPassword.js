import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    Snackbar,
    CircularProgress,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { API_BASE_URL } from '../../config';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handlePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate all fields
        if (!formData.email || !formData.newPassword || !formData.confirmPassword) {
            setSnackbar({
                open: true,
                message: 'Please fill all fields',
                severity: 'error'
            });
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setSnackbar({
                open: true,
                message: 'Please enter a valid email address',
                severity: 'error'
            });
            return;
        }

        if (formData.newPassword.length < 8) {
            setSnackbar({
                open: true,
                message: 'Password must be at least 8 characters long',
                severity: 'error'
            });
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setSnackbar({
                open: true,
                message: 'New passwords do not match',
                severity: 'error'
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    newPassword: formData.newPassword
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setFormData({
                    email: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setSnackbar({
                    open: true,
                    message: data.message || 'Password updated successfully',
                    severity: 'success'
                });
            } else {
                setSnackbar({
                    open: true,
                    message: data.message || 'Failed to update password',
                    severity: 'error'
                });
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'An error occurred while updating the password',
                severity: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 2, mb: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '20px', backgroundColor: '#fff' }}>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    align="center"
                    sx={{
                        fontWeight: 700,
                        color: '#000000',
                        mb: 4,
                        background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Reset Password
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
                    Enter your email address and new password to reset your account.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: '#FFD700' }} />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '&:hover fieldset': { borderColor: '#FFD700' },
                                        '&.Mui-focused fieldset': { borderColor: '#FFD700' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={showPassword.new ? 'text' : 'password'}
                                label="New Password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                helperText="Password must be at least 8 characters long"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon sx={{ color: '#FFD700' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => handlePasswordVisibility('new')}>
                                                {showPassword.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '&:hover fieldset': { borderColor: '#FFD700' },
                                        '&.Mui-focused fieldset': { borderColor: '#FFD700' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type={showPassword.confirm ? 'text' : 'password'}
                                label="Confirm New Password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon sx={{ color: '#FFD700' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => handlePasswordVisibility('confirm')}>
                                                {showPassword.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '&:hover fieldset': { borderColor: '#FFD700' },
                                        '&.Mui-focused fieldset': { borderColor: '#FFD700' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    borderRadius: '12px',
                                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                    color: '#000000',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    boxShadow: '0 3px 5px 2px rgba(255, 215, 0, .3)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
                                        boxShadow: '0 4px 8px 2px rgba(255, 215, 0, .4)',
                                        transform: 'translateY(-1px)',
                                    }
                                }}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Link 
                                to="/login" 
                                style={{
                                    color: '#FFD700',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: '#FFA500',
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                Back to Login
                            </Link>
                        </Grid>
                    </Grid>
                </form>
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

export default ForgotPassword; 