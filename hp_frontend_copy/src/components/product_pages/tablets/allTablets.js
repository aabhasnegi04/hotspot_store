import React, { useState, useEffect } from 'react';
import { 
    Box, Container, Grid, Card, CardMedia, CardContent, Typography, 
    Alert, FormControlLabel, Checkbox, Divider, Paper, FormGroup, useTheme, useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LuxuryLoader from '../../common/LuxuryLoader';
import { API_BASE_URL } from '../../../config';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

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
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        mb: { xs: 2, sm: 4 },
        mt: 0,
        pt: 0,
        pl: { xs: 0, sm: 1 }
    },
    resultsText: {
        fontWeight: 600,
        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.4rem' },
        color: '#666',
        fontFamily: "'Outfit', sans-serif",
        textAlign: 'center',
        width: '100%',
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
        p: { xs: 1, sm: 3 },
        borderRadius: { xs: '8px', sm: '16px' },
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(255, 184, 0, 0.1)',
        position: { xs: 'static', sm: 'sticky' },
        top: 100,
        ml: { xs: 0, sm: 1 }
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

const ProductCard = ({ product, onClick }) => (
    <Card elevation={0} sx={styles.productCard} onClick={onClick}>
        <Box sx={styles.imageBox}>
            <CardMedia
                component="img"
                image={product.imgname11}
                alt={product.ItemName}
                sx={styles.cardMedia}
            />
        </Box>
        <CardContent sx={styles.cardContent}>
            <Typography variant="h6" sx={styles.productName}>
                {product.ItemName}
            </Typography>
            <Typography variant="body2" sx={styles.brandModel}>
                {product.Brand} - {product.MODEL}
            </Typography>
            <Box sx={styles.priceBox}>
                <Box sx={styles.priceSection}>
                    <Typography className="price">
                        ₹{Number(product.SalePrice).toLocaleString('en-IN')}
                    </Typography>
                    {product.DiscountValue > 0 && (
                        <Typography className="mrp">
                            ₹{Number(product.CurrentMRP).toLocaleString('en-IN')}
                        </Typography>
                    )}
                </Box>
                <Box sx={styles.stockSection}>
                    <Typography 
                        className="status"
                        sx={{ color: product.QUANTITY > 0 ? '#4caf50' : '#f44336' }}
                    >
                        {product.QUANTITY > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                    {product.QUANTITY > 0 && (
                        <Typography className="quantity">
                            {product.QUANTITY} units left
                        </Typography>
                    )}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const priceRanges = [
    { label: 'Under ₹5,000', range: [0, 5000] },
    { label: '₹5,000 - ₹10,000', range: [5000, 10000] },
    { label: '₹10,000 - ₹20,000', range: [10000, 20000] },
    { label: '₹20,000 - ₹40,000', range: [20000, 40000] },
    { label: 'Above ₹40,000', range: [40000, Infinity] }
];

const AllTablets = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [priceRange, setPriceRange] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [filterOpen, setFilterOpen] = useState(false);

    // Extract unique brands from products
    useEffect(() => {
        const uniqueBrands = Array.from(new Set(products.map(p => p.Brand).filter(Boolean)));
        setBrands(uniqueBrands.sort());
    }, [products]);

    const handlePriceChange = (range) => {
        const isSelected = priceRange.some(r => r[0] === range[0] && r[1] === range[1]);
        if (isSelected) {
            setPriceRange(priceRange.filter(r => !(r[0] === range[0] && r[1] === range[1])));
        } else {
            setPriceRange([...priceRange, range]);
        }
    };

    const handleBrandChange = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const handleClearFilters = () => {
        setPriceRange([]);
        setInStockOnly(false);
        setSelectedBrands([]);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/all-tablets`);
                if (!response.ok) throw new Error('Failed to fetch tablets');
                const data = await response.json();
                setProducts(data.data.tablets || []);
                setFilteredProducts(data.data.tablets || []);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = products.filter(product => {
            const price = Number(product.SalePrice) || 0;
            const inPriceRange = priceRange.length === 0 || priceRange.some(range => 
                price >= range[0] && (range[1] === Infinity ? true : price <= range[1])
            );
            const inBrand = selectedBrands.length === 0 || selectedBrands.includes(product.Brand);
            return inPriceRange && inBrand && (!inStockOnly || product.QUANTITY > 0);
        });
        setFilteredProducts(filtered);
    }, [products, priceRange, inStockOnly, selectedBrands]);

    if (loading) return <LuxuryLoader message="Loading Tablets" />;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>Error: {error}</Alert>;

    return (
        <Box sx={styles.gradientBg}>
            <Container sx={styles.container}>
                <Typography sx={{ ...styles.resultsText, mb: { xs: 2, sm: 4 } }}>
                    All Tablets <span>({filteredProducts.length} products found)</span>
                </Typography>

                <Grid container spacing={{ xs: 1, sm: 3 }} alignItems="flex-start">
                    <Grid item xs={12} md={2.5} sx={{ pr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }}>
                        <Paper sx={styles.filterPaper}>
                            {/* Filter Header for mobile */}
                            <Box 
                                sx={styles.filterHeader}
                                onClick={() => isMobile && setFilterOpen(!filterOpen)}
                            >
                                <Box sx={styles.filterTitle}>
                                    <FilterListIcon fontSize="small" />
                                    <Typography>Filters</Typography>
                                </Box>
                                {isMobile && (
                                    <IconButton size="small">
                                        {filterOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                                    </IconButton>
                                )}
                            </Box>
                            {/* Filter Content: always open on desktop, collapsible on mobile */}
                            <Collapse in={!isMobile || filterOpen}>
                                <Box sx={styles.filterContent}>
                                    {/* Brand Filter */}
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 2 }}>Brand</Typography>
                                        <FormGroup>
                                            {brands.map((brand, idx) => (
                                                <FormControlLabel
                                                    key={brand + idx}
                                                    control={
                                                        <Checkbox
                                                            checked={selectedBrands.includes(brand)}
                                                            onChange={() => handleBrandChange(brand)}
                                                            sx={{ color: '#b7950b', '&.Mui-checked': { color: '#b7950b' } }}
                                                        />
                                                    }
                                                    label={brand}
                                                    sx={{ display: 'block', mb: 1 }}
                                                />
                                            ))}
                                        </FormGroup>
                                    </Box>
                                    {/* Price Range Filter */}
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
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                checked={inStockOnly}
                                                onChange={(e) => setInStockOnly(e.target.checked)}
                                                sx={{ 
                                                    color: '#b7950b',
                                                    '&.Mui-checked': { color: '#b7950b' }
                                                }}
                                            />
                                        }
                                        label="In Stock Only"
                                        sx={{ display: 'block', mb: 1 }}
                                    />
                                    {(priceRange.length > 0 || inStockOnly || selectedBrands.length > 0) && (
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
                        <Grid container spacing={{ xs: 1, sm: 2 }}>
                            {filteredProducts.map((product) => (
                                <Grid item xs={6} sm={6} md={3} key={product.ItemCode}>
                                    <ProductCard 
                                        product={product}
                                        onClick={() => navigate(`/product/${product.ItemCode}`)}
                                    />
                                </Grid>
                            ))}
                            {filteredProducts.length === 0 && (
                                <Grid item xs={12}>
                                    <Box sx={{ 
                                        textAlign: 'center', 
                                        py: { xs: 4, sm: 8 }, 
                                        color: '#666',
                                        background: 'rgba(255,255,255,0.5)',
                                        borderRadius: { xs: '12px', sm: '16px' }
                                    }}>
                                        <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                                            No tablets found
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1, fontSize: { xs: '0.85rem', sm: '0.875rem' } }}>
                                            Try adjusting your filters
                                        </Typography>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AllTablets;
