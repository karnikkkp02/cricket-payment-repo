import './Payment.css';
import cricketLogo from '../assets/cricket-logo.png';

function Payment() {
  const handlePayment = () => {
    // Get the Razorpay Payment Page URL from environment variable
    const RAZORPAY_PAYMENT_PAGE_URL = import.meta.env.VITE_RAZORPAY_PAYMENT_PAGE_URL;
    
    if (!RAZORPAY_PAYMENT_PAGE_URL) {
      alert('Payment page is not configured. Please contact the administrator.');
      return;
    }
    
    // Redirect to Razorpay Payment Page
    window.location.href = RAZORPAY_PAYMENT_PAGE_URL;
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        <img src={cricketLogo} alt="Cricket Logo" className="cricket-logo" />
        <h1>15 Gam KPS Cricket Tournament</h1>

        <h4>
          <span className="icon-text">
            <span className="icon">💰</span>
            Registration Fee : 600/- Rs
          </span>
        </h4>
        <br />
        <button 
          onClick={handlePayment} 
          className="pay-button"
        >
          <span className="icon">💳</span>
          Pay Now
        </button>
        <p className="note" style={{ color: '#10b981', marginTop: '10px' }}>
          ✓ Secure payment powered by Razorpay
        </p>
      </div>
    </div>
  );
}

export default Payment;

