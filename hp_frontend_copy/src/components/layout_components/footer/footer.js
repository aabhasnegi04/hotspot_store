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
        pt: 8,
        pb: 4,
        mt: 0,
        mx: -2,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                mb: 2,
                color: "#ffb800",
              }}
            >
              <img
                src="/Hotspot Logo smart 1.png"
                alt="HotSpot"
                style={{ width: "150px", height: "50px" }}
              />
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: "#f5f5f5",
                fontFamily: "'Outfit', sans-serif",
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
                <IconButton sx={socialIconStyle}>
                  <Facebook />
                </IconButton>
              </Link>
              <Link
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton sx={socialIconStyle}>
                  <Twitter />
                </IconButton>
              </Link>
              <Link
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton sx={socialIconStyle}>
                  <Instagram />
                </IconButton>
              </Link>
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton sx={socialIconStyle}>
                  <LinkedIn />
                </IconButton>
              </Link>
              <Link
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton sx={socialIconStyle}>
                  <YouTube />
                </IconButton>
              </Link>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                mb: 2,
                color: "#ffb800",
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
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                mb: 2,
                color: "#ffb800",
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
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                mb: 2,
                color: "#ffb800",
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
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#ffb800",
                  color: "#000",
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
            mt: 6,
            mb: 4,
            bgcolor: "rgba(255, 255, 255, 0.1)",
          }}
        />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#f5f5f5",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            © 2025 HotSpot. All rights reserved.
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              "& button": {
                color: "#f5f5f5",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "0.875rem",
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                "&:hover": {
                  color: "#ffb800",
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
