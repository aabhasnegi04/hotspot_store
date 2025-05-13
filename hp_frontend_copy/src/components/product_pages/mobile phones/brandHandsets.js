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
        pt: '104px',
        pb: 8,
        width: '100vw',
        overflowX: 'hidden'
    },
    container: {
        maxWidth: '1600px !important',
        pl: { xs: 1, md: 2 },
        pr: { xs: 2, md: 2 },
        ml: -2,
        mr: 0
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 4,
        mt: 0,
        pt: 0,
        pl: { xs: 0, md: 1 }
    },
    resultsText: {
        fontWeight: 600,
        fontSize: { xs: '1.1rem', md: '1.4rem' },
        color: '#666',
        fontFamily: "'Outfit', sans-serif",
        textAlign: 'center',
        width: '100%',
        '& span': {
            color: '#b7950b',
            fontWeight: 700,
            fontSize: { xs: '1.1rem', md: '1.4rem' }
        }
    },
    productCard: {
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
        padding: '20px'
    },
    cardContent: {
        flexGrow: 1,
        p: 3
    },
    productName: {
        fontWeight: 600,
        mb: 1,
        fontSize: '1rem'
    },
    brandModel: {
        color: 'text.secondary',
        mb: 2,
        fontSize: '0.875rem'
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
            fontSize: '1.25rem'
        },
        '& .mrp': {
            textDecoration: 'line-through',
            color: '#666',
            fontSize: '0.875rem'
        }
    },
    stockSection: {
        textAlign: 'right',
        '& .status': {
            fontWeight: 600,
            fontSize: '0.875rem'
        },
        '& .quantity': {
            color: '#666',
            display: 'block',
            mt: 0.5,
            fontSize: '0.75rem'
        }
    },
    filterPaper: {
        p: 3,
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(255, 184, 0, 0.1)',
        position: 'sticky',
        top: 100,
        ml: 1
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

const BrandHandsets = () => {
    const { brand } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [priceRange, setPriceRange] = useState([]);

    const priceRanges = [
        { label: 'Under ₹5,000', range: [0, 5000] },
        { label: '₹5,000 - ₹10,000', range: [5000, 10000] },
        { label: '₹10,000 - ₹20,000', range: [10000, 20000] },
        { label: '₹20,000 - ₹40,000', range: [20000, 40000] },
        { label: 'Above ₹40,000', range: [40000, Infinity] }
    ];

    const handlePriceChange = (range) => {
        const isSelected = priceRange.some(r => r[0] === range[0] && r[1] === range[1]);
        if (isSelected) {
            setPriceRange(priceRange.filter(r => !(r[0] === range[0] && r[1] === range[1])));
        } else {
            setPriceRange([...priceRange, range]);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/brand-handsets/${brand}`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [brand]);

    useEffect(() => {
        const filtered = products.filter(product => {
            const price = Number(product.SalePrice) || 0;
            const inPriceRange = priceRange.length === 0 || priceRange.some(range => 
                price >= range[0] && (range[1] === Infinity ? true : price <= range[1])
            );
            return inPriceRange && (!inStockOnly || product.QUANTITY > 0);
        });
        setFilteredProducts(filtered);
    }, [products, priceRange, inStockOnly]);

    if (loading) return <LuxuryLoader message="Loading Products" />;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>Error: {error}</Alert>;

    return (
        <Box sx={styles.gradientBg}>
            <Container sx={{ ...styles.container, pl: 3 }}>
                <Typography sx={{ ...styles.resultsText, mb: 4 }}>
                    {brand} Handsets <span>({filteredProducts.length} products found)</span>
                </Typography>

                <Grid container spacing={3} alignItems="flex-start">
                    <Grid item xs={12} md={2.5} sx={{ pr: 0 }}>
                        <Paper sx={{ ...styles.filterPaper, mt: 0 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                Filters
                            </Typography>
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
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={9.5}>
                        <Grid container spacing={2}>
                            {filteredProducts.map((product) => (
                                <Grid item xs={12} sm={6} md={3} key={product.ItemCode}>
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
                                        py: 8, 
                                        color: '#666',
                                        background: 'rgba(255,255,255,0.5)',
                                        borderRadius: '16px'
                                    }}>
                                        <Typography variant="h6">
                                            No products found
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>
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

export default BrandHandsets;
