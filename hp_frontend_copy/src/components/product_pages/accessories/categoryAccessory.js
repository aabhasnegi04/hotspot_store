import React, { useState, useEffect } from 'react';
import { 
    Box, Container, Grid, Card, CardMedia, CardContent, Typography, 
    Alert, FormControlLabel, Checkbox, Slider, Divider, Paper 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import LuxuryLoader from '../../common/LuxuryLoader';
import { API_BASE_URL } from '../../../config';

// Reuse styles from brandAccessories
const styles = {
    gradientBg: {
        background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)',
        minHeight: '100vh',
        mt: '-20px',
        width: '100vw',
        overflowX: 'hidden'
    },
    container: {
        py: { xs: 3, sm: 4, md: 5 },
        px: { xs: 2, sm: 4, md: 6 },
        width: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
        background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)'
    },
    gradientText: {
        fontWeight: 700,
        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textTransform: 'capitalize',
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: '-0.5px'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 215, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(255, 215, 0, 0.12)',
            background: 'rgba(255, 255, 255, 1)'
        }
    }
};

// Reuse FiltersSection from brandAccessories
const FiltersSection = ({ 
    priceRange, 
    priceBoundaries, 
    inStockOnly, 
    selectedBrands,
    availableBrands,
    onPriceChange, 
    onStockChange,
    onBrandChange
}) => {
    const priceRanges = [
        { label: 'Under ₹1,000', range: [0, 1000] },
        { label: '₹1,000 - ₹2,000', range: [1000, 2000] },
        { label: '₹2,000 - ₹5,000', range: [2000, 5000] },
        { label: '₹5,000 - ₹10,000', range: [5000, 10000] },
        { label: 'Above ₹10,000', range: [10000, Infinity] }
    ];

    const handlePriceChange = (range) => {
        const isSelected = priceRange.some(r => r[0] === range[0] && r[1] === range[1]);
        if (isSelected) {
            // Remove the range if it's already selected
            onPriceChange(priceRange.filter(r => !(r[0] === range[0] && r[1] === range[1])));
        } else {
            // Add the new range
            onPriceChange([...priceRange, range]);
        }
    };

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(255, 215, 0, 0.1)' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Filters</Typography>
            
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Brands</Typography>
                <Box sx={{ 
                    maxHeight: '120px', 
                    overflowY: 'auto',
                    pr: 1,
                    pl: 0.5,
                    ml: 0,
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(183, 149, 11, 0.3)',
                        borderRadius: '2px',
                    }
                }}>
                    {availableBrands.map((brand) => (
                        <FormControlLabel
                            key={brand}
                            control={
                                <Checkbox
                                    checked={selectedBrands.includes(brand)}
                                    onChange={(e) => onBrandChange(brand, e.target.checked)}
                                    sx={{ 
                                        color: '#b7950b',
                                        '&.Mui-checked': { color: '#b7950b' },
                                        padding: '4px',
                                        ml: 0
                                    }}
                                    size="small"
                                />
                            }
                            label={brand}
                            sx={{ 
                                display: 'block',
                                mb: 0.5,
                                ml: 0,
                                '& .MuiFormControlLabel-label': {
                                    fontSize: '0.85rem',
                                    color: '#666'
                                }
                            }}
                        />
                    ))}
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" sx={{ mb: 2 }}>Price Range</Typography>
                {priceRanges.map((range, index) => (
                    <FormControlLabel
                        key={index}
                        control={
                            <Checkbox 
                                checked={priceRange.some(r => r[0] === range.range[0] && r[1] === range.range[1])}
                                onChange={() => handlePriceChange(range.range)}
                                sx={{ color: '#b7950b', '&.Mui-checked': { color: '#b7950b' } }}
                            />
                        }
                        label={range.label}
                        sx={{ display: 'block', mb: 1 }}
                    />
                ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <FormControlLabel
                control={
                    <Checkbox 
                        checked={inStockOnly}
                        onChange={onStockChange}
                        sx={{ color: '#b7950b', '&.Mui-checked': { color: '#b7950b' } }}
                    />
                }
                label="In Stock Only"
            />
        </Paper>
    );
};

// Reuse ProductCard from brandAccessories
const ProductCard = ({ accessory, onClick }) => (
    <Card elevation={0} onClick={onClick} sx={styles.card}>
        <Box sx={{ position: 'relative', paddingTop: '100%' }}>
            <CardMedia
                component="img"
                image={accessory.imgname11}
                alt={accessory.ItemName}
                sx={{ position: 'absolute', top: 0, height: '100%', width: '100%', objectFit: 'contain', padding: '20px' }}
            />
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{accessory.ItemName}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {accessory.Brand} - {accessory.MODEL}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#b7950b' }}>
                        ₹{Number(accessory.SalePrice).toLocaleString('en-IN')}
                    </Typography>
                    {accessory.DiscountValue > 0 && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#666' }}>
                            ₹{Number(accessory.CurrentMRP).toLocaleString('en-IN')}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ color: accessory.QUANTITY > 0 ? '#4caf50' : '#f44336', fontWeight: 600 }}>
                        {accessory.QUANTITY > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                    {accessory.QUANTITY > 0 && (
                        <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                            {accessory.QUANTITY} units left
                        </Typography>
                    )}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const CategoryAccessory = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [accessories, setAccessories] = useState([]);
    const [filteredAccessories, setFilteredAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [availableBrands, setAvailableBrands] = useState([]);
    const [priceBoundaries, setPriceBoundaries] = useState({ min: 0, max: 100000 });
    const [priceRange, setPriceRange] = useState([]);

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/category-accessories/${category}`);
                if (!response.ok) throw new Error(`Failed to fetch accessories (${response.status})`);
                const data = await response.json();
                setAccessories(data);
                setFilteredAccessories(data);

                // Set price boundaries based on actual data
                if (data.length > 0) {
                    const prices = data.map(item => Number(item.SalePrice) || 0);
                    const minPrice = Math.floor(Math.min(...prices));
                    const maxPrice = Math.ceil(Math.max(...prices));
                    setPriceBoundaries({ min: minPrice, max: maxPrice });
                }
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [category]);

    // Extract unique brands when data is loaded
    useEffect(() => {
        if (accessories.length) {
            const brands = [...new Set(accessories.map(item => item.Brand))].sort();
            setAvailableBrands(brands);
        }
    }, [accessories]);

    // Handle brand filter changes
    const handleBrandChange = (brand, isChecked) => {
        setSelectedBrands(prev => 
            isChecked 
                ? [...prev, brand]
                : prev.filter(b => b !== brand)
        );
    };

    // Update filter logic
    useEffect(() => {
        const filtered = accessories.filter(item => {
            const price = Number(item.SalePrice) || 0;
            const inPriceRange = priceRange.length === 0 || priceRange.some(range => 
                price >= range[0] && (range[1] === Infinity ? true : price <= range[1])
            );
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.Brand);
            return inPriceRange && 
                   (!inStockOnly || item.QUANTITY > 0) && 
                   matchesBrand;
        });
        
        setFilteredAccessories(filtered);
    }, [accessories, priceRange, inStockOnly, selectedBrands]);

    if (loading) return <LuxuryLoader message={`Loading ${category} Accessories`} />;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>Error loading accessories: {error}</Alert>;
    if (!loading && !accessories.length) {
        return (
            <Box sx={styles.gradientBg}>
                <Container 
                    sx={{ 
                        height: 'calc(100vh - 70px)', // Full height minus header
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            ...styles.gradientText,
                            mb: 2,
                            textAlign: 'center'
                        }}
                    >
                        No accessories found
                    </Typography>
                    <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            color: '#666', 
                            textAlign: 'center',
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: '1.1rem'
                        }}
                    >
                        We couldn't find any accessories in {category}
                    </Typography>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={styles.gradientBg}>
            <Container maxWidth={false} sx={styles.container}>
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{
                        ...styles.gradientText,
                        mb: 1
                    }}>
                        {category}
                    </Typography>
                    <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            color: '#666', 
                            maxWidth: 600, 
                            mx: 'auto', 
                            fontSize: '1.1rem',
                            fontFamily: "'Outfit', sans-serif",
                            mb: 2
                        }}
                    >
                        Explore our collection of {category}
                    </Typography>
                </Box>

                <Grid container spacing={0}>
                    <Grid item xs={12} md={2} sx={{ pr: 0 }}>
                        <FiltersSection 
                            priceRange={priceRange}
                            priceBoundaries={priceBoundaries}
                            inStockOnly={inStockOnly}
                            selectedBrands={selectedBrands}
                            availableBrands={availableBrands}
                            onPriceChange={setPriceRange}
                            onStockChange={(e) => setInStockOnly(e.target.checked)}
                            onBrandChange={handleBrandChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={10} sx={{ pl: 3 }}>
                        <Grid container spacing={2}>
                            {filteredAccessories.map((accessory) => (
                                <Grid item xs={12} sm={6} md={3} key={accessory.ItemCode}>
                                    <ProductCard 
                                        accessory={accessory}
                                        onClick={() => navigate(`/product/${accessory.ItemCode}`)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CategoryAccessory;
