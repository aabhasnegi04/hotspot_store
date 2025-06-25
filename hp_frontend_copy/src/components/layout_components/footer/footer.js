import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
  Divider,
  Link,
  Stack,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Phone,
  Email,
  LocationOn,
  ArrowForward,
} from "@mui/icons-material";

const Footer = () => {
  const navigate = useNavigate();

  // Social media links - replace these with your actual links
  const socialLinks = {
    facebook: "https://www.facebook.com/HotspotStoreOfficial/",
    twitter: "https://x.com/HotspotOfficiel",
    instagram: "https://www.instagram.com/the.hotspotstore/",
    linkedin: "https://www.linkedin.com/company/hotspotstore/",
    youtube: "https://www.youtube.com/@hotspotstore",
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription submitted");
  };

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Social media icon styles
  const socialIconStyle = {
    color: "#ffb800",
    "&:hover": {
      bgcolor: "rgba(255, 184, 0, 0.1)",
      transform: "scale(1.1)",
    },
    transition: "all 0.3s ease",
  };

  return (
    <Box
      sx={{
        bgcolor: "#1a1a1a",
        color: "white",
        pt: { xs: 4, sm: 8 },
        pb: { xs: 2, sm: 4 },
        mt: 0,
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ px: 0 }}>
        {/* Main Footer Content */}
        <Grid container spacing={{ xs: 2, sm: 4 }}>
          {/* Company Info */}
          <Grid item xs={12} md={4} sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                mb: 2,
                color: "#ffb800",
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              <img
                src="/Hotspot Logo smart 1.png"
                alt="HotSpot"
                style={{ width: "120px", height: "40px", maxWidth: '100%' }}
              />
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: "#f5f5f5",
                fontFamily: "'Outfit', sans-serif",
                fontSize: { xs: '0.95rem', sm: '1rem' }
              }}
            >
              Your one-stop destination for the latest smartphones and
              accessories. Discover cutting-edge technology and premium
              accessories at competitive prices.
            </Typography>
            <Stack direction="row" spacing={1}>
              <Link
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton sx={socialIconStyle} size="small">
                  <Facebook />
                </IconButton>
              </Link>
              <Link
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton sx={socialIconStyle} size="small">
                  <Twitter />
                </IconButton>
              </Link>
              <Link
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton sx={socialIconStyle} size="small">
                  <Instagram />
                </IconButton>
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton sx={socialIconStyle} size="small">
                  <LinkedIn />
                </IconButton>
              </Link>
              <Link
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton sx={socialIconStyle} size="small">
                  <YouTube />
                </IconButton>
              </Link>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2} sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                mb: 2,
                color: "#ffb800",
                fontSize: { xs: '1.1rem', sm: '1.15rem' }
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {[
                { text: "Home", path: "/" },
                { text: "About Us", path: "/about" },
                { text: "Products", path: "/products/all" },
                { text: "Contact", path: "/contact" },
              ].map((link) => (
                <Link
                  key={link.text}
                  component="button"
                  onClick={() => handleNavigation(link.path)}
                  sx={{
                    color: "#f5f5f5",
                    fontFamily: "'Outfit', sans-serif",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    textDecoration: "none",
                    fontSize: { xs: '0.98rem', sm: '1rem' },
                    "&:hover": {
                      color: "#ffb800",
                    },
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3} sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                mb: 2,
                color: "#ffb800",
                fontSize: { xs: '1.1rem', sm: '1.15rem' }
              }}
            >
              Contact Info
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone sx={{ color: "#ffb800" }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#f5f5f5",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: { xs: '0.95rem', sm: '1rem' }
                  }}
                >
                  +91 7042343404
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email sx={{ color: "#ffb800" }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#f5f5f5",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: { xs: '0.95rem', sm: '1rem' }
                  }}
                >
                  care@hotspotretail.in
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationOn sx={{ color: "#ffb800" }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#f5f5f5",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: { xs: '0.95rem', sm: '1rem' }
                  }}
                >
                  F-14 2nd Floor, Okhla Industrial Area Phase 1,
                  <br />
                  New Delhi, IN 110020
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3} sx={{ mb: { xs: 2, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                mb: 2,
                color: "#ffb800",
                fontSize: { xs: '1.1rem', sm: '1.15rem' }
              }}
            >
              Newsletter
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: "#f5f5f5",
                fontFamily: "'Outfit', sans-serif",
                fontSize: { xs: '0.95rem', sm: '1rem' }
              }}
            >
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </Typography>
            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
              }}
            >
              <TextField
                size="small"
                placeholder="Your email"
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255, 255, 255, 0.05)",
                    color: "#f5f5f5",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ffb800",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ffb800",
                    },
                  },
                  fontSize: { xs: '0.95rem', sm: '1rem' },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#ffb800",
                  color: "#000",
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  px: { xs: 2, sm: 3 },
                  py: { xs: 1, sm: 1.2 },
                  borderRadius: { xs: '8px', sm: '12px' },
                  "&:hover": {
                    bgcolor: "#ffa000",
                  },
                }}
              >
                <ArrowForward />
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider
          sx={{
            mt: { xs: 3, sm: 6 },
            mb: { xs: 2, sm: 4 },
            bgcolor: "rgba(255, 255, 255, 0.1)",
          }}
        />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#f5f5f5",
              fontFamily: "'Outfit', sans-serif",
              fontSize: { xs: '0.95rem', sm: '1rem' },
            }}
          >
            © 2025 HotSpot. All rights reserved.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 3 }}
            sx={{
              alignItems: { xs: 'center', sm: 'unset' },
              mt: { xs: 1, sm: 0 },
              '& button': {
                color: '#f5f5f5',
                fontFamily: "'Outfit', sans-serif",
                fontSize: { xs: '0.98rem', sm: '0.875rem' },
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                '&:hover': {
                  color: '#ffb800',
                },
              },
            }}
          >
            <Link
              component="button"
              onClick={() => handleNavigation("/privacy-policy")}
            >
              Privacy Policy
            </Link>
            <Link
              component="button"
              onClick={() => handleNavigation("/terms-of-service")}
            >
              Terms of Service
            </Link>
            <Link
              component="button"
              onClick={() => handleNavigation("/cookie-policy")}
            >
              Cookie Policy
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
