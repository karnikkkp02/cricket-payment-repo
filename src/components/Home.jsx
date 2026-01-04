import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Cricket Payment</h1>
        <p>Click the link below to proceed with payment</p>
        <Link to="/payment" className="payment-link">
          Proceed to Payment
        </Link>
      </div>
    </div>
  );
}

export default Home;

