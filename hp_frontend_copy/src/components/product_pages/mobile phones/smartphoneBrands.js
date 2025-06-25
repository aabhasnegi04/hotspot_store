import React, { useState } from 'react';
import { Box, Container, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import brandsData from '../../../data/brands.json';

const SmartphoneBrands = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Use first 8 brands from brands.json
    const brands = brandsData.brands.slice(0, 8).map((brand, index) => ({
        id: brand.id,
        name: brand.name,
        image: brand.image,
        path: `/brand-handsets/${brand.name}`
    }));

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
        <Box sx={{ 
            mb: 6,
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            overflow: 'hidden'
        }}>
            <Typography 
                variant={isMobile ? "h5" : "h4"}
                sx={{
                    mb: { xs: 2, sm: 3 },
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    pl: 2,
                    fontSize: { xs: '1.5rem', sm: '2rem' }
                }}>
                Pick Your Smartphone Brand
            </Typography>

            <Box
                sx={{
                    py: { xs: 2, sm: 4 },
                    borderRadius: '20px',
                    overflow: 'visible',
                    position: 'relative',
                    px: { xs: '10px', sm: 5 }
                }}
            >
                {!isMobile && (
                    <>
                        <IconButton
                            onClick={handlePrevious}
                            sx={{
                                position: 'absolute',
                                left: { sm: 10, md: 20 },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                                zIndex: 2,
                                boxShadow: '0 2px 8px rgba(183, 149, 11, 0.1)',
                                color: '#b7950b',
                                width: '40px',
                                height: '40px'
                            }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>

                        <IconButton
                            onClick={handleNext}
                            sx={{
                                position: 'absolute',
                                right: { sm: 10, md: 20 },
                                top: '50%',
                                transform: 'translateY(-50%)',
                                bgcolor: 'rgba(255, 255, 255, 0.9)',
                                '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' },
                                zIndex: 2,
                                boxShadow: '0 2px 8px rgba(183, 149, 11, 0.1)',
                                color: '#b7950b',
                                width: '40px',
                                height: '40px'
                            }}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </>
                )}

                <Box sx={{ 
                    overflowX: { xs: 'auto', sm: 'hidden' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    pb: { xs: 1, sm: 0 }
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: { xs: '10px', md: 3 },
                            transition: isMobile ? 'none' : 'transform 0.3s ease',
                            transform: isMobile ? 'none' : `translateX(-${currentIndex * 200}px)`,
                            py: { xs: 1, sm: 3 },
                            pl: { xs: 0, sm: 1 },
                            width: isMobile ? 'max-content' : 'auto'
                        }}
                    >
                        {brands.map((brand) => (
                            <Box
                                key={brand.id}
                                onClick={() => handleBrandClick(brand.path)}
                                sx={{
                                    flex: { xs: '0 0 140px', sm: '0 0 180px' },
                                    height: { xs: '100px', sm: '130px' },
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    borderRadius: '12px',
                                    padding: { xs: '15px', sm: '25px' },
                                    transition: 'all 0.2s linear',
                                    border: '1px solid rgba(183, 149, 11, 0.1)',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: { xs: 'none', sm: 'translateY(-2px)' },
                                        boxShadow: { xs: 'none', sm: '0 4px 12px rgba(183, 149, 11, 0.08)' },
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
                                        maxWidth: { xs: '120px', sm: '150px' },
                                        height: 'auto',
                                        maxHeight: { xs: '45px', sm: '60px' },
                                        objectFit: 'contain',
                                        opacity: 1
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SmartphoneBrands;
