import React, { useState, useEffect } from 'react';
import { Box, Container, Typography} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LuxuryLoader from '../../common/LuxuryLoader';
import { API_BASE_URL } from '../../../config';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

// Import components
import WearablesBigBanner from './wearablesBigBanner';
import WearablesAd2 from './wearables_ad_2';
import PopularWearablesAd from './popularWearablesAd';
import HotWearablesCarousel from './HotWearablesCarousel';
import ChooseYourTypeWearable from './chooseYourTypeWearable';
import ForYourBudgetWearables from './forYourBudgetWearables';
import WearableBrands from './brandWearables';

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

const WearablesHomepage = () => {
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
            const response = await axios.get(`${API_BASE_URL}/api/bestsellers?category=Wearables`);
            setBestSellers(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    if (loading) return <LuxuryLoader message="Loading Wearables" />;
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
                sx={{ 
                    pr: { xs: 0.5, sm: 1, md: 0 },
                    pl: { xs: 0.5, sm: 1, md: 1.5 },
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
                        Wearables
                    </Typography>
                </AnimatedSection>

                <AnimatedSection>
                    <WearablesBigBanner bestSellers={bestSellers} navigate={navigate} />
                </AnimatedSection>

                <AnimatedSection>
                    <Typography variant="h4" sx={{
                        textAlign: 'left',
                        mb: { xs: 0.5, sm: 0.8 },
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #b7950b 30%, #ffd700 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        pl: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.8rem' }
                    }}>
                        Choose your type of wearable
                    </Typography>
                    <ChooseYourTypeWearable />
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
                        Enhance Your Lifestyle
                    </Typography>
                    <WearablesAd2 />
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
                        Most Popular Wearables
                    </Typography>
                    <PopularWearablesAd />
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
                        Hot Wearables right now
                    </Typography>
                    <HotWearablesCarousel bestSellers={bestSellers} navigate={navigate} />
                </AnimatedSection>

                <AnimatedSection>
                    <ForYourBudgetWearables />
                </AnimatedSection>

                <AnimatedSection>
                    <WearableBrands />
                </AnimatedSection>
            </Container>
        </Box>
    );
};

export default WearablesHomepage;
