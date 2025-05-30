import React from 'react';
import { Box, Paper, Typography, Button, Grid, Divider } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const appleCarePlans = [
  {
    company: 'AppleCare+',
    logo: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51Dpf3AY6oL._SL1500_.jpg',
    name: 'AppleCare+',
    price: 14900,
    monthly: 621,
    duration: '2 Years',
    features: [
      { icon: <ErrorOutlineIcon sx={{ color: '#b7950b' }} />, label: 'Get unlimited incidents of accidental damage protection' },
      { icon: <SecurityIcon sx={{ color: '#b7950b' }} />, label: 'Apple-certified service and support coverage' },
      { icon: <SupportAgentIcon sx={{ color: '#b7950b' }} />, label: '24/7 priority access to technical support' },
      { icon: <BatteryChargingFullIcon sx={{ color: '#b7950b' }} />, label: 'Battery service coverage*' },
    ],
    learnMore: 'https://www.apple.com/in/support/products/iphone/',
  },
  {
    company: 'AppleCare+ Services',
    logo: 'https://m.media-amazon.com/images/W/MEDIAX_1215821-T2/images/I/51Dpf3AY6oL._SL1500_.jpg',
    name: 'Protect+ with AppleCare Services',
    price: 16990,
    monthly: 708,
    duration: '2 Years',
    features: [
      { icon: <ErrorOutlineIcon sx={{ color: '#b7950b' }} />, label: 'Get unlimited incidents of accidental damage protection' },
      { icon: <SecurityIcon sx={{ color: '#b7950b' }} />, label: 'Apple-certified service and support coverage' },
      { icon: <SupportAgentIcon sx={{ color: '#b7950b' }} />, label: '24/7 priority access to technical support' },
      { icon: <BatteryChargingFullIcon sx={{ color: '#b7950b' }} />, label: 'Battery service coverage*' },
    ],
    learnMore: 'https://www.apple.com/in/support/products/iphone/',
  },
];

const insurancePlans = [
  {
    company: 'OneAssist',
    logo: 'https://play-lh.googleusercontent.com/GaR3JAzfObh9jGUOoXjUqBO2DhO6sTv-25e0Yt3bEcVoMMwRKBY-OFvW19IDxzSwVKKk=w240-h480-rw',
    name: 'OneAssist Protect - Advanced (Extended Warranty)',
    price: 1599,
    monthly: 139,
    duration: '1 Year',
    features: [
      { icon: <VerifiedUserIcon sx={{ color: '#b7950b' }} />, label: "Extends your Device's Life" },
      { icon: <SecurityIcon sx={{ color: '#b7950b' }} />, label: 'Protection against sudden malfunctions' },
      { icon: <BuildCircleIcon sx={{ color: '#b7950b' }} />, label: 'Genuine Spare parts' },
      { icon: <LocalAtmIcon sx={{ color: '#b7950b' }} />, label: 'Covers 100% of the repair cost' },
    ],
    learnMore: 'https://www.oneassist.in/',
  },
  {
    company: 'Zopper',
    logo: 'https://www.zopper.com/images/logo.svg',
    name: 'Zopper Protect - Damage Advanced (Accidental & Liquid Damage)',
    price: 1899,
    monthly: 159,
    duration: '1 Year',
    features: [
      { icon: <VerifiedUserIcon sx={{ color: '#b7950b' }} />, label: "Covers accidental & liquid damage" },
      { icon: <SecurityIcon sx={{ color: '#b7950b' }} />, label: 'Protection against breakdowns' },
      { icon: <BuildCircleIcon sx={{ color: '#b7950b' }} />, label: 'Genuine Spare parts' },
      { icon: <LocalAtmIcon sx={{ color: '#b7950b' }} />, label: 'Covers 100% of the repair cost' },
    ],
    learnMore: 'https://www.zopper.com/',
  },
];

const PhoneInsurance = ({ brand }) => {
  const plansToShow = brand && brand.toLowerCase() === 'apple' ? appleCarePlans : insurancePlans;
  return (
    <Paper elevation={2} sx={{
      mb: 4,
      p: { xs: 1.5, sm: 2, md: 2.5 },
      borderRadius: 4,
      background: 'linear-gradient(135deg, #fffbe6 0%, #fff9c4 100%)',
      border: '1.5px solid #FFD700',
      boxShadow: '0 4px 24px 0 rgba(255,215,0,0.06)',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#b7950b', mb: 1.2, fontSize: '1rem', fontFamily: "'Outfit', sans-serif", background: 'none', borderRadius: 0, px: 0, py: 0, display: 'block' }}>
        Keep it safe <span style={{ fontWeight: 400, color: '#666', marginLeft: 8, fontSize: '0.95rem' }}>Add extra protection to your products.</span>
      </Typography>
      <Grid container spacing={2} alignItems="stretch">
        {plansToShow.map((plan, idx) => (
          <Grid item xs={12} md={6} key={plan.company} sx={{ display: 'flex' }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: 320,
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              p: 0
            }}>
              <Box sx={{
                p: 2,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.7)',
                color: '#222',
                border: 'none',
                boxShadow: 'none',
                fontFamily: "'Outfit', sans-serif",
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                height: '100%'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.2 }}>
                  <img 
                    src={plan.logo} 
                    alt={plan.company} 
                    style={{ 
                      width: plan.company.toLowerCase().includes('applecare') ? 54 : 40, 
                      height: plan.company.toLowerCase().includes('applecare') ? 54 : 40, 
                      borderRadius: 8, 
                      marginRight: 12, 
                      background: '#fff', 
                      padding: 4, 
                      border: '1px solid #FFD700' 
                    }} 
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#b7950b', fontSize: '0.98rem', fontFamily: "'Outfit', sans-serif" }}>{plan.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 400, mt: 0.3, fontSize: '0.92rem' }}>Starting at just <b>₹{plan.monthly}/month</b></Typography>
                  </Box>
                  <Button href={plan.learnMore} target="_blank" size="small" sx={{ ml: 'auto', color: '#b7950b', fontWeight: 600, textTransform: 'none', fontFamily: "'Outfit', sans-serif", fontSize: '0.92rem', p: 0.5 }}>Learn more</Button>
                </Box>
                <Divider sx={{ borderColor: 'rgba(183,149,11,0.10)', mb: 1.2 }} />
                <Grid container spacing={1.2} sx={{ mb: 1.2 }}>
                  {plan.features.map((feature, i) => (
                    <Grid item xs={6} key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                      {React.cloneElement(feature.icon, { sx: { ...feature.icon.props.sx, fontSize: 17 } })}
                      <Typography variant="body2" sx={{ color: '#222', fontWeight: 500, fontFamily: "'Outfit', sans-serif", fontSize: '0.82rem' }}>{feature.label}</Typography>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ background: 'rgba(255,215,0,0.08)', borderRadius: 2, p: 1.2, mb: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#b7950b', fontFamily: "'Outfit', sans-serif", fontSize: '0.93rem' }}>{plan.duration}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#b7950b', fontFamily: "'Outfit', sans-serif", fontSize: '0.93rem' }}>₹{plan.price} <span style={{ color: '#666', fontWeight: 400 }}>| or ₹{plan.monthly}/month</span></Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="contained" fullWidth sx={{ background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)', color: '#000', fontWeight: 700, borderRadius: 2, fontSize: '0.98rem', py: 1, boxShadow: '0 4px 24px 0 rgba(255,215,0,0.10)', textTransform: 'none', mt: 1, fontFamily: "'Outfit', sans-serif", '&:hover': { background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)' } }}>
                  Select Plan
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default PhoneInsurance;
