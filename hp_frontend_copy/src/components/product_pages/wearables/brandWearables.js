import React, { useState, useEffect } from 'react';
import { 
    Box, Container, Grid, Card, CardMedia, CardContent, Typography, 
    Alert, FormControlLabel, Checkbox, Slider, Divider, Paper, useMediaQuery, useTheme,
    Pagination, Stack, Collapse, IconButton, Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import LuxuryLoader from '../../common/LuxuryLoader';
import { API_BASE_URL } from '../../../config';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Styles object for reusable styles
const styles = {
    gradientBg: {
        background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)',
        minHeight: '100vh',
        mt: '-84px',
        pt: { xs: '84px', sm: '104px' },
        pb: { xs: 4, sm: 8 },
        width: '100vw',
        overflowX: 'hidden'
    },
    container: {
        maxWidth: '1600px !important',
        pl: { xs: 1, sm: 2 },
        pr: { xs: 1, sm: 2 },
        ml: { xs: 0, sm: -2 },
        mr: 0
    },
    resultsText: {
        fontWeight: 600,
        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.4rem' },
        color: '#666',
        fontFamily: "'Outfit', sans-serif",
        textAlign: 'center',
        width: '100%',
        textTransform: 'capitalize',
        '& span': {
            color: '#b7950b',
            fontWeight: 700,
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.4rem' }
        }
    },
    productCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: { xs: '12px', sm: '20px' },
        overflow: 'hidden',
        border: '1px solid rgba(255, 215, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
            transform: { xs: 'none', sm: 'translateY(-8px)' },
            boxShadow: { xs: 'none', sm: '0 12px 24px rgba(255, 215, 0, 0.12)' },
            background: { xs: 'rgba(255, 255, 255, 0.9)', sm: 'rgba(255, 255, 255, 1)' }
        }
    },
    imageBox: {
        position: 'relative',
        paddingTop: '100%'
    },
    cardMedia: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        objectFit: 'contain',
        padding: { xs: '12px', sm: '20px' }
    },
    cardContent: {
        flexGrow: 1,
        p: { xs: 2, sm: 3 }
    },
    productName: {
        fontWeight: 600,
        mb: 1,
        fontSize: { xs: '0.9rem', sm: '1rem' }
    },
    brandModel: {
        color: 'text.secondary',
        mb: 2,
        fontSize: { xs: '0.8rem', sm: '0.875rem' }
    },
    priceBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceSection: {
        '& .price': {
            fontWeight: 700,
            color: '#b7950b',
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
        },
        '& .mrp': {
            textDecoration: 'line-through',
            color: '#666',
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
        }
    },
    stockSection: {
        textAlign: 'right',
        '& .status': {
            fontWeight: 600,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
        },
        '& .quantity': {
            color: '#666',
            display: 'block',
            mt: 0.5,
            fontSize: { xs: '0.7rem', sm: '0.75rem' }
        }
    },
    filterPaper: {
        p: { xs: 1, sm: 2 },
        borderRadius: { xs: '8px', sm: '12px' },
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid rgba(255, 184, 0, 0.2)',
        position: { xs: 'static', sm: 'sticky' },
        top: 100,
        ml: { xs: 0, sm: 1 },
        mb: { xs: 2, sm: 0 },
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(10px)'
    },
    filterHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        p: 0.5,
        borderRadius: '6px',
        '&:hover': {
            background: 'rgba(255, 215, 0, 0.05)'
        }
    },
    filterTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        fontWeight: 600,
        fontSize: { xs: '1rem', sm: '1.1rem' },
        color: '#b7950b'
    },
    filterContent: {
        mt: 2
    },
    filterActions: {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 2,
        pt: 2,
        borderTop: '1px solid rgba(255, 215, 0, 0.1)'
    },
    clearButton: {
        color: '#666',
        fontSize: '0.875rem',
        '&:hover': {
            color: '#b7950b',
            background: 'rgba(255, 215, 0, 0.05)'
        }
    }
};

const FiltersSection = ({ priceRange, priceBoundaries, inStockOnly, onPriceChange, onStockChange }) => (
    <Box>
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
            sx={styles.checkboxLabel}
        />
    </Box>
);

const ProductCard = ({ wearable, onClick }) => (
    <Card elevation={0} sx={styles.productCard} onClick={onClick}>
        <Box sx={styles.imageBox}>
            <CardMedia
                component="img"
                image={wearable.image}
                alt={wearable.itemName}
                sx={styles.cardMedia}
            />
        </Box>
        <CardContent sx={styles.cardContent}>
            <Typography variant="h6" sx={styles.productName}>
                {wearable.itemName}
            </Typography>
            <Typography variant="body2" sx={styles.brandModel}>
                {wearable.brand} - {wearable.model}
            </Typography>
            <Box sx={styles.priceBox}>
                <Box sx={styles.priceSection}>
                    <Typography className="price">
                        ₹{Number(wearable.salePrice).toLocaleString('en-IN')}
                    </Typography>
                    {wearable.discountValue > 0 && (
                        <Typography className="mrp">
                            ₹{Number(wearable.currentMRP).toLocaleString('en-IN')}
                        </Typography>
                    )}
                </Box>
                <Box sx={styles.stockSection}>
                    <Typography 
                        className="status"
                        sx={{ color: wearable.quantity > 0 ? '#4caf50' : '#f44336' }}
                    >
                        {wearable.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                    {wearable.quantity > 0 && (
                        <Typography className="quantity">
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [wearables, setWearables] = useState([]);
    const [filteredWearables, setFilteredWearables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [priceBoundaries, setPriceBoundaries] = useState({ min: 0, max: 100000 });
    const [page, setPage] = useState(1);
    const [filterOpen, setFilterOpen] = useState(false);
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

    useEffect(() => {
        if (!isMobile) {
            setFilterOpen(true);
        } else {
            setFilterOpen(false);
        }
    }, [isMobile]);

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

    const handleClearFilters = () => {
        setPriceRange([priceBoundaries.min, priceBoundaries.max]);
        setInStockOnly(false);
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
            <Container sx={styles.container}>
                <Typography sx={{ ...styles.resultsText, mb: { xs: 2, sm: 4 } }}>
                    {brand} Wearables <span>({filteredWearables.length} products found)</span>
                    </Typography>
                <Grid container spacing={{ xs: 1, sm: 3 }} alignItems="flex-start">
                    <Grid item xs={12} md={2.5} sx={{ pr: { xs: 0, sm: 2 } }}>
                        <Paper sx={styles.filterPaper}>
                            <Box 
                                sx={styles.filterHeader}
                                onClick={() => setFilterOpen(!filterOpen)}
                            >
                                <Box sx={styles.filterTitle}>
                                    <FilterListIcon fontSize="small" />
                                    <Typography>Filters</Typography>
                                </Box>
                                <IconButton size="small">
                                    {filterOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                </IconButton>
                </Box>
                            <Collapse in={filterOpen}>
                                <Box sx={styles.filterContent}>
                        <FiltersSection 
                            priceRange={priceRange}
                            priceBoundaries={priceBoundaries}
                            inStockOnly={inStockOnly}
                            onPriceChange={(_, value) => setPriceRange(value)}
                            onStockChange={(e) => setInStockOnly(e.target.checked)}
                        />
                                    {(priceRange[0] !== priceBoundaries.min || priceRange[1] !== priceBoundaries.max || inStockOnly) && (
                                        <Box sx={styles.filterActions}>
                                            <Button 
                                                onClick={handleClearFilters}
                                                sx={styles.clearButton}
                                            >
                                                Clear All Filters
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            </Collapse>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={9.5}>
                        {currentPageItems.length > 0 ? (
                            <Grid container spacing={{ xs: 1, sm: 2 }}>
                            {currentPageItems.map((wearable) => (
                                    <Grid item xs={6} sm={6} md={3} key={wearable.ItemCode}>
                                    <ProductCard 
                                        wearable={wearable}
                                        onClick={() => navigate(`/product/${wearable.ItemCode}`)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        ) : (
                            <Box sx={{ 
                                textAlign: 'center', 
                                py: { xs: 4, sm: 8 }, 
                                color: '#666',
                                background: 'rgba(255,255,255,0.5)',
                                borderRadius: { xs: '12px', sm: '16px' }
                            }}>
                                <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                                    No wearables found
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
                                    Try adjusting your filters or check our other collections!
                                </Typography>
                            </Box>
                        )}
                        {totalPages > 1 && (
                            <Stack spacing={2} sx={{ mt: 4, mb: 2, alignItems: 'center' }}>
                                <Pagination 
                                    count={totalPages} 
                                    page={page} 
                                    onChange={handlePageChange}
                                    color="primary"
                                    size={isMobile ? 'small' : 'large'}
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
                                <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
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