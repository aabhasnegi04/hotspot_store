import React, { useState, useEffect } from 'react';
import { 
    Box, Container, Grid, Card, CardMedia, CardContent, Typography, 
    Alert, FormControlLabel, Checkbox, Divider, Paper 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import LuxuryLoader from '../../common/LuxuryLoader';
import { API_BASE_URL } from '../../../config';

const styles = {
    gradientBg: {
        background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)',
        minHeight: '100vh',
        mt: '-84px',
        width: '100%',
        overflowX: 'hidden'
    },
    container: {
        py: 4,
        pt: '104px',
        px: { xs: 2, sm: 4, md: 6 },
        width: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
        pl: 3,
        background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 2,
        mt: 2,
        pl: { xs: 0, md: 2 }
    },
    resultsText: {
        fontWeight: 600,
        fontSize: { xs: '1.3rem', md: '1.5rem' },
        color: '#666',
        fontFamily: "'Outfit', sans-serif",
        '& span': {
            color: '#b7950b',
            fontWeight: 700,
            fontSize: { xs: '1rem', md: '1.2rem' }
        }
    },
    priceText: {
        fontWeight: 600,
        fontSize: { xs: '1.2rem', md: '1.5rem' },
        color: '#666',
        fontFamily: "'Outfit', sans-serif",
        '& span': {
            color: '#b7950b',
            fontWeight: 700,
        }
    },
    filterBox: {
        maxHeight: '120px', 
        overflowY: 'auto',
        pr: 1,
        pl: 0.5,
        ml: 0,
        '&::-webkit-scrollbar': { width: '4px' },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(183, 149, 11, 0.3)',
            borderRadius: '2px',
        }
    },
    checkboxStyle: { 
        color: '#b7950b',
        '&.Mui-checked': { color: '#b7950b' },
        padding: '4px'
    },
    labelStyle: {
        display: 'block',
        mb: 0.5,
        '& .MuiFormControlLabel-label': {
            fontSize: '0.85rem',
            color: '#666'
        }
    }
};

const FiltersSection = ({ brands, selectedBrands, onBrandChange, inStockOnly, onStockChange }) => (
    <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(255, 215, 0, 0.1)' }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Filters</Typography>
        
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
                                sx={styles.checkboxStyle}
                                size="small"
                            />
                        }
                        label={brand}
                        sx={styles.labelStyle}
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
                    sx={styles.checkboxStyle}
                    size="small"
                />
            }
            label={<Typography sx={{ fontSize: '0.85rem', color: '#666' }}>In Stock Only</Typography>}
        />
    </Paper>
);

const ProductCard = ({ product, onClick }) => (
    <Card elevation={0} onClick={onClick} sx={{
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
            background: '#fff'
        }
    }}>
        <Box sx={{ position: 'relative', paddingTop: '100%' }}>
            <CardMedia
                component="img"
                image={product.image}
                alt={product.itemName}
                sx={{ position: 'absolute', top: 0, height: '100%', width: '100%', objectFit: 'contain', p: 2.5 }}
            />
        </Box>
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{product.itemName}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {product.brand} - {product.model}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#b7950b' }}>
                    ₹{Number(product.salePrice).toLocaleString('en-IN')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </Typography>
            </Box>
        </CardContent>
    </Card>
);

const PriceRangeAccessories = () => {
    const { range } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [brands, setBrands] = useState([]);

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

    if (loading) return <LuxuryLoader message="Loading Accessories" />;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>Error: {error}</Alert>;

    return (
        <Box sx={styles.gradientBg}>
            <Container maxWidth={false} sx={styles.container}>
                <Box sx={styles.header}>
                    <Typography sx={styles.resultsText}>
                        Results <span>({filteredProducts.length} accessories found)</span>
                    </Typography>
                </Box>

                <Grid container spacing={3} alignItems="flex-start">
                    <Grid item xs={12} md={2.5} sx={{ pr: 0 }}>
                        <FiltersSection 
                            brands={brands}
                            selectedBrands={selectedBrands}
                            onBrandChange={(brand, isChecked) => 
                                setSelectedBrands(prev => isChecked ? [...prev, brand] : prev.filter(b => b !== brand))
                            }
                            inStockOnly={inStockOnly}
                            onStockChange={(e) => setInStockOnly(e.target.checked)}
                        />
                    </Grid>
                    <Grid item xs={12} md={9.5}>
                        <Grid container spacing={3}>
                            {filteredProducts.map((product) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={product.itemCode}>
                                    <ProductCard 
                                        product={product}
                                        onClick={() => navigate(`/product/${product.itemCode}`)}
                                    />
                                </Grid>
                            ))}
                            {filteredProducts.length === 0 && (
                                <Grid item xs={12}>
                                    <Box sx={{ 
                                        textAlign: 'center', 
                                        py: 8, 
                                        color: '#666',
                                        background: 'rgba(255,255,255,0.5)',
                                        borderRadius: 2
                                    }}>
                                        <Typography variant="h6">
                                            No accessories found in this price range
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
                                            Try adjusting your filters or search criteria
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

export default PriceRangeAccessories;
