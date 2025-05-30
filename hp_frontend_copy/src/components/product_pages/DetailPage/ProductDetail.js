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
import { API_BASE_URL } from '../../../config';
import LuxuryLoader from '../../common/LuxuryLoader';
import axios from 'axios';
import PhoneInsurance from './phoneInsurance';
import DescriptionTab from './descriptionTab';
import { styled } from '@mui/material/styles';
import PhoneCombos from './PhoneCombos';

// Add styled components for the animated button
const AnimatedButton = styled(Button)(({ theme }) => ({
    '--background': '#FFD700',
    '--text': '#000000',
    '--cart': '#000000',
    '--tick': '#FFD700',
    position: 'relative',
    padding: '8px 28px',
    borderRadius: '8px',
    minWidth: '144px',
    color: 'var(--text)',
    background: 'var(--background)',
    transform: 'scale(var(--scale, 1))',
    transition: 'transform .4s cubic-bezier(.36, 1.01, .32, 1.27)',
    '&:active': {
        '--scale': '.95',
    },
    '& .button-text': {
        fontSize: '14px',
        fontWeight: 500,
        display: 'block',
        position: 'relative',
        paddingLeft: '24px',
        marginLeft: '-8px',
        lineHeight: '26px',
        transform: 'translateY(var(--span-y, 0))',
        transition: 'transform .7s ease',
        '&:before, &:after': {
            content: '""',
            width: 'var(--w, 2px)',
            height: 'var(--h, 14px)',
            borderRadius: '1px',
            position: 'absolute',
            left: 'var(--l, 8px)',
            top: 'var(--t, 6px)',
            background: 'currentColor',
            transform: 'scale(.75) rotate(var(--icon-r, 0deg)) translateY(var(--icon-y, 0))',
            transition: 'transform .65s ease .05s',
        },
        '&:after': {
            '--w': '14px',
            '--h': '2px',
            '--l': '2px',
            '--t': '12px',
        },
    },
    '& .cart': {
        position: 'absolute',
        left: '50%',
        top: '50%',
        margin: '-13px 0 0 -18px',
        transformOrigin: '12px 23px',
        transform: 'translateX(-120px) rotate(-18deg)',
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
        },
        '&:before': {
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            boxShadow: 'inset 0 0 0 2px var(--cart)',
            bottom: 0,
            left: '9px',
            filter: 'drop-shadow(11px 0 0 var(--cart))',
        },
        '&:after': {
            width: '16px',
            height: '9px',
            background: 'var(--cart)',
            left: '9px',
            bottom: '7px',
            transformOrigin: '50% 100%',
            transform: 'perspective(4px) rotateX(-6deg) scaleY(var(--fill, 0))',
            transition: 'transform 1.2s ease var(--fill-d)',
        },
        '& svg': {
            zIndex: 1,
            width: '36px',
            height: '26px',
            display: 'block',
            position: 'relative',
            fill: 'none',
            stroke: 'var(--cart)',
            strokeWidth: '2px',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            '& polyline:last-child': {
                stroke: 'var(--tick)',
                strokeDasharray: '10px',
                strokeDashoffset: 'var(--offset, 10px)',
                transition: 'stroke-dashoffset .4s ease var(--offset-d)',
            },
        },
    },
    '&.loading': {
        '--scale': '.95',
        '--span-y': '-32px',
        '--icon-r': '180deg',
        '--fill': '1',
        '--fill-d': '.8s',
        '--offset': '0',
        '--offset-d': '1.73s',
        '& .cart': {
            animation: 'cart 3.4s linear forwards .2s',
        },
    },
    '@keyframes cart': {
        '12.5%': {
            transform: 'translateX(-60px) rotate(-18deg)',
        },
        '25%, 45%, 55%, 75%': {
            transform: 'none',
        },
        '50%': {
            transform: 'scale(.9)',
        },
        '44%, 56%': {
            transformOrigin: '12px 23px',
        },
        '45%, 55%': {
            transformOrigin: '50% 50%',
        },
        '87.5%': {
            transform: 'translateX(70px) rotate(-18deg)',
        },
        '100%': {
            transform: 'translateX(140px) rotate(-18deg)',
        },
    },
}));

const ProductDetail = () => {
    const { productId } = useParams();
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
        
        const button = document.querySelector('.add-to-cart-button');
        if (!button.classList.contains('loading')) {
            button.classList.add('loading');
            
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
                    const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
                    localStorage.setItem('cartCount', (currentCount + 1).toString());
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
                console.error('Error adding to cart:', error);
                setSnackbar({
                    open: true,
                    message: error.response?.data?.message || 'Failed to add item to cart. Please try again.',
                    severity: 'error'
                });
            } finally {
                setCartLoading(false);
                setTimeout(() => {
                    button.classList.remove('loading');
                }, 3700);
            }
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
                    mrp: parseFloat(data.productDetails.CurrentMRP),
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


    const handleMouseMove = (e) => {
        if (!imageRef.current) return;

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;

        setMousePosition({ x, y });
    };

    const mainImageStyle = {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        objectFit: 'contain',
        borderRadius: '2%',
        backgroundColor: 'rgba(255, 215, 0, 0.02)',
        padding: { xs: '1%', sm: '2%' },
        transition: 'transform 0.3s ease',
        cursor: 'zoom-in',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 0,
        minWidth: 0
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
        width: { xs: 80, sm: 110 },
        height: { xs: 80, sm: 110 },
        objectFit: 'cover',
        borderRadius: '1.2%',
        cursor: 'pointer',
        border: '2px solid transparent',
        padding: 0,
        backgroundColor: 'rgba(255, 215, 0, 0.02)',
        transition: 'all 0.3s ease',
        display: 'block',
        '&:hover': {
            border: '2px solid #FFD700',
            transform: 'translateY(-2%)',
            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.15)'
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
                                gap: 0.5,
                                position: 'sticky',
                                top: '20px',
                                height: 'fit-content',
                                alignSelf: 'flex-start'
                            }}>
                                {/* Thumbnails */}
                                <Box sx={{ 
                                    display: 'flex', 
                                    flexDirection: { xs: 'row', sm: 'column' },
                                    alignItems: 'center',
                                    gap: 0.5,
                                    width: 'auto',
                                    order: { xs: 2, sm: 1 },
                                    justifyContent: 'center',
                                    minWidth: { xs: 'unset', sm: 70 },
                                    height: '100%',
                                    // Center thumbnails vertically with main image
                                    alignSelf: 'center'
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
                                <Box sx={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    order: { xs: 1, sm: 2 }
                                }}>
                                    <Box
                                        ref={imageRef}
                                        sx={{
                                            ...mainImageStyle,
                                            position: 'relative',
                                            overflow: 'hidden',
                                            width: 'auto',
                                            height: 'auto',
                                            maxWidth: '100%',
                                            maxHeight: '70vh',
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
                                                width: 'auto',
                                                height: 'auto',
                                                maxWidth: '100%',
                                                maxHeight: '70vh',
                                                objectFit: 'contain',
                                                display: 'block',
                                                margin: '0 auto'
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
                                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                                        mr: 2
                                    }}
                                >
                                    ₹{product.price.toLocaleString('en-IN')}
                                </Typography>
                                {product.mrp !== product.price && (
                                    <Typography
                                        variant="h6"
                                        component="span"
                                        sx={{
                                            ml: 2,
                                            textDecoration: 'line-through',
                                            color: 'text.secondary',
                                            opacity: 0.7,
                                            fontSize: { xs: '1rem', sm: '1.25rem' }
                                        }}
                                    >
                                        MRP: ₹{product.mrp.toLocaleString('en-IN')}
                                    </Typography>
                                )}
                                {product.discount > 0 && (
                                    <>
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
                                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0.08) 100%)',
                                border: '1.5px solid rgba(255, 215, 0, 0.4)',
                                maxWidth: '94%',
                                boxShadow: '0 3px 15px rgba(255, 215, 0, 0.2)',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                                }
                            }}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 1,
                                    mb: 1.1
                                }}>
                                    <Box sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 6px rgba(255, 215, 0, 0.3)'
                                    }}>
                                        <OfferIcon sx={{ 
                                            color: '#000',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold'
                                        }} />
                                    </Box>
                                    <Typography variant="subtitle2" sx={{ 
                                        fontWeight: 700, 
                                        color: '#000',
                                        fontSize: '1.1rem',
                                        background: 'linear-gradient(45deg, #B7950B 30%, #FFD700 90%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                    }}>
                                        Exclusive Offers
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'flex-start',
                                        gap: 1,
                                        p: 1.15,
                                        borderRadius: '7px',
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%)',
                                        border: '1px solid rgba(255, 215, 0, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateX(5px)',
                                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%)',
                                            boxShadow: '0 3px 10px rgba(255, 215, 0, 0.2)'
                                        }
                                    }}>
                                        <CreditCardIcon sx={{ 
                                            color: '#B7950B',
                                            fontSize: '1.2rem',
                                            mt: 0.14
                                        }} />
                                        <Box>
                                            <Chip 
                                                label="Bank Offer" 
                                                size="small"
                                                sx={{ 
                                                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                                    color: '#000',
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    mb: 0.3,
                                                    height: '20px',
                                                    boxShadow: '0 1px 3px rgba(255, 215, 0, 0.2)'
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ 
                                                color: '#000', 
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                lineHeight: 1.3
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
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%)',
                                        border: '1px solid rgba(255, 215, 0, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateX(5px)',
                                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%)',
                                            boxShadow: '0 3px 10px rgba(255, 215, 0, 0.2)'
                                        }
                                    }}>
                                        <DiscountIcon sx={{ 
                                            color: '#B7950B',
                                            fontSize: '1.2rem',
                                            mt: 0.14
                                        }} />
                                        <Box>
                                            <Chip 
                                                label="Special Price" 
                                                size="small"
                                                sx={{ 
                                                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                                    color: '#000',
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    mb: 0.3,
                                                    height: '20px',
                                                    boxShadow: '0 1px 3px rgba(255, 215, 0, 0.2)'
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ 
                                                color: '#000', 
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                lineHeight: 1.3
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
                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%)',
                                        border: '1px solid rgba(255, 215, 0, 0.3)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateX(5px)',
                                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 100%)',
                                            boxShadow: '0 3px 10px rgba(255, 215, 0, 0.2)'
                                        }
                                    }}>
                                        <GiftIcon sx={{ 
                                            color: '#B7950B',
                                            fontSize: '1.2rem',
                                            mt: 0.14
                                        }} />
                                        <Box>
                                            <Chip 
                                                label="Bundle Offer" 
                                                size="small"
                                                sx={{ 
                                                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                                                    color: '#000',
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    mb: 0.3,
                                                    height: '20px',
                                                    boxShadow: '0 1px 3px rgba(255, 215, 0, 0.2)'
                                                }}
                                            />
                                            <Typography variant="body2" sx={{ 
                                                color: '#000', 
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                lineHeight: 1.3
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
                                <AnimatedButton
                                    className="add-to-cart-button"
                                    onClick={handleAddToCart}
                                    disabled={cartLoading || !product}
                                    startIcon={<CartIcon />}
                                >
                                    <span className="button-text">Add to Cart</span>
                                    <div className="cart">
                                        <svg viewBox="0 0 36 26">
                                            <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
                                            <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                                        </svg>
                                    </div>
                                </AnimatedButton>
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

                            {/* Phone Insurance Section */}
                            <PhoneInsurance brand={product.brand} />

                            {/* Essential Combo Section */}
                            <PhoneCombos product={product} />

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
                            <DescriptionTab product={product} />
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