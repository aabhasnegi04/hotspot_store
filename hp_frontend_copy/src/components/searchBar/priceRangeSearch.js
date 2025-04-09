import React from 'react';
import { Box, Typography } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { API_BASE_URL } from '../../config';

const searchTerms = ['phone', 'phones', 'mobile', 'mobiles', 'smartphone', 'smartphones', 'device', 'devices'];

const priceRanges = [
    { min: 10000, max: 15000, label: 'under ₹15,000' },
    { min: 10000, max: 20000, label: 'under ₹20,000' },
    { min: 10000, max: 30000, label: 'under ₹30,000' },
    { min: 10000, max: 50000, label: 'under ₹50,000' },
    { min: 50000, max: 1000000, label: 'above ₹50,000', prefix: 'Premium' }
];

export const priceRangeSuggestions = priceRanges.map(({ min, max, label, prefix = '' }) => ({
    label: `${prefix} Devices ${label}`,
    searchTerms,
    range: `${min}-${max}`,
    type: 'price-suggestion'
}));

const pricePatterns = [
    {
        pattern: /(?:under|below)\s+(\d+)/i,
        getRanges: match => ({ min: 10000, max: parseInt(match[1]) })
    },
    {
        pattern: /(\d+)(?:\s*-\s*|\s+to\s+)(\d+)/i,
        getRanges: match => ({ 
            min: Math.max(parseInt(match[1]), 10000),
            max: parseInt(match[2])
        })
    },
    {
        pattern: /(?:above|over)\s+(\d+)/i,
        getRanges: match => ({ 
            min: Math.max(parseInt(match[1]), 10000),
            max: 1000000
        })
    }
];

export const parsePriceQuery = query => {
    if (!query || !/(?:under|below|above|over|price)/i.test(query)) return null;

    for (const { pattern, getRanges } of pricePatterns) {
        const match = query.match(pattern);
        if (match) {
            const { min, max } = getRanges(match);
            return {
                isPriceQuery: true,
                priceRange: `${min}-${max}`,
                cleanQuery: query.replace(pattern, '').trim()
            };
        }
    }
    return null;
};

export const fetchPriceRangeResults = async priceRange => {
    try {
        const response = await fetch(`${API_BASE_URL}/price-range/${priceRange}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return await response.json();
    } catch (error) {
        console.error('Error fetching price range products:', error);
        return [];
    }
};

const styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
            background: 'linear-gradient(45deg, rgba(255,184,0,0.05) 0%, rgba(255,184,0,0.1) 100%)',
            transform: 'translateX(5px)'
        }
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(255,184,0,0.1) 0%, rgba(255,184,0,0.2) 100%)',
        boxShadow: '0 2px 8px rgba(255,184,0,0.15)'
    }
};

export const PriceRangeOption = ({ product }) => (
    <Box sx={styles.wrapper}>
        <Box sx={styles.iconBox}>
            <CurrencyRupeeIcon sx={{ color: '#FFB800', fontSize: '1.4rem' }} />
        </Box>
        <Box>
            <Typography sx={{ fontWeight: 600, color: '#2c2c2c', fontSize: '0.95rem', letterSpacing: '0.2px' }}>
                {product.ItemName}
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: '#666', mt: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <span style={{ color: '#FFB800' }}>₹{Number(product.SalePrice).toLocaleString('en-IN')}</span>
                • {product.Brand}
            </Typography>
        </Box>
    </Box>
);

export const getMatchingPriceSuggestions = query => {
    if (!query) return [];
    query = query.toLowerCase().trim();
    const queryWords = query.split(/\s+/);

    return priceRangeSuggestions.filter(suggestion => 
        suggestion.searchTerms.some(term => 
            queryWords.some(word => word.includes(term) || term.includes(word))
        )
    ).map(suggestion => ({
        ...suggestion,
        label: suggestion.label.replace('Devices', 
            queryWords.find(word => 
                suggestion.searchTerms.some(term => word.includes(term))
            )?.charAt(0).toUpperCase() + 
            queryWords.find(word => 
                suggestion.searchTerms.some(term => word.includes(term))
            )?.slice(1) || 'Devices'
        )
    }));
};
