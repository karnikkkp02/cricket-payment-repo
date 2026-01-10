import { Link } from 'react-router-dom';
import './Home.css';
import cricketLogo from '../assets/cricket-logo.png';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <img src={cricketLogo} alt="Cricket Logo" className="cricket-logo" />
        <h2>Welcome to 15 Gam KPS Cricket Tournament</h2>
        <h3>🏆 Season 11</h3>
        <h4>
          <span className="icon-text">
            <span className="icon">📅</span>
            19/04/26 to 26/04/26
          </span>
        </h4>
        <h6>
          <span className="icon-text">
            <span className="icon">📍</span>
            Vasani Farm, Ahmedabad
          </span>
        </h6>
        <p>
          <span className="icon-text">
            <span className="icon">�</span>
            Click the link below to fill the registration form
          </span>
        </p>
        <Link to="/form" className="payment-link">
          <span className="icon">🏏</span>
          Start Registration
        </Link>
      </div>
    </div>
  );
}

export default Home;

