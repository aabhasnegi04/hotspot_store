import React, { useState, useEffect } from 'react';
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
    Snackbar,
    CircularProgress
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Home as HomeIcon,
    Business as BusinessIcon
} from '@mui/icons-material';

const MyAddresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [newAddress, setNewAddress] = useState({
        type: 'home',
        pincode: '',
        addressLine1: '',
        addressLine2: '',
        landmark: '',
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
            addressLine1: '',
            addressLine2: '',
            landmark: '',
            city: '',
            state: '',
            district: '',
            region: '',
            isDefault: false
        });
        setIsPincodeValid(false);
    };

    const fetchAddresses = async () => {
        try {
            setIsLoading(true);
            
            // Get mobile number from different possible localStorage keys
            let mobileNo = localStorage.getItem('userMobile');
            
            // If not found in userMobile, try to get from userData
            if (!mobileNo) {
                const userDataStr = localStorage.getItem('userData');
                if (userDataStr) {
                    try {
                        const userData = JSON.parse(userDataStr);
                        mobileNo = userData.mobileno || userData.mobileNo || userData.mobile;
                    } catch (e) {
                        console.error('Error parsing userData:', e);
                    }
                }
            }
            
            if (!mobileNo) {
                setSnackbarMessage('Mobile number not found. Please login again.');
                setShowSnackbar(true);
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/address/get-addresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mobileNo })
            });

            const data = await response.json();

            if (data.success) {
                // Transform the addresses data to match your frontend structure
                const formattedAddresses = data.addresses.map(addr => ({
                    id: addr.SRNO,
                    type: addr.CATEGORY?.toLowerCase() || 'home',
                    address: addr.ADDRESSLINE1,
                    addressLine2: addr.ADDRESSLINE2,
                    city: addr.CITY,
                    state: addr.STATE,
                    district: addr.DISTRICT,
                    pincode: addr.PINCODE,
                    landmark: addr.LANDMARK,
                    region: addr.REGION
                }));
                setAddresses(formattedAddresses);
            } else {
                throw new Error(data.message || 'Failed to fetch addresses');
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
            setSnackbarMessage('Error fetching addresses. Please try again.');
            setShowSnackbar(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSaveAddress = async () => {
        // Frontend validation for all required fields
        let mobileNo = localStorage.getItem('userMobile');
        let email = localStorage.getItem('userEmail');
        // Try to get from userData object if not found directly
        if (!mobileNo || !email) {
            const userStr = localStorage.getItem('userData');
            if (userStr) {
                try {
                    const userObj = JSON.parse(userStr);
                    if (!mobileNo && userObj.mobileno) mobileNo = userObj.mobileno;
                    if (!email && userObj.email) email = userObj.email;
                } catch (e) {
                    // ignore JSON parse error
                }
            }
        }
        const requiredFields = [
            { label: 'Pincode', value: newAddress.pincode },
            { label: 'Address Line 1', value: newAddress.addressLine1 },
            { label: 'City', value: newAddress.city },
            { label: 'State', value: newAddress.state },
            { label: 'District', value: newAddress.district },
            { label: 'Region', value: newAddress.region },
            { label: 'Mobile Number', value: mobileNo },
            { label: 'Email', value: email },
            { label: 'Category', value: newAddress.type },
        ];
        const missingField = requiredFields.find(f => !f.value || f.value.trim() === '');
        if (missingField) {
            setSnackbarMessage(`Please fill the required field: ${missingField.label}`);
            setShowSnackbar(true);
            return;
        }

        try {
            setIsLoading(true);
            const addressData = {
                category: newAddress.type.toUpperCase(),
                mobileNo: mobileNo,
                email: email,
                addressLine1: newAddress.addressLine1,
                addressLine2: newAddress.addressLine2,
                state: newAddress.state,
                city: newAddress.city,
                district: newAddress.district,
                pincode: newAddress.pincode,
                landmark: newAddress.landmark,
                region: newAddress.region
            };

            const response = await fetch(`${API_BASE_URL}/api/address/add-address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addressData)
            });

            const data = await response.json();

            if (data.success) {
                setIsAddingNew(false);
                resetForm();
                setSnackbarMessage('Address saved successfully');
                setShowSnackbar(true);
                // Refresh the addresses list
                fetchAddresses();
            } else {
                throw new Error(data.message || 'Failed to save address');
            }
        } catch (error) {
            console.error('Error saving address:', error);
            setSnackbarMessage('Error saving address. Please try again.');
            setShowSnackbar(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAddress = async (id) => {
        try {
            setIsLoading(true);
            // Add your delete API call here
            // After successful deletion:
            await fetchAddresses(); // Refresh the addresses list
            setSnackbarMessage('Address deleted successfully');
            setShowSnackbar(true);
        } catch (error) {
            console.error('Error deleting address:', error);
            setSnackbarMessage('Error deleting address. Please try again.');
            setShowSnackbar(true);
        } finally {
            setIsLoading(false);
        }
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
                {address.addressLine2 && (
                    <Typography variant="body2" color="text.secondary">{address.addressLine2}</Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                    {address.city}, {address.district}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {address.region}, {address.state} - {address.pincode}
                </Typography>
                {address.landmark && (
                    <Typography variant="body2" color="text.secondary">
                        Landmark: {address.landmark}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );

    const renderTextField = (label, value, readOnly = false, multiline = false) => (
        <TextField
            fullWidth
            required={!readOnly && (label === 'Pincode' || label === 'Address Line 1')}
            label={label}
            value={value}
            multiline={multiline}
            rows={multiline ? 2 : 1}
            disabled={isLoading && readOnly}
            size="small"
            InputProps={{ 
                readOnly,
                sx: { fontSize: '1.05rem', py: 0.8 }
            }}
            InputLabelProps={{ sx: { fontSize: '1.05rem' } }}
            onChange={label === 'Pincode' ? handlePincodeChange : (e) => {
                const key = label === 'Address Line 1' ? 'addressLine1' :
                            label === 'Address Line 2' ? 'addressLine2' :
                            label === 'Landmark' ? 'landmark' :
                            label.toLowerCase();
                setNewAddress({ ...newAddress, [key]: e.target.value });
            }}
            sx={textFieldStyle}
        />
    );

    return (
        <Container maxWidth="lg" sx={{ mt: { xs: 0, sm: 0, md: 0 }, mb: { xs: 4, sm: 6, md: 8 }, minHeight: 'calc(100vh - 270px)', px: { xs: 1, sm: 2, md: 0 } }}>
            <Paper 
                elevation={0}
                sx={{
                    p: { xs: 1.5, sm: 3, md: 4 },
                    borderRadius: { xs: '14px', sm: '20px' },
                    backgroundColor: '#fff'
                }}
            >
                <Typography variant="h4" sx={{ mb: { xs: 2, sm: 4 }, fontWeight: 600, color: '#FFB800', fontSize: { xs: '1.3rem', sm: '2rem' } }}>
                    My Addresses
                </Typography>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress sx={{ color: '#FFB800' }} />
                    </Box>
                ) : (
                    <>
                        {/* Add New Address Button */}
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => setIsAddingNew(true)}
                            sx={{
                                mb: { xs: 2, sm: 4 },
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
                        <Grid container spacing={{ xs: 2, sm: 3 }}>
                            {addresses.length > 0 ? (
                                addresses.map((address) => (
                                    <Grid item xs={12} sm={12} md={6} key={address.id}>
                                        <Card sx={{ borderRadius: { xs: '10px', sm: '16px' }, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                            <CardContent>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        {address.type === 'home' ? 
                                                            <HomeIcon sx={{ color: '#FFB800', fontSize: { xs: 22, sm: 28 } }} /> : 
                                                            <BusinessIcon sx={{ color: '#FFB800', fontSize: { xs: 22, sm: 28 } }} />
                                                        }
                                                        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.15rem' } }}>{address.type.toUpperCase()}</Typography>
                                                    </Box>
                                                    <IconButton onClick={() => handleDeleteAddress(address.id)} size="small">
                                                        <DeleteIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                                                    </IconButton>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>{address.address}</Typography>
                                                {address.addressLine2 && (
                                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>{address.addressLine2}</Typography>
                                                )}
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                                                    {address.city}, {address.district}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                                                    {address.region}, {address.state} - {address.pincode}
                                                </Typography>
                                                {address.landmark && (
                                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
                                                        Landmark: {address.landmark}
                                                    </Typography>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Typography variant="body1" color="text.secondary" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                                        No addresses found. Add your first address!
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </>
                )}

                {/* Simplified Add New Address Dialog */}
                <Dialog 
                    open={isAddingNew} 
                    onClose={() => {
                        setIsAddingNew(false);
                        resetForm();
                    }}
                    maxWidth="sm"
                    fullWidth
                    scroll="paper"
                    PaperProps={{ sx: { maxHeight: { xs: '95vh', sm: '90vh' }, minHeight: { xs: '60vh', sm: '55vh' }, overflowY: 'auto', borderRadius: { xs: '10px', sm: '16px' }, p: { xs: 1, sm: 2 } } }}
                >
                    <DialogTitle sx={{ color: '#FFB800', fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>Add New Address</DialogTitle>
                    <DialogContent
                    >
                        <Grid container spacing={{ xs: 1, sm: 1.5 }} sx={{ mt: 1 }}>
                            <Grid item xs={12}>
                                <RadioGroup
                                    row
                                    value={newAddress.type}
                                    onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                                >
                                    {['home', 'work', 'other'].map(type => (
                                        <FormControlLabel 
                                            key={type}
                                            value={type}
                                            control={<Radio sx={{ color: '#FFB800', '&.Mui-checked': { color: '#FFB800' }, p: { xs: 0.5, sm: 1 } }} />} 
                                            label={<Typography sx={{ fontSize: { xs: '0.95rem', sm: '1.05rem' } }}>{type.charAt(0).toUpperCase() + type.slice(1)}</Typography>}
                                            sx={{ mr: { xs: 1, sm: 2 } }}
                                        />
                                    ))}
                                </RadioGroup>
                            </Grid>

                            <Grid item xs={12}>
                                {renderTextField('Pincode', newAddress.pincode)}
                            </Grid>

                            {isPincodeValid && (
                                <>
                                    <Grid item xs={12}>
                                        {renderTextField('Address Line 1', newAddress.addressLine1, false, true)}
                                    </Grid>
                                    <Grid item xs={12}>
                                        {renderTextField('Address Line 2', newAddress.addressLine2, false, true)}
                                    </Grid>
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
                                        {renderTextField('Landmark', newAddress.landmark, false, true)}
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
                            sx={{ color: '#FFB800', fontSize: { xs: '0.95rem', sm: '1rem' }, px: { xs: 1.5, sm: 2 } }}
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
                                fontSize: { xs: '0.95rem', sm: '1rem' },
                                px: { xs: 2, sm: 3 },
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
                        sx={{ width: '100%', fontSize: { xs: '0.95rem', sm: '1rem' } }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default MyAddresses; 