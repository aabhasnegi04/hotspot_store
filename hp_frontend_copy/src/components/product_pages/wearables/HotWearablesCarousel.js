import React from 'react';
import { Box, Grid, Card, CardMedia, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const styles = {
    carouselNav: {
        '& .MuiIconButton-root': {
            color: '#b7950b',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }
        }
    }
};

const HotWearablesCarousel = ({ bestSellers, navigate }) => {
    return (
        <Box sx={{ 
            mb: 6,
            borderRadius: '20px',
            overflow: 'hidden',
            maxWidth: '95%',
            mx: 'auto'
        }}>
            <Carousel
                animation="slide"
                navButtonsAlwaysVisible
                autoPlay={true}
                interval={5000}
                sx={styles.carouselNav}
                indicators={false}
            >
                {/* Group products into chunks of 4 */}
                {Array.from({ length: Math.ceil(bestSellers.length / 4) }, (_, index) => {
                    const pageItems = bestSellers.slice(index * 4, (index + 1) * 4);
                    return (
                        <Grid container spacing={2} key={`page-${index}`}>
                            {pageItems.map((product, productIndex) => (
                                <Grid 
                                    item 
                                    xs={12} 
                                    sm={6} 
                                    md={3} 
                                    key={`product-${product.itemcode || product.ItemCode || `${index}-${productIndex}`}`}
                                >
                                    <Card 
                                        onClick={() => navigate(`/product/${product.itemcode || product.ItemCode}`)}
                                        sx={{
                                            height: '320px',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            borderRadius: '16px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            border: '1px solid rgba(255, 215, 0, 0.1)',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            p: 1.5,
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={product.image || 'https://via.placeholder.com/300'}
                                            alt={product.itemName}
                                            sx={{
                                                height: '140px',
                                                objectFit: 'contain',
                                                mb: 1.5,
                                                transition: 'transform 0.3s ease',
                                                '&:hover': {
                                                    transform: 'scale(1.1)'
                                                }
                                            }}
                                        />
                                        
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography 
                                                variant="h6" 
                                                sx={{
                                                    fontWeight: 600,
                                                    mb: 1,
                                                    color: '#b7950b',
                                                    fontSize: '1rem',
                                                    height: '2.4em',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                }}
                                            >
                                                {product.itemName}
                                            </Typography>

                                            <Typography sx={{ 
                                                mb: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                fontSize: '1rem',
                                            }}>
                                                <span style={{ 
                                                    color: '#b7950b',
                                                    fontWeight: 800,
                                                    fontSize: '1.1rem'
                                                }}>
                                                    {product.brand}
                                                </span> 
                                                <span style={{
                                                    color: '#666',
                                                    fontSize: '1.1rem'
                                                }}>
                                                    •
                                                </span>
                                                <span style={{ 
                                                    color: '#b7950b',
                                                    fontWeight: 700,
                                                    fontSize: '1.1rem'
                                                }}>
                                                    {product.model || 'Smartwatch'}
                                                </span>
                                            </Typography>

                                            <Typography variant="h6" sx={{
                                                color: '#b7950b',
                                                fontWeight: 700,
                                                fontSize: '1.2rem'
                                            }}>
                                                ₹{Number(product.salePrice).toLocaleString('en-IN')}
                                            </Typography>

                                            {Number(product.currentMRP) > Number(product.salePrice) && (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography sx={{ 
                                                        textDecoration: 'line-through',
                                                        color: '#666',
                                                        fontSize: '0.9rem'
                                                    }}>
                                                        ₹{Number(product.currentMRP).toLocaleString('en-IN')}
                                                    </Typography>
                                                    <Typography sx={{ 
                                                        color: '#4CAF50',
                                                        fontWeight: 600,
                                                        fontSize: '0.9rem'
                                                    }}>
                                                        {Math.round(((Number(product.currentMRP) - Number(product.salePrice)) / Number(product.currentMRP)) * 100)}% OFF
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    );
                })}
            </Carousel>
        </Box>
    );
};

export default HotWearablesCarousel; 