import React, { useState } from 'react';
import { RAZORPAY_KEY_ID, API_BASE_URL } from '../../config';
import axios from 'axios';

const PaymentButton = ({ amount, email, contact, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order on backend
      const { data } = await axios.post(`${API_BASE_URL}/api/payment/create-order`, {
        amount,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`
      });
      if (!data.success) throw new Error('Order creation failed');
      const { id: order_id, amount: order_amount, currency } = data.order;

      // 2. Open Razorpay modal
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order_amount,
        currency,
        name: 'Hotspot',
        description: 'Order Payment',
        order_id,
        handler: async function (response) {
          // 3. Verify payment on backend
          try {
            const verifyRes = await axios.post(`${API_BASE_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            if (verifyRes.data.success) {
              if (onSuccess) onSuccess(verifyRes.data);
              alert('Payment successful!');
            } else {
              if (onError) onError(verifyRes.data);
              alert('Payment verification failed.');
            }
          } catch (err) {
            if (onError) onError(err);
            alert('Payment verification error.');
          }
        },
        prefill: {
          email: email || '',
          contact: contact || ''
        },
        theme: {
          color: '#FFD700'
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      if (onError) onError(err);
      alert('Payment initialization failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment} disabled={loading} style={{
      background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
      color: '#000',
      fontWeight: 600,
      border: 'none',
      borderRadius: 12,
      padding: '12px 32px',
      fontSize: '1rem',
      cursor: loading ? 'not-allowed' : 'pointer',
      boxShadow: '0 3px 5px 2px rgba(255, 215, 0, .3)'
    }}>
      {loading ? 'Processing...' : 'Pay Now'}
    </button>
  );
};

export default PaymentButton; 