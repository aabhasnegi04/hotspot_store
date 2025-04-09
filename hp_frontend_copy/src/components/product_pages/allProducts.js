import React, { useState, useEffect, useCallback } from 'react';
import { 
    Box, 
    Container, 
    Grid, 
    Card, 
    CardMedia, 
    CardContent, 
    Typography,
    TextField,
    MenuItem,
    Pagination,
    FormControl,
    Select,
    InputAdornment,
    Paper,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Divider,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LuxuryLoader from '../common/LuxuryLoader';
import { API_BASE_URL } from '../../config';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SortIcon from '@mui/icons-material/Sort';
import StarIcon from '@mui/icons-material/Star';

const AllProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Pagination state
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    
    // Filter states
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [inStock, setInStock] = useState(false);
    const [hasDiscount, setHasDiscount] = useState(false);

    // Add searchQuery state to handle immediate updates
    const [searchQuery, setSearchQuery] = useState('');

    // Create a debounced search function
    const debouncedSearch = useCallback(
        debounce((query) => {
            setSearch(query);
        }, 500),  // 500ms delay
        []
    );

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);  // Update the input field immediately
        debouncedSearch(query); // Debounce the actual search
    };

    // Add the debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    useEffect(() => {
        fetchProducts();
    }, [page, selectedBrands, selectedGroups, minPrice, maxPrice, search]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            let url = `${API_BASE_URL}/api/products?page=${page}`;
            
            if (selectedBrands.length > 0) {
                url += `&brand=${selectedBrands.join(',')}`;
            }
            if (selectedGroups.length > 0) {
                url += `&group=${selectedGroups.join(',')}`;
            }
            if (minPrice) url += `&minPrice=${minPrice}`;
            if (maxPrice) url += `&maxPrice=${maxPrice}`;
            if (search) url += `&search=${search}`;

            const response = await axios.get(url);
            setProducts(response.data.data.products);
            setTotalPages(response.data.data.pagination.totalPages);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const handleProductClick = (itemCode) => {
        navigate(`/product/${itemCode}`);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        // Scroll to top when page changes
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // For smooth scrolling
        });
    };

    // Handler for brand checkbox changes
    const handleBrandChange = (brand) => {
        setSelectedBrands(prev => {
            if (prev.includes(brand)) {
                return prev.filter(b => b !== brand);
            }
            return [...prev, brand];
        });
    };

    // Handler for group checkbox changes
    const handleGroupChange = (group) => {
        setSelectedGroups(prev => {
            if (prev.includes(group)) {
                return prev.filter(g => g !== group);
            }
            return [...prev, group];
        });
    };

    if (loading) return <LuxuryLoader message="Loading Products" />;
    if (error) return <div style={{ marginTop: '80px' }}>{error}</div>;

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)',
            minHeight: '100vh',
            pt: 3,
            pb: 6
        }}>
            <Container maxWidth="xl">
                {/* Title Section - Above both filters and products */}
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h4" sx={{ 
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textTransform: 'capitalize',
                        fontFamily: "'Outfit', sans-serif",
                    }}>
                        All Products
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {/* Filters Section - Left Sidebar */}
                    <Grid item xs={12} md={2.5}>
                        <Paper elevation={0} sx={{ 
                            p: 3, 
                            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.98))',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 215, 0, 0.1)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                            position: 'sticky',
                            top: '100px',
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <FilterListIcon sx={{ color: '#1a1a1a', mr: 1 }} />
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 600,
                                    background: 'linear-gradient(45deg, #1a1a1a, #333)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    letterSpacing: '0.5px'
                                }}>
                                    Filters
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {/* Search with icon */}
                                <Box sx={{ position: 'relative' }}>
                                    <SearchIcon sx={{ position: 'absolute', left: 8, top: 8, color: 'text.secondary' }} />
                                    <TextField
                                        fullWidth
                                        placeholder="Search Products"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        variant="outlined"
                                        sx={{ 
                                            '& .MuiOutlinedInput-root': {
                                                pl: 5,
                                                borderRadius: '12px',
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                '&:hover': {
                                                    background: 'rgba(255, 255, 255, 0.9)',
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                {/* Sort By Section */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <SortIcon sx={{ color: '#1a1a1a', mr: 1 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            Sort By
                                        </Typography>
                                    </Box>
                                    <FormControl fullWidth>
                                        <Select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            displayEmpty
                                            sx={{ borderRadius: '12px' }}
                                        >
                                            <MenuItem value="">None</MenuItem>
                                            <MenuItem value="price_low">Price: Low to High</MenuItem>
                                            <MenuItem value="price_high">Price: High to Low</MenuItem>
                                            <MenuItem value="newest">Newest First</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                {/* Brands Section */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <PhoneAndroidIcon sx={{ color: '#1a1a1a', mr: 1 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            Brands
                                        </Typography>
                                    </Box>
                                    <FormGroup>
                                        {['Samsung', 'Apple', 'Vivo', 'OPPO', 'OnePlus', 'Xiaomi', 'Realme'].map((brand) => (
                                            <FormControlLabel
                                                key={brand}
                                                control={
                                                    <Checkbox 
                                                        checked={selectedBrands.includes(brand)}
                                                        onChange={() => handleBrandChange(brand)}
                                                        sx={{
                                                            color: 'rgba(0, 0, 0, 0.6)',
                                                            '&.Mui-checked': {
                                                                color: '#1a1a1a',
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                        {brand}
                                                    </Box>
                                                }
                                            />
                                        ))}
                                    </FormGroup>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                {/* Categories Section */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <CategoryIcon sx={{ color: '#1a1a1a', mr: 1 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            Categories
                                        </Typography>
                                    </Box>
                                    <FormGroup>
                                        {['New Handset', 'Accessories', 'Tablet'].map((group) => (
                                            <FormControlLabel
                                                key={group}
                                                control={
                                                    <Checkbox 
                                                        checked={selectedGroups.includes(group)}
                                                        onChange={() => handleGroupChange(group)}
                                                        sx={{
                                                            color: 'rgba(0, 0, 0, 0.6)',
                                                            '&.Mui-checked': {
                                                                color: '#1a1a1a',
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={group}
                                            />
                                        ))}
                                    </FormGroup>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                {/* Price Range Section */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <LocalOfferIcon sx={{ color: '#1a1a1a', mr: 1 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            Price Range
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <TextField
                                            label="Min"
                                            type="number"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            sx={{ 
                                                width: '50%',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px'
                                                }
                                            }}
                                        />
                                        <TextField
                                            label="Max"
                                            type="number"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                                            }}
                                            sx={{ 
                                                width: '50%',
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px'
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                {/* Additional Filters */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <StarIcon sx={{ color: '#1a1a1a', mr: 1 }} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                            Additional Filters
                                        </Typography>
                                    </Box>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox 
                                                    checked={inStock}
                                                    onChange={(e) => setInStock(e.target.checked)}
                                                />
                                            }
                                            label="In Stock Only"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox 
                                                    checked={hasDiscount}
                                                    onChange={(e) => setHasDiscount(e.target.checked)}
                                                />
                                            }
                                            label="Discounted Items"
                                        />
                                    </FormGroup>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Products Grid - Right Side */}
                    <Grid item xs={12} md={9.5}>
                        <Grid container spacing={2}>
                            {products.map((product) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={product.itemcode}>
                                    <Card 
                                        elevation={0}
                                        onClick={() => handleProductClick(product.itemcode)}
                                        sx={{ 
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: '20px',
                                            overflow: 'hidden',
                                            border: '1px solid rgba(255, 215, 0, 0.1)',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)'
                                            }
                                        }}
                                    >
                                        <Box sx={{ position: 'relative', paddingTop: '90%' }}>
                                            <CardMedia
                                                component="img"
                                                image={product.image || 'https://via.placeholder.com/200'}
                                                alt={product.ItemName}
                                                sx={{ 
                                                    position: 'absolute',
                                                    top: 0,
                                                    height: '100%',
                                                    width: '100%',
                                                    objectFit: 'contain',
                                                    p: 2
                                                }}
                                            />
                                        </Box>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ 
                                                mb: 1,
                                                fontSize: '1rem',
                                                lineHeight: 1.3,
                                                minHeight: '2.6rem'
                                            }}>
                                                {product.ItemName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {product.brand}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                                <Typography variant="h6" color="primary">
                                                    ₹{product.salePrice.toLocaleString('en-IN')}
                                                </Typography>
                                                {product.currentMRP > product.salePrice && (
                                                    <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                                                        ₹{product.currentMRP.toLocaleString('en-IN')}
                                                    </Typography>
                                                )}
                                            </Box>
                                            <Button 
                                                variant="contained"
                                                fullWidth
                                                startIcon={<ShoppingCartIcon />}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent card click when clicking the button
                                                    // Add to cart logic here
                                                }}
                                                sx={{
                                                    background: 'linear-gradient(to right, #1a1a1a, #333333)',
                                                    color: '#FFD700',
                                                    fontWeight: 500,
                                                    textTransform: 'none',
                                                    fontSize: '0.9rem',
                                                    padding: '10px 16px',
                                                    borderRadius: '8px',
                                                    letterSpacing: '0.5px',
                                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                                    boxShadow: 'none',
                                                    transition: 'all 0.3s ease',
                                                    '&:hover': {
                                                        background: 'linear-gradient(to right, #000000, #1a1a1a)',
                                                        borderColor: '#FFD700',
                                                        boxShadow: '0 4px 12px rgba(255, 215, 0, 0.2)',
                                                        transform: 'translateY(-1px)'
                                                    },
                                                    '&:active': {
                                                        transform: 'translateY(1px)',
                                                        boxShadow: '0 2px 8px rgba(255, 215, 0, 0.1)'
                                                    }
                                                }}
                                            >
                                                Add to Cart
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Pagination */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Pagination 
                                count={totalPages} 
                                page={page} 
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AllProducts;
