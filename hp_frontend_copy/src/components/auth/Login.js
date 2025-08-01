import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    IconButton,
    InputAdornment,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import {
    Lock,
    Email,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.identifier) {
            newErrors.identifier = 'Email or Mobile Number is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ identifier: formData.identifier, password: formData.password }),
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    console.error('Server response:', errorData);
                    throw new Error(errorData || 'Login failed');
                }

                const data = await response.json();

                // Store token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));
                localStorage.setItem('isAuthenticated', 'true');
                
                // Trigger storage event for header component
                window.dispatchEvent(new Event('storage'));
                
                // Show success dialog
                setShowSuccessDialog(true);
                
                // Automatically navigate after 1.5 seconds
                setTimeout(() => {
                    setShowSuccessDialog(false);
                    navigate('/');
                }, 1500);
            } catch (error) {
                console.error('Login error:', error);
                setErrors({
                    general: error.message || 'Login failed. Please try again.'
                });
            }
        }
    };

    const paperStyle = {
        p: 4,
        borderRadius: '20px',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
    };

    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
                '& fieldset': {
                    borderColor: '#FFD700',
                }
            },
            '&.Mui-focused': {
                '& fieldset': {
                    borderColor: '#FFD700',
                }
            }
        }
    };

    const buttonStyle = {
        mt: 2,
        mb: 2,
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
    };

    return (
        <Container maxWidth="sm" sx={{ mt: { xs: 8, sm: 16 }, mb: { xs: 2, sm: 8 }, px: { xs: 0.5, sm: 0 } }}>
            <Paper elevation={3} sx={{
                ...paperStyle,
                p: { xs: 2, sm: 4 },
                borderRadius: { xs: '12px', sm: '20px' },
            }}>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    align="center"
                    sx={{
                        fontWeight: 700,
                        color: '#000000',
                        mb: { xs: 2, sm: 4 },
                        fontSize: { xs: '1.6rem', sm: '2.125rem' },
                        background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Welcome Back
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={{ xs: 2, sm: 3 }}>
                        {errors.general && (
                            <Grid item xs={12}>
                                <Typography color="error" align="center">
                                    {errors.general}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email or Mobile Number"
                                name="identifier"
                                type="text"
                                value={formData.identifier}
                                onChange={handleChange}
                                error={!!errors.identifier}
                                helperText={errors.identifier}
                                variant="outlined"
                                sx={{ ...inputStyle, fontSize: { xs: '0.95rem', sm: '1rem' } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email sx={{ color: '#FFD700' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                error={!!errors.password}
                                helperText={errors.password}
                                variant="outlined"
                                sx={{ ...inputStyle, fontSize: { xs: '0.95rem', sm: '1rem' } }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: '#FFD700' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff sx={{ color: '#FFD700' }} /> : <Visibility sx={{ color: '#FFD700' }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    ...buttonStyle,
                                    fontSize: { xs: '1rem', sm: '1.1rem' },
                                    py: { xs: 1, sm: 1.5 },
                                }}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} container direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1}>
                            <Grid item>
                                <Link 
                                    to="/forgot-password" 
                                    style={{
                                        color: '#FFD700',
                                        textDecoration: 'none',
                                        fontSize: '0.98rem',
                                    }}
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link 
                                    to="/signup" 
                                    style={{
                                        color: '#FFD700',
                                        textDecoration: 'none',
                                        fontSize: '0.98rem',
                                    }}
                                >
                                    Don't have an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Success Dialog */}
            <Dialog
                open={showSuccessDialog}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                        Login Successful!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ textAlign: 'center', my: 2 }}>
                        Welcome back! You have successfully logged in.
                    </Typography>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Login; 