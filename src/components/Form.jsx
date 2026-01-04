import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Form.css';
import Input from './form/input';
import CustomSelect from './form/select';
import { cityOptions } from '../utils/options';

function Form() {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentId = location.state?.paymentId || 'N/A';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send data to Google Sheets
      await sendToGoogleSheets();
      
      console.log('Form submitted:', formData);
      console.log('Payment ID:', paymentId);
      
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const sendToGoogleSheets = async () => {
    const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
      console.error('Google Sheets URL not configured');
      alert('Google Sheets integration is not configured. Please contact the administrator.');
      throw new Error('Google Sheets URL not configured');
    }

    const dataToSend = {
      paymentId: paymentId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      submittedAt: new Date().toLocaleString(),
    };

    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires no-cors mode
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      // Note: no-cors mode doesn't allow reading the response
      // We'll assume success if no error was thrown
      console.log('Data sent to Google Sheets successfully');
      
    } catch (error) {
      console.error('Error sending to Google Sheets:', error);
      throw error;
    }
  };

  if (submitted) {
    return (
      <div className="form-container">
        <div className="form-content">
          <div className="success-message">
            <h2>✓ Form Submitted Successfully!</h2>
            <p>Thank you for your submission. We'll get back to you soon.</p>
            <button onClick={() => navigate('/')} className="home-button">
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-content">
        <h1>Complete Your Registration</h1>
        <p className="payment-info">Payment ID: {paymentId}</p>
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
              placeholder="Enter your address"
            />
          </div>

          <div>
            <Input label="First Name"  />
            <Input label="Father Name" />
            <Input label="Date Of Birth" type='date' />
            <Input label="Mobile No." type='number' />
<CustomSelect label="City" options={cityOptions}/>
          </div>

          <button type="submit" className="submit-button" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;

