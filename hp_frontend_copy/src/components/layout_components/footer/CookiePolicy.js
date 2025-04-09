import React from 'react';
import {
    Container,
    Typography,
    Box,
    Paper
} from '@mui/material';

const CookiePolicy = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 8, mt: { xs: 5, sm: 6 } }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h3" sx={{ mb: 4, fontFamily: "'Outfit', sans-serif", color: '#1a1a1a' }}>
                    Cookie Policy
                </Typography>
                
                <Box sx={{ '& > *': { mb: 3 } }}>
                    <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                        1. What Are Cookies?
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Cookies are small text files that are placed on your device when you visit our website.
                        They help us provide you with a better experience by remembering your preferences,
                        analyzing site traffic, and personalizing content.
                    </Typography>

                    <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                        2. Types of Cookies We Use
                    </Typography>
                    <Typography variant="body1" paragraph>
                        • Essential Cookies: Required for basic site functionality
                        • Analytics Cookies: Help us understand how visitors use our site
                        • Functional Cookies: Remember your preferences and settings
                        • Marketing Cookies: Track your browsing habits for targeted advertising
                    </Typography>

                    <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                        3. How We Use Cookies
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We use cookies to:
                        • Keep you signed in
                        • Remember items in your shopping cart
                        • Analyze site traffic and performance
                        • Personalize your shopping experience
                        • Provide relevant advertisements
                    </Typography>

                    <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                        4. Managing Cookies
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You can control cookies through your browser settings. You can delete existing cookies
                        and block new ones. However, some website features may not work properly if you disable cookies.
                    </Typography>

                    <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                        5. Third-Party Cookies
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We use services from third parties that may place cookies on your device. These include
                        analytics tools, advertising networks, and social media platforms. Each third party's use
                        of cookies is subject to their own privacy and cookie policies.
                    </Typography>

                    <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                        6. Updates to This Policy
                    </Typography>
                    <Typography variant="body1" paragraph>
                        We may update this Cookie Policy from time to time. Any changes will be posted on this page
                        with a revised "Last updated" date. Please check back periodically for updates.
                    </Typography>
                </Box>

                <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
                    Last updated: March 2025
                </Typography>
            </Paper>
        </Container>
    );
};

export default CookiePolicy; 