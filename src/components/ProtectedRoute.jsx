import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const location = useLocation();
  
  // Check if payment data exists in location state
  const hasPaymentData = location.state?.paymentId;
  
  // If no payment data, redirect to home page
  if (!hasPaymentData) {
    return <Navigate to="/" replace />;
  }
  
  // If payment data exists, render the protected component
  return children;
}

export default ProtectedRoute;
