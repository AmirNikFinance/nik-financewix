# Google Sheets Real-Time Integration - Implementation Guide

## Quick Start

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create new spreadsheet: "Partner Referrals"
3. Add headers in row 1:
   ```
   Timestamp | Company Name | Customer Name | Email | Phone | Loan Type | Loan Amount | Submission Date | Status | Commission | Commission Status
   ```

### 2. Create Google Apps Script
1. In your sheet: **Extensions** → **Apps Script**
2. Copy the complete script from `/src/PARTNER_PORTAL_SETUP.md` (Step 2)
3. Click **Deploy** → **New Deployment**
4. Select: **Web app**
5. Execute as: **Your account**
6. Access: **Anyone**
7. Copy the deployment URL

### 3. Configure Your App

**Option A: Using Environment Variables (Recommended)**

1. Create `.env` file in project root:
```bash
REACT_APP_GOOGLE_SHEETS_URL=https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent
```

2. Initialize in your Router or main component:
```typescript
import { initializeGoogleSheets } from '@/lib/googleSheets';
import { GOOGLE_SHEETS_CONFIG } from '@/config/googleSheets.config';

useEffect(() => {
  if (GOOGLE_SHEETS_CONFIG.enabled) {
    initializeGoogleSheets(
      GOOGLE_SHEETS_CONFIG.scriptUrl,
      GOOGLE_SHEETS_CONFIG.sheetName
    );
  }
}, []);
```

**Option B: Direct Configuration**

```typescript
import { initializeGoogleSheets } from '@/lib/googleSheets';

useEffect(() => {
  initializeGoogleSheets(
    'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent',
    'Referrals'
  );
}, []);
```

### 4. Test the Integration
1. Log in to partner portal
2. Go to "Submit Referral"
3. Fill form and submit
4. Check Google Sheet - data should appear automatically

---

## Architecture Overview

### Components

```
┌─────────────────────────────────────────────────────────────┐
│                    Partner Portal                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PartnerSubmitReferralPage                                  │
│  ├── Form Input                                             │
│  ├── CMS Save (referrals collection)                        │
│  └── Google Sheets Sync                                     │
│                                                              │
│  PartnerDashboard                                           │
│  ├── Display Referrals                                      │
│  ├── Display Commissions                                    │
│  └── Real-time Updates (future)                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
    ┌─────────────┐            ┌──────────────────┐
    │ CMS (Wix)   │            │ Google Sheets    │
    │             │            │                  │
    │ referrals   │◄──────────►│ Referrals Sheet  │
    │ partners    │            │                  │
    │ commissions │            │ (Real-time sync) │
    └─────────────┘            └──────────────────┘
                                       │
                                       ▼
                                ┌──────────────────┐
                                │ Google Apps      │
                                │ Script           │
                                │                  │
                                │ - addRow()       │
                                │ - updateRow()    │
                                │ - getAllRows()   │
                                │ - getRowByEmail()│
                                └──────────────────┘
```

### Data Flow

#### Push (Web → Sheet)
```
User submits referral
    ↓
Form validation
    ↓
Save to CMS (referrals collection)
    ↓
Format data for sheet
    ↓
POST to Google Apps Script
    ↓
Script adds row to Google Sheet
    ↓
Confirmation message to user
```

#### Pull (Sheet → Web) - Future Implementation
```
Scheduled job / Webhook trigger
    ↓
Fetch from Google Sheet via Apps Script
    ↓
Compare with CMS data
    ↓
Update CMS with new/changed data
    ↓
Notify user of updates
```

---

## File Structure

```
src/
├── lib/
│   └── googleSheets.ts              # Main integration service
├── config/
│   └── googleSheets.config.ts       # Configuration management
├── components/
│   └── partner/
│       ├── PartnerSubmitReferralPage.tsx  # Uses Google Sheets
│       ├── PartnerDashboard.tsx           # Can display sheet data
│       └── ...
├── PARTNER_PORTAL_SETUP.md          # Setup guide
├── GOOGLE_SHEETS_IMPLEMENTATION.md  # This file
└── .env.example                     # Environment variables template
```

---

## API Reference

### `initializeGoogleSheets(scriptUrl, sheetName?)`
Initialize the Google Sheets integration.

**Parameters:**
- `scriptUrl` (string): Your Google Apps Script deployment URL
- `sheetName` (string, optional): Name of the sheet (default: 'Referrals')

**Example:**
```typescript
initializeGoogleSheets(
  'https://script.google.com/macros/d/ABC123/usercontent',
  'Referrals'
);
```

### `pushReferralToSheet(data)`
Push a new referral to Google Sheet.

**Parameters:**
- `data` (ReferralSheetData): Referral data object

**Returns:** Promise<boolean>

**Example:**
```typescript
const success = await pushReferralToSheet({
  timestamp: new Date().toISOString(),
  companyName: 'ABC Finance',
  customerName: 'John Smith',
  email: 'john@example.com',
  phone: '0412345678',
  loanType: 'Home Loan',
  loanAmount: '500000',
  submissionDate: '12/01/2024',
  status: 'PENDING',
  commission: '',
  commissionStatus: ''
});
```

### `updateReferralStatusInSheet(customerEmail, status, commission?, commissionStatus?)`
Update an existing referral's status and commission.

**Parameters:**
- `customerEmail` (string): Customer email (used to find the row)
- `status` (string): New status (PENDING, APPROVED, REJECTED)
- `commission` (string, optional): Commission amount
- `commissionStatus` (string, optional): Commission status

**Returns:** Promise<boolean>

**Example:**
```typescript
await updateReferralStatusInSheet(
  'john@example.com',
  'APPROVED',
  '2500',
  'PAID'
);
```

### `formatReferralForSheet(referral, companyName, commission?, commissionStatus?)`
Format internal referral data for Google Sheet.

**Parameters:**
- `referral` (any): Referral object from CMS
- `companyName` (string): Partner company name
- `commission` (string, optional): Commission amount
- `commissionStatus` (string, optional): Commission status

**Returns:** ReferralSheetData

**Example:**
```typescript
const sheetData = formatReferralForSheet(
  referralFromCMS,
  'ABC Finance',
  '2500',
  'PENDING'
);
```

### `isGoogleSheetsConfigured()`
Check if Google Sheets integration is configured.

**Returns:** boolean

**Example:**
```typescript
if (isGoogleSheetsConfigured()) {
  // Safe to use Google Sheets functions
}
```

### `getGoogleSheetsConfig()`
Get current Google Sheets configuration.

**Returns:** GoogleSheetsConfig

**Example:**
```typescript
const config = getGoogleSheetsConfig();
console.log(config.scriptUrl);
```

---

## Type Definitions

### ReferralSheetData
```typescript
interface ReferralSheetData {
  timestamp: string;           // ISO format
  companyName: string;         // Partner company
  customerName: string;        // Customer full name
  email: string;              // Customer email
  phone: string;              // Customer phone
  loanType: string;           // Loan type
  loanAmount: string;         // Loan amount
  submissionDate: string;     // DD/MM/YYYY format
  status: string;             // PENDING, APPROVED, REJECTED
  commission: string;         // Commission amount
  commissionStatus: string;   // PENDING, PAID, WITHHELD
}
```

### GoogleSheetsConfig
```typescript
interface GoogleSheetsConfig {
  scriptUrl: string;          // Apps Script deployment URL
  sheetName?: string;         // Sheet name (default: 'Referrals')
}
```

---

## Error Handling

The service includes built-in error handling:

```typescript
try {
  const success = await pushReferralToSheet(data);
  if (success) {
    console.log('Referral synced to Google Sheet');
  } else {
    console.error('Failed to sync referral');
  }
} catch (error) {
  console.error('Error syncing referral:', error);
}
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Script URL not configured | `initializeGoogleSheets()` not called | Call initialization function |
| 403 Forbidden | Script not deployed as "Anyone" | Redeploy with correct access |
| Sheet not found | Sheet name doesn't match | Check sheet name in script |
| CORS error | Browser blocking request | Use `mode: 'no-cors'` (already done) |
| Timeout | Script taking too long | Check script logs for errors |

---

## Integration Examples

### Example 1: Submit Referral with Sheet Sync
```typescript
import { pushReferralToSheet, formatReferralForSheet } from '@/lib/googleSheets';

const handleSubmitReferral = async (formData) => {
  // Save to CMS
  const referral = await BaseCrudService.create('referrals', {
    _id: crypto.randomUUID(),
    customerName: formData.customerName,
    customerEmail: formData.customerEmail,
    customerPhone: formData.customerPhone,
    loanType: formData.loanType,
    loanAmount: parseFloat(formData.loanAmount),
    referralStatus: 'PENDING',
    submissionDate: new Date().toISOString(),
  });

  // Sync to Google Sheet
  const sheetData = formatReferralForSheet(
    referral,
    partner.companyName,
    '',
    ''
  );
  await pushReferralToSheet(sheetData);
};
```

### Example 2: Update Referral Status
```typescript
import { updateReferralStatusInSheet } from '@/lib/googleSheets';

const handleApproveReferral = async (referral) => {
  // Update CMS
  await BaseCrudService.update('referrals', {
    _id: referral._id,
    referralStatus: 'APPROVED'
  });

  // Update Google Sheet
  await updateReferralStatusInSheet(
    referral.customerEmail,
    'APPROVED',
    '2500',
    'PENDING'
  );
};
```

### Example 3: Check Configuration
```typescript
import { isGoogleSheetsConfigured } from '@/lib/googleSheets';

useEffect(() => {
  if (isGoogleSheetsConfigured()) {
    console.log('Google Sheets is ready');
    // Enable sheet-dependent features
  } else {
    console.warn('Google Sheets not configured');
    // Disable sheet-dependent features
  }
}, []);
```

---

## Testing

### Manual Testing
1. Submit a referral through the portal
2. Check Google Sheet for new row
3. Verify all columns are populated correctly
4. Check browser console for any errors

### Automated Testing (Future)
```typescript
// Example test
describe('Google Sheets Integration', () => {
  it('should push referral to sheet', async () => {
    const data = {
      timestamp: new Date().toISOString(),
      companyName: 'Test Company',
      customerName: 'Test Customer',
      email: 'test@example.com',
      phone: '0412345678',
      loanType: 'Home Loan',
      loanAmount: '500000',
      submissionDate: '12/01/2024',
      status: 'PENDING',
      commission: '',
      commissionStatus: ''
    };

    const result = await pushReferralToSheet(data);
    expect(result).toBe(true);
  });
});
```

---

## Performance Considerations

### Optimization Tips
1. **Batch Operations**: Group multiple updates together
2. **Caching**: Cache sheet data locally to reduce API calls
3. **Async Operations**: Use async/await to prevent blocking
4. **Error Retry**: Implement exponential backoff for failed requests
5. **Rate Limiting**: Respect Google Sheets API rate limits

### Current Limitations
- No real-time bidirectional sync (one-way push only)
- CORS restrictions prevent reading response data
- No built-in retry logic (can be added)
- No offline support (can be added with service workers)

---

## Security Considerations

### Best Practices
1. **Environment Variables**: Store script URL in `.env` file
2. **Access Control**: Ensure Google Sheet is not publicly editable
3. **Data Validation**: Validate all data before pushing to sheet
4. **Error Messages**: Don't expose sensitive information in errors
5. **Audit Trail**: Log all sheet operations

### Current Security
- Uses `mode: 'no-cors'` to prevent CORS attacks
- No authentication required (Apps Script handles it)
- Data is encrypted in transit (HTTPS)
- Google Sheet access controlled by Google account

---

## Troubleshooting Guide

### Issue: Data not appearing in sheet

**Checklist:**
- [ ] Google Apps Script deployed as "Web app"
- [ ] Access set to "Anyone"
- [ ] Script URL is correct
- [ ] Sheet name matches (case-sensitive)
- [ ] Headers are in row 1
- [ ] No errors in Apps Script execution log

**Debug Steps:**
1. Check browser console for fetch errors
2. Check Apps Script execution log
3. Verify script URL in config
4. Test with manual fetch request

### Issue: CORS errors

**Solution:**
- Already handled with `mode: 'no-cors'`
- If still occurring, implement backend proxy

### Issue: Timeout errors

**Solution:**
- Check Apps Script for slow operations
- Optimize sheet size (archive old data)
- Increase timeout in config

### Issue: Sheet not found

**Solution:**
- Verify sheet name is correct
- Script will auto-create if missing
- Check sheet permissions

---

## Future Enhancements

### Phase 1: Bidirectional Sync
- Implement backend proxy for reading responses
- Add periodic polling for sheet updates
- Sync commission updates back to portal

### Phase 2: Real-Time Updates
- Implement WebSocket connection
- Add live notifications
- Real-time dashboard updates

### Phase 3: Advanced Features
- Bulk import/export
- Advanced filtering and search
- Commission automation
- Email notifications
- Audit trail

### Phase 4: Integration
- Connect with loan processing systems
- Automated commission calculation
- Payment processing integration
- Analytics and reporting

---

## Support & Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Partner Portal Setup Guide](/src/PARTNER_PORTAL_SETUP.md)
- [Google Sheets Service](/src/lib/googleSheets.ts)

---

## Version History

### v1.0 (Current)
- Initial implementation
- Push-only sync (Web → Sheet)
- Support for add, update, and query operations
- Environment variable configuration
- Error handling and logging

### v1.1 (Planned)
- Bidirectional sync
- Real-time updates
- Batch operations
- Advanced error handling

### v2.0 (Planned)
- WebSocket real-time sync
- Advanced analytics
- Integration with external systems
