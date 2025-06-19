import React, { useState } from "react";
import {
    Toolbar, 
    Button, 
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import WatchIcon from '@mui/icons-material/Watch';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import StarIcon from '@mui/icons-material/Star';
import StoreIcon from '@mui/icons-material/Store';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useNavigate } from 'react-router-dom';
import NavDropdown, { dropdownContent } from './dropdown_subheader/NavDropdown';
import MobileDropdownContent from './dropdown_subheader/MobileDropdownContent';

const SubHeader = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);

    const navButtonStyle = {
        mx: 1,
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        color: '#000000',
        fontSize: '0.9rem',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgba(173, 27, 27, 0.1)',
            transform: 'translateY(-1px)',
            transition: 'all 0.2s ease-in-out'
        }
    };

    const categories = [
        { name: 'Smartphones', path: '/smartphones', hasDropdown: true },
        { name: 'Accessories', path: '/accessories', hasDropdown: true },
        { name: 'Wearables', path: '/wearables', hasDropdown: true },
        { name: 'Tablets', path: '/products/tablets' },
        { name: 'Best Sellers', path: '/bestsellers', hasDropdown: false },
        { name: 'Shop by Brand', path: '/brands' },
        { name: 'Offers', path: '/offers', hasDropdown: false },
        { name: 'About', path: '/about' }
    ];

    const categoryIcons = {
        'Smartphones': <SmartphoneIcon sx={{ color: '#FFB800', mr: 2 }} />,
        'Accessories': <HeadphonesIcon sx={{ color: '#FFB800', mr: 2 }} />,
        'Wearables': <WatchIcon sx={{ color: '#FFB800', mr: 2 }} />,
        'Tablets': <TabletMacIcon sx={{ color: '#FFB800', mr: 2 }} />,
        'Best Sellers': <StarIcon sx={{ color: '#FFB800', mr: 2 }} />,
        'Shop by Brand': <StoreIcon sx={{ color: '#FFB800', mr: 2 }} />,
        'Offers': <LocalOfferIcon sx={{ color: '#FFB800', mr: 2 }} />,
        'About': <InfoIcon sx={{ color: '#FFB800', mr: 2 }} />,
    };

    const handleMouseEnter = (event, category) => {
        if (category.hasDropdown) {
            setAnchorEl(event.currentTarget);
            setOpenDropdown(category.name.toLowerCase());
        }
    };

    const handleMouseLeave = () => {
        setOpenDropdown(null);
    };

    const handleDropdownItemClick = (item, category, section) => {
        let path;
        
        // Handle main category clicks
        if (section === 'main') {
            path = item.toLowerCase().replace(/ /g, '-');
            navigate(`/products/${category}/${path}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setOpenDropdown(null);
            return;
        }

        // Handle section title clicks
        if (section === 'category') {
            const sectionPath = item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            navigate(`/products/${category}/${sectionPath}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setOpenDropdown(null);
            return;
        }

        // Handle regular item clicks
        if (section === 'Popular Brands') {
            if (category === 'accessories') {
                // Handle accessories brand navigation
                const brandPath = item.toLowerCase().replace(/ /g, '-');
                navigate(`/products/accessories/brand/${brandPath}`);
            } else if (category === 'wearables') {
                // Handle wearables brand navigation
                const brandPath = item.toLowerCase().replace(/ /g, '-');
                navigate(`/brand-wearables/${brandPath}`);
            } else {
                // Handle smartphone brand navigation
                navigate(`/products/smartphones/${item.toLowerCase()}`);
            }
        } else {
            const itemPath = item.toLowerCase().replace(/ /g, '-');
            path = `/products/${category}/${section.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${itemPath}`;
            navigate(path);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setOpenDropdown(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ width: '100%', p: 0, height: '100vh', overflowY: 'auto' }}>
            {/* Drawer Header with Logo and Close Button */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 2,
                borderBottom: '1px solid #f5e9b2',
                background: 'linear-gradient(90deg, #fffbe6 60%, #fff 100%)',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
            }}>
                <Box component="img" src="/Hotspot Logo smart 1.png" alt="Hotspot Logo" sx={{ height: 36, width: 'auto' }} />
                <IconButton onClick={handleDrawerToggle}>
                    <CloseIcon sx={{ color: '#FFB800', fontSize: 28 }} />
                </IconButton>
            </Box>
            <List sx={{ bgcolor: 'transparent', py: 2 }}>
                {categories.map((category) => (
                    <React.Fragment key={category.name}>
                        <ListItem
                            button
                            onClick={() => {
                                navigate(category.path);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                handleDrawerToggle();
                            }}
                            sx={{
                                borderLeft: '4px solid transparent',
                                borderRadius: '0 24px 24px 0',
                                mx: 1,
                                my: 0.5,
                                py: 1.2,
                                px: 2,
                                display: 'flex',
                                alignItems: 'center',
                                transition: 'all 0.2s',
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 500,
                                fontSize: '1.05rem',
                                color: '#222',
                                '&:hover': {
                                    background: 'rgba(255,184,0,0.08)',
                                    borderLeft: '4px solid #FFB800',
                                    color: '#FFB800',
                                },
                            }}
                        >
                            {categoryIcons[category.name]}
                            <ListItemText
                                primary={category.name}
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 500,
                                        fontSize: '1.05rem',
                                        color: 'inherit',
                                    }
                                }}
                            />
                            {category.hasDropdown && (
                                <IconButton
                                    size="small"
                                    edge="end"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setMobileDropdownOpen(mobileDropdownOpen === category.name ? null : category.name);
                                    }}
                                    sx={{ ml: 1 }}
                                >
                                    {mobileDropdownOpen === category.name
                                        ? <ExpandLessIcon sx={{ color: '#FFB800' }} />
                                        : <ExpandMoreIcon sx={{ color: '#FFB800' }} />}
                                </IconButton>
                            )}
                        </ListItem>
                        {category.hasDropdown && mobileDropdownOpen === category.name && (
                            <Box sx={{ pl: 6, pr: 2, py: 1 }}>
                                <MobileDropdownContent category={category.name.toLowerCase()} onNavigate={() => { handleDrawerToggle(); setMobileDropdownOpen(null); }} />
                            </Box>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );

    return (
        <Box
            sx={{
                width: { xs: '100vw', md: '100%' },
                position: 'fixed',
                top: { xs: '110px', sm: '60px', md: '64px' },
                left: 0,
                zIndex: 1000,
                px: 0,
                mx: 0,
                maxWidth: 'none',
                overflow: 'hidden',
                backgroundColor: { xs: 'transparent', md: '#fff' },
                boxShadow: { xs: 'none', md: '0 2px 4px rgba(0,0,0,0.05)' },
                borderBottom: { xs: 'none', md: '1px solid rgba(0,0,0,0.06)' },
            }}
        >
            <Toolbar disableGutters sx={{ minHeight: '48px !important' }}>
                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ 
                                color: '#000000',
                                ml: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(173, 27, 27, 0.1)',
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            variant="temporary"
                            anchor="left"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                '& .MuiDrawer-paper': {
                                    width: 300,
                                    background: 'linear-gradient(135deg, #fff 60%, #fffbe6 100%)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                                    borderTopRightRadius: 0,
                                    borderTopLeftRadius: 0,
                                    borderBottomRightRadius: '24px',
                                    borderBottomLeftRadius: '16px',
                                    overflow: 'hidden',
                                    p: 0,
                                },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                        {categories.map((category) => (
                            <Box
                                key={category.name}
                                onMouseEnter={(e) => handleMouseEnter(e, category)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Button 
                                    sx={navButtonStyle}
                                    onClick={() => {
                                        if (!category.hasDropdown) {
                                            navigate(category.path);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        } else {
                                            if (category.name === 'Smartphones') {
                                                navigate('/smartphones');
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            } else {
                                                const categoryPath = category.name.toLowerCase();
                                                navigate(`/${categoryPath}`);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }
                                    }}
                                >
                                    {category.name}
                                </Button>
                                {category.hasDropdown && (
                                    <NavDropdown 
                                        open={openDropdown === category.name.toLowerCase()}
                                        anchorEl={anchorEl}
                                        category={category.name.toLowerCase()}
                                        content={dropdownContent[category.name.toLowerCase()]}
                                        onMouseEnter={() => setOpenDropdown(category.name.toLowerCase())}
                                        onMouseLeave={handleMouseLeave}
                                        onItemClick={handleDropdownItemClick}
                                    />
                                )}
                            </Box>
                        ))}
                    </Box>
                )}
            </Toolbar>
        </Box>
    );
};

export default SubHeader; 