import React, { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    Stack,
    Alert,
    Snackbar
} from '@mui/material';
import {
    Phone,
    Email,
    LocationOn
} from '@mui/icons-material';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        address: '',
        message: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/contact', formData);
            
            if (response.data.success) {
                setSnackbar({
                    open: true,
                    message: response.data.message,
                    severity: 'success'
                });
                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    mobileNo: '',
                    address: '',
                    message: ''
                });
                // Auto hide success message after 3 seconds
                setTimeout(() => {
                    setSnackbar(prev => ({ ...prev, open: false }));
                }, 3000);
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to send message. Please try again.',
                severity: 'error'
            });
        }
    };


    const contactInfo = [
        { icon: <Phone sx={{ color: '#ffb800' }} />, title: 'Phone', content: '+91 7042343404' },
        { icon: <Email sx={{ color: '#ffb800' }} />, title: 'Email', content: 'care@hotspotretail.in' },
        { icon: <LocationOn sx={{ color: '#ffb800' }} />, title: 'Address', 
          content: 'F-14 2nd Floor, Okhla Industrial Area Phase 1, New Delhi, IN 110020' }
    ];

    const formFields = [
        { name: 'name', label: 'Name', required: true, xs: 12, sm: 6 },
        { name: 'email', label: 'Email', type: 'email', required: true, xs: 12, sm: 6 },
        { name: 'mobileNo', label: 'Mobile Number', required: true, xs: 12, sm: 6, 
          inputProps: { maxLength: 10, pattern: '[0-9]*' } },
        { name: 'address', label: 'Address', xs: 12, sm: 6 },
        { name: 'message', label: 'Message', required: true, xs: 12, multiline: true, rows: 4 }
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8, mt: { xs: 5, sm: 6 } }}>
            <Typography
                variant="h2"
                align="center"
                sx={{
                    mb: 6,
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    color: '#1a1a1a'
                }}
            >
                Contact Us
            </Typography>

            <Grid container spacing={6}>
                {/* Contact Information */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 4,
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 600,
                                color: '#ffb800'
                            }}
                        >
                            Get in Touch
                        </Typography>
                        <Stack spacing={4}>
                            {contactInfo.map(({ icon, title, content }) => (
                                <Box key={title} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {icon}
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600}>
                                            {title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {content}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>

                {/* Contact Form */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 4,
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 600,
                                color: '#ffb800'
                            }}
                        >
                            Send us a Message
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                {formFields.map((field) => (
                                    <Grid item xs={field.xs} sm={field.sm} key={field.name}>
                                        <TextField
                                            fullWidth
                                            {...field}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                ))}
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            bgcolor: '#ffb800',
                                            color: '#000',
                                            '&:hover': {
                                                bgcolor: '#ffa000'
                                            }
                                        }}
                                    >
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

            {/* Success Message Alert - without close button */}
            {snackbar.severity === 'success' && snackbar.open && (
                <Box 
                    sx={{ 
                        position: 'fixed',
                        right: '32px',
                        top: '120px',
                        transform: 'none',
                        zIndex: 1000,
                        width: '350px',
                        '@media (max-width: 600px)': {
                            right: '16px',
                            width: 'calc(100% - 32px)'
                        }
                    }}
                >
                    <Alert 
                        severity="success"
                        variant="filled"
                        sx={{ 
                            boxShadow: 3,
                            fontSize: '1rem',
                            bgcolor: '#4CAF50',
                            '& .MuiAlert-message': {
                                padding: '10px 0'
                            },
                            '& .MuiAlert-icon': {
                                fontSize: '24px'
                            }
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            Thank you for contacting us. We will get back to you soon!
                        </Typography>
                    </Alert>
                </Box>
            )}

            {/* Error Snackbar */}
            <Snackbar
                open={snackbar.open && snackbar.severity === 'error'}
                autoHideDuration={3000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert 
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Contact; 