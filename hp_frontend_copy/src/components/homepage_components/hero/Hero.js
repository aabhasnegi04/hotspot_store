import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
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
 * - Support for video content
 */
const AnimatedSection = ({ children, sx }) => {
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
                willChange: 'transform, opacity',
                ...(sx || {})
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
    
    // Video control states
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);     // Controls video play/pause
    const [isVideoMuted, setIsVideoMuted] = useState(true);         // Start muted for autoplay compliance
    const videoRef = useRef(null);                                  // Reference to video element
    const videoHasBeenShown = useRef(false);                        // Track if video has been shown before

    // Array of banner content paths for the carousel (video first, then images)
    const bannerContent = [
        {
            type: 'video',
            src: "/Image/banner/banner_25_06_25/Galaxy Z Fold7 Web.mp4",
            alt: "Galaxy Z Fold7 Web"
        },
        {
            type: 'image',
            src: "/Image/banner/banner_25_06_25/Apple 16.jpg",
            alt: "Apple 16"
        },
        {
            type: 'image',
            src: "/Image/banner/banner_25_06_25/Boat Acc.jpg",
            alt: "Boat Accessories"
        },
        {
            type: 'image',
            src: "/Image/banner/banner_25_06_25/OnePlus 13s.jpg",
            alt: "OnePlus 13s"
        },
        {
            type: 'image',
            src: "/Image/banner/banner_25_06_25/Samsung Z Fold7.jpg",
            alt: "Samsung Z Fold7"
        },
        {
            type: 'image',
            src: "/Image/banner/banner_25_06_25/vivo V50.jpg",
            alt: "Vivo V50"
        }
    ];

    // Ref for the carousel/banner container
    const bannerRef = useRef(null);

    /**
     * Navigation Handlers
     * handlePrevious: Navigate to previous content with fade transition
     * handleNext: Navigate to next content with fade transition
     * handleDotClick: Navigate to specific content by dot index
     */
    const handlePrevious = useCallback(() => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === 0 ? bannerContent.length - 1 : prevIndex - 1
            );
            setImageError(false);
            setIsTransitioning(false);
        }, 500);
    }, [bannerContent.length]);

    const handleNext = useCallback(() => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => 
                prevIndex === bannerContent.length - 1 ? 0 : prevIndex + 1
            );
            setImageError(false);
            setIsTransitioning(false);
        }, 500);
    }, [bannerContent.length]);

    const handleDotClick = useCallback((index) => {
        if (index === currentImageIndex) return;  // Prevent unnecessary transitions
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex(index);
            setImageError(false);
            setIsTransitioning(false);
        }, 200);
    }, [currentImageIndex]);

    // Video control handlers
    const handleVideoPlayPause = useCallback(() => {
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
                setIsVideoPlaying(false);
                setIsAutoPlaying(false); // Pause carousel when video is paused
            } else {
                videoRef.current.play();
                setIsVideoPlaying(true);
                setIsAutoPlaying(true); // Resume carousel when video is playing
            }
        }
    }, [isVideoPlaying]);

    const handleVideoMuteUnmute = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.muted = !isVideoMuted;
            setIsVideoMuted(!isVideoMuted);
        }
    }, [isVideoMuted]);

    // Reset video controls when switching to non-video content or when video banner is shown for the first time
    useEffect(() => {
        const currentContent = bannerContent[currentImageIndex];
        const isVideo = currentContent.type === 'video';
        
        if (isVideo) {
            if (!videoHasBeenShown.current) {
                setIsVideoMuted(true); // Only start muted the first time
                videoHasBeenShown.current = true;
            }
            setIsVideoPlaying(true);
            setIsAutoPlaying(true);
        } else {
            setIsVideoPlaying(true);
            setIsVideoMuted(false);
            setIsAutoPlaying(true);
        }
    }, [currentImageIndex, bannerContent]);

    const handleNextRef = useRef(handleNext);
    const currentImageIndexRef = useRef(currentImageIndex);
    useEffect(() => {
        handleNextRef.current = handleNext;
        currentImageIndexRef.current = currentImageIndex;
    }, [handleNext, currentImageIndex]);

    // Video event listeners for auto-transition and state sync
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleVideoEnded = () => {
            if (isAutoPlaying && bannerContent[currentImageIndexRef.current].type === 'video') {
                handleNextRef.current();
            }
        };

        const handleVideoPlay = () => {
            setIsVideoPlaying(true);
        };

        const handleVideoPause = () => {
            setIsVideoPlaying(false);
        };

        video.addEventListener('ended', handleVideoEnded);
        video.addEventListener('play', handleVideoPlay);
        video.addEventListener('pause', handleVideoPause);

        // Sync initial state
        setIsVideoPlaying(!video.paused);

        return () => {
            video.removeEventListener('ended', handleVideoEnded);
            video.removeEventListener('play', handleVideoPlay);
            video.removeEventListener('pause', handleVideoPause);
        };
    }, [isAutoPlaying, bannerContent]);

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
     * Logs and displays error state when content fails to load
     */
    const handleImageError = () => {
        const failedContent = bannerContent[currentImageIndex];
        console.error(`Failed to load content: ${failedContent.src}`);
        console.log('Current content index:', currentImageIndex);
        console.log('Available content:', bannerContent);
        setImageError(true);
    };

    // Auto-play functionality
    useEffect(() => {
        let timer;
        const currentContent = bannerContent[currentImageIndex];
        const isVideo = currentContent.type === 'video';
        
        // Only set timer for images, not for videos (videos handle their own timing)
        if (isAutoPlaying && !isVideo) {
            timer = setInterval(() => {
                handleNext();
            }, 3000); // Changed from 3000 to 2000 for more frequent slides
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isAutoPlaying, handleNext, currentImageIndex, bannerContent]);

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

    // Pause video when banner is out of view
    useEffect(() => {
        const currentContent = bannerContent[currentImageIndex];
        if (currentContent.type !== 'video' || !videoRef.current || !bannerRef.current) return;

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && !videoRef.current.paused) {
                    videoRef.current.pause();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(bannerRef.current);
        return () => observer.disconnect();
    }, [currentImageIndex, bannerContent]);

    // Get current content
    const currentContent = bannerContent[currentImageIndex];

    return (
        <>
            {/* Main container with gradient background */}
            <Box
                sx={{
                    background: 'linear-gradient(180deg, rgba(248, 247, 247, 0.95) 0%, rgba(248, 247, 247, 0.85) 100%)',
                    pt: 0,
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
                ref={bannerRef}
            >
                <Box
                    sx={{
                        width: { xs: '100%', md: '100%' },
                        position: 'relative',
                        left: { xs: 0, md: 0 },
                        transform: { xs: 'none', md: 'none' },
                        px: 0,
                        mx: 0,
                        maxWidth: 'none',
                        mt: { xs: 0, md: 0 },
                        overflow: 'hidden',
                    }}
                >
                    {/* Carousel container with hover effects and border */}
                    <Box
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        sx={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: { xs: '2.56/1', sm: 'auto' }, // Match 1920x750 aspect ratio for mobile
                            overflow: 'hidden',
                            borderRadius: 0,
                            border: 'none',
                            boxShadow: 'none',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            mr: 0,
                            right: 0
                        }}
                    >
                        {/* Single Image/Video with Fade Transition */}
                        {currentContent.type === 'video' ? (
                            <Box
                                component="video"
                                ref={videoRef}
                                src={currentContent.src}
                                onError={handleImageError}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                    opacity: isTransitioning ? 0 : 1,
                                    transition: 'opacity 0.5s ease-in-out',
                                    backgroundColor: '#f8f7f7',
                                    padding: 0,
                                }}
                                autoPlay
                                playsInline
                                muted={isVideoMuted}
                            />
                        ) : (
                            <Box
                                component="img"
                                src={currentContent.src}
                                alt={`Slide ${currentImageIndex + 1}`}
                                onError={handleImageError}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                    opacity: isTransitioning ? 0 : 1,
                                    transition: 'opacity 0.5s ease-in-out',
                                    backgroundColor: '#f8f7f7',
                                    padding: 0,
                                }}
                            />
                        )}

                        {/* Video Controls - Only show when video is playing */}
                        {currentContent.type === 'video' && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    display: 'flex',
                                    gap: 1,
                                    zIndex: 3,
                                }}
                            >
                                <IconButton
                                    onClick={handleVideoPlayPause}
                                    sx={{
                                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                                        color: 'white',
                                        width: 40,
                                        height: 40,
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 0, 0, 0.8)',
                                        },
                                    }}
                                >
                                    {isVideoPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                                </IconButton>
                                <IconButton
                                    onClick={handleVideoMuteUnmute}
                                    sx={{
                                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                                        color: 'white',
                                        width: 40,
                                        height: 40,
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 0, 0, 0.8)',
                                        },
                                    }}
                                >
                                    {isVideoMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                                </IconButton>
                            </Box>
                        )}

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
                                Failed to load content: {currentContent.src}
                                <br />
                                Please check if the content exists in the public/Image/banner/banner_25_06_25 folder
                            </Typography>
                        )}

                        {/* Navigation arrows with enhanced styling */}
                        <IconButton
                            onClick={handlePrevious}
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                position: 'absolute',
                                left: { md: 16 },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                bgcolor: 'rgba(255, 255, 255, 0.8)',
                                width: { md: 48 },
                                height: { md: 48 },
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                },
                                '& .MuiSvgIcon-root': {
                                    fontSize: { md: '2rem' }
                                }
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                position: 'absolute',
                                right: { md: 16 },
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
                            {bannerContent.map((_, index) => (
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
                </Box>
            </Box>

            {/* Category and Latest Phones Section */}
            <Box sx={{ mt: 0 }}>
                <AnimatedSection>
                    <CategoryCarousel />
                </AnimatedSection>
                
                <AnimatedSection sx={{ mb: { xs: 0, md: 4 } }}>
                    <LatestPhonesCarousel />
                </AnimatedSection>
            </Box>
            
            {/* Delivery Banner */}
            <AnimatedSection sx={{ mb: { xs: 0, md: 4 }, mt: { xs: 0, md: 0 } }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    width: '100%',
                    overflow: 'hidden',
                    mt: 0,
                    mb: 0
                }}>
                    <img
                        src="/Image/img/others/30-min-delivery.jpg"
                        alt="Home Delivery Banner"
                        style={{
                            width: 'calc(100vw + 20px)',
                            height: 'auto',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            marginTop: 0,
                            marginBottom: 0,
                            objectFit: 'cover',
                            marginRight: '-20px'
                        }}
                    />
                </Box>
            </AnimatedSection>

            {/* Laptops Section */}
            <Box sx={{ mt: 4 }}>
                <AnimatedSection sx={{ mt: { xs: 0, md: 4 } }}>
                    <LaptopsCarousel />
                </AnimatedSection>
            </Box>

            {/* Featured Products and Below Section */}
            <Box sx={{ mt: 4 }}>
                <AnimatedSection sx={{ mb: { xs: 0, md: 4 } }}>
                    <FeaturedProducts />
                </AnimatedSection>
                
                <AnimatedSection sx={{ mt: { xs: 0, md: 4 } }}>
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