import { useLocation, useNavigate } from 'react-router-dom';
import './Error.css';

function Error() {
  const location = useLocation();
  const navigate = useNavigate();
  const error = location.state?.error || { description: 'Payment failed. Please try again.' };

  const handleTryAgain = () => {
    navigate('/payment');
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">✗</div>
        <h1>Payment Failed</h1>
        <p className="error-message">
          {error.description || error.reason || 'Payment could not be completed. Please try again.'}
        </p>
        {error.code && (
          <p className="error-code">Error Code: {error.code}</p>
        )}
        <button onClick={handleTryAgain} className="try-again-button">
          Try Again
        </button>
      </div>
    </div>
  );
}

export default Error;

