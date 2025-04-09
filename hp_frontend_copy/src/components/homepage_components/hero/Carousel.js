import React from 'react';
import { Box } from '@mui/material';

/**
 * Carousel Component
 * A navigation component that displays dots for each slide
 * Features:
 * - Glowing effect for active dot
 * - Smooth hover animations
 * - Responsive design
 */
const Carousel = ({ currentIndex, totalSlides, onDotClick }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 32,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 2.5,
                zIndex: 2,
                padding: '10px 20px',
            }}
        >
            {[...Array(totalSlides)].map((_, index) => (
                <Box
                    key={index}
                    onClick={() => onDotClick(index)}
                    sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: currentIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: currentIndex === index ? '24px' : '0',
                            height: currentIndex === index ? '24px' : '0',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            zIndex: -1,
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: currentIndex === index ? '16px' : '0',
                            height: currentIndex === index ? '16px' : '0',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            zIndex: -1,
                        },
                        '&:hover': {
                            backgroundColor: currentIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                            transform: 'scale(1.2)',
                            '&::before': {
                                width: '28px',
                                height: '28px',
                            },
                            '&::after': {
                                width: '20px',
                                height: '20px',
                            }
                        },
                    }}
                />
            ))}
        </Box>
    );
};

export default Carousel; 