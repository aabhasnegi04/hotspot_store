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
    Grid
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
                
                // Navigate to homepage
                navigate('/');
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
        <Container maxWidth="sm" sx={{ mt: 16, mb: 8 }}>
            <Paper elevation={3} sx={paperStyle}>
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
                    Welcome Back
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
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
                                sx={inputStyle}
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
                                sx={inputStyle}
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
                                sx={buttonStyle}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} container justifyContent="space-between">
                            <Grid item>
                                <Link 
                                    to="#" 
                                    style={{
                                        color: '#FFD700',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            color: '#FFA500',
                                            textDecoration: 'underline',
                                        }
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
                                        '&:hover': {
                                            color: '#FFA500',
                                            textDecoration: 'underline',
                                        }
                                    }}
                                >
                                    Don't have an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Login; 