# Deploy to Vercel - Complete Guide

## Prerequisites ✅

Your project is already set up correctly:
- ✅ Using Vite
- ✅ GitHub repository exists
- ✅ `.env` is in `.gitignore` (environment variables are safe)
- ✅ Build script configured

## Step-by-Step Deployment

### Step 1: Commit Your Latest Changes

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

> **Note:** If your branch is `master` instead of `main`, use `git push origin master`

### Step 2: Sign Up / Log In to Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 3: Import Your Project

1. On Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"Cricket-payment"** and click **"Import"**

### Step 4: Configure Your Project

Vercel will auto-detect your settings:

- **Framework Preset:** Vite ✅ (auto-detected)
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build` ✅ (auto-detected)
- **Output Directory:** `dist` ✅ (auto-detected)
- **Install Command:** `npm install` ✅ (auto-detected)

### Step 5: Add Environment Variables 🔑

This is **CRITICAL** for your app to work:

1. Click on **"Environment Variables"** section
2. Add these variables:

#### Variable 1: Razorpay Key
- **Name:** `VITE_RAZORPAY_KEY_ID`
- **Value:** `rzp_test_RzkvWG6rcBPHmx` (or your live key if ready)
- Click **"Add"**

#### Variable 2: Google Sheets URL (if you've set it up)
- **Name:** `VITE_GOOGLE_SHEETS_URL`
- **Value:** Your Google Apps Script Web App URL
- Click **"Add"**

> **Important:** If you don't have Google Sheets set up yet, leave this empty for now. You can add it later in Project Settings.

### Step 6: Deploy! 🚀

1. Click **"Deploy"**
2. Wait 1-2 minutes while Vercel:
   - Installs dependencies
   - Builds your project
   - Deploys to their global CDN

3. Once complete, you'll see: **"Congratulations! Your project has been deployed"**

### Step 7: Get Your Live URL

You'll receive a URL like:
```
https://cricket-payment-xxxx.vercel.app
```

- Click the URL to view your live site
- Share this URL with anyone!

## Post-Deployment Steps

### Custom Domain (Optional)

1. Go to your project settings
2. Click **"Domains"**
3. Add your custom domain (if you have one)
4. Follow DNS configuration instructions

### Update Environment Variables Later

1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add/Edit/Delete variables as needed
5. Redeploy for changes to take effect

### Enable Automatic Deployments

Already enabled! Every time you push to GitHub:
- Vercel automatically rebuilds and deploys
- You get a preview URL for each branch
- Main/master branch deploys to production

## Testing Your Deployment

1. **Visit your live URL**
2. **Test the payment flow:**
   - Click "Proceed to Payment"
   - Try a test payment (use Razorpay test cards)
   - Fill out the registration form
   - Check if Google Sheets receives data (if configured)

## Razorpay Test Cards

For testing payments on your live site:

**Successful Payment:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Failed Payment:**
- Card: `4000 0000 0000 0002`

## Troubleshooting

### "Module not found" errors
- Check that all dependencies are in `package.json`
- Redeploy from Vercel dashboard

### Payment not working
- Verify `VITE_RAZORPAY_KEY_ID` is set in Vercel environment variables
- Check browser console for errors
- Make sure key starts with `rzp_test_` or `rzp_live_`

### Google Sheets not receiving data
- Verify `VITE_GOOGLE_SHEETS_URL` is set
- Check Apps Script deployment is set to "Anyone"
- Look at Apps Script execution logs

### Routing issues (404 on refresh)
- The `vercel.json` file handles this automatically
- All routes redirect to `index.html` for React Router

### Environment variables not working
- Make sure they start with `VITE_` prefix
- Redeploy after adding/changing variables
- Check spelling exactly matches your code

## Monitoring Your App

### View Deployment Logs
1. Go to Vercel dashboard
2. Select your project
3. Click on any deployment
4. View build logs and runtime logs

### Analytics (Free)
- Vercel provides basic analytics
- See page views, visitor stats
- Available in project settings

## Updating Your App

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel automatically:
- Detects the push
- Rebuilds your app
- Deploys the new version
- Takes about 1-2 minutes

## Important Notes

### Security
- ✅ `.env` file is NOT deployed (it's in `.gitignore`)
- ✅ Environment variables are secure in Vercel
- ✅ Never expose API keys in your code
- ⚠️ Razorpay Key ID is safe to expose (it's public)
- ⚠️ Never expose Razorpay Key SECRET (keep it backend-only)

### Free Tier Limits
- Unlimited personal projects
- 100 GB bandwidth per month
- Unlimited team members
- Custom domains included
- Automatic HTTPS

### Performance
- Global CDN (Content Delivery Network)
- Automatic HTTPS/SSL
- Optimized builds
- Fast loading worldwide

## Going Live with Real Payments

When ready to accept real payments:

1. **Switch to Razorpay Live Key:**
   - Get live key from Razorpay dashboard
   - Go to Vercel → Settings → Environment Variables
   - Update `VITE_RAZORPAY_KEY_ID` to your live key (starts with `rzp_live_`)
   - Redeploy

2. **Complete Razorpay KYC** (if not done)
3. **Test with small real payment**
4. **Monitor transactions** in Razorpay dashboard

## Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Support:** Available in dashboard
- **Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## Quick Checklist

Before deploying:
- [ ] Latest code pushed to GitHub
- [ ] `.env` is in `.gitignore`
- [ ] Have Razorpay Key ID ready
- [ ] Have Google Sheets URL ready (if using)

During deployment:
- [ ] Connected GitHub account
- [ ] Imported correct repository
- [ ] Added environment variables
- [ ] Clicked Deploy

After deployment:
- [ ] Visited live URL
- [ ] Tested payment flow
- [ ] Verified Google Sheets integration
- [ ] Shared URL with stakeholders

**You're all set! 🎉**
