import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ChooseYourTypeAccessory = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    // Adjust items per page based on screen size
    const getItemsPerPage = () => {
        if (isMobile) return 2;
        if (isTablet) return 3;
        return 4;
    };

    const itemsPerPage = getItemsPerPage();

    const accessoryTypes = [
        {
            image: '/Image/img/category/AIRPOD.jpg',
            title: 'Airpods',
            path: '/category-accessories/Airpod'
        },
        {
            image: '/Image/img/category/BT SPEAKER.jpg',
            title: 'Bluetooth Speakers',
            path: '/category-accessories/BT%20Speaker'
        },
        {
            image: '/Image/img/category/cable.jpg',
            title: 'Cables',
            path: '/category-accessories/Cable'
        },
        {
            image: '/Image/img/category/CANVAS-FILM-MOBILE-SKIN.jpg',
            title: 'Mobile Skins',
            path: '/category-accessories/Canvas-Film-Mobile-Skin'
        },
        {
            image: '/Image/img/category/CAR CHARGER.jpg',
            title: 'Car Chargers',
            path: '/category-accessories/Car-Charger'
        },
        {
            image: '/Image/img/category/EAR BUDS.jpg',
            title: 'Earbuds',
            path: '/category-accessories/Ear-Buds'
        },
        {
            image: '/Image/img/category/EARPHONE.jpg',
            title: 'Earphones',
            path: '/category-accessories/Earphone'
        },
        {
            image: '/Image/img/category/FITNESS BAND.jpg',
            title: 'Fitness Bands',
            path: '/category-accessories/Fitness-Band'
        },
        {
            image: '/Image/img/category/HEADPHONE.jpg',
            title: 'Headphones',
            path: '/category-accessories/Headphone'
        },
        {
            image: '/Image/img/category/MEMORY CARD.jpg',
            title: 'Memory Cards',
            path: '/category-accessories/Memory-Card'
        },
        {
            image: '/Image/img/category/MOBILE-CLEANER.jpg',
            title: 'Mobile Cleaners',
            path: '/category-accessories/Mobile-Cleaner'
        },
        {
            image: '/Image/img/category/NECKBAND.jpg',
            title: 'Neckbands',
            path: '/category-accessories/Neckband'
        },
        {
            image: '/Image/img/category/PEN DRIVE.jpg',
            title: 'Pen Drives',
            path: '/category-accessories/Pen-Drive'
        },
        {
            image: '/Image/img/category/POWER BANK.jpg',
            title: 'Power Banks',
            path: '/category-accessories/Power-Bank'
        },
        {
            image: '/Image/img/category/SMART-WATCH.jpg',
            title: 'Smart Watches',
            path: '/category-accessories/Smart-Watch'
        },
        {
            image: '/Image/img/category/TRAVEL-CHARGER.jpg',
            title: 'Travel Chargers',
            path: '/category-accessories/Travel-Charger'
        }
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? Math.max(0, accessoryTypes.length - itemsPerPage) : prevIndex - itemsPerPage
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex >= accessoryTypes.length - itemsPerPage ? 0 : prevIndex + itemsPerPage
        );
    };

    // Reset currentIndex when screen size changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [itemsPerPage]);

    const visibleItems = accessoryTypes.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <Box sx={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            mb: { xs: 2, sm: 3, md: 4 },
            mt: 0,
            pt: 0,
            overflow: 'hidden'
        }}>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 1, sm: 2, md: 3 },
                position: 'relative',
                mt: 2,
                width: '100%',
                px: { xs: 1, sm: 2, md: 3 }
            }}>
                <IconButton 
                    onClick={handlePrev}
                    sx={{
                        position: 'absolute',
                        left: { xs: 0, sm: 2 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                        zIndex: 1,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        width: { xs: '30px', sm: '40px' },
                        height: { xs: '30px', sm: '40px' },
                        '& .MuiSvgIcon-root': {
                            fontSize: { xs: '1rem', sm: '1.5rem' }
                        }
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>

                <Box sx={{ 
                    display: 'flex', 
                    gap: { xs: 1, sm: 2, md: 3 },
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    px: { xs: 4, sm: 6 }
                }}>
                    {visibleItems.map((type, index) => (
                        <Box 
                            key={index}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                navigate(type.path);
                            }}
                            sx={{
                                flex: '1 1 0',
                                maxWidth: { xs: '150px', sm: '200px', md: '355px' },
                                aspectRatio: '1/1',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.02)'
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={type.image}
                                alt={type.title}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    borderRadius: 0,
                                    border: '1px solid rgba(0, 0, 0, 0.05)',
                                    padding: { xs: '2px', sm: '4px' },
                                    backgroundColor: '#ffffff'
                                }}
                            />
                            <Typography variant="subtitle1" sx={{
                                mt: { xs: 0.2, sm: 0.3, md: 0.4 },
                                color: '#b7950b',
                                fontWeight: 600,
                                textAlign: 'center',
                                fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1.1rem' },
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%',
                                px: 1
                            }}>
                                {type.title}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                <IconButton 
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        right: { xs: 0, sm: 2 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                        zIndex: 1,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        width: { xs: '30px', sm: '40px' },
                        height: { xs: '30px', sm: '40px' },
                        '& .MuiSvgIcon-root': {
                            fontSize: { xs: '1rem', sm: '1.5rem' }
                        }
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChooseYourTypeAccessory; 