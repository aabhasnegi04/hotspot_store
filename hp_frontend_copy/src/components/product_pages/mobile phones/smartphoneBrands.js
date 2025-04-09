import React, { useState } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import brandsData from '../../../data/brands.json';

const SmartphoneBrands = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

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
            // If we're at the last set of brands, return to the beginning
            if (prevIndex >= brands.length - 6) {
                return 0;
            }
            // Otherwise, move to the next position
            return prevIndex + 1;
        });
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => {
            // If we're at the beginning, jump to the last possible position
            if (prevIndex === 0) {
                return brands.length - 6;
            }
            // Otherwise, move to the previous position
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
                Pick Your Smartphone Brand
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
                        right: 0,
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
                            gap: { xs: 3, md: 3 },
                            transition: 'transform 0.3s ease',
                            transform: `translateX(-${currentIndex * 200}px)`,
                            py: 3,
                            pl: 1
                        }}
                    >
                        {brands.map((brand) => (
                            <Box
                                key={brand.id}
                                onClick={() => handleBrandClick(brand.path)}
                                sx={{
                                    flex: '0 0 180px', // Increased width
                                    height: '130px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    borderRadius: '12px',
                                    padding: '25px',
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
                                        maxWidth: '150px',
                                        height: 'auto',
                                        maxHeight: '60px',
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

export default SmartphoneBrands;
