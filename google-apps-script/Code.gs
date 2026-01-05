// Google Apps Script for Cricket Payment Form
// This script receives form data and writes it to Google Sheets
// NOTE: Images are now stored in Cloudinary, not Google Drive
// This script only receives and stores the Cloudinary URLs

// IMPORTANT: Replace 'YOUR_SPREADSHEET_ID' with your actual Google Sheets ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Form Submissions';

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Timestamp',
        'Payment ID',
        'UPI Transaction ID',
        'UPI ID (VPA)',
        'Name',
        'Father Name',
        'Date of Birth',
        'Phone',
        'City',
        'Village',
        'Category',
        'T-Shirt Size',
        'Photo URL',
        'Payment Screenshot URL'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 14);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
    }
    
    // Prepare the row data
    // Note: Images are now uploaded to Cloudinary, so we just store the URLs
    const rowData = [
      data.submittedAt || new Date().toLocaleString(),
      data.paymentId || '',
      data.upiTransactionId || '',
      data.vpa || '',
      data.name || '',
      data.fatherName || '',
      data.dob || '',
      data.phone || '',
      data.city || '',
      data.village || '',
      data.categories || '',
      data.size || '',
      data.photoUrl || '',
      data.paymentScreenshotUrl || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 14);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data submitted successfully',
      rowNumber: sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error and return error response
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Upload base64 image to Google Drive
 */
function uploadImageToDrive(base64Data, fileName, folderName) {
  try {
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
    const base64Content = base64Data.split(',')[1];
    
    // Decode base64 to blob
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Content),
      getMimeType(base64Data),
      fileName
    );
    
    // Get or create folder
    const folder = getOrCreateFolder(folderName);
    
    // Upload file to Drive
    const file = folder.createFile(blob);
    
    // Make the file publicly accessible (optional - remove if you want private files)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Return the file URL
    return file.getUrl();
    
  } catch (error) {
    Logger.log('Error uploading image: ' + error.toString());
    return 'Upload failed';
  }
}

/**
 * Get MIME type from base64 data URL
 */
function getMimeType(base64Data) {
  const match = base64Data.match(/data:([^;]+);/);
  return match ? match[1] : 'image/jpeg';
}

/**
 * Get or create a folder in Google Drive
 */
function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}

/**
 * Test function to verify the script works
 * NOTE: photoUrl and paymentScreenshotUrl are now Cloudinary URLs
 */
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        paymentId: 'TEST123',
        upiTransactionId: 'UPI123456',
        vpa: 'test@upi',
        name: 'Test User',
        fatherName: 'Test Father',
        dob: '1990-01-01',
        phone: '9876543210',
        city: 'Test City',
        village: 'Test Village',
        categories: 'batting',
        size: 'M',
        submittedAt: new Date().toLocaleString(),
        photoUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        paymentScreenshotUrl: 'https://res.cloudinary.com/demo/image/upload/sample.jpg'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

// NOTE: The following functions are no longer needed with Cloudinary integration
// Images are uploaded directly to Cloudinary from the frontend
// Keep them commented out for reference if you want to switch back to Google Drive

/*
function uploadImageToDrive(base64Data, fileName, folderName) {
  try {
    const base64Content = base64Data.split(',')[1];
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Content),
      getMimeType(base64Data),
      fileName
    );
    const folder = getOrCreateFolder(folderName);
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  } catch (error) {
    Logger.log('Error uploading image: ' + error.toString());
    return 'Upload failed';
  }
}

function getMimeType(base64Data) {
  const match = base64Data.match(/data:([^;]+);/);
  return match ? match[1] : 'image/jpeg';
}

function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}
*/
