# Cricket Payment App

A React application with Razorpay payment gateway integration that collects user information after successful payment.

## Features

- ✅ Razorpay payment gateway integration
- ✅ User information form after successful payment
- ✅ Error handling with retry option for failed payments
- ✅ Modern, responsive UI with smooth navigation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Razorpay

1. Create a `.env` file in the root directory
2. Add your Razorpay Key ID:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

**How to get your Razorpay Key ID:**
- Sign up/Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
- Go to Settings → API Keys
- Generate a new Key ID (or use existing one)
- Copy the Key ID and paste it in your `.env` file

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Application Flow

1. **Home Page (`/`)**: User clicks on "Proceed to Payment" link
2. **Payment Page (`/payment`)**: User clicks "Pay Now" button → Razorpay payment gateway opens
3. **Success Flow**: After successful payment → Redirects to Form page (`/form`)
4. **Error Flow**: If payment fails → Shows error message with "Try Again" button → Redirects back to Payment page

## Project Structure

```
src/
├── components/
│   ├── Home.jsx          # Landing page with payment link
│   ├── Payment.jsx       # Razorpay payment integration
│   ├── Form.jsx          # User information collection form
│   └── Error.jsx         # Error page for failed payments
├── App.jsx               # Main app with routing
└── main.jsx              # App entry point
```

## Important Notes

### Backend Integration (Production)

For production use, you should:

1. **Create Order on Backend**: The current implementation uses a mock order ID. In production, you should:
   - Create an API endpoint to generate orders on your backend
   - Use Razorpay's server-side SDK to create orders
   - Return the order ID to the frontend

2. **Verify Payment Signature**: After payment success, verify the payment signature on your backend:
   ```javascript
   // Example backend verification (Node.js)
   const crypto = require('crypto');
   const razorpay = require('razorpay');
   
   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
   const generated_signature = crypto
     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
     .update(razorpay_order_id + '|' + razorpay_payment_id)
     .digest('hex');
   
   if (generated_signature === razorpay_signature) {
     // Payment verified
   }
   ```

3. **Store Payment Data**: Save payment and user information to your database after successful verification.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- React 19.2.0
- Vite 7.2.4
- React Router DOM
- Razorpay Checkout

## License

MIT
