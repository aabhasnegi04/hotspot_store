import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CategoryCarousel from './CategoryCarousel';
import LatestPhonesCarousel from './LatestPhonesCarousel';
import FeaturedProducts from './FeaturedProducts';
import AccessoriesCarousel from './AccessoriesCarousel';
import BrandsCarousel from './BrandsCarousel';
import LaptopsCarousel from './LaptopsCarousel';
import AdBanner from './AdBanner';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

/**
 * Hero Component
 * A full-width image carousel with navigation controls and keyboard support
 * Features:
 * - Image carousel with fade transitions
 * - Navigation arrows and dot indicators
 * - Keyboard navigation (left/right/up/down arrow keys)
 * - Error handling for failed image loads
 * - Responsive design with hover effects
 */
const AnimatedSection = ({ children }) => {
    const [ref, isVisible] = useScrollAnimation(0.1);
    
    return (
        <Box
            ref={ref}
            sx={{
                transform: isVisible 
                    ? 'scale(1) translateY(0)' 
                    : 'scale(0.95) translateY(30px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                mb: 4,
                willChange: 'transform, opacity'
            }}
        >
            {children}
        </Box>
    );
};

const Hero = () => {
    // State management for carousel functionality
    const [currentImageIndex, setCurrentImageIndex] = useState(0);  // Tracks current slide
    const [imageError, setImageError] = useState(false);            // Handles image load errors
    const [isTransitioning, setIsTransitioning] = useState(false);  // Controls fade transition state
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);       // Controls auto-play state
    
    // Array of image paths for the carousel
    const images = [
        "/Image/banner/galaxy fold & flip.jpg",
        "/Image/banner/April Banner Redmi & Motorola.jpg",
        "/Image/banner/April Banner Sam & Apple.jpg",
        "/Image/banner/April Banner Xiaomi & oneplus.jpg",
    ];

    /**
     * Navigation Handlers
     * handlePrevious: Navigate to previous image with fade transition
     * handleNext: Navigate to next image with fade transition
     * handleDotClick: Navigate to specific image by dot index
     */
    const handlePrevious = useCallback(() => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
            setImageError(false);
            setIsTransitioning(false);
        }, 500);
    }, [images.length]);

    const handleNext = useCallback(() => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
            setImageError(false);
            setIsTransitioning(false);
        }, 500);
    }, [images.length]);

    const handleDotClick = useCallback((index) => {
        if (index === currentImageIndex) return;  // Prevent unnecessary transitions
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex(index);
            setImageError(false);
            setIsTransitioning(false);
        }, 200);
    }, [currentImageIndex]);

    /**
     * Keyboard Navigation
     * Adds event listeners for arrow keys
     * Cleans up listeners on component unmount
     */
    useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key) {
                case 'ArrowLeft':
                    handlePrevious();
                    break;
                case 'ArrowRight':
                    handleNext();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleNext, handlePrevious]);

    /**
     * Error Handler
     * Logs and displays error state when image fails to load
     */
    const handleImageError = () => {
        const failedImagePath = images[currentImageIndex];
        console.error(`Failed to load image: ${failedImagePath}`);
        console.log('Current image index:', currentImageIndex);
        console.log('Available images:', images);
        setImageError(true);
    };

    // Auto-play functionality
    useEffect(() => {
        let timer;
        if (isAutoPlaying) {
            timer = setInterval(() => {
                handleNext();
            }, 3000); // Changed from 3000 to 2000 for more frequent slides
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isAutoPlaying, handleNext]);

    // Pause auto-play on hover
    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
    };

    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
    };

    // Reset auto-play when component mounts
    useEffect(() => {
        setIsAutoPlaying(true);
    }, []);

    return (
        <>
            {/* Main container with gradient background */}
            <Box
                sx={{
                    background: 'linear-gradient(180deg, rgba(248, 247, 247, 0.95) 0%, rgba(248, 247, 247, 0.85) 100%)',
                    pt: { xs: '35px', md: '0px' },
                    pb: 0,
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    mr: 0,
                    right: 0,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }
                }}
            >
                <Container 
                    maxWidth={false} 
                    disableGutters 
                    sx={{ 
                        px: 0,
                        width: '100%',
                        maxWidth: 'none',
                        mt: { xs: -4, md: 0 },
                        mr: 0,
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    {/* Carousel container with hover effects and border */}
                    <Box
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: { 
                                xs: 'auto', // Auto height on mobile
                                sm: '60vh', // Medium height on tablets
                                md: 'calc(100vh - 150px)' // Full height on desktop
                            },
                            aspectRatio: { 
                                xs: '16/9', // Standard aspect ratio for mobile
                                sm: 'auto' // Auto aspect ratio for larger screens
                            },
                            overflow: 'hidden',
                            borderRadius: 0,
                            border: 'none',
                            boxShadow: 'none',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            mr: 0,
                            right: 0
                        }}
                    >
                        {/* Single Image with Fade Transition */}
                        <Box
                            component="img"
                            src={images[currentImageIndex]}
                            alt={`Slide ${currentImageIndex + 1}`}
                            onError={handleImageError}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: { xs: 'cover', sm: 'cover' }, // Changed to cover for consistent aspect ratio
                                objectPosition: 'center',
                                opacity: isTransitioning ? 0 : 1,
                                transition: 'opacity 0.5s ease-in-out',
                                backgroundColor: '#f8f7f7',
                                padding: { xs: 0, sm: 0 } // Removed padding for full-width display
                            }}
                        />

                        {/* Error message display */}
                        {imageError && (
                            <Typography
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'error.main',
                                    textAlign: 'center',
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                    p: 2,
                                    borderRadius: 1,
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}
                            >
                                Failed to load image: {images[currentImageIndex]}
                                <br />
                                Please check if the image exists in the public/banner folder
                            </Typography>
                        )}

                        {/* Navigation arrows with enhanced styling */}
                        <IconButton
                            onClick={handlePrevious}
                            sx={{
                                position: 'absolute',
                                left: { xs: 4, sm: 8, md: 16 },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                width: { xs: 32, sm: 40, md: 48 },
                                height: { xs: 32, sm: 40, md: 48 },
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                },
                                '& .MuiSvgIcon-root': {
                                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                                }
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                position: 'absolute',
                                right: { xs: 4, sm: 8, md: 16 },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                width: { xs: 32, sm: 40, md: 48 },
                                height: { xs: 32, sm: 40, md: 48 },
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                },
                                '& .MuiSvgIcon-root': {
                                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                                }
                            }}
                        >
                            <ChevronRightIcon />
                        </IconButton>

                        {/* Dot indicators */}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: { xs: 16, sm: 24 },
                                left: '50%',
                                transform: 'translateX(-50%)',
                                display: 'flex',
                                gap: { xs: 1, sm: 2 },
                                padding: { xs: '6px 12px', sm: '8px 16px' },
                                borderRadius: '20px',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 2
                            }}
                        >
                            {images.map((_, index) => (
                                <Box
                                    key={index}
                                    onClick={() => handleDotClick(index)}
                                    sx={{
                                        width: { xs: 8, sm: 10 },
                                        height: { xs: 8, sm: 10 },
                                        borderRadius: '50%',
                                        bgcolor: index === currentImageIndex ? '#ffb800' : 'rgba(255, 255, 255, 0.5)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: index === currentImageIndex ? '0 0 10px rgba(255, 184, 0, 0.5)' : 'none',
                                        '&:hover': {
                                            bgcolor: index === currentImageIndex ? '#ffb800' : 'rgba(255, 255, 255, 0.8)',
                                            transform: 'scale(1.2)',
                                            boxShadow: '0 0 15px rgba(255, 184, 0, 0.5)'
                                        }
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Category and Latest Phones Section */}
            <Box sx={{ mt: { xs: 4, md: 0 } }}>
                <AnimatedSection>
                    <CategoryCarousel />
                </AnimatedSection>
                
                <AnimatedSection>
                    <LatestPhonesCarousel />
                </AnimatedSection>
            </Box>
            
            {/* Delivery Banner */}
            <AnimatedSection>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <img
                        src="/Image/img/others/30-min-delivery.jpg"
                        alt="Home Delivery Banner"
                        style={{
                            width: 'calc(100vw + 20px)',
                            height: 'auto',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            marginTop: '32px',
                            objectFit: 'cover',
                            marginRight: '-20px'
                        }}
                    />
                </Box>
            </AnimatedSection>

            {/* Laptops Section */}
            <Box sx={{ mt: 4 }}>
                <AnimatedSection>
                    <LaptopsCarousel />
                </AnimatedSection>
            </Box>

            {/* Featured Products and Below Section */}
            <Box sx={{ mt: 4 }}>
                <AnimatedSection>
                    <FeaturedProducts />
                </AnimatedSection>
                
                <AnimatedSection>
                    <AccessoriesCarousel />
                </AnimatedSection>
                
                <AnimatedSection>
                    <AdBanner />
                </AnimatedSection>
                
                <AnimatedSection>
                    <BrandsCarousel />
                </AnimatedSection>
            </Box>
        </>
    );
};

export default Hero; 