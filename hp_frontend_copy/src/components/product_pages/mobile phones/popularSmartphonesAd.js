import React from 'react';
import { Card, Typography, Box, useTheme, useMediaQuery } from '@mui/material';

const PopularSmartphonesAd = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const colGap = isMobile ? 1.5 : 3;

    return (
        <Box sx={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            rowGap: colGap,
            px: isMobile ? 1 : 0
        }}>
            {/* First row - 2 large ads */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    columnGap: colGap,
                    width: '100%',
                }}
            >
                {[1, 2].map((num, idx) => (
                    <Card
                        key={num}
                        sx={{
                            height: isMobile ? 90 : 300,
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 215, 0, 0.1)',
                            flex: 1,
                            p: 0,
                            ml: idx === 0 ? 0 : undefined,
                            mr: idx === 1 ? 0 : undefined,
                        }}
                    >
                        <Typography variant="h6" sx={{
                            fontSize: isMobile ? '1rem' : '1.25rem',
                            background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            Ad {num}
                        </Typography>
                    </Card>
                ))}
            </Box>

            {/* Second row - 4 smaller ads */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    columnGap: colGap,
                    width: '100%',
                }}
            >
                {[3, 4, 5, 6].map((num, idx) => (
                    <Card
                        key={num}
                        sx={{
                            height: isMobile ? 60 : 250,
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 215, 0, 0.1)',
                            flex: 1,
                            p: 0,
                            ml: idx === 0 ? 0 : undefined,
                            mr: idx === 3 ? 0 : undefined,
                        }}
                    >
                        <Typography variant="h6" sx={{
                            fontSize: isMobile ? '0.9rem' : '1.25rem',
                            background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            Ad {num}
                        </Typography>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default PopularSmartphonesAd;
