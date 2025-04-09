import React, { useState } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const AccessoryBrands = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const brands = [
        {
            id: 1,
            name: 'AXL',
            image: '/Image/img/brands/accessories/axl.png',
            path: '/brand-accessories/axl'
        },
        {
            id: 2,
            name: 'E-PING',
            image: '/Image/img/brands/accessories/E-PING.png',
            path: '/brand-accessories/e-ping'
        },
        {
            id: 3,
            name: 'Fire-Boltt',
            image: '/Image/img/brands/accessories/fireboltt.png',
            path: '/brand-accessories/fire-boltt'
        },
        {
            id: 4,
            name: 'Flash Guard',
            image: '/Image/img/brands/accessories/flash-guard.png',
            path: '/brand-accessories/flash-guard'
        },
        {
            id: 5,
            name: 'Gionee',
            image: '/Image/img/brands/accessories/gionee.png',
            path: '/brand-accessories/gionee'
        },
        {
            id: 6,
            name: 'Gizmore',
            image: '/Image/img/brands/accessories/gizmore.png',
            path: '/brand-accessories/gizmore'
        },
        {
            id: 7,
            name: 'iBall',
            image: '/Image/img/brands/accessories/iball.png',
            path: '/brand-accessories/iball'
        },
        {
            id: 8,
            name: 'JBL',
            image: '/Image/img/brands/accessories/JBL.png',
            path: '/brand-accessories/jbl'
        },
        {
            id: 9,
            name: 'Kodyee',
            image: '/Image/img/brands/accessories/KODYEE.png',
            path: '/brand-accessories/kodyee'
        },
        {
            id: 10,
            name: 'Lenovo',
            image: '/Image/img/brands/accessories/lenovo.png',
            path: '/brand-accessories/lenovo'
        },
        {
            id: 11,
            name: 'Luxor',
            image: '/Image/img/brands/accessories/luxor.png',
            path: '/brand-accessories/luxor'
        },
        {
            id: 12,
            name: 'Mate',
            image: '/Image/img/brands/accessories/mate.png',
            path: '/brand-accessories/mate'
        },
        {
            id: 13,
            name: 'Philips',
            image: '/Image/img/brands/accessories/PHILIPS.png',
            path: '/brand-accessories/philips'
        },
        {
            id: 14,
            name: 'pTron',
            image: '/Image/img/brands/accessories/ptron.png',
            path: '/brand-accessories/ptron'
        },
        {
            id: 15,
            name: 'Riversong',
            image: '/Image/img/brands/accessories/RIVERSONG.png',
            path: '/brand-accessories/riversong'
        },
        {
            id: 16,
            name: 'SanDisk',
            image: '/Image/img/brands/accessories/sandisk.png',
            path: '/brand-accessories/sandisk'
        },
        {
            id: 17,
            name: 'Tiitan',
            image: '/Image/img/brands/accessories/tiitan.png',
            path: '/brand-accessories/tiitan'
        }
    ];

    const handleBrandClick = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex >= brands.length - 6) {
                return 0;
            }
            return prevIndex + 1;
        });
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                return brands.length - 6;
            }
            return prevIndex - 1;
        });
    };

    return (
        <Box sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{
                mb: 3,
                fontWeight: 600,
                background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                pl: 2,
            }}>
                Pick Your Favorite Brand
            </Typography>

            <Box
                sx={{
                    py: 4,
                    borderRadius: '20px',
                    overflow: 'visible',
                    position: 'relative',
                    px: 5
                }}
            >
                <IconButton
                    onClick={handlePrevious}
                    sx={{
                        position: 'absolute',
                        left: -20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                        zIndex: 2,
                        boxShadow: '0 2px 8px rgba(183, 149, 11, 0.1)',
                        color: '#b7950b'
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>

                <IconButton
                    onClick={handleNext}
                    sx={{
                        position: 'absolute',
                        right: 40,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                        zIndex: 2,
                        boxShadow: '0 2px 8px rgba(183, 149, 11, 0.1)',
                        color: '#b7950b'
                    }}
                >
                    <ChevronRightIcon />
                </IconButton>

                <Container maxWidth={false} sx={{ 
                    position: 'relative',
                    px: { xs: 0, md: 0 },
                    ml: -2,
                    overflow: 'hidden',
                    maxWidth: '1400px !important'
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: { xs: 3, md: 4 },
                            transition: 'transform 0.3s ease',
                            transform: `translateX(-${currentIndex * 280}px)`,
                            py: 3,
                            pl: 1
                        }}
                    >
                        {brands.map((brand) => (
                            <Box
                                key={brand.id}
                                onClick={() => handleBrandClick(brand.path)}
                                sx={{
                                    flex: '0 0 250px',
                                    height: '170px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    borderRadius: '12px',
                                    padding: '32px',
                                    transition: 'all 0.2s linear',
                                    border: '1px solid rgba(183, 149, 11, 0.1)',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(183, 149, 11, 0.08)',
                                        border: '1px solid rgba(183, 149, 11, 0.2)',
                                        backgroundColor: '#ffffff'
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src={brand.image}
                                    alt={brand.name}
                                    sx={{
                                        width: 'auto',
                                        maxWidth: '220px',
                                        height: 'auto',
                                        maxHeight: '140px',
                                        objectFit: 'contain',
                                        opacity: 1
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default AccessoryBrands; 