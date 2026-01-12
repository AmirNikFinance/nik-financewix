# Partner Portal Setup Guide

## Overview
The partner portal has been enhanced with the following features:
1. **Dedicated Portal Header** - Navigation menu with links to all portal pages
2. **Auto-Approved Sign-Up** - Partners are instantly approved upon profile completion
3. **Referral Submission Form** - New page for partners to submit customer referrals
4. **Google Sheets Integration** - Referrals are automatically synced to a Google Sheet

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
- Syncs to Google Sheets (requires setup)
- Real-time validation
- Mobile responsive

### 4. Portal Pages Updated
All partner portal pages now use `PartnerPortalHeader` instead of the main `Header`:
- Dashboard
- Referrals
- Commissions
- Profile
- Submit Referral (new)

## Google Sheets Integration Setup

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Partner Referrals"
3. Add the following headers in the first row:
   - A1: `Timestamp`
   - B1: `Customer Name`
   - C1: `Email`
   - D1: `Phone`
   - E1: `Loan Type`
   - F1: `Loan Amount`
   - G1: `Submission Date`

### Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Replace the default code with:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const row = [
      new Date(),
      data.customerName,
      data.customerEmail,
      data.customerPhone,
      data.loanType,
      data.loanAmount,
      data.submissionDate
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Referral recorded successfully'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Deploy** → **New Deployment**
4. Select type: **Web app**
5. Execute as: Your account
6. Who has access: **Anyone**
7. Click **Deploy**
8. Copy the deployment URL (it will look like: `https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent`)

### Step 3: Update the Referral Form
In `/src/components/partner/PartnerSubmitReferralPage.tsx`, find this line:

```typescript
await fetch(
  'https://script.google.com/macros/d/AKfycbxYourScriptIdHere/usercontent',
```

Replace `AKfycbxYourScriptIdHere` with your actual script ID from Step 2.

### Step 4: Test the Integration
1. Log in to the partner portal
2. Go to "Submit Referral"
3. Fill out the form with test data
4. Click "Submit Referral"
5. Check your Google Sheet - the data should appear automatically

## Portal Navigation Structure

```
/partner-portal
├── Dashboard (main overview)
├── /submit-referral (new referral form)
├── /referrals (view all referrals)
├── /commissions (view commissions)
└── /profile (manage profile)
```

## Example Referral Data

The form collects:
- **Customer Name**: Full name of the referred customer
- **Email**: Customer's email address
- **Phone**: Customer's phone number
- **Loan Type**: Type of loan (Home, Car, Personal, Business, Debt Consolidation, Other)
- **Loan Amount**: Loan amount in AUD

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

## Key Changes Summary

| Component | Change | Impact |
|-----------|--------|--------|
| PartnerDashboard | Uses PartnerPortalHeader | Consistent navigation |
| PartnerReferralsPage | Uses PartnerPortalHeader | Consistent navigation |
| PartnerCommissionsPage | Uses PartnerPortalHeader | Consistent navigation |
| PartnerProfilePage | Uses PartnerPortalHeader | Consistent navigation |
| PartnerProfileSetup | Auto-approval (APPROVED status) | Instant portal access |
| Router.tsx | Added /partner-portal/submit-referral route | New referral form page |

## Troubleshooting

### Google Sheets Not Receiving Data
1. Verify the script URL is correct in `PartnerSubmitReferralPage.tsx`
2. Check that the Apps Script deployment is set to "Anyone" access
3. Check browser console for fetch errors
4. Verify the Google Sheet headers match the script expectations

### Portal Header Not Showing
1. Ensure `PartnerPortalHeader` is imported in the page component
2. Check that the page is wrapped with `MemberProtectedRoute`
3. Verify the user is authenticated

### Auto-Approval Not Working
1. Check that `PartnerProfileSetup.tsx` has `status: 'APPROVED'` in the partnerData object
2. Verify the partner record is being created in the CMS

## Future Enhancements

Potential improvements:
- Add email notifications when referrals are submitted
- Create admin dashboard for approving/rejecting referrals
- Add commission calculation automation
- Implement referral tracking analytics
- Add bulk referral import from CSV
