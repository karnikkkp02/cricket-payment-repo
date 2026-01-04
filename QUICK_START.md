# Quick Start Guide - Google Sheets Integration

## ✅ What's Been Implemented

Your Cricket Payment app now automatically saves form submissions to Google Sheets!

## 📋 Setup Checklist

Follow these steps in order:

### 1. Create Your Google Sheet (5 minutes)

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet named "Cricket Registrations"
3. Add these column headers in Row 1:
   - **A1:** Payment ID
   - **B1:** Full Name
   - **C1:** Email
   - **D1:** Phone
   - **E1:** Address
   - **F1:** Submitted At

### 2. Set Up Apps Script (10 minutes)

1. In your sheet: **Extensions → Apps Script**
2. Delete existing code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.paymentId,
      data.name,
      data.email,
      data.phone,
      data.address,
      data.submittedAt
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **💾 Save**
4. Name it "Cricket Registration Handler"

### 3. Deploy the Script

1. Click **Deploy → New deployment**
2. Click **⚙️ gear icon** → Select **Web app**
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Click **Authorize access**
6. Choose your Google account
7. Click **Advanced** → **Go to [project name]** → **Allow**
8. **COPY THE WEB APP URL** (looks like: `https://script.google.com/macros/s/AKfycbz.../exec`)

### 4. Update Your .env File

1. Open `.env` file in your project
2. Find the line: `VITE_GOOGLE_SHEETS_URL=`
3. Paste your Web App URL:
   ```
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXX/exec
   ```
4. Save the file

### 5. Restart Dev Server

```bash
npm run dev
```

## 🎉 You're Done!

Now when users:
1. Make a payment
2. Fill out the registration form
3. Click Submit

The data automatically appears in your Google Sheet!

## 🔍 Troubleshooting

**"Google Sheets integration is not configured" error:**
- Make sure you pasted the URL in `.env` file
- Restart your dev server after updating `.env`

**Data not appearing in sheet:**
- Check the Apps Script deployment settings (must be "Anyone")
- View logs in Apps Script: View → Logs

**403/Permission errors:**
- Redeploy the script
- Make sure "Who has access" is set to "Anyone"

## 📊 Viewing Your Data

- Open your Google Sheet anytime to see all submissions
- Data is added instantly
- You can export to Excel from Google Sheets (File → Download → Excel)
- Sort, filter, and analyze data directly in Google Sheets

## 🔒 Security Note

The Web App URL should be kept private. Anyone with the URL can submit data to your sheet. For production, consider:
- Setting "Who has access" to "Anyone with Google account"
- Adding validation in the Apps Script
- Setting up proper authentication

---

For detailed setup instructions, see [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)
