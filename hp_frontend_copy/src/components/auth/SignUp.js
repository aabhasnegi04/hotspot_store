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
    DialogActions,
} from '@mui/material';
import {
    Lock,
    Person,
    Email,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';

const styles = {
    paper: {
        p: 4,
        borderRadius: '20px',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    input: {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover fieldset': { borderColor: '#FFD700' },
            '&.Mui-focused fieldset': { borderColor: '#FFD700' }
        }
    },
    button: {
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
            transform: 'translateY(-1px)',
        }
    },
    title: {
        fontWeight: 700,
        background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    }
};

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobileno: ''
    });
    const [showPassword, setShowPassword] = useState({ password: false, confirm: false });
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
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

            try {
                const response = await fetch(`${API_BASE_URL}/api/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        mobileno: formData.mobileno
                    }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Registration failed');
                }

                // Show success dialog
                setShowSuccessDialog(true);
            } catch (error) {
                setErrors({
                    general: error.message
                });
        }
    };

    const handleSuccessClose = () => {
        setShowSuccessDialog(false);
        navigate('/login');
    };

    const renderTextField = (name, label, type = 'text', icon) => (
        <Grid item xs={12}>
            <TextField
                fullWidth
                label={label}
                name={name}
                type={type === 'password' ? (showPassword[name] ? 'text' : 'password') : type}
                value={formData[name]}
                onChange={handleChange}
                error={!!errors[name]}
                helperText={errors[name]}
                sx={styles.input}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                    endAdornment: type === 'password' && (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(prev => ({ ...prev, [name]: !prev[name] }))}>
                                {showPassword[name] ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Grid>
    );

    return (
        <Container maxWidth="sm" sx={{ mt: 0, mb: 0 }}>
            <Paper elevation={3} sx={styles.paper}>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    align="center"
                    sx={{ ...styles.title, mb: 4 }}
                >
                    Create Account
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
                        {renderTextField('name', 'Name', 'text', <Person sx={{ color: '#FFD700' }} />)}
                        {renderTextField('email', 'Email', 'email', <Email sx={{ color: '#FFD700' }} />)}
                        {renderTextField('password', 'Password', 'password', <Lock sx={{ color: '#FFD700' }} />)}
                        {renderTextField('confirmPassword', 'Confirm Password', 'password', <Lock sx={{ color: '#FFD700' }} />)}
                        {renderTextField('mobileno', 'Mobile Number', 'text', <Person sx={{ color: '#FFD700' }} />)}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={styles.button}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        <Grid item xs={12} container justifyContent="center">
                            <Grid item>
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
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Success Dialog */}
            <Dialog
                open={showSuccessDialog}
                onClose={handleSuccessClose}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#4CAF50' }}>
                        Account Created Successfully!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ textAlign: 'center', my: 2 }}>
                        Your account has been created. Please login to continue.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2, justifyContent: 'center' }}>
                    <Button
                        onClick={handleSuccessClose}
                        variant="contained"
                        sx={styles.button}
                    >
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default SignUp; 