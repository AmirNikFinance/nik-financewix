# Google Sheets Real-Time Sync Setup Guide

## Overview

This guide explains how to set up bidirectional real-time synchronization between your Wix partner portal and Google Sheets. The system allows referral data to be pushed to Google Sheets and pulled back to display on the partner dashboard.

## Architecture

```
Partner Portal (Frontend)
    ↓ (pushes referrals)
Google Apps Script (Backend)
    ↓ (writes to sheet)
Google Sheets (Data Storage)
    ↓ (reads referrals by company)
Partner Dashboard (displays stats)
```

## Step 1: Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Replace the entire content with the code below:

```javascript
/**
 * Google Apps Script for Referral Management
 * Handles bidirectional sync with the partner portal
 */

// Configuration
const SHEET_NAME = 'Referrals';
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheet ID

/**
 * Initialize the spreadsheet with headers
 * Run this once to set up the sheet
 */
function initializeSheet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  
  const headers = [
    'Timestamp',
    'Company Name',
    'Customer Name',
    'Email',
    'Phone',
    'Loan Type',
    'Loan Amount',
    'Submission Date',
    'Status',
    'Commission',
    'Commission Status'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  Logger.log('Sheet initialized with headers');
}

/**
 * Main doPost handler for all requests
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    
    Logger.log('Received action: ' + action);
    Logger.log('Payload: ' + JSON.stringify(payload));
    
    let result;
    
    switch(action) {
      case 'addRow':
        result = addRow(payload.data, payload.sheetName);
        break;
      case 'getRowsByCompany':
        result = getRowsByCompany(payload.companyName, payload.sheetName);
        break;
      case 'updateRow':
        result = updateRow(payload.identifier, payload.data, payload.sheetName);
        break;
      case 'getAllRows':
        result = getAllRows(payload.sheetName);
        break;
      default:
        result = { success: false, error: 'Unknown action: ' + action };
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Add a new referral row to the sheet
 */
function addRow(data, sheetName) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName || SHEET_NAME);
    
    const row = [
      data.timestamp || new Date().toISOString(),
      data.companyName || '',
      data.customerName || '',
      data.email || '',
      data.phone || '',
      data.loanType || '',
      data.loanAmount || '',
      data.submissionDate || new Date().toLocaleDateString('en-AU'),
      data.status || 'PENDING',
      data.commission || '',
      data.commissionStatus || ''
    ];
    
    sheet.appendRow(row);
    
    Logger.log('Row added for company: ' + data.companyName);
    
    return {
      success: true,
      message: 'Referral added successfully',
      data: data
    };
  } catch(error) {
    Logger.log('Error adding row: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Get all referrals for a specific company
 */
function getRowsByCompany(companyName, sheetName) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName || SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return {
        success: true,
        data: [],
        message: 'No referrals found'
      };
    }
    
    const headers = data[0];
    const companyIndex = headers.indexOf('Company Name');
    
    if (companyIndex === -1) {
      return {
        success: false,
        error: 'Company Name column not found'
      };
    }
    
    const referrals = [];
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][companyIndex] === companyName) {
        const referral = {};
        headers.forEach((header, index) => {
          referral[header.replace(/\s+/g, '')] = data[i][index];
        });
        referrals.push(referral);
      }
    }
    
    Logger.log('Found ' + referrals.length + ' referrals for company: ' + companyName);
    
    return {
      success: true,
      data: referrals,
      count: referrals.length
    };
  } catch(error) {
    Logger.log('Error getting rows: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Update a referral row by email
 */
function updateRow(customerEmail, updateData, sheetName) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName || SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    const headers = data[0];
    const emailIndex = headers.indexOf('Email');
    
    if (emailIndex === -1) {
      return {
        success: false,
        error: 'Email column not found'
      };
    }
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][emailIndex] === customerEmail) {
        // Update the row
        Object.keys(updateData).forEach(key => {
          const colIndex = headers.indexOf(key);
          if (colIndex !== -1) {
            sheet.getRange(i + 1, colIndex + 1).setValue(updateData[key]);
          }
        });
        
        Logger.log('Row updated for email: ' + customerEmail);
        
        return {
          success: true,
          message: 'Referral updated successfully'
        };
      }
    }
    
    return {
      success: false,
      error: 'Referral not found for email: ' + customerEmail
    };
  } catch(error) {
    Logger.log('Error updating row: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Get all referrals from the sheet
 */
function getAllRows(sheetName) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName || SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return {
        success: true,
        data: [],
        message: 'No referrals found'
      };
    }
    
    const headers = data[0];
    const referrals = [];
    
    for (let i = 1; i < data.length; i++) {
      const referral = {};
      headers.forEach((header, index) => {
        referral[header.replace(/\s+/g, '')] = data[i][index];
      });
      referrals.push(referral);
    }
    
    Logger.log('Retrieved ' + referrals.length + ' total referrals');
    
    return {
      success: true,
      data: referrals,
      count: referrals.length
    };
  } catch(error) {
    Logger.log('Error getting all rows: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Test function to verify setup
 */
function testConnection() {
  Logger.log('Testing Google Apps Script connection...');
  
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('✓ Successfully connected to spreadsheet');
    
    const sheetByName = sheet.getSheetByName(SHEET_NAME);
    Logger.log('✓ Found sheet: ' + SHEET_NAME);
    
    const data = sheetByName.getDataRange().getValues();
    Logger.log('✓ Sheet has ' + data.length + ' rows');
    
    return 'Connection test successful!';
  } catch(error) {
    Logger.log('✗ Connection test failed: ' + error.toString());
    return 'Connection test failed: ' + error.toString();
  }
}
```

## Step 2: Deploy the Google Apps Script

1. Click **Deploy** → **New Deployment**
2. Select **Type**: Web app
3. Set **Execute as**: Your Google account
4. Set **Who has access**: Anyone
5. Click **Deploy**
6. Copy the deployment URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)
7. Click **Authorize** and grant permissions

## Step 3: Configure Your Spreadsheet

1. Create a new Google Sheet
2. Copy the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
3. In the Google Apps Script, replace `SPREADSHEET_ID` with your actual ID
4. Create a sheet named "Referrals"
5. Run the `initializeSheet()` function in the Apps Script editor to add headers

## Step 4: Update Your Application

### Add Environment Variable

Create or update your `.env` file:

```env
REACT_APP_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the actual script ID from your deployment URL.

### Initialize in Your App

In your main app file (e.g., `src/main.tsx` or `src/App.tsx`), add:

```typescript
import { initializeGoogleSheets } from '@/lib/googleSheets';
import { GOOGLE_SHEETS_CONFIG } from '@/config/googleSheets.config';

// Initialize Google Sheets on app startup
initializeGoogleSheets(GOOGLE_SHEETS_CONFIG.scriptUrl, GOOGLE_SHEETS_CONFIG.sheetName);
```

## Step 5: Test the Integration

### Test Push (Submit a Referral)

1. Log in to the partner portal
2. Go to "Submit Referral"
3. Fill in the form with test data:
   - Customer Name: John Smith
   - Email: john.smith@example.com
   - Phone: 0412 345 678
   - Loan Type: Home Loan
   - Loan Amount: $500,000
4. Click "Submit Referral"
5. Check your Google Sheet - the referral should appear as a new row

### Test Pull (View Dashboard)

1. Go to the Partner Dashboard
2. Click the "Refresh" button
3. The dashboard should now show:
   - Total Referrals: 1
   - Pending Referrals: 1
   - The John Smith referral in the table
4. The "Data synced from Google Sheets" message should appear

## Troubleshooting

### Issue: "Google Sheets not configured" message

**Solution**: Ensure `REACT_APP_GOOGLE_SHEETS_URL` is set in your environment variables and the app has been restarted.

### Issue: Referrals not appearing in Google Sheet

**Solution**:
1. Check browser console for errors
2. Verify the Google Apps Script deployment URL is correct
3. Check Google Apps Script logs for errors
4. Ensure the spreadsheet ID is correct in the script

### Issue: Dashboard shows $0 and 0 referrals

**Solution**:
1. Click "Refresh" button on the dashboard
2. Verify referrals exist in the Google Sheet for your company name
3. Check that company names match exactly (case-sensitive)
4. Check browser console for fetch errors

### Issue: CORS errors

**Solution**:
1. Ensure the Google Apps Script is deployed as "Web app"
2. Set "Who has access" to "Anyone"
3. The script uses `mode: 'cors'` which should work with Google Apps Script

## How It Works

### Push Flow (Submit Referral)

```
1. Partner submits referral form
2. Data saved to CMS (Wix Collections)
3. If Google Sheets configured:
   - Format data for sheet
   - Send POST request to Google Apps Script
   - Script appends row to Google Sheet
4. Success message shown to partner
```

### Pull Flow (View Dashboard)

```
1. Partner opens dashboard
2. Fetch data from CMS (commissions, referrals)
3. If Google Sheets configured:
   - Send POST request to get referrals by company
   - Script queries sheet and returns matching rows
   - Calculate statistics (total, earnings, status breakdown)
4. Display stats and referral table
5. Partner can click "Refresh" to manually sync
```

## Data Structure

### Google Sheet Columns

| Column | Type | Description |
|--------|------|-------------|
| Timestamp | DateTime | When the referral was submitted |
| Company Name | Text | Partner company name |
| Customer Name | Text | Referred customer name |
| Email | Text | Customer email |
| Phone | Text | Customer phone |
| Loan Type | Text | Type of loan (Home, Car, Personal, etc.) |
| Loan Amount | Number | Loan amount in AUD |
| Submission Date | Date | Date referral was submitted |
| Status | Text | PENDING, APPROVED, REJECTED |
| Commission | Number | Commission amount earned |
| Commission Status | Text | PENDING, PAID |

## Security Considerations

1. **Google Apps Script Deployment**: Set to "Anyone" for public access (required for frontend to call it)
2. **Company Name Filtering**: Data is filtered by company name, not user ID
3. **No Authentication**: The current setup doesn't require authentication for the Apps Script
4. **CORS**: Google Apps Script handles CORS automatically

For production, consider:
- Adding authentication tokens
- Implementing rate limiting
- Logging all access
- Using Google Sheets API with OAuth instead of Apps Script

## Advanced: Manual Data Entry

You can also manually enter referrals in Google Sheets:

1. Open your Google Sheet
2. Add a new row with the following format:
   ```
   Timestamp | Company Name | Customer Name | Email | Phone | Loan Type | Loan Amount | Submission Date | Status | Commission | Commission Status
   2024-01-12T10:30:00Z | Your Company | John Smith | john@example.com | 0412345678 | Home Loan | 500000 | 12/01/2024 | PENDING | | 
   ```
3. The dashboard will automatically pick it up on the next refresh

## Support

If you encounter issues:

1. Check the Google Apps Script logs (Apps Script Editor → Logs)
2. Check browser console for JavaScript errors
3. Verify all configuration values are correct
4. Test the connection using the `testConnection()` function in Apps Script
