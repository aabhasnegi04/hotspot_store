import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { dropdownContent } from './NavDropdown';
import { accessoriesDropdownContent } from './dropdownAccessories';
import { wearablesDropdownContent } from './dropdownWearables';

const getDropdownData = (category) => {
  if (category === 'accessories') return accessoriesDropdownContent;
  if (category === 'wearables') return wearablesDropdownContent;
  return dropdownContent.smartphones;
};

const MobileDropdownContent = ({ category, onNavigate }) => {
  const navigate = useNavigate();
  const content = getDropdownData(category);

  const handleItemClick = (item, section) => {
    if (section.title === 'Popular Brands') {
      if (category === 'smartphones') {
        navigate(`/brand-handsets/${item.toUpperCase()}`);
      } else if (category === 'wearables') {
        navigate(`/brand-wearables/${item.toLowerCase()}`);
      } else {
        navigate(`/brand-accessories/${item.toLowerCase()}`);
      }
    } else if (section.title === 'Price Range') {
      if (category === 'wearables') {
        let range;
        switch (item) {
          case 'Under ₹2,000': range = '0-2000'; break;
          case 'Under ₹5,000': range = '2000-5000'; break;
          case 'Under ₹10,000': range = '5000-10000'; break;
          case 'Under ₹20,000': range = '10000-20000'; break;
          case 'Under ₹30,000': range = '20000-30000'; break;
          case 'Above ₹30,000': range = '30000-100000'; break;
          default: range = '0-100000';
        }
        navigate(`/wearables/price-range/${range}`);
      } else if (category === 'accessories') {
        let range;
        switch (item) {
          case 'Under ₹1,000': range = '0-1000'; break;
          case 'Under ₹2,000': range = '1000-2000'; break;
          case 'Under ₹5,000': range = '2000-5000'; break;
          case 'Under ₹10,000': range = '5000-10000'; break;
          case 'Above ₹10,000': range = '10000-100000'; break;
          default: range = '0-100000';
        }
        navigate(`/accessories/price-range/${range}`);
      } else if (category === 'smartphones') {
        let range;
        switch (item) {
          case 'Under ₹15,000': range = '10000-15000'; break;
          case 'Under ₹20,000': range = '15000-20000'; break;
          case 'Under ₹30,000': range = '20000-30000'; break;
          case 'Under ₹40,000': range = '30000-40000'; break;
          case 'Under ₹50,000': range = '40000-50000'; break;
          case 'Above ₹50,000': range = '50000-100000'; break;
          default: range = '0-100000';
        }
        navigate(`/price-range/${range}`);
      }
    } else {
      if (category === 'wearables') {
        navigate(`/category-wearables/${item}`);
      } else {
        navigate(`/category-accessories/${item}`);
      }
    }
    if (onNavigate) onNavigate();
  };

  return (
    <Box>
      {content.sections.map((section, idx) => (
        <Box key={section.title} sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 600, color: '#FFB800', fontSize: '1rem', mb: 1 }}>
            {section.title}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {section.items.map((item) => (
              <Typography
                key={item}
                sx={{
                  fontSize: '0.95rem',
                  color: '#333',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '6px',
                  background: 'rgba(255,184,0,0.07)',
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    background: 'rgba(255,184,0,0.18)',
                    color: '#FFB800',
                  },
                }}
                onClick={() => handleItemClick(item, section)}
              >
                {item}
              </Typography>
            ))}
          </Box>
          {idx !== content.sections.length - 1 && <Divider sx={{ my: 1 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default MobileDropdownContent; 