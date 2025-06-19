import React from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopIcon from '@mui/icons-material/Laptop';
import TabletIcon from '@mui/icons-material/Tablet';
import WatchIcon from '@mui/icons-material/Watch';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';

const categories = [
    { id: 1, name: 'Smartphones', icon: PhoneAndroidIcon, path: '/smartphones' },
    { id: 2, name: 'Laptops', icon: LaptopIcon, path: '/products/laptops' },
    { id: 3, name: 'Tablets', icon: TabletIcon, path: '/products/tablets' },
    { id: 4, name: 'Accessories', icon: DevicesOtherIcon, path: '/accessories' },
    { id: 5, name: 'Wearables', icon: WatchIcon, path: '/products/smartwatches' },
    { id: 6, name: 'Audio', icon: HeadphonesIcon, path: '/products/accessories' },
];

const CategoryCarousel = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (path) => {
        navigate(path);
    };

    return (
        <Box
            sx={{
                width: '100%',
                py: { xs: 6, md: 4 },
                px: { xs: 2, sm: 4, md: 6 },
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 4,
                    textAlign: 'center',
                    fontWeight: 700,
                    color: '#333333',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: { xs: '1.3rem', sm: '2rem' },
                    position: 'relative',
                    display: 'inline-block',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '3px',
                        backgroundColor: '#ffb800',
                        borderRadius: '2px',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '40px',
                        height: '2px',
                        backgroundColor: 'rgba(255, 184, 0, 0.3)',
                        borderRadius: '2px',
                    },
                    textShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    letterSpacing: '0.5px',
                }}
            >
                Shop by Category
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(3, 1fr)',
                        sm: 'repeat(3, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(6, 1fr)'
                    },
                    gap: 2,
                    justifyContent: 'center',
                    px: { xs: 1, sm: 2, md: 4 },
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}
            >
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Box
                            key={category.id}
                            onClick={() => handleCategoryClick(category.path)}
                            sx={{
                                height: '140px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                backgroundColor: '#fff9e6',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid rgba(255, 215, 0, 0.2)',
                                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.1)',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    backgroundColor: '#fff3cc',
                                    boxShadow: '0 8px 20px rgba(255, 215, 0, 0.15)',
                                }
                            }}
                        >
                            <Icon 
                                sx={{ 
                                    fontSize: '3rem',
                                    color: '#ffb800',
                                    mb: 1.5,
                                    transition: 'all 0.3s ease',
                                    filter: 'drop-shadow(0 2px 4px rgba(255, 184, 0, 0.2))',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                    }
                                }}
                            />
                            <Typography
                                sx={{
                                    color: '#333333',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    textAlign: 'center',
                                    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                    fontFamily: "'Outfit', sans-serif",
                                }}
                            >
                                {category.name}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default CategoryCarousel; 