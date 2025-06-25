import React, { useState, useEffect } from 'react';
import { 
    Box, Container, Grid, Card, CardMedia, CardContent, Typography, 
    Alert, FormControlLabel, Checkbox, Divider, Paper,
    Pagination, Stack, useMediaQuery, useTheme,
    Collapse, IconButton, Button
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
    priceRangeSection: {
        background: 'rgba(255, 215, 0, 0.03)',
        borderRadius: '8px',
        p: 2,
        mb: 2
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        mb: 0.5,
        transition: 'all 0.2s ease',
        borderRadius: '4px',
        p: 0.5,
        '&:hover': {
            background: 'rgba(255, 215, 0, 0.05)'
        },
        '& .MuiFormControlLabel-label': {
            fontSize: { xs: '0.85rem', sm: '0.875rem' },
            color: '#666'
        }
    },
    checkbox: {
        color: '#b7950b',
        padding: { xs: '4px', sm: '8px' },
        '&.Mui-checked': {
            color: '#b7950b'
        }
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

const ProductCard = ({ accessory, onClick }) => (
    <Card elevation={0} sx={styles.productCard} onClick={onClick}>
        <Box sx={styles.imageBox}>
            <CardMedia
                component="img"
                image={accessory.imgname11}
                alt={accessory.ItemName}
                sx={styles.cardMedia}
            />
        </Box>
        <CardContent sx={styles.cardContent}>
            <Typography variant="h6" sx={styles.productName}>
                {accessory.ItemName}
            </Typography>
            <Typography variant="body2" sx={styles.brandModel}>
                {accessory.Brand} - {accessory.MODEL}
            </Typography>
            <Box sx={styles.priceBox}>
                <Box sx={styles.priceSection}>
                    <Typography className="price">
                        ₹{Number(accessory.SalePrice).toLocaleString('en-IN')}
                    </Typography>
                    {accessory.DiscountValue > 0 && (
                        <Typography className="mrp">
                            ₹{Number(accessory.CurrentMRP).toLocaleString('en-IN')}
                        </Typography>
                    )}
                </Box>
                <Box sx={styles.stockSection}>
                    <Typography 
                        className="status"
                        sx={{ color: accessory.QUANTITY > 0 ? '#4caf50' : '#f44336' }}
                    >
                        {accessory.QUANTITY > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                    {accessory.QUANTITY > 0 && (
                        <Typography className="quantity">
                            {accessory.QUANTITY} units left
                        </Typography>
                    )}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const BrandAccessories = () => {
    const { brand } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [accessories, setAccessories] = useState([]);
    const [filteredAccessories, setFilteredAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceRange, setPriceRange] = useState([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [page, setPage] = useState(1);
    const itemsPerPage = 24;

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
            setPriceRange(priceRange.filter(r => !(r[0] === range[0] && r[1] === range[1])));
        } else {
            setPriceRange([...priceRange, range]);
        }
    };

    const handleClearFilters = () => {
        setPriceRange([]);
        setInStockOnly(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/brand-accessories/${brand}`);
                if (!response.ok) throw new Error(`Failed to fetch accessories (${response.status})`);
                const data = await response.json();
                setAccessories(data);
                setFilteredAccessories(data);
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

    useEffect(() => {
        if (!isMobile) {
            setFilterOpen(true);
        } else {
            setFilterOpen(false);
        }
    }, [isMobile]);

    useEffect(() => {
        const filtered = accessories.filter(item => {
            const price = Number(item.SalePrice);
            const inPriceRange = priceRange.length === 0 || priceRange.some(range => 
                price >= range[0] && (range[1] === Infinity ? true : price <= range[1])
            );
            return inPriceRange && (!inStockOnly || item.QUANTITY > 0);
        });
        setFilteredAccessories(filtered);
    }, [accessories, priceRange, inStockOnly]);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.max(1, Math.ceil(filteredAccessories.length / itemsPerPage));
    const currentPageItems = filteredAccessories.slice(startIndex, endIndex);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <LuxuryLoader message={`Loading ${brand} Accessories`} />;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>Error loading accessories: {error}</Alert>;

    return (
        <Box sx={styles.gradientBg}>
            <Container sx={styles.container}>
                <Typography sx={{ ...styles.resultsText, mb: { xs: 2, sm: 4 } }}>
                    {brand} Accessories <span>({filteredAccessories.length} products found)</span>
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
                                    <Box sx={styles.priceRangeSection}>
                                        <Typography 
                                            variant="subtitle2" 
                                            sx={{ 
                                                mb: 1.5, 
                                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                                color: '#b7950b',
                                                fontWeight: 600
                                            }}
                                        >
                                            Price Range
                    </Typography>
                                        {priceRanges.map((range, index) => (
                                            <FormControlLabel
                                                key={index}
                                                control={
                                                    <Checkbox 
                                                        checked={priceRange.some(r => r[0] === range.range[0] && r[1] === range.range[1])}
                                                        onChange={() => handlePriceChange(range.range)}
                                                        sx={styles.checkbox}
                                                    />
                                                }
                                                label={range.label}
                                                sx={styles.checkboxLabel}
                                            />
                                        ))}
                </Box>

                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                checked={inStockOnly}
                                                onChange={(e) => setInStockOnly(e.target.checked)}
                                                sx={styles.checkbox}
                                            />
                                        }
                                        label="In Stock Only"
                                        sx={styles.checkboxLabel}
                                    />

                                    {(priceRange.length > 0 || inStockOnly) && (
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
                            {currentPageItems.map((accessory) => (
                                    <Grid item xs={6} sm={6} md={3} key={accessory.ItemCode}>
                                    <ProductCard 
                                        accessory={accessory}
                                        onClick={() => navigate(`/product/${accessory.ItemCode}`)}
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
                                    No accessories found
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
                                    Showing {((page - 1) * itemsPerPage) + 1} - {Math.min(page * itemsPerPage, filteredAccessories.length)} of {filteredAccessories.length} items
                                </Typography>
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BrandAccessories;
