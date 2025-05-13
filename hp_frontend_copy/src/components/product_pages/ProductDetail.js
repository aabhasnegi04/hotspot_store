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
    Snackbar,
    Alert,
} from '@mui/material';
import {
    ShoppingCart as CartIcon,
    Favorite as FavoriteIcon,
    Share as ShareIcon,
    LocalShipping as ShippingIcon,
    Security as SecurityIcon,
    LocalOffer as OfferIcon,
    CreditCard as CreditCardIcon,
    CardGiftcard as GiftIcon,
    Discount as DiscountIcon,
} from '@mui/icons-material';
import { API_BASE_URL } from '../../config';
import LuxuryLoader from '../common/LuxuryLoader';
import axios from 'axios';

const ProductDetail = () => {
    const { productId } = useParams();
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cartLoading, setCartLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });
    const imageRef = useRef(null);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Generate or retrieve session ID
    const getSessionId = () => {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    };

    const handleAddToCart = async () => {
        if (!product) return;
        
        setCartLoading(true);
        try {
            const sessionId = getSessionId();
            console.log('Adding to cart:', {
                itemCode: product.id,
                salePrice: product.price,
                sessionId: sessionId
            });
            
            const response = await axios.post(`${API_BASE_URL}/api/cart/add-to-cart`, {
                itemCode: product.id,
                salePrice: product.price,
                sessionId: sessionId
            });

            console.log('Cart response:', response.data);

            if (response.data.success) {
                // Update cart count in localStorage
                const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
                localStorage.setItem('cartCount', (currentCount + 1).toString());
                // Dispatch a custom event to notify header component
                window.dispatchEvent(new Event('cartUpdated'));

                setSnackbar({
                    open: true,
                    message: 'Item added to cart successfully!',
                    severity: 'success'
                });
            } else {
                throw new Error(response.data.message || 'Failed to add item to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', {
                error: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Failed to add item to cart. Please try again.',
                severity: 'error'
            });
        } finally {
            setCartLoading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/api/product/${productId}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data = await response.json();
                
                // Transform the API response to match our component's data structure
                const enhancedProduct = {
                    id: data.productDetails.ItemCode,
                    name: data.productDetails.ItemName,
                    price: parseFloat(data.productDetails.SalePrice),
                    rating: 4.5, // You might want to add this to your API
                    discount: parseFloat(data.productDetails.DiscountValue),
                    reviewCount: 245, // You might want to add this to your API
                    stock: parseInt(data.productDetails.QUANTITY),
                    description: data.descriptions?.DESCRIPTIONS || data.descriptions?.DESCRIPTION_NEW || 
                               `Experience the ultimate ${data.productDetails.ItemName} with revolutionary features and exceptional performance.`,
                    images: [
                        data.productDetails.imgname11,
                        data.productDetails.imgname22,
                        data.productDetails.imgname33,
                        data.productDetails.imgname44,
                        data.productDetails.imgname55,
                    ].filter(Boolean), // Filter out any null/undefined images
                    brand: data.productDetails.Brand,
                    category: data.productDetails.Category || 'Electronics',
                    type: data.productDetails.MODEL,
                    highlights: [
                        `Brand: ${data.productDetails.Brand}`,
                        `Model: ${data.productDetails.MODEL}`,
                        `Category: ${data.productDetails.Category || 'Electronics'}`,
                        // Add any other relevant details from your API response
                    ].filter(Boolean),
                    specifications: {
                        "Brand": data.productDetails.Brand,
                        "Model": data.productDetails.MODEL,
                        "Category": data.productDetails.Category || 'Electronics',
                        // Add any other specifications from your API response
                    },
                    colors: ["Black", "Silver", "Gold", "Blue"], // Add if available in your API
                    storage: ["128GB", "256GB", "512GB", "1TB"], // Add if available in your API
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

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;

        setMousePosition({ x, y });
    };

    const mainImageStyle = {
        width: '100%',
        height: { xs: '50vh', sm: '60vh', md: '70vh' },
        objectFit: 'contain',
        borderRadius: '2%',
        backgroundColor: 'rgba(255, 215, 0, 0.02)',
        padding: { xs: '1%', sm: '2%' },
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
        padding: { xs: '0.4%', sm: '0.8%' },
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
            pt: { xs: 1, sm: 2, md: 4 },
            pb: { xs: 4, sm: 6, md: 8 },
            position: 'relative',
            zIndex: 0
        }}>
            <Container maxWidth="lg">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: '4%', sm: '3%', md: '2%' },
                        borderRadius: '0%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 215, 0, 0.2)',
                        boxShadow: '0 4% 30% rgba(0, 0, 0, 0.05)',
                        margin: { xs: '-2% -4% -4% -4%', sm: '-3% -10% -6% -10%', md: '-3% -17% -6% -17%' }
                    }}
                >
                    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                        {/* Product Images Section */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: { xs: 1, sm: 2 }
                            }}>
                                {/* Thumbnails */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    flexDirection: { xs: 'row', sm: 'column' },
                                    gap: { xs: 1, sm: 2 },
                                    width: { xs: '100%', sm: '15%' },
                                    order: { xs: 2, sm: 1 }
                                }}>
                                    {product.images.map((img, index) => (
                                        <Box
                                            key={index}
                                            component="img"
                                            src={img}
                                            alt={`${product.name}-${index}`}
                                            sx={{
                                                ...thumbnailStyle,
                                                width: { xs: '20%', sm: '100%' },
                                                border: selectedImage === index ? '2px solid #FFD700' : '2px solid transparent',
                                                boxShadow: selectedImage === index ? '0 4px 12px rgba(255, 215, 0, 0.15)' : 'none'
                                            }}
                                            onClick={() => setSelectedImage(index)}
                                        />
                                    ))}
                                </Box>

                                {/* Main Image */}
                                <Box sx={{ 
                                    width: { xs: '100%', sm: '85%' },
                                    order: { xs: 1, sm: 2 }
                                }}>
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
                                    mb: 2,
                                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
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
                                p: { xs: 2, sm: 3 },
                                borderRadius: '15px',
                                flexWrap: 'wrap',
                                gap: 1
                            }}>
                                <Typography 
                                    variant="h4" 
                                    component="span" 
                                    sx={{
                                        fontWeight: 700,
                                        color: '#B7950B',
                                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
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
                                                ml: { xs: 1, sm: 2 }, 
                                                textDecoration: 'line-through', 
                                                color: 'text.secondary',
                                                opacity: 0.7,
                                                fontSize: { xs: '1rem', sm: '1.25rem' }
                                            }}
                                        >
                                            ₹{(product.price + product.discount).toLocaleString('en-IN')}
                                        </Typography>
                                        <Chip 
                                            label={`Save ₹${product.discount.toLocaleString('en-IN')}`} 
                                            color="error" 
                                            size="small" 
                                            sx={{ 
                                                ml: { xs: 1, sm: 2 },
                                                background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                                color: '#000',
                                                fontWeight: 600,
                                                border: 'none',
                                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                            }} 
                                        />
                                    </>
                                )}
                            </Box>

                            {/* Offers Section */}
                            <Box sx={{ 
                                mb: 1.4,
                                p: 1.5,
                                borderRadius: '9px',
                                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.065) 0%, rgba(255, 215, 0, 0.022) 100%)',
                                border: '1px solid rgba(255, 215, 0, 0.16)',
                                maxWidth: '94%',
                                boxShadow: '0 2.5px 12px rgba(255, 215, 0, 0.065)'
                            }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    mb: 1.1
                                }}>
                                    <OfferIcon sx={{ 
                                        color: '#B7950B',
                                        fontSize: '1.08rem'
                                    }} />
                                    <Typography variant="subtitle2" sx={{ 
                                        fontWeight: 600, 
                                        color: '#B7950B', 
                                        fontSize: '1.01rem',
                                        background: 'linear-gradient(45deg, #B7950B 30%, #FFD700 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        Exciting Offers for You
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start',
                                        gap: 1,
                                        p: 1.15,
                                        borderRadius: '7px',
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.955) 0%, rgba(255, 255, 255, 0.83) 100%)',
                                        border: '1px solid rgba(255, 215, 0, 0.16)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateX(5px)',
                                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.96) 100%)',
                                            boxShadow: '0 2.5px 9px rgba(255, 215, 0, 0.11)'
                                        }
                                    }}>
                                        <CreditCardIcon sx={{ 
                                            color: '#B7950B',
                                            fontSize: '1.08rem',
                                            mt: 0.14
                                        }} />
                                        <Box>
                                            <Chip 
                                                label="Bank Offer" 
                                                size="small"
                                                sx={{ 
                                                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                                    color: '#000',
                                                    fontWeight: 600,
                                                    fontSize: '0.72rem',
                                                    mb: 0.14,
                                                    height: '19px'
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ 
                                                color: '#666', 
                                                fontSize: '0.81rem',
                                                fontWeight: 500
                                            }}>
                                                Get 10% Instant Discount on HDFC Bank Credit Cards & EMI
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start',
                                        gap: 1,
                                        p: 1.15,
                                        borderRadius: '7px',
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.955) 0%, rgba(255, 255, 255, 0.83) 100%)',
                                        border: '1px solid rgba(255, 215, 0, 0.16)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateX(5px)',
                                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.96) 100%)',
                                            boxShadow: '0 2.5px 9px rgba(255, 215, 0, 0.11)'
                                        }
                                    }}>
                                        <DiscountIcon sx={{ 
                                            color: '#B7950B',
                                            fontSize: '1.08rem',
                                            mt: 0.14
                                        }} />
                                        <Box>
                                            <Chip 
                                                label="Special Price" 
                                                size="small"
                                                sx={{ 
                                                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                                    color: '#000',
                                                    fontWeight: 600,
                                                    fontSize: '0.72rem',
                                                    mb: 0.14,
                                                    height: '19px'
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ 
                                                color: '#666', 
                                                fontSize: '0.81rem',
                                                fontWeight: 500
                                            }}>
                                                Save ₹1,000 with our exclusive limited-time offer!
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start',
                                        gap: 1,
                                        p: 1.15,
                                        borderRadius: '7px',
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.955) 0%, rgba(255, 255, 255, 0.83) 100%)',
                                        border: '1px solid rgba(255, 215, 0, 0.16)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateX(5px)',
                                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.96) 100%)',
                                            boxShadow: '0 2.5px 9px rgba(255, 215, 0, 0.11)'
                                        }
                                    }}>
                                        <GiftIcon sx={{ 
                                            color: '#B7950B',
                                            fontSize: '1.08rem',
                                            mt: 0.14
                                        }} />
                                        <Box>
                                            <Chip 
                                                label="Bundle Offer" 
                                                size="small"
                                                sx={{ 
                                                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                                    color: '#000',
                                                    fontWeight: 600,
                                                    fontSize: '0.72rem',
                                                    mb: 0.14,
                                                    height: '19px'
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ 
                                                color: '#666', 
                                                fontSize: '0.81rem',
                                                fontWeight: 500
                                            }}>
                                                Get 3 months of Prime Video + 1 year of extended warranty free!
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Action Buttons */}
                            <Box sx={{ 
                                display: 'flex', 
                                gap: { xs: 1, sm: 2 }, 
                                mb: 4,
                                flexDirection: { xs: 'column', sm: 'row' }
                            }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<CartIcon />}
                                    onClick={handleAddToCart}
                                    disabled={cartLoading || !product}
                                    sx={{
                                        flex: 2,
                                        py: { xs: '3%', sm: '1.5%' },
                                        background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                        color: '#000000',
                                        fontWeight: 600,
                                        borderRadius: '1.2%',
                                        boxShadow: '0 4% 20% rgba(255, 215, 0, 0.25)',
                                        transition: 'all 0.3s ease',
                                        fontSize: { xs: '0.875rem', sm: '1rem' },
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
                                            transform: 'translateY(-2%)',
                                            boxShadow: '0 6% 25% rgba(255, 215, 0, 0.35)'
                                        },
                                        '&.Mui-disabled': {
                                            background: 'rgba(0, 0, 0, 0.12)',
                                            color: 'rgba(0, 0, 0, 0.26)'
                                        }
                                    }}
                                >
                                    {cartLoading ? 'Adding...' : 'Add to Cart'}
                                </Button>
                                <Box sx={{ 
                                    display: 'flex', 
                                    gap: { xs: 1, sm: 2 },
                                    width: { xs: '100%', sm: 'auto' }
                                }}>
                                    <IconButton 
                                        sx={{ 
                                            border: '2px solid rgba(255, 215, 0, 0.2)',
                                            borderRadius: '12px',
                                            p: { xs: 1.5, sm: 2 },
                                            flex: 1,
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
                                            p: { xs: 1.5, sm: 2 },
                                            flex: 1,
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
                            </Box>

                            {/* Key Features Section */}
                            <Box sx={{ 
                                mb: 4,
                                p: 2,
                                borderRadius: '12px',
                                backgroundColor: 'rgba(255, 215, 0, 0.05)',
                                border: '1px solid rgba(255, 215, 0, 0.1)',
                                maxWidth: '90%'
                            }}>
                                <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600, color: '#B7950B', fontSize: '1rem' }}>
                                    Key Features
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1, fontWeight: 400, whiteSpace: 'pre-line', fontSize: '1rem' }}>
                                    {product.description.split('•').map((part, index) => index === 0 ? part : `•${part}`).join('\n')}
                                </Typography>
                            </Box>

                            {/* Delivery & Security Info */}
                            <Box sx={{ 
                                display: 'flex', 
                                gap: { xs: 1, sm: 2 }, 
                                mb: 3,
                                flexDirection: { xs: 'column', sm: 'row' }
                            }}>
                                <Paper 
                                    sx={{ 
                                        flex: 1, 
                                        p: { xs: 1.5, sm: 2 }, 
                                        textAlign: 'center',
                                        background: 'rgba(255, 215, 0, 0.05)',
                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                        borderRadius: '15px'
                                    }}
                                >
                                    <ShippingIcon sx={{ 
                                        color: '#FFD700', 
                                        mb: 1,
                                        fontSize: { xs: '1.5rem', sm: '2rem' }
                                    }} />
                                    <Typography 
                                        variant="body2"
                                        sx={{ 
                                            color: '#B7950B',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                        }}
                                    >
                                        Free Delivery
                                    </Typography>
                                </Paper>
                                <Paper 
                                    sx={{ 
                                        flex: 1, 
                                        p: { xs: 1.5, sm: 2 }, 
                                        textAlign: 'center',
                                        background: 'rgba(255, 215, 0, 0.05)',
                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                        borderRadius: '15px'
                                    }}
                                >
                                    <SecurityIcon sx={{ 
                                        color: '#FFD700', 
                                        mb: 1,
                                        fontSize: { xs: '1.5rem', sm: '2rem' }
                                    }} />
                                    <Typography 
                                        variant="body2"
                                        sx={{ 
                                            color: '#B7950B',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
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
                                mb: 3,
                                overflowX: 'auto'
                            }}>
                                <Tabs 
                                    value={selectedTab} 
                                    onChange={handleTabChange}
                                    variant="scrollable"
                                    scrollButtons="auto"
                                    sx={{
                                        '& .MuiTab-root': {
                                            textTransform: 'none',
                                            fontSize: { xs: '0.875rem', sm: '1rem' },
                                            fontWeight: 500,
                                            color: '#666',
                                            minWidth: { xs: 'auto', sm: '160px' },
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
                                <Box sx={{ py: { xs: 2, sm: 3 } }}>
                                    <Grid container spacing={{ xs: 1, sm: 2 }}>
                                        {product.highlights.map((highlight, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Paper 
                                                    sx={{ 
                                                        p: { xs: 2, sm: 3 }, 
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
                                                            fontSize: { xs: '0.875rem', sm: '1rem' },
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
                                <Box sx={{ py: { xs: 2, sm: 3 } }}>
                                    <Grid container spacing={{ xs: 1, sm: 2 }}>
                                        {Object.entries(product.specifications).map(([key, value]) => (
                                            <Grid item xs={12} sm={6} key={key}>
                                                <Paper 
                                                    sx={{ 
                                                        p: { xs: 2, sm: 3 },
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
                                                            mb: 1,
                                                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                        }}
                                                    >
                                                        {key}
                                                    </Typography>
                                                    <Typography 
                                                        variant="body1"
                                                        sx={{
                                                            color: '#666',
                                                            fontWeight: 500,
                                                            fontSize: { xs: '0.875rem', sm: '1rem' }
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
                                <Box sx={{ py: { xs: 2, sm: 3 } }}>
                                    <Typography 
                                        variant="h6" 
                                        gutterBottom
                                        sx={{
                                            color: '#B7950B',
                                            fontWeight: 600,
                                            fontSize: { xs: '1rem', sm: '1.25rem' }
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
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionProps={{ timeout: 500 }}
                sx={{
                    '& .MuiSnackbar-root': {
                        transition: 'all 0.3s ease-in-out'
                    }
                }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ 
                        width: '100%',
                        '& .MuiAlert-message': {
                            fontWeight: 500,
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                        }
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProductDetail; 