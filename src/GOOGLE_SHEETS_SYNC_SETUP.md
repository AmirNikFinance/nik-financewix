# Google Sheets Real-Time Sync Setup Guide

## Overview

This guide explains how to set up bidirectional real-time synchronization between your Wix partner portal and Google Sheets. The system allows referral data to be pushed to Google Sheets and pulled back to display on the partner dashboard.

## Quick Start

### Already Deployed?
If you already have the Google Apps Script deployed, you just need to:

1. **Set the environment variable** in your `.env` file:
   ```env
   REACT_APP_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec
   ```

2. **Restart your development server** for the changes to take effect

3. **Test the integration** by submitting a referral and checking the Google Sheet

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

## Configuration Details

### Spreadsheet Information
- **Spreadsheet ID**: `13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo`
- **Sheet Name**: `Referrals`
- **Deployment URL**: `https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec`

### Sheet Columns
The "Referrals" sheet contains the following columns:

| Column | Type | Description |
|--------|------|-------------|
| Timestamp | DateTime | When the referral was submitted (ISO format) |
| Company Name | Text | Partner company name |
| Customer Name | Text | Referred customer name |
| Email | Text | Customer email address |
| Phone | Text | Customer phone number |
| Loan Type | Text | Type of loan (Home, Car, Personal, Business, etc.) |
| Loan Amount | Number | Loan amount in AUD |
| Submission Date | Date | Date referral was submitted |
| Status | Text | PENDING, APPROVED, REJECTED |
| Commission | Number | Commission amount earned |
| Commission status | Text | PENDING, PAID |

## Step 1: Deploy the Google Apps Script (If Not Already Done)

### Option A: Copy the Existing Script

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Copy the entire content from `/src/GOOGLE_APPS_SCRIPT_CODE.gs` in this repository
4. Paste it into the Apps Script editor
5. Update the `SPREADSHEET_ID` constant with your spreadsheet ID (if different)
6. Save the project

### Option B: Use the Pre-Deployed Script

If the script is already deployed at the URL above, you can skip to Step 2.

## Step 2: Deploy as Web App

1. In Google Apps Script editor, click **Deploy** → **New Deployment**
2. Select **Type**: Web app
3. Set **Execute as**: Your Google account
4. Set **Who has access**: Anyone
5. Click **Deploy**
6. Copy the deployment URL (format: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 3: Configure Your Application

### Update Environment Variables

Create or update your `.env` file with:

```env
REACT_APP_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbx04_dcPCtnnAyUo8JDPrjLcLZFzv6BO9rLH0APnBpXb5dNkG2vqjQabdS23NQVhI79Dg/exec
```

### Initialize in Your App

The initialization is already handled in the application. The Google Sheets integration will automatically initialize when the app starts.

## Step 4: Verify the Setup

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

## API Endpoints

The Google Apps Script supports the following actions:

### 1. Add New Referral

**Action**: `addRow`

**Request**:
```json
{
  "action": "addRow",
  "data": {
    "timestamp": "2024-01-12T10:30:00Z",
    "companyName": "Your Company",
    "customerName": "John Smith",
    "email": "john@example.com",
    "phone": "0412 345 678",
    "loanType": "Home Loan",
    "loanAmount": "500000",
    "submissionDate": "12/01/2024",
    "status": "PENDING",
    "commission": "",
    "commissionStatus": ""
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Referral added successfully",
  "data": {
    "companyName": "Your Company",
    "customerName": "John Smith",
    "email": "john@example.com",
    "status": "PENDING"
  }
}
```

### 2. Get Referrals by Company

**Action**: `getRowsByCompany`

**Request**:
```json
{
  "action": "getRowsByCompany",
  "companyName": "Your Company"
}
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2024-01-12T10:30:00Z",
      "companyName": "Your Company",
      "customerName": "John Smith",
      "email": "john@example.com",
      "phone": "0412 345 678",
      "loanType": "Home Loan",
      "loanAmount": "500000",
      "submissionDate": "12/01/2024",
      "status": "PENDING",
      "commission": "",
      "commissionStatus": ""
    }
  ],
  "count": 1,
  "companyName": "Your Company"
}
```

### 3. Update Referral Status

**Action**: `updateRow`

**Request**:
```json
{
  "action": "updateRow",
  "identifier": "john@example.com",
  "data": {
    "status": "APPROVED",
    "commission": "500",
    "commissionStatus": "PENDING"
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Referral updated successfully",
  "email": "john@example.com",
  "updatedFields": ["status", "commission", "commissionStatus"]
}
```

### 4. Get All Referrals

**Action**: `getAllRows`

**Request**:
```json
{
  "action": "getAllRows"
}
```

**Response**:
```json
{
  "success": true,
  "data": [
    { /* referral object */ },
    { /* referral object */ }
  ],
  "count": 2
}
```

### 5. Test Connection

**Action**: `test`

**Request**:
```json
{
  "action": "test"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Connection test successful",
  "details": {
    "spreadsheetId": "13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo",
    "sheetName": "Referrals",
    "headers": ["Timestamp", "Company Name", ...],
    "dataRows": 5,
    "totalRows": 6
  }
}
```

## Troubleshooting

### Issue: "Google Sheets not configured" message

**Solution**: 
1. Ensure `REACT_APP_GOOGLE_SHEETS_URL` is set in your `.env` file
2. Restart your development server
3. Check browser console for any errors

### Issue: Referrals not appearing in Google Sheet

**Solution**:
1. Check browser console for errors
2. Verify the Google Apps Script deployment URL is correct
3. Check Google Apps Script logs for errors (Apps Script Editor → Logs)
4. Ensure the spreadsheet ID is correct
5. Verify the sheet name is "Referrals"

### Issue: Dashboard shows $0 and 0 referrals

**Solution**:
1. Click "Refresh" button on the dashboard
2. Verify referrals exist in the Google Sheet for your company name
3. Check that company names match exactly (case-sensitive)
4. Check browser console for fetch errors
5. Verify the Google Apps Script is deployed and accessible

### Issue: CORS errors

**Solution**:
1. Ensure the Google Apps Script is deployed as "Web app"
2. Set "Who has access" to "Anyone"
3. The script uses `mode: 'cors'` which should work with Google Apps Script

### Issue: "Sheet 'Referrals' not found"

**Solution**:
1. Open the Google Sheet with ID `13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo`
2. Verify there is a sheet named "Referrals"
3. If not, create a new sheet and name it "Referrals"
4. Run the `initializeSheet()` function in Google Apps Script to add headers

## Manual Data Entry

You can also manually enter referrals in Google Sheets:

1. Open the Google Sheet: [13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo](https://docs.google.com/spreadsheets/d/13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo/edit)
2. Go to the "Referrals" sheet
3. Add a new row with the following format:
   ```
   Timestamp | Company Name | Customer Name | Email | Phone | Loan Type | Loan Amount | Submission Date | Status | Commission | Commission status
   2024-01-12T10:30:00Z | Your Company | John Smith | john@example.com | 0412345678 | Home Loan | 500000 | 12/01/2024 | PENDING | | 
   ```
4. The dashboard will automatically pick it up on the next refresh

## Advanced: Testing with Google Apps Script

### Run the Test Function

1. Open the Google Apps Script editor
2. Select the `testConnection` function from the dropdown
3. Click **Run**
4. Check the **Logs** (View → Logs) for the test results

### View All Data

1. Open the Google Apps Script editor
2. Select the `logAllData` function from the dropdown
3. Click **Run**
4. Check the **Logs** to see all sheet data

### Clear All Data (WARNING!)

1. Open the Google Apps Script editor
2. Select the `clearAllData` function from the dropdown
3. Click **Run**
4. This will delete all referral data except headers!

## Support

If you encounter issues:

1. Check the Google Apps Script logs (Apps Script Editor → Logs)
2. Check browser console for JavaScript errors
3. Verify all configuration values are correct
4. Test the connection using the `test` action
5. Review this guide for common issues

## File References

- **Google Apps Script Code**: `/src/GOOGLE_APPS_SCRIPT_CODE.gs`
- **Configuration**: `/src/config/googleSheets.config.ts`
- **Integration Library**: `/src/lib/googleSheets.ts`
- **Partner Dashboard**: `/src/components/partner/PartnerDashboard.tsx`
- **Submit Referral Page**: `/src/components/partner/PartnerSubmitReferralPage.tsx`
