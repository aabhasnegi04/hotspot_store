import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ChooseYourTypeAccessory = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;

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

    const visibleItems = accessoryTypes.slice(currentIndex, currentIndex + itemsPerPage);

    return (
        <Box sx={{ mb: 6, position: 'relative' }}>
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                position: 'relative',
                minHeight: '450px',
                px: 5
            }}>
                <IconButton 
                    onClick={handlePrev}
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                        zIndex: 1
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>

                <Box sx={{ 
                    display: 'flex', 
                    gap: 3,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {visibleItems.map((type, index) => (
                        <Box 
                            key={index}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                navigate(type.path);
                            }}
                            sx={{
                                aspectRatio: '1/1',
                                width: '320px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    '& .card-media': {
                                        transform: 'scale(1.05)',
                                    }
                                }
                            }}
                        >
                            <Box
                                component="img"
                                src={type.image}
                                alt={type.title}
                                className="card-media"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    transition: 'transform 0.3s ease',
                                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(0, 0, 0, 0.05)',
                                    padding: '4px',
                                    backgroundColor: '#ffffff',
                                }}
                            />
                            <Typography variant="subtitle1" sx={{
                                mt: 1.2,
                                color: '#b7950b',
                                fontWeight: 600,
                                textAlign: 'center',
                                px: 0.5,
                                fontSize: '1.1rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%'
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
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        },
                        zIndex: 1
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChooseYourTypeAccessory; 