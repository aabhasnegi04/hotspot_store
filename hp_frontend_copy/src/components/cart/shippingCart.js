import React from 'react';
import { Box, Grid, Paper, Typography, Button, TextField, Divider, Alert, Link, Radio, FormControlLabel } from '@mui/material';
import PaymentButton from './PaymentButton';

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
                                <Alert severity="error" sx={{ mb: 2, maxWidth: 500 }}>
                                    Looks like there's no billing address. <Link href="#" underline="hover">click here</Link> to add a new address
                                </Alert>
                                <Typography sx={styles.sectionTitle}>Shipping Address</Typography>
                                <Typography variant="body2" color="text.secondary">Mobile:</Typography>
                                <Link href="#" underline="hover">Add Address</Link>
                            </Paper>
                        </Grid>
                        {/* Contact Information */}
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{ ...styles.paper, p: 2 }}>
                                <Typography sx={styles.sectionTitle}>Contact Information</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField label="Email Id *" fullWidth size="small" />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField label="Mobile Number *" fullWidth size="small" InputProps={{ startAdornment: <span style={{ marginRight: 8 }}>+91</span> }} />
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
