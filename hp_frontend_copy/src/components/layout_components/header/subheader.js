import React, { useState } from "react";
import {
    Toolbar, 
    Button, 
    Box, 
    Container, 
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import NavDropdown, { dropdownContent } from './dropdown_subheader/NavDropdown';

const SubHeader = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);

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
        { name: 'Wearables', path: '/products/smartwatches', hasDropdown: true },
        { name: 'Tablets', path: '/products/tablets' },
        { name: 'Best Sellers', path: '/bestsellers' },
        { name: 'Shop by Brand', path: '/brands' },
        { name: 'Offers', path: '/offers' },
        { name: 'About', path: '/about' }
    ];

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
            setOpenDropdown(null);
            return;
        }

        // Handle section title clicks
        if (section === 'category') {
            const sectionPath = item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
            navigate(`/products/${category}/${sectionPath}`);
            setOpenDropdown(null);
            return;
        }

        // Handle regular item clicks
        if (section === 'Popular Brands') {
            if (category === 'accessories') {
                // Handle accessories brand navigation
                const brandPath = item.toLowerCase().replace(/ /g, '-');
                navigate(`/products/accessories/brand/${brandPath}`);
            } else {
                // Handle smartphone brand navigation
                navigate(`/products/smartphones/${item.toLowerCase()}`);
            }
        } else {
            const itemPath = item.toLowerCase().replace(/ /g, '-');
            path = `/products/${category}/${section.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${itemPath}`;
            navigate(path);
        }
        
        setOpenDropdown(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <List sx={{ bgcolor: 'rgba(248, 247, 247, 0.95)' }}>
            {categories.map((category) => (
                <ListItem 
                    button 
                    key={category.name}
                    onClick={() => {
                        if (category.hasDropdown) {
                            navigate(category.path);
                        } else {
                            navigate(category.path);
                        }
                        handleDrawerToggle();
                    }}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'rgba(173, 27, 27, 0.1)',
                        }
                    }}
                >
                    <ListItemText 
                        primary={category.name}
                        sx={{
                            '& .MuiListItemText-primary': {
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                color: '#000000'
                            }
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );

    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                position: 'fixed',
                top: { xs: '110px', sm: '60px', md: '64px' },
                left: 0,
                zIndex: 1000,
                borderBottom: '1px solid rgba(0,0,0,0.06)'
            }}
        >
            <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
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
                                        width: 280,
                                        mt: '64px',
                                        background: 'rgba(248, 247, 247, 0.95)',
                                        backdropFilter: 'blur(8px)',
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
                                            } else {
                                                if (category.name === 'Smartphones') {
                                                    navigate('/smartphones');
                                                } else {
                                                    const categoryPath = category.name.toLowerCase();
                                                    navigate(`/${categoryPath}`);
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
            </Container>
        </Box>
    );
};

export default SubHeader; 