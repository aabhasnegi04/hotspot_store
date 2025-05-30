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
                minHeight: '40vh',
                position: 'relative',
                background: 'transparent',
                p: 2
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: 60,
                    height: 60,
                    mb: 2
                }}
            >
                <CircularProgress
                    size={60}
                    thickness={2}
                    sx={{
                        color: '#B7950B',
                        animation: 'rotate 1s linear infinite',
                        '@keyframes rotate': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' }
                        }
                    }}
                />
            </Box>
            
            <Typography
                variant="subtitle1"
                sx={{
                    color: '#B7950B',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 400,
                    letterSpacing: 1,
                    opacity: 0.8,
                    animation: 'fade 1s ease-in-out infinite',
                    '@keyframes fade': {
                        '0%': { opacity: 0.6 },
                        '50%': { opacity: 0.8 },
                        '100%': { opacity: 0.6 }
                    }
                }}
            >
                {message}
            </Typography>
            
            <Box
                sx={{
                    display: 'flex',
                    gap: 0.5,
                    mt: 0.5
                }}
            >
                {[0, 1, 2].map((index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 3,
                            height: 3,
                            borderRadius: '50%',
                            backgroundColor: '#B7950B',
                            opacity: 0.7,
                            animation: 'bounce 0.8s ease-in-out infinite',
                            animationDelay: `${index * 0.15}s`,
                            '@keyframes bounce': {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-2px)' }
                            }
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default LuxuryLoader; 