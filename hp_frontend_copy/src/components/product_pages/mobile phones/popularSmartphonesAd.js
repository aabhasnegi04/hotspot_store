import React from 'react';
import { Card, Typography, Box, useTheme, useMediaQuery } from '@mui/material';

const PopularSmartphonesAd = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const colGap = isMobile ? 1.5 : 3;

    // All 6 cards in a single array
    const ads = [
        { num: 1, label: 'Ad 1' },
        { num: 2, label: 'Ad 2' },
        { num: 3, label: 'Ad 3' },
        { num: 4, label: 'Ad 4' },
        { num: 5, label: 'Ad 5' },
        { num: 6, label: 'Ad 6' },
    ];

    return (
        <Box sx={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
            px: isMobile ? 1 : 0
        }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                    gap: colGap,
                    width: '100%',
                }}
            >
                {ads.map((ad, idx) => (
                    <Card
                        key={ad.num}
                        sx={{
                            height: isMobile ? 90 : idx < 2 ? 300 : 250,
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 215, 0, 0.1)',
                            flex: 1,
                            p: 0,
                        }}
                    >
                        <Typography variant="h6" sx={{
                            fontSize: isMobile ? (idx < 2 ? '1rem' : '0.9rem') : '1.25rem',
                            background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            {ad.label}
                        </Typography>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default PopularSmartphonesAd;
