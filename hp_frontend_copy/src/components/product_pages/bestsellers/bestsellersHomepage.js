import React, { useEffect, useState, useRef } from 'react';
import { 
    Grid, 
    Card, 
    Typography, 
    Box, 
    Container,
    Button,
    Paper,
    IconButton,
    CardContent,
    CardMedia,
    Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WatchIcon from '@mui/icons-material/Watch';
import TabletIcon from '@mui/icons-material/Tablet';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import TimerIcon from '@mui/icons-material/Timer';
import ImageIcon from '@mui/icons-material/Image';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255, 215, 0, 0.1)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    position: 'relative',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
    }
}));

const GradientTypography = styled(Typography)(({ theme }) => ({
    background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold'
}));

const BannerCard = styled(Paper)(({ theme }) => ({
    position: 'relative',
    height: '100%',
    minHeight: 300,
    borderRadius: '20px',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,255,255,0.9) 100%)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
    }
}));

const AdBanner = styled(Paper)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    borderRadius: '0',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.02)',
        '& img': {
            transform: 'scale(1.02)',
            transition: 'transform 0.3s ease'
        }
    },
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease'
    }
}));

const AdPlaceholder = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    minHeight: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    color: '#666',
    gap: 1,
    transition: 'all 0.3s ease'
}));

const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 3 } },
        { breakpoint: 900, settings: { slidesToShow: 2 } },
        { breakpoint: 600, settings: { slidesToShow: 1 } }
    ],
    // Custom styling for dots
    customPaging: function(i) {
        return (
            <Box
                sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#ffd700',
                    opacity: 0.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        opacity: 1,
                        transform: 'scale(1.2)'
                    }
                }}
            />
        );
    },
    // Custom styling for arrows
    prevArrow: (
        <Box
            sx={{
                position: 'absolute',
                left: -30,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                cursor: 'pointer',
                '&:hover': {
                    '& .MuiSvgIcon-root': {
                        color: '#b7950b'
                    }
                }
            }}
        >
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:hover': {
                        backgroundColor: '#ffd700',
                        '& .MuiSvgIcon-root': {
                            color: 'white'
                        }
                    }
                }}
            >
                <Box
                    component="span"
                    sx={{
                        border: 'solid #b7950b',
                        borderWidth: '0 3px 3px 0',
                        display: 'inline-block',
                        padding: '6px',
                        transform: 'rotate(135deg)',
                        transition: 'all 0.3s ease'
                    }}
                />
            </Box>
        </Box>
    ),
    nextArrow: (
        <Box
            sx={{
                position: 'absolute',
                right: -30,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                cursor: 'pointer',
                '&:hover': {
                    '& .MuiSvgIcon-root': {
                        color: '#b7950b'
                    }
                }
            }}
        >
            <Box
                sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    '&:hover': {
                        backgroundColor: '#ffd700',
                        '& .MuiSvgIcon-root': {
                            color: 'white'
                        }
                    }
                }}
            >
                <Box
                    component="span"
                    sx={{
                        border: 'solid #b7950b',
                        borderWidth: '0 3px 3px 0',
                        display: 'inline-block',
                        padding: '6px',
                        transform: 'rotate(-45deg)',
                        transition: 'all 0.3s ease'
                    }}
                />
            </Box>
        </Box>
    )
};

// Add custom styles for the carousel container
const CarouselContainer = styled(Box)(({ theme }) => ({
    '& .slick-dots': {
        bottom: -40,
        '& li': {
            margin: '0 4px',
            '&.slick-active': {
                '& div': {
                    opacity: 1,
                    transform: 'scale(1.2)',
                    backgroundColor: '#b7950b'
                }
            }
        }
    },
    '& .slick-track': {
        display: 'flex',
        gap: theme.spacing(2)
    },
    '& .slick-slide': {
        padding: theme.spacing(1)
    }
}));

// Helper function to format brand name
const formatBrand = (brand) => brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();

const ProductCarousel = ({ title, products }) => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = window.innerWidth < 600 ? 180 : 300; // Smaller scroll on mobile
            container.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Image error handler
    const handleImageError = (event) => {
        event.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
    };

    return (
        <Box sx={{ mb: { xs: 2, sm: 4 } }}>
            <Typography
                variant="h5"
                sx={{
                    mb: { xs: 2, sm: 4 },
                    px: 2,
                    fontWeight: 700,
                    color: '#333333',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: { xs: '1.3rem', sm: '2rem' },
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '3px',
                        backgroundColor: '#ffb800',
                        borderRadius: '2px',
                    },
                    textShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    letterSpacing: '0.5px',
                }}
            >
                {title}
            </Typography>

            <Box sx={{ position: 'relative' }}>
                {/* Left scroll button */}
                <IconButton
                    onClick={() => scroll(-1)}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        zIndex: 2,
                        display: { xs: 'none', sm: 'flex' }, // Hide on mobile
                        '&:hover': {
                            backgroundColor: '#ffffff',
                        }
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>

                {/* Right scroll button */}
                <IconButton
                    onClick={() => scroll(1)}
                    sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        zIndex: 2,
                        display: { xs: 'none', sm: 'flex' }, // Hide on mobile
                        '&:hover': {
                            backgroundColor: '#ffffff',
                        }
                    }}
                >
                    <ChevronRightIcon />
                </IconButton>

                {/* Products container */}
                <Box
                    ref={scrollContainerRef}
                    sx={{
                        display: 'flex',
                        gap: { xs: 1, sm: 2 },
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                        px: 1,
                        mt: -1
                    }}
                >
                    {products.map((product) => (
                        <Box
                            key={product.ItemCode}
                            component={Link}
                            to={`/product/${product.ItemCode}`}
                            sx={{
                                textDecoration: 'none',
                                color: 'inherit',
                                flex: { xs: '0 0 80vw', sm: '0 0 280px' },
                                maxWidth: { xs: '80vw', sm: '280px' },
                            }}
                        >
                            <Card
                                sx={{
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                                    }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height={window.innerWidth < 600 ? 120 : 200}
                                    image={product.imgname11}
                                    alt={product.ItemName}
                                    onError={handleImageError}
                                    sx={{
                                        objectFit: 'contain',
                                        p: { xs: 1, sm: 2 },
                                        backgroundColor: '#fff',
                                        height: { xs: 120, sm: 200 }
                                    }}
                                />
                                <CardContent sx={{ p: { xs: 1, sm: 2 } }}>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        sx={{
                                            fontFamily: "'Outfit', sans-serif",
                                            fontSize: { xs: '0.95rem', sm: '1rem' },
                                            fontWeight: 600,
                                            height: { xs: '2.2rem', sm: '3rem' },
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                    >
                                        {product.ItemName}
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                        <Chip 
                                            label={product.Brand} 
                                            size="small" 
                                            sx={{ 
                                                backgroundColor: '#ffb800',
                                                color: '#000000',
                                                fontFamily: "'Outfit', sans-serif",
                                                fontWeight: 500,
                                                mr: 1
                                            }}
                                        />
                                        
                                        <Chip 
                                            label={`₹${product.SalePrice}`} 
                                            size="small"
                                            sx={{ 
                                                backgroundColor: '#f0f0f0',
                                                fontFamily: "'Outfit', sans-serif",
                                                fontWeight: 500
                                            }}
                                        />
                                    </Box>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        startIcon={<ShoppingCartIcon />}
                                        sx={{
                                            backgroundColor: '#ffb800',
                                            color: '#000000',
                                            fontFamily: "'Outfit', sans-serif",
                                            fontWeight: 600,
                                            fontSize: { xs: '0.85rem', sm: '1rem' },
                                            py: { xs: 1, sm: 1.5 },
                                            '&:hover': {
                                                backgroundColor: '#ffa000',
                                            }
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

const EdgeToEdgeBanner = ({ children, sx }) => (
    <Box
        sx={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
            ...sx,
        }}
    >
        {children}
    </Box>
);

const BestsellersHomepage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`${API_BASE_URL}/api/bestsellers`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Failed to load bestsellers');
                setLoading(false);
                console.error(err);
            });
    }, []);

    return (
        <>
            {/* Main Ad Banner - edge to edge */}
            <EdgeToEdgeBanner sx={{ mb: { xs: 2, sm: 3 } }}>
                <AdBanner sx={{ minHeight: { xs: 120, sm: 200, md: 300 }, borderRadius: 0 }}>
                    <AdPlaceholder>
                        <ImageIcon sx={{ fontSize: { xs: 28, sm: 40 }, color: '#b7950b' }} />
                        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Main Ad Banner</Typography>
                        <Typography variant="body2">1920 x 400px</Typography>
                    </AdPlaceholder>
                </AdBanner>
            </EdgeToEdgeBanner>

            <Container maxWidth="xl" sx={{ py: { xs: 1, sm: 2 } }}>
                {/* Hero Section */}
                <Box sx={{ mb: { xs: 1, sm: 2 }, textAlign: 'center' }}>
                    <GradientTypography variant="h3" sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1.7rem', sm: '2.5rem' } }}>
                        Hotspot Bestsellers
                    </GradientTypography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                        Discover Our Most Popular Products
                    </Typography>
                </Box>

                {/* Carousels Section */}
                {loading ? (
                    <Box sx={{ textAlign: 'center', my: { xs: 2, sm: 4 } }}>
                        <Typography>Loading...</Typography>
                    </Box>
                ) : error ? (
                    <Box sx={{ textAlign: 'center', my: { xs: 2, sm: 4 } }}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                ) : data ? (
                    <>
                        {/* Top Selling Products Carousel */}
                        <ProductCarousel 
                            title="Top Selling Products" 
                            products={Array.isArray(data.bestSellers) ? data.bestSellers : []} 
                        />

                        {/* Featured Categories Grid (moved here) */}
                        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 6 } }}>
                            {[
                                { title: 'Smartphones', icon: <SmartphoneIcon sx={{ fontSize: 40 }} />, color: '#2196f3' },
                                { title: 'Wearables', icon: <WatchIcon sx={{ fontSize: 40 }} />, color: '#4caf50' },
                                { title: 'Tablets', icon: <TabletIcon sx={{ fontSize: 40 }} />, color: '#ff9800' },
                                { title: 'Accessories', icon: <HeadphonesIcon sx={{ fontSize: 40 }} />, color: '#9c27b0' }
                            ].map((category, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <StyledCard>
                                        <Box sx={{
                                            p: { xs: 2, sm: 3 },
                                            textAlign: 'center',
                                            width: '100%'
                                        }}>
                                            <Box sx={{ 
                                                color: category.color,
                                                mb: { xs: 1, sm: 2 }
                                            }}>
                                                {category.icon}
                                            </Box>
                                            <Typography variant="h6" sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.15rem' } }}>
                                                {category.title}
                                            </Typography>
                                            <Button 
                                                variant="outlined" 
                                                size="small"
                                                sx={{ 
                                                    borderColor: category.color,
                                                    color: category.color,
                                                    fontSize: { xs: '0.85rem', sm: '1rem' },
                                                    '&:hover': {
                                                        borderColor: category.color,
                                                        backgroundColor: `${category.color}10`
                                                    }
                                                }}
                                            >
                                                View All
                                            </Button>
                                        </Box>
                                    </StyledCard>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Brand Carousels */}
                        {Object.entries(data.brandBestSellers).map(([brand, products], idx, arr) => {
                            if (!Array.isArray(products) || products.length === 0) return null;
                            // Render Samsung
                            if (brand.toLowerCase() === 'samsung') {
                                return <React.Fragment key={brand}>
                                    <ProductCarousel 
                                        title={`Top ${formatBrand(brand)} Products`}
                                        products={products}
                                    />
                                    {/* Flash Sale Section inserted after Samsung - edge to edge */}
                                    <EdgeToEdgeBanner sx={{ mb: { xs: 3, sm: 6 } }}>
                                        <BannerCard sx={{ minHeight: { xs: 120, sm: 200, md: 300 }, borderRadius: 0 }}>
                                            <Box sx={{
                                                p: { xs: 2, sm: 4 },
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,255,255,0.9) 100%)'
                                            }}>
                                                <FlashOnIcon sx={{ fontSize: { xs: 36, sm: 60 }, color: '#ffd700', mb: 2 }} />
                                                <Typography variant="h4" sx={{ mb: 2, color: '#b7950b', fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '2rem' } }}>
                                                    Flash Sale
                                                </Typography>
                                                <Typography variant="h6" sx={{ mb: 3, color: '#666', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                                    Limited Time Offers on Premium Devices
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                                    <TimerIcon sx={{ color: '#b7950b', mr: 1, fontSize: { xs: 20, sm: 28 } }} />
                                                    <Typography variant="h6" sx={{ color: '#b7950b', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                                        Ends in 24:00:00
                                                    </Typography>
                                                </Box>
                                                <Button 
                                                    variant="contained"
                                                    size="large"
                                                    sx={{
                                                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                                        color: 'white',
                                                        px: { xs: 2, sm: 4 },
                                                        py: { xs: 1, sm: 1.5 },
                                                        fontSize: { xs: '0.95rem', sm: '1.15rem' },
                                                        '&:hover': {
                                                            background: 'linear-gradient(45deg, #9c7c0a 30%, #e6c200 90%)'
                                                        }
                                                    }}
                                                >
                                                    Shop Now
                                                </Button>
                                            </Box>
                                        </BannerCard>
                                    </EdgeToEdgeBanner>
                                </React.Fragment>;
                            }
                            // Render Apple
                            if (brand.toLowerCase() === 'apple') {
                                return <React.Fragment key={brand}>
                                    <ProductCarousel 
                                        title={`Top ${formatBrand(brand)} Products`}
                                        products={products}
                                    />
                                    {/* Side-by-Side Ad Banners inserted after Apple - edge to edge */}
                                    <EdgeToEdgeBanner sx={{ mb: { xs: 3, sm: 6 } }}>
                                        <Grid container spacing={{ xs: 2, sm: 3 }}>
                                            <Grid item xs={12} md={6}>
                                                <AdBanner sx={{ minHeight: { xs: 100, sm: 200, md: 300 }, borderRadius: 0 }}>
                                                    <AdPlaceholder>
                                                        <ImageIcon sx={{ fontSize: { xs: 28, sm: 40 }, color: '#b7950b' }} />
                                                        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Left Ad Banner</Typography>
                                                        <Typography variant="body2">600 x 400px</Typography>
                                                    </AdPlaceholder>
                                                </AdBanner>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <AdBanner sx={{ minHeight: { xs: 100, sm: 200, md: 300 }, borderRadius: 0 }}>
                                                    <AdPlaceholder>
                                                        <ImageIcon sx={{ fontSize: { xs: 28, sm: 40 }, color: '#b7950b' }} />
                                                        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Right Ad Banner</Typography>
                                                        <Typography variant="body2">600 x 400px</Typography>
                                                    </AdPlaceholder>
                                                </AdBanner>
                                            </Grid>
                                        </Grid>
                                    </EdgeToEdgeBanner>
                                </React.Fragment>;
                            }
                            // Render Vivo
                            if (brand.toLowerCase() === 'vivo') {
                                return <React.Fragment key={brand}>
                                    <ProductCarousel 
                                        title={`Top ${formatBrand(brand)} Products`}
                                        products={products}
                                    />
                                    {/* Triple Ad Banners inserted after Vivo - edge to edge */}
                                    <EdgeToEdgeBanner sx={{ mb: { xs: 3, sm: 6 } }}>
                                        <Grid container spacing={{ xs: 2, sm: 3 }}>
                                            {[1, 2, 3].map((item) => (
                                                <Grid item xs={12} md={4} key={item}>
                                                    <AdBanner sx={{ minHeight: { xs: 80, sm: 150, md: 200 }, borderRadius: 0 }}>
                                                        <AdPlaceholder>
                                                            <ImageIcon sx={{ fontSize: { xs: 24, sm: 40 }, color: '#b7950b' }} />
                                                            <Typography variant="h6" sx={{ fontSize: { xs: '0.95rem', sm: '1.15rem' } }}>Ad Banner {item}</Typography>
                                                            <Typography variant="body2">400 x 300px</Typography>
                                                        </AdPlaceholder>
                                                    </AdBanner>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </EdgeToEdgeBanner>
                                </React.Fragment>;
                            }
                            // Render other brands
                            return <ProductCarousel 
                                key={brand}
                                title={`Top ${formatBrand(brand)} Products`}
                                products={products}
                            />;
                        })}
                    </>
                ) : null}
            </Container>

            {/* New Arrivals Banner - edge to edge */}
            <EdgeToEdgeBanner sx={{ mb: { xs: 3, sm: 6 } }}>
                <BannerCard sx={{ minHeight: { xs: 120, sm: 200, md: 300 }, borderRadius: 0 }}>
                    <Box sx={{
                        p: { xs: 2, sm: 4 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,255,255,0.9) 100%)'
                    }}>
                        <FlashOnIcon sx={{ fontSize: { xs: 36, sm: 60 }, color: '#ffd700', mb: 2 }} />
                        <Typography variant="h4" sx={{ mb: 2, color: '#b7950b', fontWeight: 'bold', fontSize: { xs: '1.2rem', sm: '2rem' } }}>
                            New Arrivals
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 3, color: '#666', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                            Be the First to Experience Latest Technology
                        </Typography>
                        <Button 
                            variant="contained"
                            size="large"
                            sx={{
                                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                                color: 'white',
                                px: { xs: 2, sm: 4 },
                                py: { xs: 1, sm: 1.5 },
                                fontSize: { xs: '0.95rem', sm: '1.15rem' },
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #9c7c0a 30%, #e6c200 90%)'
                                }
                            }}
                        >
                            View New Arrivals
                        </Button>
                    </Box>
                </BannerCard>
            </EdgeToEdgeBanner>

            {/* Bottom Ad Banner - edge to edge */}
            <EdgeToEdgeBanner sx={{ mt: { xs: 3, sm: 6 } }}>
                <AdBanner sx={{ minHeight: { xs: 80, sm: 150, md: 250 }, borderRadius: 0 }}>
                    <AdPlaceholder>
                        <ImageIcon sx={{ fontSize: { xs: 28, sm: 40 }, color: '#b7950b' }} />
                        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Bottom Ad Banner</Typography>
                        <Typography variant="body2">1920 x 250px</Typography>
                    </AdPlaceholder>
                </AdBanner>
            </EdgeToEdgeBanner>
        </>
    );
};

export default BestsellersHomepage;
