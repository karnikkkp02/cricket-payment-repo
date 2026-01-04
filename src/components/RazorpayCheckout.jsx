import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function RazorpayCheckout() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState(null);
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
      setError('Failed to load payment gateway');
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      initiatePayment();
    }
  }, [scriptLoaded]);

  const initiatePayment = () => {
    try {
      // Check if Razorpay script is loaded
      if (!window.Razorpay) {
        setError('Payment gateway is not available');
        setTimeout(() => navigate('/'), 2000);
        return;
      }
      
      const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID';
      
      if (!RAZORPAY_KEY_ID || RAZORPAY_KEY_ID === 'YOUR_RAZORPAY_KEY_ID') {
        setError('Payment gateway configuration error');
        setTimeout(() => navigate('/'), 2000);
        return;
      }
      
      const amount = 60000; // Amount in paise (500.00 INR)

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amount,
        currency: 'INR',
        name: '15 Gam KPS Cricket Tournament',
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
        handler: async function (response) {
          // Payment successful
          console.log('Payment successful:', response);
          
          try {
            // Call our serverless function to get UPI transaction ID
            const backendResponse = await fetch('/api/get-upi-transaction', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ paymentId: response.razorpay_payment_id }),
            });

            if (backendResponse.ok) {
              const data = await backendResponse.json();
              console.log('UPI Transaction ID fetched:', data.upiTransactionId);
              
              // Navigate with UPI transaction ID
              navigate('/form', { 
                state: { 
                  paymentId: response.razorpay_payment_id,
                  upiTransactionId: data.upiTransactionId,
                  paymentMethod: data.method,
                  vpa: data.vpa,
                },
                replace: true 
              });
            } else {
              // Fallback if backend fails
              console.error('Failed to fetch UPI transaction ID');
              navigate('/form', { 
                state: { 
                  paymentId: response.razorpay_payment_id,
                  upiTransactionId: response.razorpay_payment_id, // Fallback
                },
                replace: true 
              });
            }
          } catch (error) {
            console.error('Error fetching UPI transaction ID:', error);
            // Fallback if API call fails
            navigate('/form', { 
              state: { 
                paymentId: response.razorpay_payment_id,
                upiTransactionId: response.razorpay_payment_id, // Fallback
              },
              replace: true 
            });
          }
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
            // User closed the payment modal - go to home
            console.log('Payment modal dismissed by user');
            navigate('/', { replace: true });
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response) {
        // Payment failed - go to home
        console.error('Payment failed:', response.error);
        navigate('/', { replace: true });
      });

      razorpay.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      setError('Failed to initiate payment');
      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        {error ? (
          <>
            <div style={{ fontSize: '3rem', color: '#ef4444' }}>✗</div>
            <h2 style={{ color: '#ef4444', marginTop: '1rem' }}>{error}</h2>
            <p style={{ marginTop: '1rem' }}>Redirecting to home...</p>
          </>
        ) : (
          <>
            <div style={{ 
              fontSize: '3rem', 
              animation: 'spin 1s linear infinite',
              color: '#667eea'
            }}>⟳</div>
            <h2 style={{ marginTop: '1rem' }}>Loading Payment Gateway...</h2>
            <p style={{ color: '#666', marginTop: '0.5rem' }}>Please wait</p>
          </>
        )}
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default RazorpayCheckout;
