import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Button,
    CircularProgress
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const AddressSelectionModal = ({ 
    open, 
    onClose, 
    onDetectLocation, 
    isLoading 
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    width: '100%',
                    maxWidth: '400px',
                    p: 2
                }
            }}
        >
            <DialogTitle sx={{ 
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#000',
                pb: 1
            }}>
                Choose Location
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ 
                    fontFamily: "'Outfit', sans-serif",
                    color: '#666',
                    mb: 3
                }}>
                    Let us detect your location to serve you better
                </DialogContentText>
                <Button
                    fullWidth
                    onClick={onDetectLocation}
                    disabled={isLoading}
                    sx={{
                        py: 2,
                        backgroundColor: 'rgba(255, 184, 0, 0.1)',
                        color: '#000',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 184, 0, 0.3)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 184, 0, 0.2)',
                            border: '1px solid rgba(255, 184, 0, 0.5)',
                        }
                    }}
                    startIcon={
                        isLoading ? (
                            <CircularProgress size={20} thickness={4} sx={{ color: '#ffb800' }} />
                        ) : (
                            <MyLocationIcon sx={{ color: '#ffb800' }} />
                        )
                    }
                >
                    {isLoading ? 'Detecting Location...' : 'Detect My Location'}
                </Button>
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 0 }}>
                <Button 
                    onClick={onClose}
                    sx={{ 
                        color: '#666',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        }
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddressSelectionModal; 