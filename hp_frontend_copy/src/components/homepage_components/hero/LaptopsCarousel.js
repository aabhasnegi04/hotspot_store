import React, { useRef, useState } from 'react';
import { Box, Typography, IconButton, Card, CardMedia, Skeleton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import laptopsData from '../../../data/laptops.json';

const { laptops } = laptopsData;

const LaptopsCarousel = () => {
    const scrollContainerRef = useRef(null);
    const [imageLoading, setImageLoading] = useState({});

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = direction * 300;
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleImageLoad = (id) => {
        setImageLoading(prev => ({ ...prev, [id]: false }));
    };

    const handleImageError = (e, laptop) => {
        console.error(`Failed to load image for ${laptop.name}:`, e);
        setImageLoading(prev => ({ ...prev, [laptop.id]: false }));
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                py: 4,
                px: 2,
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
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
                    fontSize: '2rem',
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
                Premium Laptops
            </Typography>

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
                    px: 1
                }}
            >
                {laptops.map((laptop) => (
                    <Card
                        key={laptop.id}
                        sx={{
                            flex: '0 0 280px',
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
                        <Box sx={{ position: 'relative', height: '200px' }}>
                            {imageLoading[laptop.id] !== false && (
                                <Skeleton 
                                    variant="rectangular" 
                                    width="100%" 
                                    height="100%"
                                    animation="wave"
                                    sx={{ 
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        backgroundColor: 'rgba(0,0,0,0.05)'
                                    }}
                                />
                            )}
                            <CardMedia
                                component="img"
                                height="200"
                                image={laptop.image}
                                alt={laptop.name}
                                onLoad={() => handleImageLoad(laptop.id)}
                                onError={(e) => handleImageError(e, laptop)}
                                sx={{
                                    objectFit: 'contain',
                                    p: 2,
                                    backgroundColor: '#fff',
                                    transition: 'opacity 0.3s ease',
                                }}
                            />
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 600,
                                    color: '#333333',
                                    mb: 0.5,
                                    fontSize: '1.1rem',
                                    fontFamily: "'Outfit', sans-serif",
                                }}
                            >
                                {laptop.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#666666',
                                    mb: 1,
                                    fontSize: '0.9rem',
                                }}
                            >
                                {laptop.specs}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#ffb800',
                                    fontWeight: 700,
                                    fontSize: '1.2rem',
                                }}
                            >
                                {laptop.price}
                            </Typography>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default LaptopsCarousel; 