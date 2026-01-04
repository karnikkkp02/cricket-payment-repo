import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      setScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      setScriptLoaded(false);
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    console.log('Payment initiated...');

    try {
      // Check if Razorpay script is loaded
      if (!window.Razorpay) {
        console.error('Razorpay script not loaded');
        alert('Payment gateway is still loading. Please try again in a moment.');
        setLoading(false);
        return;
      }
      
      console.log('Razorpay script loaded successfully');
      
      // In a real application, you would create an order on your backend
      // For demo purposes, we'll use a mock order creation
      // Replace these with your actual Razorpay Key ID and order creation API call
      
      const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID';
      console.log('Razorpay Key ID:', RAZORPAY_KEY_ID ? 'Found' : 'Missing');
      
      if (!RAZORPAY_KEY_ID || RAZORPAY_KEY_ID === 'YOUR_RAZORPAY_KEY_ID') {
        console.error('Invalid Razorpay Key ID');
        alert('Please configure your Razorpay Key ID in the .env file');
        setLoading(false);
        return;
      }
      
      // For testing without backend - using direct amount
      // In production, create order on backend first
      const amount = 50000; // Amount in paise (500.00 INR)
      
      console.log('Creating Razorpay instance for amount:', amount);

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount,
        currency: 'INR',
        name: 'Cricket Payment',
        description: 'Payment for Cricket Registration',
        config: {
          display: {
            hide: [
              { method: 'card' },
              { method: 'netbanking' },
              { method: 'wallet' },
              { method: 'emi' },
              { method: 'paylater' },
              { method: 'cardless_emi' }
            ]
          }
        },
        handler: function (response) {
          // Payment successful
          console.log('Payment successful:', response);
          // In production, verify payment signature on your backend
          navigate('/form', { state: { paymentId: response.razorpay_payment_id } });
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#667eea',
        },
        modal: {
          ondismiss: function () {
            // User closed the payment modal
            console.log('Payment modal dismissed by user');
            setLoading(false);
          },
        },
      };

      console.log('Opening Razorpay payment modal...');
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response) {
        // Payment failed
        console.error('Payment failed:', response.error);
        navigate('/error', { state: { error: response.error } });
      });

      razorpay.open();
      console.log('Razorpay modal opened');
      setLoading(false);
    } catch (error) {
      console.error('Error initiating payment:', error);
      navigate('/error', { state: { error: { description: 'Failed to initiate payment. Please try again.' } } });
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        <h1>15 Gam KPS Cricket Tournament</h1>
        <h2>Season 11</h2>
        <br />
        <p>19/4/26 to 26/4/26</p>
        <p>Vasani Farm, Ahmedabad</p>
        <button 
          onClick={handlePayment} 
          className="pay-button"
          disabled={loading || !scriptLoaded}
        >
          {!scriptLoaded ? 'Loading Payment Gateway...' : loading ? 'Processing...' : 'Pay Now'}
        </button>
        {scriptLoaded && (
          <p className="note" style={{ color: '#10b981', marginTop: '10px' }}>
            ✓ Secure payment powered by Razorpay
          </p>
        )}
      </div>
    </div>
  );
}

export default Payment;

