# Google Sheets Integration Setup

Follow these steps to set up Google Sheets integration:

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Cricket Registrations" (or any name you prefer)
4. In the first row, add these headers:
   - A1: `Payment ID`
   - B1: `Full Name`
   - C1: `Email`
   - D1: `Phone`
   - E1: `Address`
   - F1: `Submitted At`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**
2. Delete any existing code
3. Copy and paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Append the data as a new row
    sheet.appendRow([
      data.paymentId,
      data.name,
      data.email,
      data.phone,
      data.address,
      data.submittedAt
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data added successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name your project (e.g., "Cricket Registration Handler")

## Step 3: Deploy the Script

1. Click **Deploy** > **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description**: Cricket Registration API
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone (or "Anyone with Google account" if you prefer)
5. Click **Deploy**
6. **Authorize access** when prompted (click "Review Permissions" > Select your account > Click "Advanced" > "Go to [project name]" > "Allow")
7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```
8. **IMPORTANT**: Save this URL - you'll need it in the next step

## Step 4: Update Your React App

Copy the Web App URL you just received and paste it into the `.env` file in your project root:

```
VITE_GOOGLE_SHEETS_URL=your_web_app_url_here
```

Example:
```
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec
```

## Step 5: Restart Your Dev Server

After updating the `.env` file, restart your development server:

```bash
npm run dev
```

## Testing

1. Complete a payment and fill out the form
2. Click Submit
3. Check your Google Sheet - the data should appear as a new row!

## Troubleshooting

- **403 Error**: Make sure you set "Who has access" to "Anyone" in deployment settings
- **Data not appearing**: Check the Google Apps Script logs (View > Logs in the Apps Script editor)
- **CORS errors**: The Apps Script should handle CORS automatically, but if you have issues, redeploy the script
- **Environment variable not working**: Make sure to restart the dev server after updating `.env`
