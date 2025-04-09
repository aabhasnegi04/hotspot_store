import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';
import {
    Container,
    Paper,
    Typography,
    Button,
    Grid,
    TextField,
    Box,
    Card,
    CardContent,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Radio,
    RadioGroup,
    FormControlLabel,
    Alert,
    Snackbar
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Home as HomeIcon,
    Business as BusinessIcon
} from '@mui/icons-material';

const MyAddresses = () => {
    const [addresses, setAddresses] = useState(() => {
        return JSON.parse(localStorage.getItem('userAddresses') || '[]');
    });
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [newAddress, setNewAddress] = useState({
        type: 'home',
        pincode: '',
        address: '',
        city: '',
        state: '',
        district: '',
        region: '',
        isDefault: false
    });
    const [isPincodeValid, setIsPincodeValid] = useState(false);

    // Common styles
    const textFieldStyle = {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': { borderColor: '#FFB800' },
            '&.Mui-focused fieldset': { borderColor: '#FFB800' }
        }
    };

    const fetchPincodeDetails = async (pincode) => {
        if (pincode.length === 6) {
            setIsLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/pincode/${pincode}`);
                const data = await response.json();
                
                if (response.ok) {
                    setNewAddress(prev => ({
                        ...prev,
                        city: data.divisionname || '',
                        state: data.statename || '',
                        district: data.Districtname || '',
                        region: data.regionname || ''
                    }));
                    setSnackbarMessage('Location details fetched successfully');
                    setIsPincodeValid(true);
                } else {
                    setSnackbarMessage('Invalid pincode');
                    resetLocationFields();
                    setIsPincodeValid(false);
                }
            } catch (error) {
                console.error('Error fetching pincode details:', error);
                setSnackbarMessage('Error fetching location details');
                resetLocationFields();
                setIsPincodeValid(false);
            } finally {
                setShowSnackbar(true);
                setIsLoading(false);
            }
        } else {
            resetLocationFields();
            setIsPincodeValid(false);
        }
    };

    const resetLocationFields = () => setNewAddress(prev => ({
        ...prev, city: '', state: '', district: '', region: ''
    }));

    const resetForm = () => {
        setNewAddress({
            type: 'home',
            pincode: '',
            address: '',
            city: '',
            state: '',
            district: '',
            region: '',
            isDefault: false
        });
        setIsPincodeValid(false);
    };

    const handleSaveAddress = () => {
        if (!newAddress.address || !newAddress.pincode) {
            setSnackbarMessage('Please fill all required fields');
            setShowSnackbar(true);
            return;
        }

        const updatedAddresses = [...addresses, { ...newAddress, id: Date.now() }];
        setAddresses(updatedAddresses);
        localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
        setIsAddingNew(false);
        resetForm();
        setSnackbarMessage('Address saved successfully');
        setShowSnackbar(true);
    };

    const handleDeleteAddress = (id) => {
        const updatedAddresses = addresses.filter(addr => addr.id !== id);
        setAddresses(updatedAddresses);
        localStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
        setSnackbarMessage('Address deleted successfully');
        setShowSnackbar(true);
    };

    const handlePincodeChange = (e) => {
        const value = e.target.value;
        // Only allow numbers and max 6 digits
        if (value === '' || (/^\d+$/.test(value) && value.length <= 6)) {
            setNewAddress(prev => ({ ...prev, pincode: value }));
            if (value.length === 6) {
                fetchPincodeDetails(value);
            }
        }
    };

    const renderAddressCard = (address) => (
        <Card sx={{ borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {address.type === 'home' ? 
                            <HomeIcon sx={{ color: '#FFB800' }} /> : 
                            <BusinessIcon sx={{ color: '#FFB800' }} />
                        }
                        <Typography variant="h6">{address.type.toUpperCase()}</Typography>
                    </Box>
                    <IconButton onClick={() => handleDeleteAddress(address.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">{address.address}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {address.city}, {address.district}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {address.region}, {address.state} - {address.pincode}
                </Typography>
            </CardContent>
        </Card>
    );

    const renderTextField = (label, value, readOnly = false, multiline = false) => (
        <TextField
            fullWidth
            required={!readOnly}
            label={label}
            value={value}
            multiline={multiline}
            rows={multiline ? 2 : 1}
            disabled={isLoading && readOnly}
            InputProps={{ readOnly }}
            onChange={label === 'Pincode' ? handlePincodeChange : (e) => 
                setNewAddress({ ...newAddress, [label.toLowerCase()]: e.target.value })
            }
            sx={textFieldStyle}
        />
    );

    return (
        <Container maxWidth="lg" sx={{ mt: { xs: 12, sm: 13, md: 14 }, mb: 8 }}>
            <Paper 
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: '20px',
                    backgroundColor: '#fff'
                }}
            >
                <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#FFB800' }}>
                    My Addresses
                </Typography>

                {/* Add New Address Button */}
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => setIsAddingNew(true)}
                    sx={{
                        mb: 4,
                        color: '#FFB800',
                        borderColor: '#FFB800',
                        '&:hover': {
                            borderColor: '#FFB800',
                            backgroundColor: 'rgba(255, 184, 0, 0.1)',
                        }
                    }}
                >
                    Add New Address
                </Button>

                {/* Address List */}
                <Grid container spacing={3}>
                    {addresses.map((address) => (
                        <Grid item xs={12} md={6} key={address.id}>
                            {renderAddressCard(address)}
                        </Grid>
                    ))}
                </Grid>

                {/* Simplified Add New Address Dialog */}
                <Dialog 
                    open={isAddingNew} 
                    onClose={() => {
                        setIsAddingNew(false);
                        resetForm();
                    }}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{ color: '#FFB800' }}>Add New Address</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <RadioGroup
                                    row
                                    value={newAddress.type}
                                    onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                                >
                                    {['home', 'work'].map(type => (
                                    <FormControlLabel 
                                            key={type}
                                            value={type}
                                        control={<Radio sx={{ color: '#FFB800', '&.Mui-checked': { color: '#FFB800' } }} />} 
                                            label={type.charAt(0).toUpperCase() + type.slice(1)}
                                        />
                                    ))}
                                </RadioGroup>
                            </Grid>

                            <Grid item xs={12}>
                                {renderTextField('Pincode', newAddress.pincode)}
                            </Grid>

                            {isPincodeValid && (
                                <>
                            <Grid item xs={12} sm={6}>
                                        {renderTextField('City', newAddress.city, true)}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                        {renderTextField('District', newAddress.district, true)}
                            </Grid>
                                    <Grid item xs={12} sm={6}>
                                        {renderTextField('Region', newAddress.region, true)}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                        {renderTextField('State', newAddress.state, true)}
                            </Grid>
                                    <Grid item xs={12}>
                                        {renderTextField('Address', newAddress.address, false, true)}
                            </Grid>
                                </>
                            )}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={() => {
                                setIsAddingNew(false);
                                resetForm();
                            }}
                            sx={{ color: '#FFB800' }}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="contained"
                            onClick={handleSaveAddress}
                            disabled={!isPincodeValid}
                            sx={{
                                backgroundColor: '#FFB800',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#FFA000',
                                }
                            }}
                        >
                            Save Address
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    open={showSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setShowSnackbar(false)}
                >
                    <Alert 
                        onClose={() => setShowSnackbar(false)} 
                        severity="success" 
                        sx={{ width: '100%' }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default MyAddresses; 