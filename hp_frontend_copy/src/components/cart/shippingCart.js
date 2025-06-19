import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Button, TextField, Divider, Alert, Link, Radio, FormControlLabel, RadioGroup, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add as AddIcon, SwapHoriz as SwapHorizIcon } from '@mui/icons-material';
import PaymentButton from './PaymentButton';
import { API_BASE_URL } from '../../config';

const styles = {
    paper: {
        p: 4,
        borderRadius: '20px',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f8 100%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
    },
    button: {
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
    },
    sectionTitle: {
        fontWeight: 700,
        color: '#000',
        mb: 2,
    }
};

const ShippingCart = ({ cartItems = [], orderSummary = {}, onBackToCart }) => {
    // User info and address state
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState('');
    const [loadingAddresses, setLoadingAddresses] = useState(true);
    const [userInfo, setUserInfo] = useState({ email: '', mobileNo: '' });
    const [showAllAddresses, setShowAllAddresses] = useState(false);
    const [openAddressDialog, setOpenAddressDialog] = useState(false);
    const [tempSelectedAddressId, setTempSelectedAddressId] = useState('');

    useEffect(() => {
        let userData = {};
        try {
            userData = JSON.parse(localStorage.getItem('userData')) || {};
        } catch (e) {}
        const email = userData.email || '';
        const mobileNo = userData.mobileno || userData.mobileNo || userData.mobile || '';
        setUserInfo({ email, mobileNo });

        console.log('userData:', userData);
        console.log('mobileNo used for address fetch:', mobileNo);

        if (mobileNo) {
            fetchAddresses(mobileNo);
        } else {
            setLoadingAddresses(false);
        }
    }, []);

    const fetchAddresses = async (mobileNo) => {
        setLoadingAddresses(true);
        try {
            console.log('Fetching addresses for:', mobileNo);
            const response = await fetch(`${API_BASE_URL}/api/address/get-addresses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileNo })
            });
            const data = await response.json();
            console.log('Fetched addresses:', data);
            if (data.success && Array.isArray(data.addresses)) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) {
                    setSelectedAddressId(data.addresses[0].SRNO || '');
                    console.log('First address object:', data.addresses[0]);
                }
            }
        } catch (e) {
            // handle error
        }
        setLoadingAddresses(false);
    };

    const handleAddressChange = (e) => {
        setSelectedAddressId(e.target.value);
    };

    // Find the newest address (highest SRNO)
    const newestAddress = addresses.reduce((max, addr) => (addr.SRNO > (max?.SRNO || 0) ? addr : max), addresses[0] || null);
    // Show the selected address (default to newest)
    const selectedAddress = addresses.find(addr => addr.SRNO === selectedAddressId) || newestAddress;

    return (
        <Box sx={{ mt: 2, mb: 8 }}>
            <Grid container spacing={3} justifyContent="center">
                {/* Left Column: Main   Content (Shipping, Billing, Contact, Delivery) */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {/* Top Row: Back to Cart (left) and Shipping Address (right) */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderRadius: '8px',
                                        color: '#FFD700',
                                        borderColor: '#FFD700',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        fontSize: '1.2rem',
                                        py: 5,
                                        px: 8,
                                        minWidth: 0,
                                        '&:hover': { borderColor: '#FFA500', color: '#FFA500' },
                                    }}
                                    onClick={onBackToCart}
                                >
                                    <span style={{ color: 'inherit', fontWeight: 700, fontSize: '1.1em', marginRight: 8 }}>←</span>
                                    Back to Cart
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={1} sx={{ ...styles.paper, p: 2, height: '100%' }}>
                                {loadingAddresses ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 80 }}>
                                        <CircularProgress size={28} />
                                    </Box>
                                ) : addresses.length === 0 ? (
                                    <>
                                        <Alert severity="error" sx={{ mb: 2, maxWidth: 500 }}>
                                            Looks like there's no billing address. <Link href="#" underline="hover">click here</Link> to add a new address
                                        </Alert>
                                        <Typography sx={styles.sectionTitle}>Shipping Address</Typography>
                                        <Typography variant="body2" color="text.secondary">Mobile:</Typography>
                                        <Link href="#" underline="hover">Add Address</Link>
                                    </>
                                ) : (
                                    <>
                                        <Typography sx={styles.sectionTitle}>Shipping Address</Typography>
                                        <FormControlLabel
                                            key={selectedAddress.SRNO}
                                            value={selectedAddress.SRNO}
                                            control={<Radio checked sx={{ color: '#FFD700' }} />}
                                            sx={{
                                                alignItems: 'flex-start',
                                                margin: 0,
                                                width: '100%',
                                                '.MuiFormControlLabel-label': { width: '100%' }
                                            }}
                                            label={
                                                <Box
                                                    sx={{
                                                        border: '1.5px solid #FFD700',
                                                        borderRadius: '12px',
                                                        background: '#fffbe6',
                                                        p: 2,
                                                        width: '100%',
                                                        boxShadow: '0 2px 8px rgba(255,215,0,0.04)'
                                                    }}
                                                >
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#B7950B', mb: 0.5, letterSpacing: 0.5 }}>
                                                        {selectedAddress.CATEGORY ? selectedAddress.CATEGORY.toUpperCase() : 'ADDRESS'}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#444', mb: 0.2 }}>{selectedAddress.ADDRESSLINE1}</Typography>
                                                    {selectedAddress.ADDRESSLINE2 && (
                                                        <Typography variant="body2" sx={{ color: '#444', mb: 0.2 }}>{selectedAddress.ADDRESSLINE2}</Typography>
                                                    )}
                                                    <Typography variant="body2" sx={{ color: '#666', mb: 0.2 }}>
                                                        {selectedAddress.CITY}{selectedAddress.CITY && selectedAddress.STATE ? ',' : ''} {selectedAddress.STATE} - {selectedAddress.PINCODE}
                                                    </Typography>
                                                    {selectedAddress.LANDMARK && (
                                                        <Typography variant="body2" sx={{ color: '#888' }}>
                                                            Landmark: {selectedAddress.LANDMARK}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            }
                                        />
                                        {addresses.length > 1 && (
                                            <Box sx={{ mt: 1 }}>
                                                <Button
                                                    variant="text"
                                                    size="small"
                                                    sx={{
                                                        color: '#B7950B',
                                                        textTransform: 'none',
                                                        fontWeight: 500,
                                                        fontSize: '1rem',
                                                        pl: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        '&:hover': { textDecoration: 'underline', background: 'none' }
                                                    }}
                                                    onClick={() => { setOpenAddressDialog(true); setTempSelectedAddressId(selectedAddressId || newestAddress?.SRNO); }}
                                                    startIcon={<SwapHorizIcon sx={{ color: '#B7950B', mr: 1, fontSize: '1.2em' }} />}
                                                >
                                                    Choose another address
                                                </Button>
                                            </Box>
                                        )}
                                        <Box sx={{ mt: 0.5 }}>
                                            <Link
                                                href="#"
                                                underline="hover"
                                                sx={{
                                                    color: '#B7950B',
                                                    fontWeight: 500,
                                                    fontSize: '1rem',
                                                    pl: 0,
                                                    mt: 0.5,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}
                                            >
                                                <AddIcon sx={{ color: '#B7950B', fontSize: '1.2em', mr: 0.5 }} />
                                                Add New Address
                                            </Link>
                                        </Box>

                                        {/* Address Selection Dialog */}
                                        <Dialog open={openAddressDialog} onClose={() => setOpenAddressDialog(false)}>
                                            <DialogTitle>Select Shipping Address</DialogTitle>
                                            <DialogContent>
                                                <RadioGroup value={tempSelectedAddressId} onChange={e => setTempSelectedAddressId(e.target.value)}>
                                                    {addresses.map(addr => (
                                                        <FormControlLabel
                                                            key={addr.SRNO}
                                                            value={addr.SRNO}
                                                            control={<Radio sx={{ color: '#FFD700' }} />}
                                                            label={
                                                                <Box sx={{
                                                                    border: '1px solid #FFD700',
                                                                    borderRadius: '10px',
                                                                    p: 1.2,
                                                                    mb: 1,
                                                                    background: 'rgba(255, 215, 0, 0.04)'
                                                                }}>
                                                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#B7950B', mb: 0.5 }}>
                                                                        {addr.CATEGORY ? addr.CATEGORY.toUpperCase() : 'ADDRESS'}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">{addr.ADDRESSLINE1}</Typography>
                                                                    {addr.ADDRESSLINE2 && (
                                                                        <Typography variant="body2" color="text.secondary">{addr.ADDRESSLINE2}</Typography>
                                                                    )}
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {addr.CITY}{addr.CITY && addr.STATE ? ',' : ''} {addr.STATE} - {addr.PINCODE}
                                                                    </Typography>
                                                                    {addr.LANDMARK && (
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Landmark: {addr.LANDMARK}
                                                                        </Typography>
                                                                    )}
                                                                </Box>
                                                            }
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => setOpenAddressDialog(false)} sx={{ color: '#B7950B' }}>Cancel</Button>
                                                <Button onClick={() => { setSelectedAddressId(Number(tempSelectedAddressId)); setOpenAddressDialog(false); }} variant="contained" sx={{ background: '#FFD700', color: '#000', fontWeight: 600 }}>
                                                    Select
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </>
                                )}
                            </Paper>
                        </Grid>
                        {/* Contact Information */}
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{ ...styles.paper, p: 2 }}>
                                <Typography sx={styles.sectionTitle}>Contact Information</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField label="Email Id *" fullWidth size="small" value={userInfo.email} InputProps={{ readOnly: true }} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField label="Mobile Number *" fullWidth size="small" value={userInfo.mobileNo} InputProps={{ readOnly: true, startAdornment: <span style={{ marginRight: 8 }}>+91</span> }} />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        {/* Delivery Options */}
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{ ...styles.paper, p: 2 }}>
                                <Typography sx={styles.sectionTitle}>Delivery Options</Typography>
                                {cartItems.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                        No products in cart.
                                    </Typography>
                                ) : (
                                    cartItems.map((item, idx) => (
                                        <Box key={item.ORDERID + '-' + item.ITEMCODE} sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: idx === 0 ? 2 : 4 }}>
                                            <img
                                                src={item.image_url}
                                                alt={item.product_name}
                                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                                    {item.ItemName}
                                                </Typography>
                                                <FormControlLabel
                                                    control={<Radio checked sx={{ color: '#FFD700' }} />}
                                                    label={<Typography variant="body2">Standard Delivery in 2 days | Free</Typography>}
                                                />
                                            </Box>
                                        </Box>
                                    ))
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Right Column: Order Summary */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ ...styles.paper, p: 3, position: 'sticky', top: 32 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            Order Summary ({orderSummary.itemCount || 0} item{orderSummary.itemCount === 1 ? '' : 's'})
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body1" color="text.secondary">Original Price</Typography>
                            <Typography variant="body1">₹{(orderSummary.subtotal || 0).toLocaleString('en-IN')}</Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>₹{(orderSummary.subtotal || 0).toLocaleString('en-IN')}</Typography>
                        </Box>
                        <PaymentButton
                            amount={orderSummary.subtotal || 0}
                            email={''} // TODO: Replace with actual user email
                            contact={''} // TODO: Replace with actual user contact
                        />
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                            Delivery charges, if applicable, will be calculated on the next page
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ShippingCart;
