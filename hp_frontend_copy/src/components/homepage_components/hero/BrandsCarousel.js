import React, { useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import brandsData from '../../../data/brands.json';

const BrandsCarousel = () => {
    const { brands } = brandsData;
    const containerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [translateX, setTranslateX] = useState(0);
    const lastPositionRef = useRef(0);
    const startTimeRef = useRef(null);
    
    // Create a duplicated array of brands for continuous scroll
    const duplicatedBrands = [...brands, ...brands, ...brands]; // Triple the items for smoother loop

    useEffect(() => {
        let animationFrameId;
        
        const animate = (currentTime) => {
            if (!startTimeRef.current) {
                startTimeRef.current = currentTime - (lastPositionRef.current / 0.05);
            }
            
            if (!isPaused) {
                const progress = currentTime - startTimeRef.current;
                // Calculate the new position
                let newTranslate = (progress * 0.05) % (100 * brands.length);
                lastPositionRef.current = newTranslate;
                setTranslateX(-newTranslate);
            }
            
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isPaused, brands.length]);

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        // Reset startTime when resuming to maintain position
        startTimeRef.current = null;
        setIsPaused(false);
    };

    return (
        <Box
            sx={{
                py: 4,
                backgroundColor: '#ffffff',
                borderTop: '1px solid rgba(0,0,0,0.05)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="lg" sx={{ position: 'relative', px: { xs: 6, md: 8 } }}>
                <Box
                    ref={containerRef}
                    id="brands-container"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: { xs: 3, md: 4 },
                            transform: `translateX(${translateX}px)`,
                            transition: 'transform 0.1s linear',
                            py: 3
                        }}
                    >
                        {duplicatedBrands.map((brand, index) => (
                            <Box
                                key={`${brand.id}-${index}`}
                                component="a"
                                href={brand.link}
                                className="brand-item"
                                sx={{
                                    flex: '0 0 180px',
                                    height: '120px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    transition: 'all 0.2s linear',
                                    border: '1px solid rgba(0,0,0,0.08)',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                        border: '1px solid rgba(255, 184, 0, 0.3)'
                                    }
                                }}
                            >
                                <Box
                                    component="img"
                                    src={brand.image}
                                    alt={brand.name}
                                    sx={{
                                        width: 'auto',
                                        maxWidth: brand.name === 'Sony' || brand.name === 'Huawei' ? '150px' : '130px',
                                        height: 'auto',
                                        maxHeight: brand.name === 'Sony' || brand.name === 'Huawei' ? '70px' : '50px',
                                        objectFit: 'contain',
                                        opacity: 1,
                                        transition: 'all 0.2s linear',
                                        '&:hover': {
                                            transform: 'scale(1.05)'
                                        }
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default BrandsCarousel; 