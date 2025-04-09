import React, { useState } from 'react';
import { Box, Paper, Fade, Typography, Popper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const dropdownStyle = {
    paper: {
        mt: 1.5,
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(255,184,0,0.1)',
        minWidth: '800px',
        overflow: 'hidden',
        display: 'flex',
    },
    mainSection: {
        width: '200px',
        borderRight: '1px solid rgba(255,184,0,0.15)',
        background: 'linear-gradient(to right, rgba(255,184,0,0.03), rgba(255,184,0,0.08))',
    },
    secondarySection: {
        flex: 1,
        padding: '24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '32px',
        background: 'linear-gradient(135deg, #fff 0%, rgba(255,184,0,0.02) 100%)',
    },
    sectionContent: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        marginTop: '12px',
    },
    mainCategory: {
        py: 2,
        px: 3,
        fontWeight: 600,
        color: '#2c2c2c',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderLeft: '3px solid transparent',
        '&:hover': {
            backgroundColor: 'rgba(255,184,0,0.1)',
            color: '#FFB800',
            borderLeft: '3px solid #FFB800'
        }
    },
    categoryTitle: {
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#2c2c2c',
        padding: '8px 12px',
        borderRadius: '6px',
        background: 'rgba(255,184,0,0.08)',
        display: 'inline-block',
        '&::before': {
            content: '""',
            width: '6px',
            height: '6px',
            backgroundColor: '#FFB800',
            borderRadius: '50%',
            marginRight: '8px',
            display: 'inline-block'
        }
    },
    item: {
        py: 0.5,
        px: 1.5,
        fontSize: '0.85rem',
        color: '#666',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        '&:hover': {
            color: '#FFB800',
            backgroundColor: 'rgba(255,184,0,0.05)',
            transform: 'translateX(4px)'
        }
    }
};

export const dropdownContent = {
    smartphones: {
        mainCategories: ['Popular Brands', 'Price Range', 'Features', 'Basic Phones'],
        categoryMapping: {
            'Popular Brands': ['Popular Brands'],
            'Price Range': ['Price Range'],
            'Features': ['Features'],
            'Basic Phones': ['Basic Phones']
        },
        sections: [
            {
                title: 'Popular Brands',
                items: [
                    'Apple',
                    'Samsung',
                    'OnePlus',
                    'Xiaomi',
                    'OPPO',
                    'VIVO',
                    'Nothing',
                    'Google',
                    'Nokia',
                    'Realme'
                ]
            },
            {
                title: 'Price Range',
                items: [
                    'Under ₹15,000',
                    'Under ₹20,000',
                    'Under ₹30,000',
                    'Under ₹40,000',
                    'Under ₹50,000',
                    'Above ₹50,000',
                ]
            },
            {
                title: 'Features',
                items: [
                    '5G Phones',
                    'Gaming Phones',
                    'Camera Phones',
                    'Battery Life',
                    'Fast Charging',
                    'AMOLED Display',
                    'Latest Launches'
                ]
            },
            {
                title: 'Basic Phones',
                items: [
                    'Feature Phones',
                    'Keypad Phones',
                    'Dual SIM',
                    'Long Battery',
                    'With Camera',
                    'With Memory Card'
                ]
            }
        ]
    },
    accessories: {
        mainCategories: ['Popular Brands', 'Mobile Accessories', 'Audio', 'Wearables', 'Power Solutions', 'Protection and Others'],
        categoryMapping: {
            'Popular Brands': ['Popular Brands'],
            'Mobile Accessories': ['Storage & Memory', 'Network Devices', 'Tablets & Accessories'],
            'Audio': ['Audio Devices'],
            'Wearables': ['Smart Wearables'],
            'Power Solutions': ['Power Solutions'],
            'Protection and Others': ['Protection & Cases', 'Other Accessories']
        },
        sections: [
            {
                title: 'Popular Brands',
                items: [
                    'Apple',
                    'Samsung',
                    'OnePlus',
                    'VIVO',
                    'OPPO',
                    'Realme',
                    'Xiaomi',
                    'RIVERSONG',
                    'Gionee',
                    'Sandisk',
                    'ITEL'
                ]
            },
            {
                title: 'Power Solutions',
                items: [
                    'Power Bank',
                    'Car Charger',
                    'Travel Charger',
                    'Power Adapter',
                    'Adapter',
                    'Adapter with SR',
                    'Adapter with SR17',
                    'Wireless Charger',
                    'Charging Stand'
                ]
            },
            {
                title: 'Audio Devices',
                items: [
                    'Airpod',
                    'BT Speaker',
                    'BT Headset',
                    'Buds',
                    'Ear Bud (20)',
                    'Ear Buds',
                    'Ear Buds (11)',
                    'Earphone',
                    'Headphone',
                    'NeckBand',
                    'NeckBand-Enco',
                    'Mono Bluetooth'
                ]
            },
            {
                title: 'Smart Wearables',
                items: [
                    'Apple Watch',
                    'Smart watch',
                    'Smart-Watch',
                    'Fitness Band',
                    'Band',
                    'Redmi Watch',
                    'Health'
                ]
            },
            {
                title: 'Protection & Cases',
                items: [
                    'Back Cover',
                    'Case',
                    'Canvas Film Mobile Skin',
                    'Wallet Case',
                    'Smart Folio',
                    'UV Sterilizer',
                    'Mobile Cleaner'
                ]
            },
            {
                title: 'Tablets & Accessories',
                items: [
                    'iPad',
                    'Tablet',
                    'Apple Pencil',
                    'S Pen',
                    'Smart Keyboard',
                    'OppoPad'
                ]
            },
            {
                title: 'Storage & Memory',
                items: [
                    'Memory Card',
                    'Pen Drive'
                ]
            },
            {
                title: 'Network Devices',
                items: [
                    'Router',
                    'Repeater',
                    'Cable'
                ]
            },
            {
                title: 'Other Accessories',
                items: [
                    'Airtag',
                    'Television',
                    'Feature Phone',
                    'Night Light',
                    'Heat Gun',
                    'iFilmCutter',
                    'Insurance',
                    'Scheme-Watch'
                ]
            }
        ]
    }
};

const NavDropdown = ({ 
    open, 
    anchorEl, 
    category,
    content, 
    onMouseEnter, 
    onMouseLeave, 
    onItemClick 
}) => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('Popular Brands');

    const handleMainCategoryHover = (mainCat) => {
        setSelectedCategory(mainCat);
    };

    const handleItemClick = (item, section) => {
        if (section.title === 'Popular Brands') {
            if (category === 'smartphones') {
                navigate(`/brand-handsets/${item.toUpperCase()}`);
            } else {
                navigate(`/brand-accessories/${item.toLowerCase()}`);
            }
        } else if (section.title === 'Price Range') {
            // Convert price range text to price range format
            let range;
            switch (item) {
                case 'Under ₹15,000':
                    range = '10000-15000';
                    break;
                case 'Under ₹20,000':
                    range = '15000-20000';
                    break;
                case 'Under ₹30,000':
                    range = '20000-30000';
                    break;
                case 'Under ₹40,000':
                    range = '30000-40000';
                    break;
                case 'Under ₹50,000':
                    range = '40000-50000';
                    break;
                case 'Above ₹50,000':
                    range = '50000-100000';
                    break;
                default:
                    range = '0-100000';
            }
            navigate(`/price-range/${range}`);
        } else {
            navigate(`/category-accessories/${item}`);
        }
        onMouseLeave && onMouseLeave();
    };

    const handleMainCategoryClick = (mainCat) => {
        onItemClick(mainCat, category, 'main');
    };

    const getVisibleSections = () => {
        if (!content.categoryMapping || !content.categoryMapping[selectedCategory]) {
            return content.sections;
        }
        const visibleTitles = content.categoryMapping[selectedCategory];
        return content.sections.filter(section => visibleTitles.includes(section.title));
    };

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
            transition
            sx={{ zIndex: 1100 }}
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={200}>
                    <Paper 
                        sx={{
                            ...dropdownStyle.paper,
                            width: category === 'accessories' ? '1000px' : '800px'
                        }}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <Box sx={dropdownStyle.mainSection}>
                            {content.mainCategories.map((mainCat) => (
                                <Typography
                                    key={mainCat}
                                    sx={{
                                        ...dropdownStyle.mainCategory,
                                        backgroundColor: selectedCategory === mainCat ? 
                                            'rgba(255,184,0,0.1)' : 'transparent',
                                        color: selectedCategory === mainCat ? '#FFB800' : '#2c2c2c',
                                        borderLeft: selectedCategory === mainCat ? 
                                            '3px solid #FFB800' : '3px solid transparent'
                                    }}
                                    onClick={() => handleMainCategoryClick(mainCat)}
                                    onMouseEnter={() => handleMainCategoryHover(mainCat)}
                                >
                                    {mainCat}
                                </Typography>
                            ))}
                        </Box>
                        <Box 
                            sx={{
                                ...dropdownStyle.secondarySection,
                                gridTemplateColumns: category === 'accessories' ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)'
                            }}
                        >
                            {getVisibleSections().map((section, index) => (
                                <Box key={index}>
                                    <Typography sx={dropdownStyle.categoryTitle}>
                                        {section.title}
                                    </Typography>
                                    <Box sx={dropdownStyle.sectionContent}>
                                        {section.items.map((item) => (
                                            <Typography
                                                key={item}
                                                sx={dropdownStyle.item}
                                                onClick={() => handleItemClick(item, section)}
                                            >
                                                {item}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
};

export default NavDropdown; 