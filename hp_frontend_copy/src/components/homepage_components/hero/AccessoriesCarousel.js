import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, IconButton, Card, CardContent, CardMedia, Button, Chip, Skeleton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import accessoriesData from '../../../data/accessories.json';

const AccessoriesCarousel = () => {
    const [accessories, setAccessories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState({});
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        // Load accessories data
        setAccessories(accessoriesData.accessories);
        setLoading(false);
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

    const handleImageLoad = (id) => {
        setImageLoading(prev => ({ ...prev, [id]: false }));
    };

    const handleImageError = (event, accessory) => {
        console.warn(`Failed to load image for ${accessory.name}`);
        event.target.style.display = 'none';
        const parent = event.target.parentElement;
        if (parent) {
            parent.style.backgroundColor = '#f5f5f5';
            parent.style.display = 'flex';
            parent.style.alignItems = 'center';
            parent.style.justifyContent = 'center';
            
            // Create icon container if it doesn't exist
            if (!parent.querySelector('.fallback-icon')) {
                const iconContainer = document.createElement('div');
                iconContainer.className = 'fallback-icon';
                iconContainer.style.display = 'flex';
                iconContainer.style.flexDirection = 'column';
                iconContainer.style.alignItems = 'center';
                iconContainer.style.justifyContent = 'center';
                iconContainer.style.padding = '20px';
                iconContainer.style.textAlign = 'center';
                
                // Add icon
                const icon = document.createElement('div');
                icon.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24"><path fill="#999" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.11 5.9,23 7,23H17C18.11,23 19,22.11 19,21V3C19,1.89 18.11,1 17,1Z" /></svg>';
                
                // Add text
                const text = document.createElement('div');
                text.style.marginTop = '10px';
                text.style.color = '#999';
                text.style.fontSize = '12px';
                text.style.fontFamily = "'Outfit', sans-serif";
                text.textContent = 'Image not available';
                
                iconContainer.appendChild(icon);
                iconContainer.appendChild(text);
                parent.appendChild(iconContainer);
            }
        }
        setImageLoading(prev => ({ ...prev, [accessory.id]: false }));
    };

    if (loading) return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography>Loading accessories...</Typography>
        </Box>
    );

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
                Accessories
            </Typography>

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
                {accessories.map((accessory) => (
                    <Card
                        key={accessory.id}
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
                        <Box sx={{ position: 'relative', height: 200, backgroundColor: '#fff' }}>
                            {imageLoading[accessory.id] !== false && (
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
                                image={accessory.image}
                                alt={accessory.name}
                                onLoad={() => handleImageLoad(accessory.id)}
                                onError={(e) => handleImageError(e, accessory)}
                                sx={{
                                    objectFit: 'contain',
                                    p: 2,
                                    backgroundColor: '#fff',
                                    transition: 'opacity 0.3s ease',
                                }}
                            />
                        </Box>
                        <CardContent>
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
                                {accessory.name}
                            </Typography>
                            
                            {accessory.desc && (
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
                                    {accessory.desc}
                                </Typography>
                            )}
                            
                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                <Chip 
                                    label={accessory.brand} 
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
                                    label={accessory.price} 
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

export default AccessoriesCarousel; 