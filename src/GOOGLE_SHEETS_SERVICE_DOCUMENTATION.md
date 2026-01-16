# Google Sheets Integration Service Documentation

## Overview

This comprehensive Google Sheets integration service connects your application to Google Sheets via Google Apps Script. It provides robust, production-ready functions for managing referral data with full error handling and CORS support.

## Configuration

### Google Apps Script URL
```
https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec
```

### Google Sheet Structure

**Sheet Name:** `referrals`

**Columns:**
1. Timestamp
2. Company Name
3. Customer Name
4. Email
5. Phone
6. Loan Type
7. Loan Amount
8. Submission Date
9. Status
10. Commission
11. Commission Status

## Core Functions

### 1. `pushReferralToSheet(data)`

Sends referral data to Google Sheet by adding a new row.

**Parameters:**
- `data` (ReferralSheetData): Complete referral information

**Returns:**
- `Promise<boolean>`: `true` if successful, `false` otherwise

**Usage:**
```typescript
import { pushReferralToSheet, formatReferralForSheet } from '@/lib/googleSheets';

const referralData = formatReferralForSheet(
  referral,
  'ABC Company',
  '500',
  'PENDING'
);

const success = await pushReferralToSheet(referralData);
if (success) {
  console.log('Referral added to Google Sheet');
}
```

**Features:**
- POST method with CORS mode
- Automatic error handling
- CORS issue detection and graceful handling
- Detailed logging for debugging

---

### 2. `updateReferralStatusInSheet(email, status, commission, commissionStatus)`

Updates an existing referral in the Google Sheet using email as the unique identifier.

**Parameters:**
- `email` (string): Customer email (unique identifier)
- `status` (string): New status (e.g., 'PENDING', 'APPROVED', 'REJECTED')
- `commission` (string, optional): Commission amount
- `commissionStatus` (string, optional): Commission status (e.g., 'PENDING', 'PAID')

**Returns:**
- `Promise<boolean>`: `true` if successful, `false` otherwise

**Usage:**
```typescript
import { updateReferralStatusInSheet } from '@/lib/googleSheets';

const success = await updateReferralStatusInSheet(
  'customer@example.com',
  'APPROVED',
  '750',
  'PAID'
);

if (success) {
  console.log('Referral status updated');
}
```

**Features:**
- POST method with CORS mode
- Updates only specified fields
- Automatic error handling
- CORS issue detection

---

### 3. `formatReferralForSheet(referral, companyName, commission, commissionStatus)`

Formats referral data from internal format to Google Sheets format.

**Parameters:**
- `referral` (any): Referral object from CMS or form
- `companyName` (string): Partner company name
- `commission` (string, optional): Commission amount (default: '')
- `commissionStatus` (string, optional): Commission status (default: '')

**Returns:**
- `ReferralSheetData`: Formatted data ready for Google Sheets

**Usage:**
```typescript
import { formatReferralForSheet } from '@/lib/googleSheets';

const formattedData = formatReferralForSheet(
  {
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '0412345678',
    loanType: 'Home Loan',
    loanAmount: 500000,
    submissionDate: new Date(),
    referralStatus: 'PENDING'
  },
  'ABC Company',
  '500',
  'PENDING'
);
```

**Field Mapping:**
- `timestamp`: Current ISO timestamp
- `companyName`: Partner company name
- `customerName`: From referral.customerName
- `email`: From referral.customerEmail
- `phone`: From referral.customerPhone
- `loanType`: From referral.loanType
- `loanAmount`: From referral.loanAmount (converted to string)
- `submissionDate`: From referral.submissionDate (formatted as en-AU)
- `status`: From referral.referralStatus (default: 'PENDING')
- `commission`: Provided parameter
- `commissionStatus`: Provided parameter

---

## Additional Functions

### `fetchReferralsFromSheet(companyName)`

Retrieves all referrals for a specific company from Google Sheet.

**Parameters:**
- `companyName` (string): Partner company name

**Returns:**
- `Promise<PartnerStats>`: Statistics and referral data

**Usage:**
```typescript
import { fetchReferralsFromSheet } from '@/lib/googleSheets';

const stats = await fetchReferralsFromSheet('ABC Company');
console.log('Total Referrals:', stats.totalReferrals);
console.log('Total Earnings:', stats.totalEarnings);
console.log('Pending:', stats.pendingReferrals);
console.log('Approved:', stats.approvedReferrals);
```

---

### `syncReferralData(localData, companyName)`

Bidirectional sync: pushes data to sheet and fetches updated statistics.

**Parameters:**
- `localData` (ReferralSheetData): Data to push
- `companyName` (string): Partner company name

**Returns:**
- `Promise<PartnerStats>`: Updated statistics from sheet

**Usage:**
```typescript
import { syncReferralData, formatReferralForSheet } from '@/lib/googleSheets';

const formattedData = formatReferralForSheet(referral, 'ABC Company');
const stats = await syncReferralData(formattedData, 'ABC Company');
```

---

### `initializeGoogleSheets(scriptUrl, sheetName)`

Initializes the Google Sheets service with configuration.

**Parameters:**
- `scriptUrl` (string): Google Apps Script deployment URL
- `sheetName` (string, optional): Sheet name (default: 'referrals')

**Usage:**
```typescript
import { initializeGoogleSheets } from '@/lib/googleSheets';

initializeGoogleSheets(
  'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  'referrals'
);
```

**Note:** This is automatically called in `Router.tsx` on app startup.

---

### `testGoogleSheetsConnection()`

Tests the connection to Google Sheets to verify configuration.

**Returns:**
- `Promise<{ success: boolean; message: string; details?: any }>`

**Usage:**
```typescript
import { testGoogleSheetsConnection } from '@/lib/googleSheets';

const result = await testGoogleSheetsConnection();
if (result.success) {
  console.log('✓ Connection successful');
} else {
  console.error('✗ Connection failed:', result.message);
}
```

---

### `isGoogleSheetsConfigured()`

Checks if Google Sheets is properly configured.

**Returns:**
- `boolean`: `true` if configured, `false` otherwise

**Usage:**
```typescript
import { isGoogleSheetsConfigured } from '@/lib/googleSheets';

if (isGoogleSheetsConfigured()) {
  // Proceed with Google Sheets operations
}
```

---

## Data Types

### ReferralSheetData

```typescript
interface ReferralSheetData {
  timestamp: string;        // ISO timestamp
  companyName: string;      // Partner company name
  customerName: string;     // Customer full name
  email: string;            // Customer email (unique identifier)
  phone: string;            // Customer phone number
  loanType: string;         // Type of loan
  loanAmount: string;       // Loan amount as string
  submissionDate: string;   // Formatted date (en-AU)
  status: string;           // Referral status
  commission: string;       // Commission amount
  commissionStatus: string; // Commission payment status
}
```

### PartnerStats

```typescript
interface PartnerStats {
  totalReferrals: number;      // Total number of referrals
  totalEarnings: number;       // Sum of all commissions
  pendingReferrals: number;    // Count of pending referrals
  approvedReferrals: number;   // Count of approved referrals
  referrals: ReferralSheetData[]; // Array of all referrals
}
```

---

## Error Handling

The service includes comprehensive error handling:

### Network Errors
- Automatic detection and logging
- Graceful fallback for failed requests
- Returns `false` or empty data on failure

### CORS Issues
- Detects CORS-related errors
- Logs warning but returns `true` (request likely succeeded)
- Provides guidance for manual verification

### Response Errors
- Checks HTTP status codes
- Parses error messages from responses
- Logs detailed error information

### Example Error Handling

```typescript
try {
  const success = await pushReferralToSheet(data);
  if (success) {
    console.log('✓ Data pushed successfully');
  } else {
    console.warn('⚠ Push failed, but data may have been sent');
  }
} catch (error) {
  console.error('❌ Unexpected error:', error);
}
```

---

## Configuration Management

### Environment Variables

Store sensitive configuration in environment variables:

```env
VITE_GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_GOOGLE_SHEETS_SHEET_NAME=referrals
VITE_GOOGLE_SHEETS_ENABLED=true
```

### Wix Secrets Manager

For production, store the script URL in Wix Secrets Manager:

1. Go to Wix Dashboard → Settings → Secrets Manager
2. Add secret: `GOOGLE_SHEETS_URL`
3. Value: Your Google Apps Script URL
4. Access in code via environment variables

---

## Communication Protocol

### Request Method
- **Method:** POST
- **Mode:** CORS
- **Content-Type:** application/json

### Request Format

```json
{
  "action": "addRow" | "updateRow" | "getRowsByCompany" | "test",
  "sheetName": "referrals",
  "data": { /* referral data */ },
  "identifier": "email@example.com",
  "companyName": "ABC Company"
}
```

### Response Format

```json
{
  "success": true,
  "data": [ /* array of referrals */ ],
  "error": "Error message if failed"
}
```

---

## Best Practices

### 1. Always Format Data
Use `formatReferralForSheet()` before pushing data:
```typescript
const formatted = formatReferralForSheet(referral, companyName);
await pushReferralToSheet(formatted);
```

### 2. Check Configuration
Verify configuration before operations:
```typescript
if (!isGoogleSheetsConfigured()) {
  console.warn('Google Sheets not configured');
  return;
}
```

### 3. Handle Errors Gracefully
Don't block user flow on Google Sheets errors:
```typescript
const success = await pushReferralToSheet(data);
// Continue with local operations regardless of success
```

### 4. Use Email as Identifier
Always use email for updates (unique identifier):
```typescript
await updateReferralStatusInSheet(
  referral.customerEmail,
  'APPROVED'
);
```

### 5. Log Operations
Enable logging for debugging:
```typescript
console.log('📤 Pushing to Google Sheets...');
const success = await pushReferralToSheet(data);
console.log(success ? '✓ Success' : '❌ Failed');
```

---

## Troubleshooting

### Issue: CORS Errors

**Symptom:** "Failed to fetch" or CORS-related errors

**Solution:**
1. Verify Google Apps Script is deployed with "Anyone" access
2. Check that the script URL is correct
3. Ensure the script has proper CORS headers

### Issue: Data Not Appearing

**Symptom:** Function returns success but data not in sheet

**Solution:**
1. Check sheet name matches configuration
2. Verify column headers match expected format
3. Check Google Apps Script logs for errors

### Issue: Updates Not Working

**Symptom:** `updateReferralStatusInSheet()` returns false

**Solution:**
1. Verify email exists in the sheet
2. Check that email is unique
3. Ensure status values are valid

### Issue: Connection Test Fails

**Symptom:** `testGoogleSheetsConnection()` returns failure

**Solution:**
1. Verify script URL is accessible
2. Check Google Apps Script deployment status
3. Ensure script has 'test' action handler

---

## Complete Example

```typescript
import {
  initializeGoogleSheets,
  pushReferralToSheet,
  updateReferralStatusInSheet,
  formatReferralForSheet,
  fetchReferralsFromSheet,
  testGoogleSheetsConnection,
  isGoogleSheetsConfigured
} from '@/lib/googleSheets';

// 1. Initialize (done automatically in Router.tsx)
initializeGoogleSheets(
  'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',
  'referrals'
);

// 2. Test connection
const connectionTest = await testGoogleSheetsConnection();
if (!connectionTest.success) {
  console.error('Connection failed:', connectionTest.message);
}

// 3. Format and push new referral
const referral = {
  customerName: 'Jane Smith',
  customerEmail: 'jane@example.com',
  customerPhone: '0412345678',
  loanType: 'Car Loan',
  loanAmount: 50000,
  submissionDate: new Date(),
  referralStatus: 'PENDING'
};

const formattedData = formatReferralForSheet(
  referral,
  'XYZ Partners',
  '300',
  'PENDING'
);

const pushSuccess = await pushReferralToSheet(formattedData);
console.log('Push result:', pushSuccess);

// 4. Update referral status
const updateSuccess = await updateReferralStatusInSheet(
  'jane@example.com',
  'APPROVED',
  '300',
  'PAID'
);
console.log('Update result:', updateSuccess);

// 5. Fetch company statistics
const stats = await fetchReferralsFromSheet('XYZ Partners');
console.log('Company Stats:', {
  total: stats.totalReferrals,
  earnings: stats.totalEarnings,
  pending: stats.pendingReferrals,
  approved: stats.approvedReferrals
});
```

---

## Security Considerations

### 1. URL Storage
- Store script URL in environment variables
- Use Wix Secrets Manager for production
- Never commit URLs to version control

### 2. Data Validation
- Validate data before sending to sheet
- Sanitize user inputs
- Check required fields are present

### 3. Access Control
- Ensure Google Apps Script has appropriate permissions
- Limit sheet access to authorized users
- Use "Anyone with link" deployment for script

### 4. Error Messages
- Don't expose sensitive information in errors
- Log detailed errors server-side only
- Show user-friendly messages to clients

---

## Performance Optimization

### 1. Batch Operations
For multiple referrals, consider batching:
```typescript
const referrals = [...]; // Array of referrals
for (const ref of referrals) {
  await pushReferralToSheet(formatReferralForSheet(ref, company));
}
```

### 2. Async Operations
Don't block UI on Google Sheets operations:
```typescript
// Fire and forget
pushReferralToSheet(data).catch(console.error);
// Continue with UI updates
```

### 3. Caching
Cache fetched data to reduce API calls:
```typescript
let cachedStats = null;
let cacheTime = 0;
const CACHE_DURATION = 60000; // 1 minute

async function getStats(company) {
  if (cachedStats && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedStats;
  }
  cachedStats = await fetchReferralsFromSheet(company);
  cacheTime = Date.now();
  return cachedStats;
}
```

---

## Support and Maintenance

### Logging
All functions include comprehensive logging:
- 📤 Push operations
- 📥 Fetch operations
- 📝 Update operations
- ✓ Success messages
- ❌ Error messages
- ⚠ Warning messages

### Monitoring
Monitor these metrics:
- Success rate of push operations
- Response times
- CORS error frequency
- Failed update attempts

### Updates
When updating the service:
1. Test with connection test function
2. Verify data format matches sheet columns
3. Check error handling works correctly
4. Update documentation as needed

---

## Conclusion

This Google Sheets integration service provides a robust, production-ready solution for managing referral data. With comprehensive error handling, CORS support, and detailed logging, it ensures reliable communication between your application and Google Sheets.

For additional support or questions, refer to the Google Apps Script documentation or check the application logs for detailed error information.
