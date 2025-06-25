import React, { useState, useEffect } from 'react';
import { 
    Box, Container, Grid, Card, CardMedia, CardContent, Typography, 
    Alert, FormControlLabel, Checkbox, Divider, Paper, useMediaQuery, useTheme,
    Collapse, IconButton, Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import LuxuryLoader from '../../common/LuxuryLoader';
import { API_BASE_URL } from '../../../config';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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

const FiltersSection = ({ brands, selectedBrands, onBrandChange, inStockOnly, onStockChange }) => (
    <Box>
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Brands</Typography>
            <Box sx={styles.filterBox}>
                {brands.map(brand => (
                    <FormControlLabel
                        key={brand}
                        control={
                            <Checkbox
                                checked={selectedBrands.includes(brand)}
                                onChange={(e) => onBrandChange(brand, e.target.checked)}
                                sx={styles.checkbox}
                                size="small"
                            />
                        }
                        label={brand}
                        sx={styles.checkboxLabel}
                    />
                ))}
            </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <FormControlLabel
            control={
                <Checkbox 
                    checked={inStockOnly}
                    onChange={onStockChange}
                    sx={styles.checkbox}
                    size="small"
                />
            }
            label={<Typography sx={{ fontSize: '0.85rem', color: '#666' }}>In Stock Only</Typography>}
            sx={styles.checkboxLabel}
        />
    </Box>
);

const ProductCard = ({ product, onClick }) => (
    <Card elevation={0} sx={styles.productCard} onClick={onClick}>
        <Box sx={styles.imageBox}>
            <CardMedia
                component="img"
                image={product.image}
                alt={product.itemName}
                sx={styles.cardMedia}
            />
        </Box>
        <CardContent sx={styles.cardContent}>
            <Typography variant="h6" sx={styles.productName}>
                {product.itemName}
            </Typography>
            <Typography variant="body2" sx={styles.brandModel}>
                {product.brand} - {product.model}
            </Typography>
            <Box sx={styles.priceBox}>
                <Box sx={styles.priceSection}>
                    <Typography className="price">
                        ₹{Number(product.salePrice).toLocaleString('en-IN')}
                    </Typography>
                </Box>
                <Box sx={styles.stockSection}>
                    <Typography 
                        className="status"
                        sx={{ color: product.quantity > 0 ? '#4caf50' : '#f44336' }}
                    >
                        {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const PriceRangeAccessories = () => {
    const { range } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [brands, setBrands] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        if (!isMobile) {
            setFilterOpen(true);
        } else {
            setFilterOpen(false);
        }
    }, [isMobile]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/price-range-accessories/${range}`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
                setBrands([...new Set(data.map(product => product.brand))].sort());
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [range]);

    useEffect(() => {
        const filtered = products.filter(product => 
            (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
            (!inStockOnly || product.quantity > 0)
        );
        setFilteredProducts(filtered);
    }, [products, selectedBrands, inStockOnly]);

    const handleClearFilters = () => {
        setSelectedBrands([]);
        setInStockOnly(false);
    };

    if (loading) return <LuxuryLoader message="Loading Accessories" />;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>Error: {error}</Alert>;

    return (
        <Box sx={styles.gradientBg}>
            <Container sx={styles.container}>
                <Typography sx={{ ...styles.resultsText, mb: { xs: 2, sm: 4 } }}>
                    Accessories in {range} <span>({filteredProducts.length} found)</span>
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
                                        brands={brands}
                                        selectedBrands={selectedBrands}
                                        onBrandChange={(brand, isChecked) => 
                                            setSelectedBrands(prev => isChecked ? [...prev, brand] : prev.filter(b => b !== brand))
                                        }
                                        inStockOnly={inStockOnly}
                                        onStockChange={(e) => setInStockOnly(e.target.checked)}
                                    />
                                    {(selectedBrands.length > 0 || inStockOnly) && (
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
                        {filteredProducts.length > 0 ? (
                            <Grid container spacing={{ xs: 1, sm: 2 }}>
                                {filteredProducts.map((product) => (
                                    <Grid item xs={6} sm={6} md={3} key={product.itemCode}>
                                        <ProductCard 
                                            product={product}
                                            onClick={() => navigate(`/product/${product.itemCode}`)}
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
                                    No accessories found in this price range
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
                                    Try adjusting your filters or search criteria
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default PriceRangeAccessories;
