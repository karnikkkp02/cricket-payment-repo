import { useNavigate } from 'react-router-dom';
import './Payment.css';
import cricketLogo from '../assets/cricket-logo.png';

function Payment() {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Navigate to Razorpay checkout page
    navigate('/razorpay');
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

