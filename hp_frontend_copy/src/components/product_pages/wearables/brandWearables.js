import React, { useState, useEffect } from 'react';
import { 
    Box, Container, Grid, Card, CardMedia, CardContent, Typography, 
    Alert, FormControlLabel, Checkbox, Slider, Divider, Paper,
    Pagination, Stack 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import LuxuryLoader from '../../common/LuxuryLoader';
import { API_BASE_URL } from '../../../config';

// Styles object for reusable styles
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
        width: 'calc(100% + 24px)',
        marginRight: '-24px',
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

const FiltersSection = ({ priceRange, priceBoundaries, inStockOnly, onPriceChange, onStockChange }) => (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(255, 215, 0, 0.1)' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Filters</Typography>
        
        <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>Price Range</Typography>
            <Slider
                value={priceRange || [0, 100000]}
                onChange={onPriceChange}
                valueLabelDisplay="auto"
                min={priceBoundaries?.min || 0}
                max={priceBoundaries?.max || 100000}
                sx={{ color: '#b7950b' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2">₹{(priceRange?.[0] || 0).toLocaleString('en-IN')}</Typography>
                <Typography variant="body2">₹{(priceRange?.[1] || 100000).toLocaleString('en-IN')}</Typography>
            </Box>
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

const ProductCard = ({ wearable, onClick }) => (
    <Card elevation={0} onClick={onClick} sx={styles.card}>
        <Box sx={{ position: 'relative', paddingTop: '100%' }}>
            <CardMedia
                component="img"
                image={wearable.image}
                alt={wearable.itemName}
                sx={{ position: 'absolute', top: 0, height: '100%', width: '100%', objectFit: 'contain', padding: '20px' }}
            />
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{wearable.itemName}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {wearable.brand} - {wearable.model}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#b7950b' }}>
                        ₹{Number(wearable.salePrice).toLocaleString('en-IN')}
                    </Typography>
                    {wearable.discountValue > 0 && (
                        <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#666' }}>
                            ₹{Number(wearable.currentMRP).toLocaleString('en-IN')}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ color: wearable.quantity > 0 ? '#4caf50' : '#f44336', fontWeight: 600 }}>
                        {wearable.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                    {wearable.quantity > 0 && (
                        <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                            {wearable.quantity} units left
                        </Typography>
                    )}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const BrandWearables = () => {
    const { brand } = useParams();
    const navigate = useNavigate();
    const [wearables, setWearables] = useState([]);
    const [filteredWearables, setFilteredWearables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [priceBoundaries, setPriceBoundaries] = useState({ min: 0, max: 100000 });
    const [page, setPage] = useState(1);
    const itemsPerPage = 24;

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log('Fetching wearables for brand:', brand); // Debug log
                const response = await fetch(`${API_BASE_URL}/api/brand-smartwatches/${brand}`);
                if (!response.ok) throw new Error(`Failed to fetch wearables (${response.status})`);
                const data = await response.json();
                console.log('Received data:', data); // Debug log
                setWearables(data);
                setFilteredWearables(data);
                // Reset to page 1 when new data is loaded
                setPage(1);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [brand]);

    // Set price boundaries
    useEffect(() => {
        if (wearables.length) {
            const prices = wearables.map(item => Number(item.salePrice) || 0);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setPriceBoundaries({ min, max });
            setPriceRange([min, max]);
        }
    }, [wearables]);

    // Apply filters
    useEffect(() => {
        if (!priceRange) return;
        const filtered = wearables.filter(item => {
            const price = Number(item.salePrice);
            const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
            return inPriceRange && (!inStockOnly || item.quantity > 0);
        });
        setFilteredWearables(filtered);
    }, [wearables, priceRange, inStockOnly]);

    // Calculate pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.max(1, Math.ceil(filteredWearables.length / itemsPerPage));
    const currentPageItems = filteredWearables.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <LuxuryLoader message={`Loading ${brand} Wearables`} />;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>Error loading wearables: {error}</Alert>;
    if (!loading && !wearables.length) {
        return (
            <Box sx={styles.gradientBg}>
                <Container sx={{ 
                    height: 'calc(100vh - 70px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Typography variant="h4" sx={{ ...styles.gradientText, mb: 2, textAlign: 'center' }}>
                        No wearables found
                    </Typography>
                    <Typography variant="subtitle1" sx={{ 
                        color: '#666', 
                        textAlign: 'center',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1.1rem'
                    }}>
                        We couldn't find any wearables from {brand}
                    </Typography>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={styles.gradientBg}>
            <Container maxWidth={false} sx={styles.container}>
                <Box sx={{ mb: 1, textAlign: 'center' }}>
                    <Typography variant="h3" sx={{
                        ...styles.gradientText,
                        mb: 0.5
                    }}>
                        {brand} Wearables
                    </Typography>
                    <Typography variant="subtitle1" sx={{ 
                        color: '#666', 
                        maxWidth: 600, 
                        mx: 'auto', 
                        fontSize: '1.1rem',
                        fontFamily: "'Outfit', sans-serif",
                        mb: 1
                    }}>
                        Explore our collection of {brand} wearables
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <FiltersSection 
                            priceRange={priceRange}
                            priceBoundaries={priceBoundaries}
                            inStockOnly={inStockOnly}
                            onPriceChange={(_, value) => setPriceRange(value)}
                            onStockChange={(e) => setInStockOnly(e.target.checked)}
                        />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={3}>
                            {currentPageItems.map((wearable) => (
                                <Grid item xs={12} sm={6} md={3} key={wearable.ItemCode}>
                                    <ProductCard 
                                        wearable={wearable}
                                        onClick={() => navigate(`/product/${wearable.ItemCode}`)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        
                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <Stack spacing={2} sx={{ mt: 4, mb: 2, alignItems: 'center' }}>
                                <Pagination 
                                    count={totalPages} 
                                    page={page} 
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            color: '#b7950b',
                                            '&.Mui-selected': {
                                                backgroundColor: '#b7950b',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#8B7355',
                                                },
                                            },
                                            '&:hover': {
                                                backgroundColor: 'rgba(183, 149, 11, 0.1)',
                                            },
                                        },
                                    }}
                                />
                                <Typography variant="body2" sx={{ color: '#666' }}>
                                    Showing {((page - 1) * itemsPerPage) + 1} - {Math.min(page * itemsPerPage, filteredWearables.length)} of {filteredWearables.length} items
                                </Typography>
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BrandWearables; 