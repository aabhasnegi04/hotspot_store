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
import { API_BASE_URL } from '../../../config';

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
            const response = await axios.post(`${API_BASE_URL}/api/contact`, formData);
            
            
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
        <Container maxWidth="lg" sx={{ py: { xs: 1, sm: 4 }, mt: 0, px: { xs: 0, sm: 0, md: 0 } }}>
            <Typography
                variant="h2"
                align="center"
                sx={{
                    mb: { xs: 3, sm: 6 },
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    color: '#1a1a1a',
                    fontSize: { xs: '1.5rem', sm: '2.2rem' }
                }}
            >
                Contact Us
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 6 }}>
                {/* Contact Information */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, height: '100%', borderRadius: { xs: '10px', sm: '16px' } }}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: { xs: 2, sm: 4 },
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 600,
                                color: '#ffb800',
                                fontSize: { xs: '1.1rem', sm: '1.4rem' }
                            }}
                        >
                            Get in Touch
                        </Typography>
                        <Stack spacing={{ xs: 2, sm: 4 }}>
                            {contactInfo.map(({ icon, title, content }) => (
                                <Box key={title} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {icon}
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                                            {title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
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
                    <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: { xs: '10px', sm: '16px' } }}>
                        <Typography
                            variant="h5"
                            sx={{
                                mb: { xs: 2, sm: 4 },
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 600,
                                color: '#ffb800',
                                fontSize: { xs: '1.1rem', sm: '1.4rem' }
                            }}
                        >
                            Send us a Message
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={{ xs: 2, sm: 3 }}>
                                {formFields.map((field) => (
                                    <Grid item xs={12} sm={field.sm} key={field.name}>
                                        <TextField
                                            fullWidth
                                            {...field}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}
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
                                            fontSize: { xs: '1rem', sm: '1.1rem' },
                                            px: { xs: 2, sm: 4 },
                                            py: { xs: 1.2, sm: 1.5 },
                                            borderRadius: { xs: '8px', sm: '12px' },
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
                        right: { xs: '8px', sm: '32px' },
                        top: { xs: '80px', sm: '120px' },
                        transform: 'none',
                        zIndex: 1000,
                        width: { xs: 'calc(100% - 16px)', sm: '350px' }
                    }}
                >
                    <Alert 
                        severity="success"
                        variant="filled"
                        sx={{ 
                            boxShadow: 3,
                            fontSize: { xs: '0.95rem', sm: '1rem' },
                            bgcolor: '#4CAF50',
                            '& .MuiAlert-message': {
                                padding: { xs: '8px 0', sm: '10px 0' }
                            },
                            '& .MuiAlert-icon': {
                                fontSize: { xs: '20px', sm: '24px' }
                            }
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
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
                    sx={{ width: '100%', fontSize: { xs: '0.95rem', sm: '1rem' } }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Contact; 