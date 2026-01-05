# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for the Cricket Payment Form.

## Prerequisites

- A Google account
- Access to Google Sheets and Google Drive

## Step-by-Step Setup

### 1. Create a New Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it something like "Cricket Form Submissions"
4. Copy the Spreadsheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Example: If URL is `https://docs.google.com/spreadsheets/d/1ABC123xyz456/edit`
   - Your Spreadsheet ID is: `1ABC123xyz456`

### 2. Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy the entire code from `google-apps-script/Code.gs` file in this project
4. Paste it into the Apps Script editor
5. **Important:** Replace `YOUR_SPREADSHEET_ID` with your actual Spreadsheet ID from step 1
   ```javascript
   const SPREADSHEET_ID = '1ABC123xyz456'; // Your actual ID here
   ```
6. Click the **Save** icon (or press Ctrl+S)
7. Name your project (e.g., "Cricket Form Handler")

### 3. Deploy the Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Select **Web app**
4. Configure the deployment:
   - **Description:** "Cricket Form Submission Handler" (or any name)
   - **Execute as:** "Me (your-email@gmail.com)"
   - **Who has access:** "Anyone" (Important: This allows your form to send data)
5. Click **Deploy**
6. Review permissions:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** if you see a warning
   - Click "Go to [Your Project Name] (unsafe)"
   - Click **Allow**
7. Copy the **Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby...../exec
   ```

### 4. Update Your Project Environment Variables

1. Open the `.env` file in your project root
2. Update the `VITE_GOOGLE_SHEETS_URL` with your Web App URL:
   ```env
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
3. Save the file

### 5. Restart Your Development Server

```bash
npm run dev
```

## Testing the Integration

1. Fill out and submit the form on your website
2. Check your Google Sheet - a new row should appear with the submitted data
3. Check Google Drive - two folders should be created:
   - "Cricket Form Photos" - contains user photos
   - "Cricket Payment Screenshots" - contains payment screenshots

## Spreadsheet Structure

The Google Sheet will automatically create the following columns:

| Column | Description |
|--------|-------------|
| Timestamp | When the form was submitted |
| Payment ID | Razorpay payment ID |
| UPI Transaction ID | UPI transaction identifier |
| UPI ID (VPA) | User's UPI ID |
| Name | User's name |
| Father Name | Father's name |
| Date of Birth | User's DOB |
| Phone | Mobile number |
| City | Selected city |
| Village | Selected village |
| Category | Cricket category (batting/bowling/etc.) |
| T-Shirt Size | Selected size |
| Photo Link | Link to uploaded photo in Google Drive |
| Payment Screenshot Link | Link to payment screenshot in Google Drive |

## Updating the Script

If you need to make changes to the Apps Script:

1. Go to [script.google.com](https://script.google.com)
2. Open your project
3. Make your changes
4. Save the file
5. Deploy again:
   - Click **Deploy** → **Manage deployments**
   - Click the edit icon ✏️ next to your active deployment
   - Change the version to "New version"
   - Click **Deploy**

**Note:** You don't need to update the URL in your `.env` file unless you create a completely new deployment.

## Troubleshooting

### Form submission fails

- Verify the Web App URL is correctly set in `.env`
- Make sure the deployment has "Anyone" access
- Check the Google Apps Script execution logs for errors

### Images not uploading

- Verify your Google Drive has enough space
- Check that the Apps Script has Drive permissions

### Data not appearing in sheet

- Verify the Spreadsheet ID in the Apps Script is correct
- Check that you opened the correct Google Sheet
- Look at the Apps Script execution logs for errors

## Security Notes

1. The `.env` file contains sensitive information - never commit it to version control
2. Images uploaded to Google Drive are set to "Anyone with link" by default
3. To make images private, modify the `uploadImageToDrive` function in the Apps Script and remove the line:
   ```javascript
   file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
   ```

## Support

If you encounter any issues, check the Apps Script execution logs:
1. Open your Apps Script project
2. Click **Executions** in the left sidebar
3. Review any failed executions for error messages
