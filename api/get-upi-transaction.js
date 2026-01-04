export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }

    // Get credentials from environment variables
    const keyId = process.env.VITE_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create Basic Auth header
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    // Fetch payment details from Razorpay API
    const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Razorpay API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to fetch payment details',
        details: errorData 
      });
    }

    const payment = await response.json();

    // Extract UPI transaction ID from various possible fields
    const upiTransactionId = 
      payment.acquirer_data?.bank_transaction_id || 
      payment.acquirer_data?.upi_transaction_id ||
      payment.acquirer_data?.rrn ||
      payment.vpa_transaction_id ||
      paymentId; // Fallback to Razorpay payment ID

    // Return the data
    return res.status(200).json({
      success: true,
      paymentId: payment.id,
      upiTransactionId: upiTransactionId,
      method: payment.method,
      vpa: payment.vpa || null,
      bank: payment.bank || null,
      status: payment.status,
    });

  } catch (error) {
    console.error('Error fetching payment details:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}
