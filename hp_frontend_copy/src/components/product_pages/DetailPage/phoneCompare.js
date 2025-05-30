import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    Fade,
    Zoom,
} from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { API_BASE_URL } from '../../../config';
import axios from 'axios';

// Custom Paper for Autocomplete dropdown
const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: 16,
    boxShadow: '0 8px 32px 0 rgba(183, 149, 11, 0.10)',
    background: 'rgba(255,255,255,0.98)',
    marginTop: 8,
    padding: 0,
    '& .MuiAutocomplete-listbox': {
        padding: 0,
        maxHeight: 320,
        // Custom scrollbar
        scrollbarWidth: 'thin',
        scrollbarColor: '#B7950B #f5f5f5',
        '&::-webkit-scrollbar': {
            width: 8,
            background: '#f5f5f5',
            borderRadius: 8,
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#B7950B',
            borderRadius: 8,
        },
    },
}));

// Custom option styling
const StyledOption = styled('li')(({ theme }) => ({
    padding: '14px 20px',
    fontSize: '1.08rem',
    fontWeight: 500,
    color: '#222',
    borderBottom: '1px solid #f3e9c7',
    transition: 'background 0.18s',
    cursor: 'pointer',
    '&[aria-selected="true"]': {
        background: 'rgba(183, 149, 11, 0.10)',
        color: '#B7950B',
        fontWeight: 700,
    },
    '&:hover': {
        background: 'rgba(183, 149, 11, 0.13)',
        color: '#B7950B',
    },
    '&:last-child': {
        borderBottom: 'none',
    },
}));

const PhoneCompare = ({ currentPhoneId }) => {
    const [phones, setPhones] = useState([]);
    const [selectedPhones, setSelectedPhones] = useState([currentPhoneId]);
    const [comparisonData, setComparisonData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all available phones
    useEffect(() => {
        const fetchPhones = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/phone-compare/phones`);
                setPhones(response.data);
            } catch (err) {
                setError('Failed to fetch phones');
                console.error('Error fetching phones:', err);
            }
        };
        fetchPhones();
    }, []);

    // Fetch comparison data when selected phones change
    useEffect(() => {
        const fetchComparisonData = async () => {
            if (selectedPhones.length < 2) return;
            
            setLoading(true);
            try {
                const response = await axios.post(`${API_BASE_URL}/api/phone-compare/compare`, {
                    phoneIds: selectedPhones
                });
                setComparisonData(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to compare phones');
                console.error('Error comparing phones:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchComparisonData();
    }, [selectedPhones]);

    const handlePhoneSearch = (selectedPhone, index) => {
        const newSelectedPhones = [...selectedPhones];
        newSelectedPhones[index] = selectedPhone ? selectedPhone.PhoneID : '';
        setSelectedPhones(newSelectedPhones);
    };

    const addPhoneToCompare = () => {
        if (selectedPhones.length < 4) {
            setSelectedPhones([...selectedPhones, '']);
        }
    };

    const removePhoneFromCompare = (index) => {
        const newSelectedPhones = selectedPhones.filter((_, i) => i !== index);
        setSelectedPhones(newSelectedPhones);
    };

    const comparisonFields = [
        { label: 'Brand', key: 'Brand' },
        { label: 'Model', key: 'Model' },
        { label: 'Price', key: 'Price', format: (value) => `₹${value.toLocaleString('en-IN')}` },
        { label: 'RAM', key: 'RAM' },
        { label: 'Storage', key: 'Storage' },
        { label: 'Processor', key: 'Processor' },
        { label: 'Battery', key: 'Battery' },
        { label: 'Camera', key: 'CameraSpecs' },
        { label: 'Display', key: 'Display' },
        { label: 'OS', key: 'OS' },
        { label: 'Release Date', key: 'ReleaseDate', format: (value) => new Date(value).toLocaleDateString() },
    ];

    return (
        <Box sx={{ 
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            padding: { xs: 2, md: 4 }
        }}>
            {/* Phone Selection Section */}
            <Paper 
                elevation={3}
                sx={{ 
                    p: { xs: 2, md: 4 },
                    mb: 4,
                    background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.05) 0%, rgba(255, 215, 0, 0.02) 100%)',
                    borderRadius: 2,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(183, 149, 11, 0.1)',
                    }
                }}
            >
                <Typography 
                    variant="h5" 
                    sx={{ 
                        mb: 3,
                        color: '#B7950B',
                        fontWeight: 700,
                        textAlign: 'center',
                        letterSpacing: '0.5px'
                    }}
                >
                    Select Phones to Compare
                </Typography>
                <Grid container spacing={3} alignItems="center">
                    {selectedPhones.map((phoneId, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                                <Box>
                                    <Autocomplete
                                        size="small"
                                        fullWidth
                                        options={phones}
                                        getOptionLabel={(option) =>
                                            option.Brand && option.Model
                                                ? `${option.Brand} ${option.Model}`
                                                : ''
                                        }
                                        value={phones.find((p) => p.PhoneID === phoneId) || null}
                                        onChange={(_, newValue) => handlePhoneSearch(newValue, index)}
                                        renderInput={(params) => (
                                            <TextField 
                                                {...params} 
                                                label={`Phone ${index + 1}`}
                                                variant="outlined"
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#B7950B',
                                                            borderWidth: 2,
                                                        },
                                                        '&:hover fieldset': {
                                                            borderColor: '#FFD700',
                                                        },
                                                        '&.Mui-focused fieldset': {
                                                            borderColor: '#B7950B',
                                                            boxShadow: '0 0 0 2px rgba(183, 149, 11, 0.10)',
                                                        },
                                                        background: 'rgba(255,255,255,0.95)',
                                                        borderRadius: 2,
                                                        minHeight: '40px',
                                                        height: '40px',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: '#B7950B',
                                                        fontWeight: 600,
                                                        fontSize: '0.95rem',
                                                    },
                                                    '& .MuiInputBase-input': {
                                                        fontWeight: 600,
                                                        color: '#222',
                                                        fontSize: '1rem',
                                                    },
                                                }}
                                            />
                                        )}
                                        isOptionEqualToValue={(option, value) => option.PhoneID === value.PhoneID}
                                        disableClearable={false}
                                        disabled={phones.length === 0}
                                        PaperComponent={StyledPaper}
                                        renderOption={(props, option, { selected }) => (
                                            <StyledOption {...props} aria-selected={selected}>
                                                {option.Brand} {option.Model}
                                            </StyledOption>
                                        )}
                                    />
                                </Box>
                            </Zoom>
                        </Grid>
                    ))}
                    {selectedPhones.length < 4 && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Zoom in={true} style={{ transitionDelay: `${selectedPhones.length * 100}ms` }}>
                                <Button
                                    variant="outlined"
                                    onClick={addPhoneToCompare}
                                    fullWidth
                                    sx={{
                                        height: '56px',
                                        borderColor: 'rgba(183, 149, 11, 0.5)',
                                        color: '#B7950B',
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: '#B7950B',
                                            backgroundColor: 'rgba(183, 149, 11, 0.08)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(183, 149, 11, 0.15)',
                                        },
                                    }}
                                >
                                    Add Phone
                                </Button>
                            </Zoom>
                        </Grid>
                    )}
                </Grid>
            </Paper>

            {/* Comparison Table */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress sx={{ color: '#B7950B' }} />
                </Box>
            ) : error ? (
                <Fade in={true}>
                    <Alert 
                        severity="error" 
                        sx={{ 
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        {error}
                    </Alert>
                </Fade>
            ) : comparisonData.length > 0 ? (
                <Fade in={true}>
                    <TableContainer 
                        component={Paper} 
                        elevation={3}
                        sx={{ 
                            background: 'linear-gradient(145deg, rgba(255, 215, 0, 0.02) 0%, rgba(255, 215, 0, 0.05) 100%)',
                            borderRadius: 2,
                            overflow: 'hidden',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                boxShadow: '0 8px 24px rgba(183, 149, 11, 0.1)',
                            }
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ 
                                        backgroundColor: 'rgba(183, 149, 11, 0.1)',
                                        fontWeight: 700,
                                        color: '#B7950B',
                                        fontSize: '1.1rem',
                                        padding: '16px 24px'
                                    }}>
                                        Features
                                    </TableCell>
                                    {comparisonData.map((phone, index) => (
                                        <TableCell 
                                            key={phone.PhoneID}
                                            sx={{ 
                                                backgroundColor: 'rgba(183, 149, 11, 0.1)',
                                                fontWeight: 600,
                                                color: '#B7950B',
                                                padding: '16px 24px',
                                                borderRight: index !== comparisonData.length - 1 ? '1px solid #e0e0e0' : 'none',
                                            }}
                                        >
                                            <Box sx={{ 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                alignItems: 'center',
                                                gap: 1
                                            }}>
                                                <Typography 
                                                    variant="subtitle1" 
                                                    sx={{ 
                                                        fontWeight: 700,
                                                        fontSize: '1.1rem'
                                                    }}
                                                >
                                                    {phone.Brand} {phone.Model}
                                                </Typography>
                                                <Button
                                                    size="small"
                                                    onClick={() => removePhoneFromCompare(index)}
                                                    sx={{ 
                                                        color: 'error.main',
                                                        transition: 'all 0.2s ease',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(211, 47, 47, 0.08)',
                                                            transform: 'scale(1.05)'
                                                        }
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {comparisonFields.map((field) => (
                                    <TableRow 
                                        key={field.key}
                                        sx={{
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: 'rgba(183, 149, 11, 0.02)',
                                            },
                                            '&:hover': {
                                                backgroundColor: 'rgba(183, 149, 11, 0.04)',
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ 
                                            fontWeight: 600,
                                            color: '#666',
                                            padding: '16px 24px'
                                        }}>
                                            {field.label}
                                        </TableCell>
                                        {comparisonData.map((phone, index) => (
                                            <TableCell 
                                                key={`${phone.PhoneID}-${field.key}`}
                                                sx={{ 
                                                    padding: '16px 24px',
                                                    borderRight: index !== comparisonData.length - 1 ? '1px solid #e0e0e0' : 'none',
                                                }}
                                            >
                                                {field.format ? field.format(phone[field.key]) : phone[field.key]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Fade>
            ) : selectedPhones.length >= 2 ? (
                <Fade in={true}>
                    <Alert 
                        severity="info" 
                        sx={{ 
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                    >
                        Select at least 2 phones to compare
                    </Alert>
                </Fade>
            ) : null}
        </Box>
    );
};

export default PhoneCompare;
