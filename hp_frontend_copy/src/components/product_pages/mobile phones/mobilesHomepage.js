import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LuxuryLoader from '../../common/LuxuryLoader';
import { API_BASE_URL } from '../../../config';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

// Import components
import SmartphonesBigBanner from './smartphonesBigBanner_1';
import SmartphonesAd2 from './smartphones_ad_2';
import PopularSmartphonesAd from './popularSmartphonesAd';
import HotSmartphonesCarousel from './HotSmartphonesCarousel';
import ChooseYourTypeSmartphone from './chooseYourTypeSmarphone';
import ForYourBudget from './forYourBudget';
import SmartphoneBrands from './smartphoneBrands';

const AnimatedSection = ({ children }) => {
    const [ref, isVisible] = useScrollAnimation(0.2);
    
    return (
        <Box
            ref={ref}
            sx={{
                transform: isVisible 
                    ? 'scale(1) translateY(0)' 
                    : 'scale(0.9) translateY(50px)',
                opacity: isVisible ? 1 : 0,
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                mb: 4,
                willChange: 'transform, opacity'
            }}
        >
            {children}
        </Box>
    );
};

const MobilesHomepage = () => {
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
            const response = await axios.get(`${API_BASE_URL}/api/hot-products`);
            setBestSellers(Array.isArray(response.data) ? response.data : []);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    if (loading) return <LuxuryLoader message="Loading Smartphones" />;
    if (error) return <div>{error}</div>;

    return (
        <Box sx={{ 
            background: 'linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)',
            minHeight: '100vh',
            pt: 0,
            pb: 6,
            width: '100vw',
            overflowX: 'hidden',
        }}>
            <Container 
                maxWidth={false}
                sx={{ 
                    pr: 0,
                    pl: { xs: 1, sm: 2, md: 3 },
                }}
            >
                <AnimatedSection key="title">
                    <Typography variant="h4" sx={{
                        fontWeight: 700,
                        mb: 3,
                        textAlign: 'left',
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontFamily: "'Outfit', sans-serif",
                        pl: 1,
                        position: 'relative',
                        top: '10px',
                    }}>
                        Smartphones
                    </Typography>
                </AnimatedSection>

                <AnimatedSection key="bigBanner">
                    <SmartphonesBigBanner bestSellers={bestSellers} navigate={navigate} />
                </AnimatedSection>

                <AnimatedSection key="treatYourself">
                    <Typography variant="h4" sx={{
                        textAlign: 'left',
                        mb: 2,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        pl: 2,
                    }}>
                        Treat yourself with a new phone
                    </Typography>
                </AnimatedSection>

                <AnimatedSection key="ad2">
                    <SmartphonesAd2 />
                </AnimatedSection>

                <AnimatedSection key="popularPhones">
                    <Typography variant="h4" sx={{
                        mb: 3,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Most Popular Smartphones
                    </Typography>
                    <PopularSmartphonesAd />
                </AnimatedSection>

                <AnimatedSection key="hotPhones">
                    <Typography variant="h4" sx={{
                        mb: 3,
                        mt: 6,
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        pl: 2,
                    }}>
                        Hot Smartphones right now
                    </Typography>
                    <HotSmartphonesCarousel bestSellers={bestSellers} navigate={navigate} />
                </AnimatedSection>

                <AnimatedSection key="chooseType">
                    <ChooseYourTypeSmartphone />
                </AnimatedSection>

                <AnimatedSection key="budget">
                    <ForYourBudget />
                </AnimatedSection>

                <AnimatedSection key="brands">
                    <SmartphoneBrands />
                </AnimatedSection>
            </Container>
        </Box>
    );
};

export default MobilesHomepage;
