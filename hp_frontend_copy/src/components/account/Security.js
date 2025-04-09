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
    FormControlLabel
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Security as SecurityIcon
} from '@mui/icons-material';

const Security = () => {
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [formData, setFormData] = useState({
        currentPassword: '',
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

    const handlePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handlePasswordChange = (e) => {
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

    const handlePasswordUpdate = () => {
        // Validate passwords
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            setSnackbar({
                open: true,
                message: 'Please fill all password fields',
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

        // Get user data
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(user => user.phone === userData.phone);

        if (users[userIndex].password !== formData.currentPassword) {
            setSnackbar({
                open: true,
                message: 'Current password is incorrect',
                severity: 'error'
            });
            return;
        }

        // Update password
        users[userIndex].password = formData.newPassword;
        localStorage.setItem('users', JSON.stringify(users));

        // Clear form and show success message
        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setSnackbar({
            open: true,
            message: 'Password updated successfully',
            severity: 'success'
        });
    };

    return (
        <Container maxWidth="md" sx={{ mt: { xs: 12, sm: 13, md: 14 }, mb: 8 }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: '20px', backgroundColor: '#fff' }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <SecurityIcon sx={{ fontSize: 40, color: '#FFB800', mr: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, color: '#FFB800' }}>
                        Security Settings
                    </Typography>
                </Box>

                {/* Password Change Section */}
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                    Change Password
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type={showPassword.current ? 'text' : 'password'}
                            label="Current Password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handlePasswordChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => handlePasswordVisibility('current')}>
                                            {showPassword.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
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
                            type={showPassword.new ? 'text' : 'password'}
                            label="New Password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handlePasswordChange}
                            InputProps={{
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
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
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
                            onChange={handlePasswordChange}
                            InputProps={{
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
                                    '&:hover fieldset': { borderColor: '#FFB800' },
                                    '&.Mui-focused fieldset': { borderColor: '#FFB800' }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={handlePasswordUpdate}
                            sx={{
                                backgroundColor: '#FFB800',
                                '&:hover': { backgroundColor: '#FFA000' }
                            }}
                        >
                            Update Password
                        </Button>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Additional Security Settings */}
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
                    Security Options
                </Typography>
                <Grid container spacing={2}>
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
                            label="Two-Factor Authentication"
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
                            label="Login Notifications"
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
                            label="Device Management"
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
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Security;