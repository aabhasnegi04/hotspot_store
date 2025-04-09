import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const LuxuryLoader = ({ message = "Loading" }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh',
                position: 'relative',
                background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)',
                p: 4
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: 100,
                    height: 100,
                    mb: 3
                }}
            >
                {/* Background circle */}
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={100}
                    thickness={1}
                    sx={{
                        color: 'rgba(183, 149, 11, 0.1)',
                        position: 'absolute'
                    }}
                />
                {/* Rotating circle */}
                <CircularProgress
                    size={100}
                    thickness={1}
                    sx={{
                        color: '#FFD700',
                        position: 'absolute',
                        left: 0,
                        animation: 'rotate 2s linear infinite',
                        '@keyframes rotate': {
                            '0%': {
                                transform: 'rotate(0deg)'
                            },
                            '100%': {
                                transform: 'rotate(360deg)'
                            }
                        }
                    }}
                />
                {/* Inner pulsing circle */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        animation: 'pulse 1.5s ease-in-out infinite',
                        '@keyframes pulse': {
                            '0%': {
                                transform: 'translate(-50%, -50%) scale(0.8)',
                                opacity: 0.5
                            },
                            '50%': {
                                transform: 'translate(-50%, -50%) scale(1)',
                                opacity: 1
                            },
                            '100%': {
                                transform: 'translate(-50%, -50%) scale(0.8)',
                                opacity: 0.5
                            }
                        }
                    }}
                />
            </Box>
            
            {/* Loading text */}
            <Typography
                variant="h6"
                sx={{
                    color: '#B7950B',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 300,
                    letterSpacing: 3,
                    opacity: 0.9,
                    animation: 'fadeInOut 1.5s ease-in-out infinite',
                    '@keyframes fadeInOut': {
                        '0%': { opacity: 0.5 },
                        '50%': { opacity: 1 },
                        '100%': { opacity: 0.5 }
                    }
                }}
            >
                {message.toUpperCase()}
            </Typography>
            
            {/* Loading dots */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 0.8,
                    mt: 1
                }}
            >
                {[0, 1, 2].map((index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            backgroundColor: '#B7950B',
                            animation: 'loadingDots 1.5s ease-in-out infinite',
                            animationDelay: `${index * 0.2}s`,
                            '@keyframes loadingDots': {
                                '0%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-4px)' },
                                '100%': { transform: 'translateY(0)' }
                            }
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default LuxuryLoader; 