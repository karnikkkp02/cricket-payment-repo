# Razorpay Payment Page Setup Guide

This guide explains how to set up Razorpay Payment Pages for the Cricket Tournament Registration application.

## What Changed?

The application now uses **Razorpay Payment Pages** (hosted checkout) instead of the integrated Razorpay checkout. This simplifies the integration and reduces maintenance overhead.

## Setup Steps

### Step 1: Create a Payment Page on Razorpay Dashboard

1. **Log in to Razorpay Dashboard**
   - Visit: https://dashboard.razorpay.com/
   - Log in with your credentials

2. **Navigate to Payment Pages**
   - Click on **"Payment Links"** or **"Payment Pages"** in the left sidebar
   - Click on **"Create New"** or **"+ Payment Page"**

3. **Configure Payment Page**
   - **Title**: `15 Gam KPS Cricket Tournament Registration`
   - **Description**: `Payment for Cricket Registration`
   - **Amount**: `₹600.00` (or your required amount)
   - **Currency**: `INR`
   
4. **Payment Methods** (Optional)
   - Enable only **UPI** if you want to restrict to UPI payments
   - Disable other payment methods (Cards, Netbanking, Wallets) if not needed

5. **Redirect & Notification Settings**
   - **Success URL**: `https://your-domain.com/form` 
     - Replace `your-domain.com` with your actual deployment URL
     - For local development: `http://localhost:5173/form`
   - **Enable Query Parameters**: Make sure this is enabled so payment details are sent back
   
6. **Save and Get Payment Page URL**
   - After saving, you'll get a Payment Page URL like:
     ```
     https://pages.razorpay.com/pl_xxxxxxxxxxxxxxxx/15-gam-kps-cricket-tournament-registration
     ```
   - Copy this URL

### Step 2: Configure Environment Variables

1. **Create or Update `.env` file** in the project root:

```env
# Razorpay Payment Page URL
VITE_RAZORPAY_PAYMENT_PAGE_URL=https://pages.razorpay.com/pl_xxxxxxxxxxxxxxxx/15-gam-kps-cricket-tournament-registration

# Google Sheets URL (keep existing)
VITE_GOOGLE_SHEETS_URL=your_google_sheets_url

# Cloudinary Config (keep existing)
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

2. **Replace** `pl_xxxxxxxxxxxxxxxx` with your actual Payment Page ID from Step 1

### Step 3: Update Vercel Environment Variables (For Production)

If deploying on Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the new variable:
   - **Name**: `VITE_RAZORPAY_PAYMENT_PAGE_URL`
   - **Value**: Your Payment Page URL from Step 1
   - **Environment**: Select all (Production, Preview, Development)
4. Redeploy your application

## How It Works

### Payment Flow

1. **User clicks "Pay Now"** on the Payment page
2. **Redirected to Razorpay's hosted payment page** where they complete the payment
3. **After successful payment**, Razorpay redirects back to your form page with payment details in URL parameters:
   - `razorpay_payment_id` - Unique payment ID
   - `razorpay_payment_link_id` - Payment page ID
4. **Form page extracts payment details** from URL and displays them
5. **User fills the registration form** and submits

### Payment Details Captured

The form now captures:
- `razorpay_payment_id` - Used as the payment reference
- `razorpay_payment_link_id` - Reference to the payment page used

## Testing

### Local Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Configure Razorpay Payment Page with redirect URL:
   ```
   http://localhost:5173/form
   ```

3. Click "Pay Now" and complete a test payment

4. You should be redirected back to the form with payment details

### Test Mode

- Razorpay operates in **Test Mode** by default for new accounts
- Use test payment methods provided by Razorpay:
  - Test UPI ID: `success@razorpay`
  - Or any UPI ID in test mode will work

## Advanced: Dynamic Payment Links (Optional)

If you want to generate unique payment links for each user dynamically:

### Using Razorpay Payment Links API

1. **Backend Required**: Create a serverless function or API endpoint
2. **Use Razorpay Payment Links API** to generate unique links
3. **Flow**:
   - User clicks "Pay Now"
   - Your backend creates a new payment link via API
   - User is redirected to that unique link
   - After payment, redirect back with payment details

**API Example** (Node.js):
```javascript
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET'
});

// Create payment link
const paymentLink = await razorpay.paymentLink.create({
  amount: 60000, // in paise (₹600)
  currency: "INR",
  description: "Cricket Tournament Registration",
  callback_url: "https://your-domain.com/form",
  callback_method: "get"
});

// Redirect user to: paymentLink.short_url
```

## Removing Old Files (Optional)

Since we're no longer using the integrated checkout, you can optionally delete:

- `/src/components/RazorpayCheckout.jsx`
- `/src/components/ProtectedRoute.jsx`
- `/api/get-upi-transaction.js`

These files are no longer needed with Payment Pages.

## Benefits of Payment Pages

✅ **Simpler Integration** - No need to load Razorpay SDK in your app
✅ **Razorpay Handles Security** - PCI compliance is their responsibility
✅ **Easier Maintenance** - No need to update when Razorpay changes their SDK
✅ **Better Mobile Experience** - Optimized checkout page by Razorpay
✅ **Quick Setup** - Just redirect users, no complex integration

## Support

For issues:
- **Razorpay Documentation**: https://razorpay.com/docs/payment-links/
- **Razorpay Support**: https://razorpay.com/support/

---

**Note**: Make sure to update the success redirect URL when deploying to production!
