import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    IconButton,
    InputAdornment,
    Alert,
    Snackbar,
    Divider,
    Switch,
    FormControlLabel,
    CircularProgress
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Security as SecurityIcon,
    Email as EmailIcon
} from '@mui/icons-material';
import { API_BASE_URL } from '../../config';

const Security = () => {
    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false
    });
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: false,
        loginNotifications: true,
        deviceManagement: true
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const [loading, setLoading] = useState(false);

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

    const handleSettingChange = (setting) => {
        setSecuritySettings(prev => ({
            ...prev,
            [setting]: !prev[setting]
        }));
    };

    const handlePasswordUpdate = async () => {
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
        <Container maxWidth="md" sx={{ mt: { xs: 0, sm: 0, md: 0 }, mb: { xs: 4, sm: 6, md: 8 }, px: { xs: 1, sm: 2, md: 0 } }}>
            <Paper elevation={0} sx={{ p: { xs: 1.5, sm: 3, md: 4 }, borderRadius: { xs: '14px', sm: '20px' }, backgroundColor: '#fff' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 4 } }}>
                    <SecurityIcon sx={{ fontSize: { xs: 28, sm: 40 }, color: '#FFB800', mr: { xs: 1.2, sm: 2 } }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, color: '#FFB800', fontSize: { xs: '1.3rem', sm: '2rem' } }}>
                        Security Settings
                    </Typography>
                </Box>

                {/* Password Change Section */}
                <Typography variant="h6" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 500, fontSize: { xs: '1.05rem', sm: '1.15rem' } }}>
                    Change Password
                </Typography>
                <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 4 } }}>
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
                                        <EmailIcon sx={{ color: '#FFB800', fontSize: { xs: 20, sm: 24 } }} />
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                },
                                fontSize: { xs: '0.95rem', sm: '1rem' }
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
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handlePasswordVisibility('new')} size="small">
                                            {showPassword.new ? <VisibilityOffIcon sx={{ fontSize: { xs: 20, sm: 24 } }} /> : <VisibilityIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                },
                                fontSize: { xs: '0.95rem', sm: '1rem' }
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
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handlePasswordVisibility('confirm')} size="small">
                                            {showPassword.confirm ? <VisibilityOffIcon sx={{ fontSize: { xs: 20, sm: 24 } }} /> : <VisibilityIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                },
                                fontSize: { xs: '0.95rem', sm: '1rem' }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={handlePasswordUpdate}
                            sx={{
                                backgroundColor: '#FFB800',
                                '&:hover': { backgroundColor: '#FFA000' },
                                fontSize: { xs: '1rem', sm: '1.1rem' },
                                px: { xs: 2.5, sm: 4 },
                                py: { xs: 1, sm: 1.5 }
                            }}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                    </Grid>
                </Grid>

                <Divider sx={{ my: { xs: 2, sm: 4 } }} />

                {/* Additional Security Settings */}
                <Typography variant="h6" sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 500, fontSize: { xs: '1.05rem', sm: '1.15rem' } }}>
                    Security Options
                </Typography>
                <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={securitySettings.twoFactorAuth}
                                    onChange={() => handleSettingChange('twoFactorAuth')}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#FFB800'
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#FFB800'
                                        }
                                    }}
                                />
                            }
                            label={<Typography sx={{ fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>Two-Factor Authentication</Typography>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={securitySettings.loginNotifications}
                                    onChange={() => handleSettingChange('loginNotifications')}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#FFB800'
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#FFB800'
                                        }
                                    }}
                                />
                            }
                            label={<Typography sx={{ fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>Login Notifications</Typography>}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={securitySettings.deviceManagement}
                                    onChange={() => handleSettingChange('deviceManagement')}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: '#FFB800'
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: '#FFB800'
                                        }
                                    }}
                                />
                            }
                            label={<Typography sx={{ fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>Device Management</Typography>}
                        />
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
                    sx={{ width: '100%', fontSize: { xs: '0.95rem', sm: '1rem' } }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Security;