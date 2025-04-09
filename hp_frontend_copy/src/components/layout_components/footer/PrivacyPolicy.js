import React from 'react';
import {
    Container,
    Typography,
    Box,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container maxWidth="lg" sx={{ py: 8, mt: { xs: 5, sm: 6 } }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h3" sx={{ mb: 4, fontFamily: "'Outfit', sans-serif", color: '#1a1a1a' }}>
                    Privacy Policy
                </Typography>

                <Box sx={{ '& > *': { mb: 4 } }}>
                    {/* Objective Section */}
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                            OBJECTIVE, SCOPE AND APPLICABILITY
                        </Typography>
                        <Typography variant="body1" paragraph>
                            HOTSPOT RETAIL PRIVATE LIMITED ("Company", "we", "our", "us", "HRPL") respects an individual's privacy and is committed to protecting the same. This Privacy Policy ("Policy") describes how we collect, use, disclose and transfer Personal Information through our platforms controlled by the Company viz. https://hotspotdigi.com/ and mobile sites (the "Platforms").
                        </Typography>
                        <Typography variant="body1" paragraph>
                            This Policy applies to individuals who browse, access the Platform, or provide information on or through the Platform, or whose information the Company otherwise collects, receives or processes in connection with the offer and sale of its products ("Products") (hereinafter, collectively referred to as "Customers", "you", "your").
                        </Typography>
                        <Typography variant="body1" sx={{ fontStyle: 'italic', my: 2 }}>
                            Note: This Policy does not apply to Personal Information collected offline, to Company's websites that do not link to this Policy, to Customers of countries other than India or to third-party websites to which Platform may link.
                        </Typography>
                    </Box>

                    {/* Consent Section */}
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                            YOUR CONSENT
                        </Typography>
                        <Typography variant="body1" paragraph>
                            By accessing and/or using our Platform and providing information, you consent to the collection and use of the information you disclose on the Platform in accordance with this Policy. If you are not comfortable with any terms described in this Policy, you may choose to discontinue the use of the Platform.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            You agree to receive all communications related to our services on the mobile number provided, even if registered under DND/NCPR list under TRAI Regulations. You express interest and accord informed consent to receive communications about the Company's services.
                        </Typography>
                    </Box>

                    {/* Information Collection Section */}
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                            HOW DO WE COLLECT YOUR PERSONAL INFORMATION?
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText 
                                    primary="Direct Submission"
                                    secondary="When you submit information on our Platform through registration, orders, newsletters, surveys, etc."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText 
                                    primary="Automatic Collection"
                                    secondary="Through cookies, web beacons, and other technologies when you interact with our Platform"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText 
                                    primary="Third-Party Sources"
                                    secondary="From partners, service providers, and other legitimate sources"
                                />
                            </ListItem>
                        </List>
                    </Box>

                    {/* Information Types Section */}
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                            WHAT PERSONAL INFORMATION DO WE COLLECT?
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="• Name, email, postal addresses, phone numbers" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Date of birth, language preference, location" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Order and transaction details" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Device and technical information" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Usage data and preferences" />
                            </ListItem>
                        </List>
                    </Box>

                    {/* Data Usage Section */}
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                            HOW DO WE USE YOUR INFORMATION?
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="• Process orders and transactions" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Communicate about your account and activities" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Provide customer support" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Send marketing communications (with consent)" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Improve our services and user experience" />
                            </ListItem>
                        </List>
                    </Box>

                    {/* Security Section */}
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                            HOW DO WE PROTECT YOUR INFORMATION?
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="• Secure networks and encryption" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Regular security assessments" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Limited access controls" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Secure data storage" />
                            </ListItem>
                        </List>
                    </Box>

                    {/* Contact Section */}
                    <Box>
                        <Typography variant="h5" sx={{ mb: 2, fontFamily: "'Outfit', sans-serif", color: '#ffb800' }}>
                            CONTACT US
                        </Typography>
                        <Typography variant="body1" paragraph>
                            For privacy concerns or complaints, please contact our Grievance Officer:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Avnit (Grievance Officer)
                        </Typography>
                        <Typography variant="body1">
                            Hotspot Retail Private Limited
                        </Typography>
                        <Typography variant="body1">
                            F-14, Okhla, Pocket F, Okhla Phase I,
                        </Typography>
                        <Typography variant="body1">
                            Okhla Industrial Estate, New Delhi, Delhi 110020
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            Email: care@hotspotretail.in
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Last updated: March 2025
                </Typography>
            </Paper>
        </Container>
    );
};

export default PrivacyPolicy; 