import { useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Navigate to Razorpay checkout page
    navigate('/razorpay');
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
        >
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

