import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Box,
    Rating,
    Tabs,
    Tab,
    IconButton,
    Chip,
} from '@mui/material';
import {
    ShoppingCart as CartIcon,
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    LocalShipping as ShippingIcon,
    Security as SecurityIcon,
    Add as AddIcon,
    Remove as RemoveIcon,
} from '@mui/icons-material';
import fakeProductAPI from '../../services/fakeProductAPI';
import LuxuryLoader from '../common/LuxuryLoader';

const ProductDetail = () => {
    const { productId } = useParams();
    const [selectedTab, setSelectedTab] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // Get all products from all categories
                const [smartphones, tablets, laptops, smartwatches, accessories] = await Promise.all([
                    fakeProductAPI.getProductsByCategory('smartphones'),
                    fakeProductAPI.getProductsByCategory('tablets'),
                    fakeProductAPI.getProductsByCategory('laptops'),
                    fakeProductAPI.getProductsByCategory('smartwatches'),
                    fakeProductAPI.getProductsByCategory('accessories')
                ]);

                // Combine all products
                const allProducts = [
                    ...smartphones,
                    ...tablets,
                    ...laptops,
                    ...smartwatches,
                    ...accessories
                ];
                
                // Find the specific product by ID
                const foundProduct = allProducts.find(p => p.id === parseInt(productId));
                
                if (!foundProduct) {
                    throw new Error('Product not found');
                }

                // Enhance the product data with additional details
                const enhancedProduct = {
                    ...foundProduct,
                    discount: 100,
                    reviewCount: 245,
                    stock: 50,
                    description: `Experience the ultimate ${foundProduct.name} with revolutionary features and exceptional performance.`,
                    images: [
                        foundProduct.image,
                        foundProduct.image,
                        foundProduct.image,
                        foundProduct.image
                    ],
                    highlights: [
                        foundProduct.storage ? `Storage: ${foundProduct.storage}` : '',
                        foundProduct.ram ? `RAM: ${foundProduct.ram}` : '',
                        foundProduct.processor ? `Processor: ${foundProduct.processor}` : '',
                        foundProduct.display ? `Display: ${foundProduct.display}` : '',
                        foundProduct.battery ? `Battery: ${foundProduct.battery}` : '',
                        foundProduct.features ? `Features: ${foundProduct.features}` : '',
                        `Brand: ${foundProduct.brand}`,
                        `Category: ${foundProduct.category}`,
                        `Type: ${foundProduct.type}`
                    ].filter(Boolean),
                    specifications: {
                        ...(foundProduct.storage && { "Storage": foundProduct.storage }),
                        ...(foundProduct.ram && { "RAM": foundProduct.ram }),
                        ...(foundProduct.processor && { "Processor": foundProduct.processor }),
                        ...(foundProduct.display && { "Display": foundProduct.display }),
                        ...(foundProduct.battery && { "Battery": foundProduct.battery }),
                        ...(foundProduct.features && { "Features": foundProduct.features }),
                        "Brand": foundProduct.brand,
                        "Category": foundProduct.category,
                        "Type": foundProduct.type
                    },
                    colors: ["Black", "Silver", "Gold", "Blue"],
                    storage: foundProduct.category === 'laptops' ? 
                        ["256GB", "512GB", "1TB", "2TB"] : 
                        ["128GB", "256GB", "512GB", "1TB"]
                };

                setProduct(enhancedProduct);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleQuantityChange = (operation) => {
        if (operation === 'add' && quantity < (product?.stock || 0)) {
            setQuantity(prev => prev + 1);
        } else if (operation === 'subtract' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;

        setMousePosition({ x, y });
    };

    const mainImageStyle = {
        width: '100%',
        height: '70vh',
        objectFit: 'contain',
        borderRadius: '2%',
        backgroundColor: 'rgba(255, 215, 0, 0.02)',
        padding: '2%',
        transition: 'transform 0.3s ease',
        cursor: 'zoom-in',
        position: 'relative',
        overflow: 'hidden'
    };

    const zoomedImageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '150%',
        height: '150%',
        transform: `translate(${-mousePosition.x}%, ${-mousePosition.y}%)`,
        transformOrigin: 'center',
        pointerEvents: 'none',
        transition: 'transform 0.1s ease-out'
    };

    const thumbnailStyle = {
        width: '100%',
        height: 'auto',
        aspectRatio: '1/1',
        objectFit: 'cover',
        borderRadius: '1.2%',
        cursor: 'pointer',
        border: '2px solid transparent',
        padding: '0.8%',
        backgroundColor: 'rgba(255, 215, 0, 0.02)',
        transition: 'all 0.3s ease',
        '&:hover': {
            border: '2px solid #FFD700',
            transform: 'translateY(-2%)',
            boxShadow: '0 4% 12% rgba(255, 215, 0, 0.15)'
        }
    };

    if (loading) {
        return <LuxuryLoader message="Loading Product" />;
    }

    if (!product) {
        return null;
    }

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)',
            minHeight: '100vh',
            pt: { xs: 2, sm: 3, md: 4 },
            pb: 8,
            position: 'relative',
            zIndex: 0
        }}>
            <Container maxWidth="lg">
                <Paper
                    elevation={0}
                    sx={{
                        p: '2%',
                        borderRadius: '0%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 215, 0, 0.2)',
                        boxShadow: '0 4% 30% rgba(0, 0, 0, 0.05)',
                        margin: '-3% -17% -6% -17%'
                    }}
                >
                    <Grid container spacing={4}>
                        {/* Product Images Section */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {/* Thumbnails */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    gap: 2,
                                    width: '15%'
                                }}>
                                    {product.images.map((img, index) => (
                                        <Box
                                            key={index}
                                            component="img"
                                            src={img}
                                            alt={`${product.name}-${index}`}
                                            sx={{
                                                ...thumbnailStyle,
                                                border: selectedImage === index ? '2px solid #FFD700' : '2px solid transparent',
                                                boxShadow: selectedImage === index ? '0 4px 12px rgba(255, 215, 0, 0.15)' : 'none'
                                            }}
                                            onClick={() => setSelectedImage(index)}
                                        />
                                    ))}
                                </Box>

                                {/* Main Image */}
                                <Box sx={{ width: '85%', position: 'relative' }}>
                                    <Box
                                        ref={imageRef}
                                        sx={{
                                            ...mainImageStyle,
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        onMouseEnter={() => setIsZoomed(true)}
                                        onMouseLeave={() => setIsZoomed(false)}
                                        onMouseMove={handleMouseMove}
                                    >
                                        <Box
                                            component="img"
                                            src={product.images[selectedImage]}
                                            alt={product.name}
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                        {isZoomed && (
                                            <Box
                                                component="img"
                                                src={product.images[selectedImage]}
                                                alt={product.name}
                                                sx={zoomedImageStyle}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Product Info Section */}
                        <Grid item xs={12} md={6}>
                            <Typography 
                                variant="h4" 
                                component="h1" 
                                gutterBottom 
                                sx={{
                                    fontWeight: 600,
                                    background: 'linear-gradient(45deg, #B7950B 30%, #FFD700 90%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    letterSpacing: '-0.5px',
                                    mb: 2
                                }}
                            >
                                {product.name}
                            </Typography>
                            
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mb: 2,
                                background: 'rgba(255, 215, 0, 0.05)',
                                p: 2,
                                borderRadius: '15px'
                            }}>
                                <Rating 
                                    value={product.rating} 
                                    precision={0.1} 
                                    readOnly 
                                    sx={{
                                        color: '#FFD700',
                                        '& .MuiRating-iconFilled': {
                                            filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.5))'
                                        }
                                    }}
                                />
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        ml: 1, 
                                        color: '#B7950B',
                                        fontWeight: 500
                                    }}
                                >
                                    ({product.reviewCount} reviews)
                                </Typography>
                            </Box>

                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'baseline', 
                                mb: 3,
                                background: 'rgba(255, 215, 0, 0.05)',
                                p: 3,
                                borderRadius: '15px'
                            }}>
                                <Typography 
                                    variant="h4" 
                                    component="span" 
                                    sx={{
                                        fontWeight: 700,
                                        color: '#B7950B'
                                    }}
                                >
                                    ₹{product.price.toLocaleString('en-IN')}
                                </Typography>
                                {product.discount > 0 && (
                                    <>
                                        <Typography 
                                            variant="h6" 
                                            component="span" 
                                            sx={{ 
                                                ml: 2, 
                                                textDecoration: 'line-through', 
                                                color: 'text.secondary',
                                                opacity: 0.7
                                            }}
                                        >
                                            ₹{(product.price + product.discount).toLocaleString('en-IN')}
                                        </Typography>
                                        <Chip 
                                            label={`Save ₹${product.discount.toLocaleString('en-IN')}`} 
                                            color="error" 
                                            size="small" 
                                            sx={{ 
                                                ml: 2,
                                                background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                                color: '#000',
                                                fontWeight: 600,
                                                border: 'none'
                                            }} 
                                        />
                                    </>
                                )}
                            </Box>

                            <Typography 
                                variant="body1" 
                                sx={{ 
                                    mb: 4,
                                    color: '#666',
                                    lineHeight: 1.8,
                                    fontWeight: 400
                                }}
                            >
                                {product.description}
                            </Typography>

                            {/* Color Selection */}
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    mb: 2,
                                    fontWeight: 600,
                                    color: '#333'
                                }}
                            >
                                Color
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
                                {product.colors.map((color) => (
                                    <Chip 
                                        key={color} 
                                        label={color} 
                                        variant="outlined"
                                        onClick={() => {}}
                                        sx={{ 
                                            borderRadius: '1.2%',
                                            padding: '2% 1.2%',
                                            border: '2px solid rgba(255, 215, 0, 0.2)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: '#FFD700',
                                                background: 'rgba(255, 215, 0, 0.05)',
                                                transform: 'translateY(-2%)'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Storage Selection */}
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    mb: 2,
                                    fontWeight: 600,
                                    color: '#333'
                                }}
                            >
                                Storage
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
                                {product.storage.map((size) => (
                                    <Chip 
                                        key={size} 
                                        label={size} 
                                        variant="outlined"
                                        onClick={() => {}}
                                        sx={{ 
                                            borderRadius: '12px',
                                            padding: '20px 12px',
                                            border: '2px solid rgba(255, 215, 0, 0.2)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: '#FFD700',
                                                background: 'rgba(255, 215, 0, 0.05)',
                                                transform: 'translateY(-2px)'
                                            }
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Quantity Selection */}
                            <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                mb: 4,
                                background: 'rgba(255, 215, 0, 0.05)',
                                p: 2,
                                borderRadius: '15px'
                            }}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                        mr: 2,
                                        fontWeight: 600,
                                        color: '#333'
                                    }}
                                >
                                    Quantity
                                </Typography>
                                <IconButton 
                                    size="small" 
                                    onClick={() => handleQuantityChange('subtract')}
                                    disabled={quantity <= 1}
                                    sx={{
                                        border: '2px solid rgba(255, 215, 0, 0.2)',
                                        '&:hover': {
                                            background: 'rgba(255, 215, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography 
                                    sx={{ 
                                        mx: 3,
                                        fontWeight: 600,
                                        color: '#B7950B'
                                    }}
                                >
                                    {quantity}
                                </Typography>
                                <IconButton 
                                    size="small" 
                                    onClick={() => handleQuantityChange('add')}
                                    disabled={quantity >= product.stock}
                                    sx={{
                                        border: '2px solid rgba(255, 215, 0, 0.2)',
                                        '&:hover': {
                                            background: 'rgba(255, 215, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <AddIcon />
                                </IconButton>
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        ml: 2,
                                        color: product.stock > 10 ? '#4CAF50' : '#f44336',
                                        fontWeight: 500
                                    }}
                                >
                                    {product.stock} items available
                                </Typography>
                            </Box>

                            {/* Action Buttons */}
                            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<CartIcon />}
                                    sx={{
                                        flex: 2,
                                        py: '1.5%',
                                        background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                        color: '#000000',
                                        fontWeight: 600,
                                        borderRadius: '1.2%',
                                        boxShadow: '0 4% 20% rgba(255, 215, 0, 0.25)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
                                            transform: 'translateY(-2%)',
                                            boxShadow: '0 6% 25% rgba(255, 215, 0, 0.35)'
                                        }
                                    }}
                                >
                                    Add to Cart
                                </Button>
                                <IconButton 
                                    sx={{ 
                                        border: '2px solid rgba(255, 215, 0, 0.2)',
                                        borderRadius: '12px',
                                        p: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background: 'rgba(255, 215, 0, 0.05)',
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    <FavoriteIcon sx={{ color: '#B7950B' }} />
                                </IconButton>
                                <IconButton 
                                    sx={{ 
                                        border: '2px solid rgba(255, 215, 0, 0.2)',
                                        borderRadius: '12px',
                                        p: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background: 'rgba(255, 215, 0, 0.05)',
                                            transform: 'translateY(-2px)'
                                        }
                                    }}
                                >
                                    <ShareIcon sx={{ color: '#B7950B' }} />
                                </IconButton>
                            </Box>

                            {/* Delivery & Security Info */}
                            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                <Paper 
                                    sx={{ 
                                        flex: 1, 
                                        p: 2, 
                                        textAlign: 'center',
                                        background: 'rgba(255, 215, 0, 0.05)',
                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                        borderRadius: '15px'
                                    }}
                                >
                                    <ShippingIcon sx={{ color: '#FFD700', mb: 1 }} />
                                    <Typography 
                                        variant="body2"
                                        sx={{ 
                                            color: '#B7950B',
                                            fontWeight: 500
                                        }}
                                    >
                                        Free Delivery
                                    </Typography>
                                </Paper>
                                <Paper 
                                    sx={{ 
                                        flex: 1, 
                                        p: 2, 
                                        textAlign: 'center',
                                        background: 'rgba(255, 215, 0, 0.05)',
                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                        borderRadius: '15px'
                                    }}
                                >
                                    <SecurityIcon sx={{ color: '#FFD700', mb: 1 }} />
                                    <Typography 
                                        variant="body2"
                                        sx={{ 
                                            color: '#B7950B',
                                            fontWeight: 500
                                        }}
                                    >
                                        Secure Payment
                                    </Typography>
                                </Paper>
                            </Box>
                        </Grid>

                        {/* Product Details Tabs */}
                        <Grid item xs={12}>
                            <Box sx={{ 
                                borderBottom: 1, 
                                borderColor: 'rgba(255, 215, 0, 0.2)',
                                mb: 3
                            }}>
                                <Tabs 
                                    value={selectedTab} 
                                    onChange={handleTabChange}
                                    sx={{
                                        '& .MuiTab-root': {
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            fontWeight: 500,
                                            color: '#666',
                                            '&.Mui-selected': {
                                                color: '#B7950B',
                                                fontWeight: 600
                                            }
                                        },
                                        '& .MuiTabs-indicator': {
                                            backgroundColor: '#FFD700'
                                        }
                                    }}
                                >
                                    <Tab label="Highlights" />
                                    <Tab label="Specifications" />
                                    <Tab label="Reviews" />
                                </Tabs>
                            </Box>

                            {/* Highlights Tab */}
                            {selectedTab === 0 && (
                                <Box sx={{ py: 3 }}>
                                    <Grid container spacing={2}>
                                        {product.highlights.map((highlight, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Paper 
                                                    sx={{ 
                                                        p: 3, 
                                                        height: '100%',
                                                        background: 'rgba(255, 215, 0, 0.02)',
                                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                                        borderRadius: '15px',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <Typography 
                                                        variant="body1"
                                                        sx={{
                                                            color: '#666',
                                                            '&::before': {
                                                                content: '"•"',
                                                                color: '#FFD700',
                                                                marginRight: '8px',
                                                                fontSize: '1.2em'
                                                            }
                                                        }}
                                                    >
                                                        {highlight}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )}

                            {/* Specifications Tab */}
                            {selectedTab === 1 && (
                                <Box sx={{ py: 3 }}>
                                    <Grid container spacing={2}>
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <Grid item xs={12} sm={6} key={key}>
                                                <Paper 
                                                    sx={{ 
                                                        p: 3,
                                                        background: 'rgba(255, 215, 0, 0.02)',
                                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                                        borderRadius: '15px',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.1)'
                                                        }
                                                    }}
                                                >
                                                    <Typography 
                                                        variant="subtitle2" 
                                                        sx={{
                                                            color: '#B7950B',
                                                            fontWeight: 600,
                                                            mb: 1
                                                        }}
                                                    >
                                                        {key}
                                                    </Typography>
                                                    <Typography 
                                                        variant="body1"
                                                        sx={{
                                                            color: '#666',
                                                            fontWeight: 500
                                                        }}
                                                    >
                                                        {value}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>
                            )}

                            {/* Reviews Tab */}
                            {selectedTab === 2 && (
                                <Box sx={{ py: 3 }}>
                                    <Typography 
                                        variant="h6" 
                                        gutterBottom
                                        sx={{
                                            color: '#B7950B',
                                            fontWeight: 600
                                        }}
                                    >
                                        Customer Reviews
                                    </Typography>
                                    {/* Add review components here */}
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default ProductDetail; 