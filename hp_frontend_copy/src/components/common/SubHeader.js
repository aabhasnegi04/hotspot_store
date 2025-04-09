import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Container,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const SubHeader = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const menuItems = [
        { text: 'Smartphones', path: '/category/smartphones' },
        { text: 'Laptops', path: '/category/laptops' },
        { text: 'Tablets', path: '/category/tablets' },
        { text: 'Accessories', path: '/category/accessories' }
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <List>
            {menuItems.map((item) => (
                <ListItem 
                    button 
                    component={Link} 
                    to={item.path} 
                    key={item.text}
                    onClick={handleDrawerToggle}
                    sx={{
                        color: '#b7950b',
                        '&:hover': {
                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        }
                    }}
                >
                    <ListItemText 
                        primary={item.text}
                        sx={{
                            '& .MuiListItemText-primary': {
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 500
                            }
                        }}
                    />
                </ListItem>
            ))}
        </List>
    );

    return (
        <AppBar 
            position="static" 
            sx={{ 
                backgroundColor: '#ffffff',
                boxShadow: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '100vw',
                overflow: 'hidden'
            }}
        >
            <Container 
                maxWidth={false}
                disableGutters
                sx={{
                    width: '100%',
                    maxWidth: '100vw',
                    overflow: 'hidden'
                }}
            >
                <Toolbar disableGutters>
                    {isMobile ? (
                        <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ 
                                    color: '#b7950b',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
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
                                    keepMounted: true, // Better mobile performance
                                }}
                                sx={{
                                    '& .MuiDrawer-paper': { 
                                        boxSizing: 'border-box',
                                        width: 240,
                                        backgroundColor: '#fff9c4'
                                    },
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </>
                    ) : (
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'center',
                                width: '100%',
                                gap: 4
                            }}
                        >
                            {menuItems.map((item) => (
                                <Button
                                    key={item.text}
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        color: '#b7950b',
                                        fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 500,
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 215, 0, 0.1)',
                                        }
                                    }}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default SubHeader; 