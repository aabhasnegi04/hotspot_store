import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, Card, CardContent, CardMedia, Button, Chip } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import phoneData from '../../../data/phones.json';
import LuxuryLoader from '../../common/LuxuryLoader';

// Fallback image URL
const fallbackImage = "https://via.placeholder.com/300x300?text=Phone+Image";

const LatestPhonesCarousel = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        // Simulate API loading
        setTimeout(() => {
            setProducts(phoneData.phones);
            setLoading(false);
        }, 1000);
    }, []);

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = 300;
            container.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Image error handler
    const handleImageError = (event) => {
        event.target.src = fallbackImage;
    };

    if (loading) {
        return <LuxuryLoader message="Loading Latest Phones" />;
    }

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                py: 4,
                px: 0,
                backgroundColor: '#ffffff',
                boxShadow: 'none',
                borderTop: 'none',
                mt: -2
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 4,
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
                    '@media (max-width:600px)': {
                        textAlign: 'center',
                        display: 'block',
                        px: 0,
                        mx: 'auto',
                        width: '100%',
                    }
                }}
            >
                Latest Phones
            </Typography>

            {/* Left scroll button */}
            <IconButton
                onClick={() => scroll(-1)}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 2,
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
                    display: { xs: 'none', md: 'flex' },
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 2,
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
                    gap: 2,
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
                {products.map((phone) => (
                    <Card
                        key={phone.id}
                        sx={{
                            flex: '0 0 280px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                            },
                            '@media (max-width:600px)': {
                                flex: '0 0 48vw',
                                maxWidth: '48vw',
                            }
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="200"
                            image={phone.image}
                            alt={phone.phone_name}
                            onError={handleImageError}
                            sx={{
                                objectFit: 'contain',
                                p: 2,
                                backgroundColor: '#fff',
                                '@media (max-width:600px)': {
                                    height: '140px',
                                }
                            }}
                        />
                        <CardContent sx={{ p: 2, '@media (max-width:600px)': { p: 1 } }}>
                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    height: '3rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical'
                                }}
                            >
                                {phone.phone_name}
                            </Typography>
                            
                            {phone.desc && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: '#666666',
                                        mb: 1,
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: '0.875rem',
                                        height: '2.5rem',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical'
                                    }}
                                >
                                    {phone.desc}
                                </Typography>
                            )}
                            
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <Chip 
                                    label={phone.brand} 
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
                                    label={phone.price} 
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
                                    '&:hover': {
                                        backgroundColor: '#ffa000',
                                    }
                                }}
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default LatestPhonesCarousel; 