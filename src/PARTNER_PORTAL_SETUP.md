# Partner Portal Setup Guide - Complete Integration

## Overview
The partner portal has been enhanced with the following features:
1. **Dedicated Portal Header** - Navigation menu with links to all portal pages
2. **Auto-Approved Sign-Up** - Partners are instantly approved upon profile completion
3. **Referral Submission Form** - New page for partners to submit customer referrals
4. **Real-Time Google Sheets Integration** - Bidirectional sync with Google Sheets for referral tracking

## Features Implemented

### 1. Partner Portal Header (`PartnerPortalHeader.tsx`)
A dedicated header component that appears on all partner portal pages with:
- Navigation links to Dashboard, Submit Referral, Referrals, Commissions, and Profile
- User profile display
- Sign out functionality
- Mobile-responsive menu

**Usage**: Automatically included in all partner portal pages.

### 2. Auto-Approved Sign-Up
When partners complete their profile setup:
- Status is automatically set to `APPROVED` (previously was `PENDING`)
- Instant access to the portal dashboard
- No manual approval required

**File Modified**: `PartnerProfileSetup.tsx`

### 3. Submit Referral Page (`PartnerSubmitReferralPage.tsx`)
New dedicated page at `/partner-portal/submit-referral` with:
- Customer information form (name, email, phone)
- Loan details (type, amount)
- Form validation
- Success confirmation
- Example referral display

**Features**:
- Saves referrals to CMS collection `referrals`
- Syncs to Google Sheets in real-time
- Includes company name from partner profile
- Real-time validation
- Mobile responsive

### 4. Google Sheets Integration Service (`/src/lib/googleSheets.ts`)
A comprehensive service for managing Google Sheets integration with:
- `initializeGoogleSheets()` - Configure the script URL
- `pushReferralToSheet()` - Add new referral to sheet
- `updateReferralStatusInSheet()` - Update referral status and commission
- `formatReferralForSheet()` - Format data for sheet compatibility
- `isGoogleSheetsConfigured()` - Check if integration is ready

### 5. Portal Pages Updated
All partner portal pages now use `PartnerPortalHeader` instead of the main `Header`:
- Dashboard
- Referrals
- Commissions
- Profile
- Submit Referral (new)

---

## Google Sheets Integration Setup

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Partner Referrals"
3. Add the following headers in the first row (A1:K1):
   - **A1**: `Timestamp`
   - **B1**: `Company Name`
   - **C1**: `Customer Name`
   - **D1**: `Email`
   - **E1**: `Phone`
   - **F1**: `Loan Type`
   - **G1**: `Loan Amount`
   - **H1**: `Submission Date`
   - **I1**: `Status`
   - **J1**: `Commission`
   - **K1**: `Commission Status`

### Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete the default code and replace it with the complete script below:

```javascript
// Google Apps Script for Partner Referral Portal
// Handles bidirectional syncing with the web application

const SHEET_NAME = 'Referrals';
const HEADERS = ['Timestamp', 'Company Name', 'Customer Name', 'Email', 'Phone', 'Loan Type', 'Loan Amount', 'Submission Date', 'Status', 'Commission', 'Commission Status'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    switch(action) {
      case 'addRow':
        return addReferralRow(data);
      case 'updateRow':
        return updateReferralRow(data);
      case 'getAllRows':
        return getAllReferrals(data);
      case 'getRowByEmail':
        return getReferralByEmail(data);
      default:
        return createResponse(false, 'Unknown action');
    }
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, 'Error: ' + error.toString());
  }
}

function addReferralRow(data) {
  try {
    const sheet = getOrCreateSheet(data.sheetName || SHEET_NAME);
    const referralData = data.data;

    // Prepare row data in correct order
    const row = [
      referralData.timestamp || new Date().toISOString(),
      referralData.companyName || '',
      referralData.customerName || '',
      referralData.email || '',
      referralData.phone || '',
      referralData.loanType || '',
      referralData.loanAmount || '',
      referralData.submissionDate || new Date().toLocaleDateString('en-AU'),
      referralData.status || 'PENDING',
      referralData.commission || '',
      referralData.commissionStatus || ''
    ];

    sheet.appendRow(row);
    
    Logger.log('Row added successfully');
    return createResponse(true, 'Referral added successfully', { rowNumber: sheet.getLastRow() });
  } catch (error) {
    Logger.log('Error in addReferralRow: ' + error.toString());
    return createResponse(false, 'Error adding row: ' + error.toString());
  }
}

function updateReferralRow(data) {
  try {
    const sheet = getOrCreateSheet(data.sheetName || SHEET_NAME);
    const identifier = data.identifier; // Email address
    const updateData = data.data;

    // Find row by email (column D)
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    let rowIndex = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][3] === identifier) { // Column D is email
        rowIndex = i + 1; // Sheet rows are 1-indexed
        break;
      }
    }

    if (rowIndex === -1) {
      return createResponse(false, 'Referral not found');
    }

    // Update Status (column I)
    if (updateData.status) {
      sheet.getRange(rowIndex, 9).setValue(updateData.status);
    }

    // Update Commission (column J)
    if (updateData.commission !== undefined) {
      sheet.getRange(rowIndex, 10).setValue(updateData.commission);
    }

    // Update Commission Status (column K)
    if (updateData.commissionStatus) {
      sheet.getRange(rowIndex, 11).setValue(updateData.commissionStatus);
    }

    Logger.log('Row updated successfully at row ' + rowIndex);
    return createResponse(true, 'Referral updated successfully', { rowNumber: rowIndex });
  } catch (error) {
    Logger.log('Error in updateReferralRow: ' + error.toString());
    return createResponse(false, 'Error updating row: ' + error.toString());
  }
}

function getAllReferrals(data) {
  try {
    const sheet = getOrCreateSheet(data.sheetName || SHEET_NAME);
    const range = sheet.getDataRange();
    const values = range.getValues();

    // Convert to array of objects
    const referrals = [];
    const headers = values[0];

    for (let i = 1; i < values.length; i++) {
      const referral = {};
      for (let j = 0; j < headers.length; j++) {
        referral[headers[j]] = values[i][j];
      }
      referrals.push(referral);
    }

    Logger.log('Retrieved ' + referrals.length + ' referrals');
    return createResponse(true, 'Referrals retrieved successfully', { referrals: referrals });
  } catch (error) {
    Logger.log('Error in getAllReferrals: ' + error.toString());
    return createResponse(false, 'Error retrieving referrals: ' + error.toString());
  }
}

function getReferralByEmail(data) {
  try {
    const sheet = getOrCreateSheet(data.sheetName || SHEET_NAME);
    const email = data.email;
    const range = sheet.getDataRange();
    const values = range.getValues();

    const headers = values[0];
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][3] === email) { // Column D is email
        const referral = {};
        for (let j = 0; j < headers.length; j++) {
          referral[headers[j]] = values[i][j];
        }
        Logger.log('Found referral for email: ' + email);
        return createResponse(true, 'Referral found', { referral: referral });
      }
    }

    return createResponse(false, 'Referral not found');
  } catch (error) {
    Logger.log('Error in getReferralByEmail: ' + error.toString());
    return createResponse(false, 'Error retrieving referral: ' + error.toString());
  }
}

function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function createResponse(success, message, data = {}) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString(),
    ...data
  };

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify setup
function testSetup() {
  const sheet = getOrCreateSheet(SHEET_NAME);
  Logger.log('Sheet name: ' + sheet.getName());
  Logger.log('Last row: ' + sheet.getLastRow());
  Logger.log('Headers: ' + sheet.getRange(1, 1, 1, 11).getValues());
}
```

### Step 3: Deploy the Apps Script

1. Click **Deploy** → **New Deployment**
2. Select type: **Web app**
3. Execute as: **Your account**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the deployment URL (looks like: `https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent`)
7. Save this URL - you'll need it in the next step

### Step 4: Configure the Application

Add the initialization code to your app. The best place is in the main app component or Router:

**Option A: In Router.tsx (Recommended)**
```typescript
import { initializeGoogleSheets } from '@/lib/googleSheets';

// Add this in your router setup or main component
useEffect(() => {
  const scriptUrl = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent';
  initializeGoogleSheets(scriptUrl, 'Referrals');
}, []);
```

**Option B: In HomePage.tsx**
```typescript
import { initializeGoogleSheets } from '@/lib/googleSheets';

useEffect(() => {
  const scriptUrl = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent';
  initializeGoogleSheets(scriptUrl, 'Referrals');
}, []);
```

**Replace `YOUR_SCRIPT_ID`** with the actual script ID from your deployment URL.

### Step 5: Test the Integration

1. Log in to the partner portal
2. Go to "Submit Referral"
3. Fill out the form with test data:
   - Customer Name: John Smith
   - Email: john@example.com
   - Phone: 0412 345 678
   - Loan Type: Home Loan
   - Loan Amount: 500000
4. Click "Submit Referral"
5. Check your Google Sheet - the data should appear automatically in a new row

---

## Real-Time Syncing Features

### Push Operations (Web → Sheet)
- **Add Referral**: When a partner submits a referral, it's automatically added to the Google Sheet
- **Update Status**: When a referral status changes, the sheet is updated in real-time
- **Commission Tracking**: Commission amounts and status are synced to the sheet

### Pull Operations (Sheet → Web)
The system is designed to support reading data from the sheet. To implement this:

1. Create a backend endpoint that calls the Google Apps Script
2. Use the `fetchReferralsFromSheet()` function in `/src/lib/googleSheets.ts`
3. Implement periodic polling or webhook listeners

---

## Portal Navigation Structure

```
/partner-portal
├── Dashboard (main overview)
├── /submit-referral (new referral form)
├── /referrals (view all referrals)
├── /commissions (view commissions)
└── /profile (manage profile)
```

---

## Data Structure

### Sheet Columns
| Column | Type | Description |
|--------|------|-------------|
| A | Timestamp | ISO format timestamp of when the referral was added |
| B | Company Name | Partner company name |
| C | Customer Name | Referred customer's full name |
| D | Email | Customer's email address |
| E | Phone | Customer's phone number |
| F | Loan Type | Type of loan (Home, Car, Personal, etc.) |
| G | Loan Amount | Loan amount in AUD |
| H | Submission Date | Date the referral was submitted |
| I | Status | Referral status (PENDING, APPROVED, REJECTED) |
| J | Commission | Commission amount earned |
| K | Commission Status | Commission status (PENDING, PAID, WITHHELD) |

---

## API Actions

The Apps Script supports the following actions:

### addRow
Adds a new referral row to the sheet
```json
{
  "action": "addRow",
  "sheetName": "Referrals",
  "data": {
    "timestamp": "2024-01-12T10:30:00Z",
    "companyName": "ABC Finance",
    "customerName": "John Smith",
    "email": "john@example.com",
    "phone": "0412345678",
    "loanType": "Home Loan",
    "loanAmount": "500000",
    "submissionDate": "12/01/2024",
    "status": "PENDING",
    "commission": "",
    "commissionStatus": ""
  }
}
```

### updateRow
Updates an existing referral row by email
```json
{
  "action": "updateRow",
  "sheetName": "Referrals",
  "identifier": "john@example.com",
  "data": {
    "status": "APPROVED",
    "commission": "2500",
    "commissionStatus": "PENDING"
  }
}
```

### getAllRows
Retrieves all referrals from the sheet
```json
{
  "action": "getAllRows",
  "sheetName": "Referrals"
}
```

### getRowByEmail
Retrieves a specific referral by email
```json
{
  "action": "getRowByEmail",
  "sheetName": "Referrals",
  "email": "john@example.com"
}
```

---

## Integration Points

### PartnerSubmitReferralPage.tsx
- Automatically syncs new referrals to Google Sheet
- Uses `pushReferralToSheet()` function
- Includes company name from partner profile
- Handles errors gracefully

### PartnerDashboard.tsx
- Can be extended to fetch and display sheet data
- Shows real-time commission updates

### PartnerCommissionsPage.tsx
- Can be enhanced to read commission data from sheet
- Displays commission status from sheet

---

## Troubleshooting

### Data Not Appearing in Sheet
1. Verify the Apps Script deployment URL is correct
2. Check browser console for fetch errors
3. Ensure the sheet has the correct headers in row 1
4. Check Apps Script execution logs:
   - Go to Extensions → Apps Script
   - Click "Execution log" to see any errors
5. Verify the sheet name matches exactly (case-sensitive)

### CORS Errors
- The current setup uses `mode: 'no-cors'` to avoid CORS issues
- If you need to read responses, implement a backend proxy

### Sheet Not Found
- Ensure the sheet name matches exactly (case-sensitive)
- The script will auto-create the sheet if it doesn't exist
- Check that you have write permissions to the sheet

### Timestamp Issues
- Timestamps are stored in ISO format (UTC)
- Dates are formatted as `DD/MM/YYYY` for readability
- Adjust date formatting in the Apps Script if needed

### Configuration Not Working
1. Verify `initializeGoogleSheets()` is called before any referral submissions
2. Check that the script URL is correct
3. Ensure the function is called in a useEffect hook
4. Verify the component is mounted before submitting referrals

---

## Using the Google Sheets Service

### Import the service
```typescript
import { 
  initializeGoogleSheets, 
  pushReferralToSheet, 
  updateReferralStatusInSheet,
  formatReferralForSheet,
  isGoogleSheetsConfigured 
} from '@/lib/googleSheets';
```

### Initialize on app startup
```typescript
useEffect(() => {
  initializeGoogleSheets(
    'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent',
    'Referrals'
  );
}, []);
```

### Push a referral
```typescript
const sheetData = formatReferralForSheet(
  referral,
  'Company Name',
  '2500',
  'PENDING'
);
await pushReferralToSheet(sheetData);
```

### Update referral status
```typescript
await updateReferralStatusInSheet(
  'customer@example.com',
  'APPROVED',
  '2500',
  'PAID'
);
```

### Check if configured
```typescript
if (isGoogleSheetsConfigured()) {
  // Google Sheets is ready to use
}
```

---

## CMS Collections Used

### `referrals` Collection
Stores all submitted referrals with:
- `_id`: Unique identifier
- `customerName`: Customer's full name
- `customerEmail`: Customer's email
- `customerPhone`: Customer's phone
- `loanType`: Type of loan
- `loanAmount`: Loan amount (number)
- `referralStatus`: Status (PENDING, APPROVED, REJECTED)
- `submissionDate`: When the referral was submitted

### `partners` Collection
Stores partner information with:
- `_id`: Partner ID (email)
- `companyName`: Company name
- `abn`: ABN
- `bankName`: Bank name
- `bankAccountName`: Account name
- `bankBsb`: BSB
- `bankAccountNumber`: Account number
- `status`: Partner status (APPROVED, PENDING, etc.)
- `profileSetupComplete`: Boolean flag

---

## Key Changes Summary

| Component | Change | Impact |
|-----------|--------|--------|
| PartnerDashboard | Uses PartnerPortalHeader | Consistent navigation |
| PartnerReferralsPage | Uses PartnerPortalHeader | Consistent navigation |
| PartnerCommissionsPage | Uses PartnerPortalHeader | Consistent navigation |
| PartnerProfilePage | Uses PartnerPortalHeader | Consistent navigation |
| PartnerProfileSetup | Auto-approval (APPROVED status) | Instant portal access |
| PartnerSubmitReferralPage | Google Sheets integration | Real-time syncing |
| Router.tsx | Added /partner-portal/submit-referral route | New referral form page |
| /src/lib/googleSheets.ts | New service file | Centralized sheet management |

---

## Future Enhancements

1. **Real-Time Updates**: Implement WebSocket connection for live data sync
2. **Batch Operations**: Add bulk import/export functionality
3. **Advanced Filtering**: Filter referrals by date range, status, loan type
4. **Commission Automation**: Auto-calculate commissions based on referral status
5. **Email Notifications**: Send notifications when referral status changes
6. **Audit Trail**: Track all changes with timestamps and user information
7. **Dashboard Widgets**: Display real-time sheet data in partner dashboard
8. **Mobile App**: Native mobile app with offline support
9. **API Integration**: Connect with external loan processing systems
10. **Analytics**: Advanced reporting and insights from referral data
