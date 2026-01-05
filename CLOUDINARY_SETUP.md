# Cloudinary Image Storage Setup

This guide will help you set up Cloudinary for storing form images (photos and payment screenshots).

## Why Cloudinary?

- **Free Tier:** 25GB storage, 25GB bandwidth/month
- **Fast CDN:** Images delivered globally via CDN
- **Easy Integration:** Simple API, no backend required
- **Image Optimization:** Automatic optimization and transformations

## Setup Instructions

### Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Get Your Credentials

1. Log in to your Cloudinary dashboard
2. You'll see your **Cloud Name** on the dashboard (e.g., `dxxxxxxxx`)
3. Keep this page open, you'll need it for the next step

### Step 3: Create an Unsigned Upload Preset

Unsigned upload presets allow your frontend to upload images directly to Cloudinary without exposing sensitive API keys.

1. In your Cloudinary dashboard, click on **Settings** (gear icon)
2. Navigate to **Upload** tab
3. Scroll down to **Upload presets** section
4. Click **Add upload preset**
5. Configure the preset:
   - **Preset name:** Choose a name (e.g., `cricket_payment_unsigned`)
   - **Signing Mode:** Select **Unsigned**
   - **Folder:** (Optional) Set to `cricket-payments` to organize uploads
   - **Access mode:** Select **Public**
   - Leave other settings as default
6. Click **Save**
7. Copy the **preset name** you just created

### Step 4: Configure Environment Variables

1. Open your project folder
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Edit the `.env` file and add your Cloudinary credentials:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name_here
   VITE_GOOGLE_SHEETS_URL=your_google_apps_script_url
   ```

### Step 5: Update Google Apps Script

The Google Apps Script has been updated to receive image URLs instead of base64 data. Make sure to:

1. Open your Google Apps Script project
2. Replace the code with the updated version from `google-apps-script/Code.gs`
3. The script now expects `photoUrl` and `paymentScreenshotUrl` fields
4. Deploy the script again if needed

### Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Complete a test form submission with images
3. Check your Cloudinary dashboard:
   - Go to **Media Library**
   - You should see your uploaded images in the specified folders
4. Check your Google Sheets:
   - The sheet should contain Cloudinary URLs in the image columns
   - Click the URLs to verify they open the images

## How It Works

1. **User uploads image** → Form captures the file
2. **Frontend uploads to Cloudinary** → Image sent directly to Cloudinary API
3. **Cloudinary returns URL** → You get back a secure URL
4. **URL sent to Google Sheets** → The URL is stored in the spreadsheet
5. **Anyone can view** → Click the URL to see the image

## Folder Structure in Cloudinary

Images are organized into folders:
- `cricket-form-photos/` - User profile photos
- `cricket-payment-screenshots/` - Payment screenshots

## Troubleshooting

### "Cloudinary configuration is missing"
- Make sure your `.env` file exists and has the correct values
- Restart your dev server after updating `.env`

### "Upload failed"
- Check that your upload preset is set to "Unsigned"
- Verify your Cloud Name is correct
- Check browser console for specific error messages

### Images not appearing in Google Sheets
- Verify your Google Apps Script is updated
- Check that it's deployed as a web app
- Test the script independently using the `testDoPost()` function

## Free Tier Limits

Cloudinary free tier includes:
- **Storage:** 25 GB
- **Bandwidth:** 25 GB/month
- **Transformations:** 25 credits/month
- **Files:** Unlimited

This is more than enough for most small to medium applications.

## Advanced: Cloudinary Features

Once set up, you can use additional Cloudinary features:

- **Image transformations:** Resize, crop, optimize images via URL parameters
- **Automatic format conversion:** Serve WebP to supported browsers
- **Lazy loading:** Built-in lazy loading support
- **Video support:** Can also handle video uploads

Example transformation:
```
https://res.cloudinary.com/your-cloud/image/upload/w_300,h_300,c_fill/cricket-form-photos/image.jpg
```

## Security Notes

- Unsigned presets are safe for public forms
- Set folder restrictions in your upload preset settings
- Enable automatic moderation if needed
- Monitor usage in your Cloudinary dashboard

## Support

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Upload Presets Guide](https://cloudinary.com/documentation/upload_presets)
- [Upload Widget](https://cloudinary.com/documentation/upload_widget)
