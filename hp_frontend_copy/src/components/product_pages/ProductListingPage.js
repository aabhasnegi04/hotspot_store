import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
    Box, 
    Container, 
    Grid, 
    Card, 
    CardMedia, 
    CardContent, 
    Typography, 
    FormControl, 
    Select, 
    MenuItem, 
    Checkbox,
    FormGroup,
    FormControlLabel,                       
    Paper,
    InputLabel,
    Rating,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import fakeProductAPI from '../../services/fakeProductAPI';
import LuxuryLoader from '../common/LuxuryLoader';

const ProductListingPage = () => {
    const navigate = useNavigate();
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('');
    const [filters, setFilters] = useState({
        brands: [],
        priceRange: [],
        categories: []
    });
    const [brands, setBrands] = useState([]);

    const priceRanges = useMemo(() => [
        { label: "Under ₹40,000", min: 0, max: 40000 },
        { label: "₹40,000 - ₹60,000", min: 40000, max: 60000 },
        { label: "₹60,000 - ₹80,000", min: 60000, max: 80000 },
        { label: "Above ₹80,000", min: 80000, max: Infinity }
    ], []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [productsData, brandsData] = await Promise.all([
                    fakeProductAPI.getProductsByCategory(category),
                    fakeProductAPI.getBrands(),
                ]);
                setProducts(productsData);
                setBrands(brandsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [category]);

    const handleSort = (event) => {
        const value = event.target.value;
        setSortBy(value);
        let sortedProducts = [...products];

        switch (value) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sortedProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                sortedProducts = [...products];
        }
        setProducts(sortedProducts);
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter(item => item !== value)
                : [...prev[filterType], value]
        }));
    };

    const filterProducts = useCallback(async () => {
        const originalProducts = await fakeProductAPI.getProductsByCategory(category);
        let filteredProducts = [...originalProducts];

        if (filters.brands.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                filters.brands.includes(product.brand)
            );
        }

        if (filters.categories.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                filters.categories.includes(product.category)
            );
        }

        if (filters.priceRange.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                filters.priceRange.some(rangeStr => {
                    const range = priceRanges.find(r => `${r.min}-${r.max}` === rangeStr);
                    return range && product.price >= range.min && product.price <= range.max;
                })
            );
        }

        setProducts(filteredProducts);
    }, [category, filters, priceRanges]);

    useEffect(() => {
        filterProducts();
    }, [filters, category, filterProducts]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (loading) {
        return <LuxuryLoader message="Loading Products" />;
    }

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)',
            minHeight: '100vh',
            mt: { xs: 0, sm: 0, md: 0 },
            width: '100%',
            minWidth: '100vw',
            overflowX: 'hidden',
            position: 'relative',
            zIndex: 0
        }}>
            <Container 
                maxWidth={false}
                sx={{ 
                    py: { xs: 2, sm: 3, md: 4 },
                    px: { xs: 2, sm: 4, md: 6 },
                    width: '100%',
                    background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)'
                }}
            >
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 700,
                            background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textTransform: 'capitalize',
                            fontFamily: "'Outfit', sans-serif",
                            mb: 2,
                            letterSpacing: '-0.5px'
                        }}
                    >
                        {category}
                    </Typography>
                    <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            color: '#666',
                            maxWidth: '600px',
                            margin: '0 auto',
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: '1.1rem',
                            lineHeight: 1.6
                        }}
                    >
                        Discover our premium collection of {category} with exceptional quality and design
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={2.5}>
                        <Paper 
                            elevation={0}
                            sx={{ 
                                p: 2.5,
                                borderRadius: '20px',
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 215, 0, 0.1)',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
                                position: 'sticky',
                                top: '130px'
                            }}
                        >
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    mb: 2.5,
                                    fontWeight: 600,
                                    color: '#b7950b',
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: '1.1rem'
                                }}
                            >
                                Refine Selection
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Sort By</InputLabel>
                                    <Select
                                        value={sortBy}
                                        label="Sort By"
                                        onChange={handleSort}
                                        sx={{ 
                                            bgcolor: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(255, 215, 0, 0.3)'
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'rgba(255, 215, 0, 0.5)'
                                            }
                                        }}
                                    >
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="price-low">Price: Low to High</MenuItem>
                                        <MenuItem value="price-high">Price: High to Low</MenuItem>
                                        <MenuItem value="rating">Rating</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography 
                                    variant="subtitle2" 
                                    sx={{ 
                                        mb: 1,
                                        fontWeight: 600,
                                        color: '#333',
                                        fontFamily: "'Outfit', sans-serif"
                                    }}
                                >
                                    Brands
                                </Typography>
                                <FormGroup>
                                    {brands.map(brand => (
                                        <FormControlLabel
                                            key={brand}
                                            control={
                                                <Checkbox 
                                                    checked={filters.brands.includes(brand)}
                                                    onChange={() => handleFilterChange('brands', brand)}
                                                    sx={{
                                                        color: '#ffd700',
                                                        '&.Mui-checked': {
                                                            color: '#b7950b',
                                                        },
                                                        padding: '4px'
                                                    }}
                                                    size="small"
                                                />
                                            }
                                            label={brand}
                                            sx={{ 
                                                '& .MuiFormControlLabel-label': { 
                                                    fontSize: '0.85rem',
                                                    color: '#555'
                                                },
                                                marginLeft: '-8px'
                                            }}
                                        />
                                    ))}
                                </FormGroup>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography 
                                    variant="subtitle2" 
                                    sx={{ 
                                        mb: 1,
                                        fontWeight: 600,
                                        color: '#333',
                                        fontFamily: "'Outfit', sans-serif"
                                    }}
                                >
                                    Price Range
                                </Typography>
                                <FormGroup>
                                    {priceRanges.map(range => (
                                        <FormControlLabel
                                            key={range.label}
                                            control={
                                                <Checkbox 
                                                    checked={filters.priceRange.includes(`${range.min}-${range.max}`)}
                                                    onChange={() => handleFilterChange('priceRange', `${range.min}-${range.max}`)}
                                                    sx={{
                                                        color: '#ffd700',
                                                        '&.Mui-checked': {
                                                            color: '#b7950b',
                                                        },
                                                        padding: '4px'
                                                    }}
                                                    size="small"
                                                />
                                            }
                                            label={range.label}
                                            sx={{ 
                                                '& .MuiFormControlLabel-label': { 
                                                    fontSize: '0.85rem',
                                                    color: '#555'
                                                },
                                                marginLeft: '-8px'
                                            }}
                                        />
                                    ))}
                                </FormGroup>
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={9.5}>
                        <Grid container spacing={3}>
                            {products.map((product) => (
                                <Grid item xs={12} sm={6} md={3} key={product.id}>
                                    <Card 
                                        elevation={0}
                                        onClick={() => handleProductClick(product.id)}
                                        sx={{ 
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: '20px',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(255, 215, 0, 0.1)',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            backdropFilter: 'blur(20px)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            position: 'relative',
                                            cursor: 'pointer',
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                borderRadius: '20px',
                                                border: '1px solid transparent',
                                                background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(255,215,0,0.2))',
                                                WebkitMask: 
                                                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                                WebkitMaskComposite: 'xor',
                                                maskComposite: 'exclude',
                                            },
                                            '&:hover': {
                                                transform: 'translateY(-12px) scale(1.02)',
                                                boxShadow: '0 20px 40px rgba(255, 215, 0, 0.15)',
                                                '& .product-image': {
                                                    transform: 'scale(1.08)'
                                                },
                                                '&::before': {
                                                    borderColor: 'rgba(255, 215, 0, 0.3)',
                                                }
                                            }
                                        }}
                                    >
                                        <Box 
                                            sx={{ 
                                                position: 'relative', 
                                                paddingTop: '100%',
                                                borderBottom: '1px solid rgba(255, 215, 0, 0.05)',
                                                background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={product.image}
                                                alt={product.name}
                                                className="product-image"
                                                sx={{ 
                                                    position: 'absolute',
                                                    top: 0,
                                                    height: '100%',
                                                    width: '100%',
                                                    objectFit: 'contain',
                                                    padding: '20px',
                                                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                                }}
                                            />
                                        </Box>
                                        <CardContent 
                                            sx={{ 
                                                flexGrow: 1, 
                                                bgcolor: 'transparent', 
                                                p: 3,
                                                '&:last-child': { 
                                                    paddingBottom: 3 
                                                }
                                            }}
                                        >
                                            <Typography 
                                                variant="h6" 
                                                sx={{ 
                                                    fontWeight: 600,
                                                    mb: 1,
                                                    background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    fontFamily: "'Outfit', sans-serif",
                                                    fontSize: '1.1rem',
                                                    lineHeight: 1.3,
                                                    minHeight: '2.6rem'
                                                }}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    mb: 2,
                                                    color: 'text.secondary',
                                                    fontFamily: "'Outfit', sans-serif",
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {product.brand} • {product.storage || product.features}
                                            </Typography>
                                            <Box sx={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                mb: 1
                                            }}>
                                                <Typography 
                                                    variant="h6" 
                                                    sx={{ 
                                                        fontWeight: 700,
                                                        color: '#b7950b',
                                                        fontFamily: "'Outfit', sans-serif",
                                                        fontSize: '1.1rem'
                                                    }}
                                                >
                                                    ₹{product.price.toLocaleString('en-IN')}
                                                </Typography>
                                                <Rating 
                                                    value={product.rating} 
                                                    precision={0.1} 
                                                    readOnly 
                                                    size="small"
                                                    sx={{
                                                        color: '#ffd700',
                                                        '& .MuiRating-iconFilled': {
                                                            filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.7))'
                                                        }
                                                    }}
                                                />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ProductListingPage; 