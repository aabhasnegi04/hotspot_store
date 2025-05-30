import React, { useState } from 'react';
import { Box, Paper, Typography, Checkbox, Button, Divider } from '@mui/material';

// Combos by brand (remove the phone itself from these arrays)
const combosByBrand = {
  Apple: {
    title: 'Essential Combo',
    products: [
      // Only accessories, not the phone itself
      {
        id: 2,
        name: 'Apple 20W Type C Fast Charger (Adapter Only, Optimal Performance, White)',
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/20w-charger',
        price: 1900,
      },
      {
        id: 3,
        name: 'Apple MW493ZM/A Type C to Type C 3.2 Feet (1M) Charging Cable (Woven Design, White)',
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/type-c-cable',
        price: 1900,
      },
      {
        id: 4,
        name: 'Apple Watch SE GPS with Midnight Sport Band - S/M (40mm Retina LTPO OLED Display, Midnight Aluminium Case)',
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/apple-watch-se',
        price: 24190,
      },
      {
        id: 5,
        name: 'Apple AirPods 4 Active Noise Cancellation with Charging Case',
        image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-4',
        price: 17900,
      },
    ],
  },
  Samsung: {
    title: 'Samsung Combo',
    products: [
      // Only accessories, not the phone itself
      {
        id: 2,
        name: 'Samsung 25W USB-C Fast Charger',
        image: 'https://images.samsung.com/is/image/samsung/p6pim/in/ep-ta800xbngin/gallery/in-ep-ta800xbngin-ep-ta800xbngin-530538237',
        price: 1499,
      },
      {
        id: 3,
        name: 'Samsung USB-C to USB-C Cable (1m, Black)',
        image: 'https://images.samsung.com/is/image/samsung/p6pim/in/ep-dn975bbegus/gallery/in-ep-dn975bbegus-ep-dn975bbegus-530538237',
        price: 799,
      },
      {
        id: 4,
        name: 'Samsung Galaxy Buds2 Pro',
        image: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-r510nlvainu/gallery/in-galaxy-buds2-pro-r510-sm-r510nlvainu-thumb-533642237',
        price: 17999,
      },
      {
        id: 5,
        name: 'Samsung Galaxy Watch 6',
        image: 'https://images.samsung.com/is/image/samsung/p6pim/in/sm-r930nzkainu/gallery/in-galaxy-watch6-43mm-r930-sm-r930nzkainu-thumb-533642237',
        price: 28999,
      },
    ],
  },
  // Add more brands as needed
};

const getComboForProduct = (product) => {
  if (!product || !product.brand) return null;
  const brand = product.brand.trim().toLowerCase();
  console.log('Combo lookup brand:', product.brand);
  if (brand === 'apple' || brand.includes('apple')) return combosByBrand.Apple;
  if (brand === 'samsung' || brand.includes('samsung')) return combosByBrand.Samsung;
  // Add more brands as needed
  return null;
};

const PhoneCombos = ({ product }) => {
  const combo = getComboForProduct(product);
  // Compose the combo: current product first, then accessories (avoid duplicate by id or name)
  let comboProducts = [];
  if (combo) {
    // Check if the current product is already in the combo (by id or name)
    const alreadyIncluded = combo.products.some(
      (p) => p.id === product.id || p.name === product.name
    );
    if (alreadyIncluded) {
      comboProducts = combo.products;
    } else {
      comboProducts = [
        {
          id: product.id,
          name: product.name,
          image: product.images && product.images.length > 0 ? product.images[0] : '',
          price: product.price,
        },
        ...combo.products,
      ];
    }
  }

  const [checked, setChecked] = useState(comboProducts.map(() => true));

  if (!combo) return (
    <Paper elevation={2} sx={{ mb: 4, p: { xs: 2, sm: 3 }, borderRadius: 3, background: '#fffbe6', border: '1.5px solid #FFD700', color: '#181711', fontFamily: "'Outfit', sans-serif", boxShadow: '0 4px 24px 0 rgba(255,215,0,0.06)' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#181711', mb: 2, fontSize: '1.15rem' }}>
        No combo available for this brand.
      </Typography>
    </Paper>
  );

  const handleCheck = (idx) => {
    setChecked((prev) => prev.map((c, i) => (i === idx ? !c : c)));
  };

  const total = comboProducts.reduce(
    (sum, p, i) => sum + (checked[i] ? p.price : 0), 0
  );

  const handleAddToCart = () => {
    // Implement add-to-cart logic for selected products
    alert(`Added ${checked.filter(Boolean).length} items to cart!`);
  };

  return (
    <Paper elevation={2} sx={{
      mb: 4,
      p: { xs: 2, sm: 3 },
      borderRadius: 3,
      background: '#fffbe6',
      border: '1.5px solid #FFD700',
      boxShadow: '0 4px 24px 0 rgba(255,215,0,0.06)',
      color: '#181711',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#181711', mb: 2, fontSize: '1.15rem' }}>
        {combo.title}
      </Typography>
      <Divider sx={{ borderColor: '#FFE066', mb: 2 }} />
      {comboProducts.map((product, idx) => (
        <Box key={product.id + '-' + idx} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Checkbox
            checked={checked[idx]}
            onChange={() => handleCheck(idx)}
            sx={{ color: '#FFD700', '&.Mui-checked': { color: '#FFD700' }, mr: 2 }}
          />
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{ width: 44, height: 44, objectFit: 'contain', borderRadius: 2, background: '#fff', p: 0.5, mr: 2, border: '1.5px solid #FFE066' }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: '#181711', fontWeight: 600, fontSize: '1rem' }}>{product.name}</Typography>
          </Box>
          <Typography sx={{ color: '#181711', fontWeight: 500, minWidth: 100, textAlign: 'right' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </Typography>
        </Box>
      ))}
      <Divider sx={{ borderColor: '#FFE066', my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ color: '#FFD700', fontWeight: 700, fontSize: '1.1rem', mr: 2 }}>
          Total: ₹{total.toLocaleString('en-IN')}
        </Typography>
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{
          background: 'linear-gradient(90deg, #FFD700 0%, #FFE066 100%)',
          color: '#181711',
          fontWeight: 700,
          borderRadius: 2,
          fontSize: '1.05rem',
          py: 1.2,
          textTransform: 'none',
          boxShadow: '0 4px 24px 0 rgba(255,215,0,0.10)',
          '&:hover': { background: 'linear-gradient(90deg, #FFE066 0%, #FFD700 100%)' }
        }}
        onClick={handleAddToCart}
      >
        Add {checked.filter(Boolean).length} Items to Cart
      </Button>
    </Paper>
  );
};

export default PhoneCombos;
