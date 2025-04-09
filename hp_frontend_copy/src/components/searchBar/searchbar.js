import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, Autocomplete, Paper, Typography, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { parsePriceQuery, getMatchingPriceSuggestions } from './priceRangeSearch';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const styles = {
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        width: { 
            xs: '100%',
            sm: '300px',
            md: '400px',
            lg: '500px'
        },
        height: '40px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        ml: { xs: 0, md: 2 },
        border: '1px solid #e0e0e0',
        mx: { xs: 2, md: 0 },
        my: { xs: 0, md: 0 },
    },
    searchInput: {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            color: '#000000',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            fontSize: '0.95rem',
            height: '40px',
            backgroundColor: 'transparent',
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': { borderColor: 'transparent' },
            '&.Mui-focused fieldset': { borderColor: 'transparent' },
        },
        '& .MuiOutlinedInput-input': {
            padding: '8px 12px',
            '&::placeholder': {
                color: '#757575',
                opacity: 1,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 400,
                fontSize: '0.95rem',
            }
        }
    },
    optionIcon: {
        width: 40,
        height: 40,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(255,184,0,0.1) 0%, rgba(255,184,0,0.2) 100%)',
        boxShadow: '0 2px 8px rgba(255,184,0,0.15)'
    },
    dropdownPaper: {
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        borderRadius: '16px',
        mt: 1,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.8)',
        backdropFilter: 'blur(8px)',
        background: 'rgba(255,255,255,0.95)',
        '& .MuiAutocomplete-listbox': {
            maxHeight: '280px',
            padding: 0,
            overflowX: 'hidden',
            '::-webkit-scrollbar': {
                width: '6px',
            },
            '::-webkit-scrollbar-track': {
                background: 'rgba(255,184,0,0.05)',
                margin: '4px',
                borderRadius: '100px',
            },
            '::-webkit-scrollbar-thumb': {
                background: 'rgba(255,184,0,0.2)',
                borderRadius: '100px',
                border: '2px solid rgba(255,255,255,0.95)',
                backgroundClip: 'padding-box',
                minHeight: '40px',
                '&:hover': {
                    background: 'rgba(255,184,0,0.3)',
                    border: '1.5px solid rgba(255,255,255,0.95)',
                },
            },
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255, 184, 0, 0.2) rgba(255,184,0,0.05)',
        },
    },
    searchButton: {
        color: '#FFB800',
        p: '8px',
        mr: 1,
        '&:hover': {
            backgroundColor: 'rgba(255, 184, 0, 0.08)',
        }
    }
};

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.length < 1) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            setIsLoading(true);
            try {
                // Get price range suggestions
                const priceSuggestions = getMatchingPriceSuggestions(searchTerm);
                
                // Get regular search suggestions from backend
                const response = await fetch(`${API_BASE_URL}/api/search/suggestions?query=${encodeURIComponent(searchTerm)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch suggestions');
                }
                const data = await response.json();
                
                // Transform regular suggestions to match the expected format
                const regularSuggestions = data.map(item => ({
                    type: 'product',
                    label: item.ItemName,
                    value: item.ItemCode,
                    item: item
                }));
                
                // Combine both types of suggestions
                const allSuggestions = [...priceSuggestions, ...regularSuggestions];
                setSuggestions(allSuggestions);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleOptionSelect = (event, option) => {
        if (!option) return;

        if (option.type === 'price-suggestion') {
            navigate(`/price-range/${option.range}`);
        } else if (option.type === 'product') {
            // Navigate to product detail page if ItemCode exists
            if (option.item.ItemCode) {
                navigate(`/product/${option.item.ItemCode}`);
            } else {
                // Handle regular search
                // You can implement your search logic here
                console.log('Searching for:', option.label);
            }
        }
    };

    const handleSearch = () => {
        const parsedPrice = parsePriceQuery(searchTerm);
        if (parsedPrice?.isPriceQuery) {
            navigate(`/price-range/${parsedPrice.priceRange}`);
        } else if (searchTerm.trim()) {
            // Implement your search logic here
            console.log('Performing search for:', searchTerm);
        }
    };

    const getOptionLabel = (option) => {
        if (typeof option === 'string') return option;
        return option.label || '';
    };

    const renderOption = (props, option) => {
        if (option.type === 'price-suggestion') {
            return (
                <Box component="li" {...props} sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    '&:hover': {
                        background: 'linear-gradient(45deg, rgba(255,184,0,0.05) 0%, rgba(255,184,0,0.1) 100%)',
                        transform: 'translateX(5px)'
                    }
                }}>
                    <Box sx={styles.optionIcon}>
                        <CurrencyRupeeIcon sx={{ color: '#FFB800', fontSize: '1.4rem' }} />
                    </Box>
                    <Box>
                        <Typography sx={{ 
                            fontWeight: 600, 
                            color: '#2c2c2c', 
                            fontSize: '0.95rem'
                        }}>
                            {option.label}
                        </Typography>
                        <Typography sx={{ 
                            fontSize: '0.8rem', 
                            color: '#666', 
                            mt: 0.5 
                        }}>
                            View all products in this range
                        </Typography>
                    </Box>
                </Box>
            );
        }
        
        // Render product suggestions
        return (
            <Box component="li" {...props} sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                cursor: 'pointer',
                '&:hover': {
                    background: 'linear-gradient(45deg, rgba(255,184,0,0.05) 0%, rgba(255,184,0,0.1) 100%)',
                    transform: 'translateX(5px)'
                }
            }}>
                <Box sx={styles.optionIcon}>
                    <LocalOfferIcon sx={{ color: '#FFB800', fontSize: '1.4rem' }} />
                </Box>
                <Box>
                    <Typography sx={{ 
                        fontWeight: 600, 
                        color: '#2c2c2c', 
                        fontSize: '0.95rem' 
                    }}>
                        {option.label}
                    </Typography>
                    {option.item?.Brand && (
                        <Typography sx={{ 
                            fontSize: '0.8rem', 
                            color: '#666', 
                            mt: 0.5 
                        }}>
                            {option.item.Brand}
                        </Typography>
                    )}
                </Box>
            </Box>
        );
    };

    return (
        <Box sx={styles.searchBar}>
            <Autocomplete
                freeSolo
                options={suggestions}
                loading={isLoading}
                onInputChange={(_, newValue) => setSearchTerm(newValue)}
                onChange={handleOptionSelect}
                getOptionLabel={getOptionLabel}
                renderOption={renderOption}
                filterOptions={(x) => x}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search for products..."
                        size="small"
                        sx={styles.searchInput}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isLoading && <CircularProgress size={20} sx={{ color: '#FFB800' }} />}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                PaperComponent={props => <Paper {...props} elevation={6} sx={styles.dropdownPaper} />}
                sx={{ 
                    width: '100%', 
                    '& .MuiAutocomplete-endAdornment': { right: '8px' },
                    '& .MuiAutocomplete-popper': {
                        width: { xs: 'calc(100vw - 32px)', md: 'auto' }
                    }
                }}
            />
            <IconButton 
                sx={styles.searchButton}
                onClick={handleSearch}
            >
                <SearchIcon />
            </IconButton>
        </Box>
    );
};

export default SearchBar;
