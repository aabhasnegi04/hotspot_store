import React, { useState } from 'react';
import { Box, Tabs, Tab, Grid, Paper, Typography} from '@mui/material';
import PhoneCompare from './phoneCompare';

const DescriptionTab = ({ product }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={{
            borderBottom: 1,
            borderColor: 'rgba(255, 215, 0, 0.2)',
            mb: 3,
            overflowX: 'auto'
        }}>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    '& .MuiTab-root': {
                        textTransform: 'none',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        fontWeight: 500,
                        color: '#666',
                        minWidth: { xs: 'auto', sm: '160px' },
                        '&.Mui-selected': {
                            color: '#B7950B',
                            fontWeight: 600
                        }
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#FFD700'
                    }
                }}
            >
                <Tab label="Highlights" />
                <Tab label="Specifications" />
                <Tab label="Reviews" />
                <Tab label="Compare Phones" />
            </Tabs>

            {/* Highlights Tab */}
            {selectedTab === 0 && (
                <Box sx={{ py: { xs: 2, sm: 3 } }}>
                    <Grid container spacing={{ xs: 1, sm: 2 }}>
                        {product.highlights.map((highlight, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Paper
                                    sx={{
                                        p: { xs: 2, sm: 3 },
                                        height: '100%',
                                        background: 'rgba(255, 215, 0, 0.02)',
                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                        borderRadius: '15px',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#666',
                                            fontSize: { xs: '0.875rem', sm: '1rem' },
                                            '&::before': {
                                                content: '"•"',
                                                color: '#FFD700',
                                                marginRight: '8px',
                                                fontSize: '1.2em'
                                            }
                                        }}
                                    >
                                        {highlight}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {/* Specifications Tab */}
            {selectedTab === 1 && (
                <Box sx={{ py: { xs: 2, sm: 3 } }}>
                    <Grid container spacing={{ xs: 1, sm: 2 }}>
                        {Object.entries(product.specifications).map(([key, value]) => (
                            <Grid item xs={12} sm={6} key={key}>
                                <Paper
                                    sx={{
                                        p: { xs: 2, sm: 3 },
                                        background: 'rgba(255, 215, 0, 0.02)',
                                        border: '1px solid rgba(255, 215, 0, 0.1)',
                                        borderRadius: '15px',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 20px rgba(255, 215, 0, 0.1)'
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            color: '#B7950B',
                                            fontWeight: 600,
                                            mb: 1,
                                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                        }}
                                    >
                                        {key}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: '#666',
                                            fontWeight: 500,
                                            fontSize: { xs: '0.875rem', sm: '1rem' }
                                        }}
                                    >
                                        {value}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            {/* Reviews Tab */}
            {selectedTab === 2 && (
                <Box sx={{ py: { xs: 2, sm: 3 } }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            color: '#B7950B',
                            fontWeight: 600,
                            fontSize: { xs: '1rem', sm: '1.25rem' }
                        }}
                    >
                        Customer Reviews
                    </Typography>
                    {/* Add review components here */}
                </Box>
            )}

            {/* Compare Phones Tab */}
            {selectedTab === 3 && (
                <Box sx={{ py: { xs: 2, sm: 3 } }}>
                    <PhoneCompare currentPhoneId={product.id} />
                </Box>
            )}
        </Box>
    );
};

export default DescriptionTab;
