import React, { useState, useEffect } from 'react';
import { Box, Container, Typography} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LuxuryLoader from '../../common/LuxuryLoader';
import { API_BASE_URL } from '../../../config';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

// Import components
import AccessoriesBigBanner from './accessoriesBigBanner';
import AccessoriesAd2 from './accessories_ad_2';
import PopularAccessoriesAd from './popularAccessoriesAd';
import HotAccessoriesCarousel from './HotAccessoriesCarousel';
import ChooseYourTypeAccessory from './chooseYourTypeAccessory';
import ForYourBudgetAccessories from './forYourBudgetAccessories';
import AccessoryBrands from './accessoryBrands';

const AnimatedSection = ({ children }) => {
    const [ref, isVisible] = useScrollAnimation(0.2);
    
    return (
        <Box
            ref={ref}
            sx={{
                transform: isVisible 
                    ? 'scale(1) translateY(0)' 
                    : 'scale(0.9) translateY(40px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                mb: 3,
                willChange: 'transform, opacity'
            }}
        >
            {children}
        </Box>
    );
};

const AccessoriesHomepage = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBestSellers();
    }, []);

    const fetchBestSellers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/bestsellers?category=Accessories`);
            setBestSellers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    if (loading) return <LuxuryLoader message="Loading Accessories" />;
    if (error) return <div>{error}</div>;

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)',
            minHeight: '100vh',
            pt: 0,
            pb: { xs: 2, sm: 3, md: 4 },
            width: '100vw',
            overflowX: 'hidden',
        }}>
            <Container 
                maxWidth={false}
                disableGutters
                sx={{ 
                    width: '100%',
                    p: 0,
                    m: 0
                }}
            >
                <AnimatedSection>
                    <Typography variant="h4" sx={{ 
                        fontWeight: 700, 
                        mb: { xs: 1.5, sm: 2 },
                        textAlign: 'left',
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: "'Outfit', sans-serif",
                        pl: '1.5%',
                        position: 'relative',
                        top: '8px',
                        fontSize: { xs: '1.3rem', sm: '1.8rem', md: '2.2rem' }
                    }}>
                        Accessories
                    </Typography>
                </AnimatedSection>

                <AnimatedSection>
                    <Box sx={{
                        width: '100vw',
                        position: 'relative',
                        left: '50%',
                        transform: 'translateX(-50%)'
                    }}>
                        <AccessoriesBigBanner bestSellers={bestSellers} navigate={navigate} />
                    </Box>
                </AnimatedSection>

                <AnimatedSection>
                    <Typography variant="h4" sx={{
                        textAlign: 'left',
                        mb: { xs: 0.8, sm: 1.5 },
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        pl: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.8rem' }
                    }}>
                        Choose your type of accessory
                    </Typography>
                    <ChooseYourTypeAccessory />
                </AnimatedSection>

                <AnimatedSection>
                    <Typography variant="h4" sx={{
                        textAlign: 'left',
                        mb: { xs: 0.8, sm: 1.5 },
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        pl: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.8rem' }
                    }}>
                        Enhance Your Mobile Experience
                    </Typography>
                    <AccessoriesAd2 />
                </AnimatedSection>

                <AnimatedSection>
                    <Typography variant="h4" sx={{
                        mb: { xs: 0.8, sm: 1.5, md: 2 },
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        pl: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.8rem' }
                    }}>
                        Most Popular Accessories
                    </Typography>
                    <PopularAccessoriesAd />
                </AnimatedSection>

                <AnimatedSection>
                    <Typography variant="h4" sx={{
                        mb: { xs: 0.8, sm: 1.5, md: 2 },
                        mt: { xs: 2, sm: 3, md: 4 },
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        pl: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.8rem' }
                    }}>
                        Hot Accessories right now
                    </Typography>
                    <HotAccessoriesCarousel bestSellers={bestSellers} navigate={navigate} />
                </AnimatedSection>

                <AnimatedSection>
                    <ForYourBudgetAccessories />
                </AnimatedSection>

                <AnimatedSection>
                    <AccessoryBrands />
                </AnimatedSection>
            </Container>
        </Box>
    );
};

export default AccessoriesHomepage;
