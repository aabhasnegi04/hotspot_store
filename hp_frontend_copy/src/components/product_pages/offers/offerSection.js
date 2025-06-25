import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled components
const HeroBanner = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA2ZTcNypkwJG7R83gmD2clBj5C7A4TSHcjtW0mhZxWlo2E8sF3XAWNqD1k_QVqYy2rjnZvAqAFd4TGTc28_ayDAsV0EoUpmZ9r4YICIQT3mMXjquGoYhL8h5HDjyNsaV_CH_EbC6okh2-NGK20q0oH1XnW5P7CO6Mf1pYaisQvHQeyvknTncftKt99uh9I1SOhaY8QoFSAkcGeoZ3BfWlv-EfeB6NOXCpkAul-amxXYcATdILeFxBeKQIL8hUfbxyA-lPECSR-EHIs")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '320px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  borderRadius: '12px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    minHeight: '240px',
  }
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  overflow: 'hidden',
  height: '100%',
  backgroundColor: 'white',
  boxShadow: '0 0 4px rgba(0,0,0,0.1)',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'all 0.5s ease-in-out',
  '&.in-view': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    transition: 'transform 0.3s ease-in-out',
  }
}));

const TimerBox = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f4f4f0',
  borderRadius: '12px',
  padding: theme.spacing(2),
  textAlign: 'center',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const ShopNowButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#f4f4f0',
  color: '#181711',
  borderRadius: '9999px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '14px',
  letterSpacing: '0.015em',
  '&:hover': {
    backgroundColor: '#e8e8e4',
  }
}));

const OfferSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45
  });

  useEffect(() => {
    const cards = document.querySelectorAll('.category-card');
    
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    const handleScroll = () => {
      cards.forEach(card => {
        if (isElementInViewport(card)) {
          if (!card.classList.contains('in-view')) {
            card.classList.add('in-view');
          }
        } else if (card.classList.contains('in-view')) {
          card.classList.remove('in-view');
        }
      });
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    {
      title: 'Smartphones',
      subtitle: 'Explore the latest models',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARa-SpKXJFXmc-ofaz3vA5zBz3mbpS6bpLVaUUibKTpHm0fX9qT4c1vnv1Zcfmum0HnK2Cp0RR1vmHmJi25t__cCp8gingF96N9ElKNWlWOfnQBiw4fRxdDTk_edrFSj6migI_BWjfK4MQA9KW6R2xsvej1UQ3hEQmhjYM3r71J7DMU3l8T40kdpng6klqY4EckRpDXttBbDl0rdEvC9Z79l5XWjlJ4Ye0SiZXOlV8Ii2KocK5lgCVRztC4t3nUEzMlMDJIOaNq-Z_'
    },
    {
      title: 'Audio Accessories',
      subtitle: 'Immerse yourself in sound',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTie-14csvAGx1UNfz_vXbuEvDRKHXVdLGNfBKPnIz1jcW_UPFFvHBl8H6IaV7BsHlMbJeTunyWsWf1PyKZZETc5FyjPk2A6ieuwjYghfiy8YvgSRi1ICKdBAfaLDPW4s6rc8auQj4_JRwWoNTNOV7oPuvev6kXzo4If9Z3mkFuF7rHEqZuubX_aVlZhBlfkQnXeSTpGev9dU5qek8jZ-UcivO0BQsa0mtYmD0vBMm7bjvlDecxb2tVG8mZATTVMLdiDYb-fiuXC9r'
    },
    {
      title: 'Phone Cases',
      subtitle: 'Protect your device in style',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoW6jOskkBvvEoDP7ceQ8nZkBvgJApPD2xvCOTonm7ajbs4xZ8EHqyOjEnRo-WwaPAwHbgvMksFf-mhHHIOT-8pXY18mSUcZoGOfq9_a6L1Cv5uHFnSVn1MCBaYWSY5bwsZiFzbIzsU9E3gNmhFSUU_yUmqg0oQKy8GP6ILrqPyNwyBVjLNjobGQtIaQTjzbzuczOwJ6JKYJmetVZDToEiOtIO12uncHWtaOI8i-H-zgra2wzleMn2PEy2PDLgW4E3qerodCd59Gdr'
    },
    {
      title: 'Wearable Tech',
      subtitle: 'Stay connected on the go',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJGlUfR92jrpbIslnem6MQBldfnx9R6uOlrbSoqy1yd9uj9Ta5KemWyuUhHioVEfhgoDa6eFGznwG9EcHb9_nRq1GedkCZHti7W_E4cBxrcob4iB4oMrvOqwubseMKF50wQfCjOe2krmU9MeBqcljZ10IE-9yk_wUSJz6-c_zxSKX1PEquIDXqEeA75iZWLpP4nzhAnt7gJfW1YADi2sxVMzb8yncpxrvmQz8HnUWOXwLPfpnQvip_sQJ0L4HHgsG1nWCDud1xnlvi'
    }
  ];

  const bestSellers = [
    {
      title: 'Smartphone Y',
      subtitle: 'High performance, sleek design',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKH1eH1EvHVbI-L_aP56O8bSmoAIFaskDFBmPyiBUZQHuMTOS83z7i7n_FMdPN15Q_1_Mw60HmYw7Bp4m4Y2Rypshws-tMHj4FKlg6CgfKM7j-Hft-cLvG20g7J5OmiiDqhB-bTyZT8BXfze3AQW8Ckfw2joyElWUf2ZN5zODJTJGmqspHygvDfQKZ05wIr-1vNVKT2oBJ9Yknd_zKte5-fuyfrXKA8rnLSXPIpLfjj2c7wghB0kOFY6b9qfO_C3iWXB7mJYk2Sem4'
    },
    {
      title: 'Noise-Canceling Headphones',
      subtitle: 'Immersive sound experience',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCZx5se422bcQKIawHJPIeBqzIEwYqhoFgA2H2i37eP7c09vd8dup5WM0GXygA0xGuEfXwDcs_U8TpVOGvhNdbnA67b4gqfW4d0l-_0nfe6cTiwibg-A3dqa1t-w2n8t6yaYziDKvXIurlCoH5WySlnIVd6aGsZDUlHHdXrMPKsTdcwCpLFt1UL012nT1FVqf07BqNieVJUPkUZiSXC9-piWdqnPmVuMhI9uVLwstuUwJIPq_Qld3jgnBpElpDOZX1gmgRwxO1ggzL'
    },
    {
      title: 'Protective Phone Case',
      subtitle: 'Durable and stylish protection',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO11w-FSAG_2m3gUFjFgyZL0A56AiIkvhJK-Lxp_8NuEIqrmHLan5TGRg-gpaUA1Y0llqIBqKHrHPwKs8KVC2hnoGfViRH7RnXFe7fEquRUL06JPvf3cC5h2J-572AjTjlJzYzYK3uNvqmrcD9iech99Nbc2_sz-wsNVzYl8nNRM-XIT5IYFcr45-RIQYV1-3AnkvRwGCYlXlobBeifBAx6eBynWlu7SmZRdzzUIvrXjh_EZJR1AZfKg0b3xqx28mRsSEfqGy-La_1'
    },
    {
      title: 'Fitness Tracker Watch',
      subtitle: 'Monitor your health and activity',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZT3GiNDJ9dt0wjCEqKqvEW-fIlJ1UtdC67S0lTHtWhyNbtl8iaeNrhEpVoQlsxMEdiTKAN6uCQ4MjrDyO5pb1l2bixU-ZV9FcjL2A-brY9j5knYqAXW8fI3og4Qe-k4Nu7ik46sULlmabNlUE9HDkkUBSTqWp39XbSYIwIB61LeTOy6j1-ETa1xP-yA5evHVgqPRzkn8lfyvPYwBkcl4p1LZvROEIoe2CFyqCtFo1vfs0O185t5oZxn6GY_G8d9tJQeFgvvpgvUdA'
    }
  ];

  const newArrivals = [
    {
      title: 'Smartphone Z',
      subtitle: 'Latest model with advanced features',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCcwkbNHeZcMu3Mh_ESJ5nEH2RNuLDAaMST4UND9CtJLGxlCHtN7HRuGAW13qGwVCSmzQIxbxz0uhmOnIShS6L05xuRAQEkuotjnjJXmzsbjkqQQZjqlj-2lPC-Vo4l8D03JTHPYv7KY-2qW6ACob07bUf-ZKruRhYQjGwHdCReBeMlqSUCg1u633FANsDu3onEpCTYdMB3k4aWqptGklvKK3hu6rsoTX0-admupF37wck1poeRNHFS8mOe7PcTnTbKF4Bv6JxdhYK'
    },
    {
      title: 'Bluetooth Earphones',
      subtitle: 'Compact and high-quality audio',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAgKBnpzzvLBM0pLw_qmrXNesnUGu4q1f0IZl5Rx63U-B1YSYhQw_9gFXr-C57075u6lkfpYhcTVf9th3bHfmP1OC3IdnnZwC2iULoztxOatKwrsAnBuPeShzMu4nrWY_qR94qP4NE0eH1DVklOVQrpBW8ZvouXoIRjccZCuY2i3a0Cso5Xt5ntF4uwsZbUw_YGKm9U6ATY44D0xxnOYYSDwrpOUSccWak57v8ymELytzWkvTDSAgWAEunMwnNn3HmivVKXlIThi6c'
    },
    {
      title: 'Designer Phone Case',
      subtitle: 'Stylish and protective case designs',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL7h-w46tFcuR_T-kmt6sEpH6tQj7g9TAfl63uXjvheu-i8SvVe0xDESIc_ydG66ORi-eqCh5qSkGJZOf1LB40bWaaXXikJFeKW-LPt1ex8xrvejTm043urU7i06V7vrkrMzoFm06Hk-kHUez2zmPfUIjNM8vytPDca1zodyGYnLdANnydz7PVJsZ1VW-ieXsSPijRD96h8sb-23r_UqlmvW88liPb3bcyQXruTpbzasGE9nJZt0sf4swsXw7RHqwTbZXU_TwIco2t'
    },
    {
      title: 'Smart Health Watch',
      subtitle: 'Advanced health monitoring features',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCJVQyCLp7cpvhnRgoPjgXrQMftUN0gxbjA4zCtAGaSJSFo6Qtgvs1fnbJmFqsn29W6TNlZ8dUIRrJggcDivBwLb11HRrHu3raDeMBOTbr9tJ2pR8UmiGvEpjzKkvlmfaY7ggbsa8wfhBcJajGAVQCvcmVzxj2obXf4SwvtmQL7KLvqKTKX4vckL1oqEKvUj6HufP9GfNT9_sgt_vWjDLLkT8JnKTDDNBv4e3Cxh6fdyae-IBCcz8nkkxvL8JmV_zyBIw_UdC7iX54'
    }
  ];

  const customerFavorites = [
    {
      title: 'Smartphone A',
      subtitle: 'Popular choice for reliability',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDavIzaxlDgpW0_HbdlgLFmdbd5S_ZXh0-yVSQrpxbSLkwXoHPPnGJKIievLRU6XJ6vGdx_GDEFhOMn9xjJxZYBPAdF_abvgwPzuMGOUMjS6PS1kAi6oW1X0asHXyWiqN4LCeeEc2hcXPRhIujCihP3DR0h9hNfmCDBJpM0fmAp9G7O_m-T535pQ_63ZiAbCpFt2L-UBfuYiOA_u-hojbLjvE6GcjQtTxdYYmCFZmjSNeCgQnEfeg7jHiz1cY0zuqooU_CFHCRxe0cs'
    },
    {
      title: 'Wireless Headsets',
      subtitle: 'Comfortable and clear audio',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBemOypf30fnsOQt85Pw66KWSKqNqZuQ_6F6823P1T_B4P7sVN5vIkWBNpFxMYAN2BTdGxBtNjI35-7jubQYgfB3m87eYeIAxTGXuTvQS2pYc7jvpTS1R0g2iBxidLDIxGBSxT3kyEE1Z0s_oVVeOHYeKIAuQDA1SNVYtuLTl9zpogSHOHdHsx9j5W4wcd_zjMXZsA7gcO0ybDM5LJcv8Nsw21__ryGJryFEXMjhoy6kzMg3gLs52AuUS6N0H1oA9yh_Xozc9v1Q7cQ'
    },
    {
      title: 'Premium Phone Case',
      subtitle: 'High-end protection with style',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmQ1s3mODEfGPzF9iRiwzytLMfgkToKgkYzPgdZWm5rfowS2r1zwIxp1dpXD105zUHChMDuIOF0zsQ8l4fKVg_TfSb564JRSnQTvfWs2QC1yea41p0pQ3bAjp-XHkxI7W5qqhXKGc_nm-oCHPbaWLkUOKanC9jc6WFwXN0BlxnIynyGuPlibWfzzatyccQ3EPOR48IMY66YwfwhTi19no_oZuIamobu50oO2GxW6EHlkYWc3ichp07GwS9F4OdxAxmSu8vkFZhgudq'
    },
    {
      title: 'Activity Tracker Watch',
      subtitle: 'Track your daily activity and sleep',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuS7dCzILL9jo8H-PWk9wHivl0CmGQqc4aE2NX_RBl19dOx4vLS_229N6OR8tSrGFkFzHKCAknVi3exBQBk84Pkgs3koNaKHNE12vYfxcEqxr3nWGgyWFf_XI8jSurss2mlLn7Jf146zRS-AUxEpYZ8Jnm_x5bRpSAxwOHGdZHzNAZPm_WxZ3fx7NME1vMhjvNDSfuEVnzc5d6E6i8iCfbDTNc4sCX6c0XAgDY5TWayZ3VZaJn49zIhE2jsh9N6-h4Ii1ePb5mV7XH'
    }
  ];

  const renderProductSection = (title, products) => (
    <>
      <Typography
        variant="h3"
        sx={{
          color: '#181711',
          fontSize: { xs: '18px', sm: '22px' },
          fontWeight: 700,
          letterSpacing: '-0.015em',
          mt: { xs: 3, sm: 5 },
          mb: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 2 }
        }}
      >
        {title}
      </Typography>
      <Box sx={{ 
        display: 'flex',
        overflowX: 'auto',
        gap: { xs: 1.5, sm: 3 },
        px: { xs: 1, sm: 2 },
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
        {products.map((product, index) => (
          <CategoryCard key={index} sx={{ minWidth: { xs: 180, sm: 240 }, maxWidth: { xs: 200, sm: 240 } }} className="category-card">
            <Box
              sx={{
                height: { xs: 120, sm: 180, md: 240 },
                backgroundImage: `url(${product.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <CardContent sx={{ p: { xs: 2, sm: 4 }, pt: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#181711',
                    fontWeight: 500,
                    mb: 0.5,
                    fontSize: { xs: '1rem', sm: '1.15rem' }
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#888263',
                    fontSize: { xs: '0.85rem', sm: '1rem' }
                  }}
                >
                  {product.subtitle}
                </Typography>
              </Box>
              <ShopNowButton sx={{ fontSize: { xs: '0.85rem', sm: '14px' }, py: { xs: 1, sm: 1.5 } }}>
                Shop Now
              </ShopNowButton>
            </CardContent>
          </CategoryCard>
        ))}
      </Box>
    </>
  );

  return (
    <Box sx={{ 
      backgroundColor: 'white',
      minHeight: '100vh',
      py: { xs: 2, sm: 4 }
    }}>
      <Container maxWidth="lg" sx={{ px: { xs: 0.5, sm: 2 } }}>
        <HeroBanner sx={{ borderRadius: { xs: '8px', sm: '12px' }, minHeight: { xs: 160, sm: 240, md: 320 } }}>
          <Box sx={{ p: { xs: 2, sm: 4 } }}>
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontSize: { xs: '1.3rem', sm: '1.7rem', md: '28px' },
                fontWeight: 700,
                letterSpacing: '-0.015em'
              }}
            >
              Golden Hour Deals
            </Typography>
          </Box>
        </HeroBanner>

        <Typography
          variant="h3"
          sx={{
            color: '#181711',
            fontSize: { xs: '18px', sm: '22px' },
            fontWeight: 700,
            letterSpacing: '-0.015em',
            mt: { xs: 3, sm: 5 },
            mb: { xs: 2, sm: 3 },
            px: { xs: 1, sm: 2 }
          }}
        >
          Featured Categories
        </Typography>

        <Box sx={{ 
          display: 'flex',
          overflowX: 'auto',
          gap: { xs: 1.5, sm: 3 },
          px: { xs: 1, sm: 2 },
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}>
          {categories.map((category, index) => (
            <CategoryCard key={index} sx={{ minWidth: { xs: 180, sm: 240 }, maxWidth: { xs: 200, sm: 240 } }} className="category-card">
              <Box
                sx={{
                  height: { xs: 120, sm: 180, md: 240 },
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#181711',
                    fontWeight: 500,
                    mb: 0.5,
                    fontSize: { xs: '1rem', sm: '1.15rem' }
                  }}
                >
                  {category.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#888263',
                    fontSize: { xs: '0.85rem', sm: '1rem' }
                  }}
                >
                  {category.subtitle}
                </Typography>
              </CardContent>
            </CategoryCard>
          ))}
        </Box>

        <Typography
          variant="h3"
          sx={{
            color: '#181711',
            fontSize: { xs: '18px', sm: '22px' },
            fontWeight: 700,
            letterSpacing: '-0.015em',
            mt: { xs: 3, sm: 5 },
            mb: { xs: 2, sm: 3 },
            px: { xs: 1, sm: 2 }
          }}
        >
          Limited Time Offers
        </Typography>

        <Grid container spacing={2} sx={{ px: { xs: 1, sm: 2 }, mb: 4 }}>
          {Object.entries(timeLeft).map(([key, value]) => (
            <Grid item xs={6} sm={3} key={key}>
              <TimerBox sx={{ height: { xs: 40, sm: 56 }, p: { xs: 1, sm: 2 } }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#181711',
                    fontWeight: 700,
                    letterSpacing: '-0.015em',
                    fontSize: { xs: '1rem', sm: '1.25rem' }
                  }}
                >
                  {value}
                </Typography>
              </TimerBox>
              <Typography
                variant="body2"
                sx={{
                  color: '#181711',
                  textAlign: 'center',
                  mt: 1,
                  fontSize: { xs: '0.85rem', sm: '1rem' }
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {renderProductSection('Best Sellers', bestSellers)}
        {renderProductSection('New Arrivals', newArrivals)}
        {renderProductSection('Customer Favorites', customerFavorites)}
      </Container>
    </Box>
  );
};

export default OfferSection;
