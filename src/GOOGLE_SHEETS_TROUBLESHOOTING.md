# Google Sheets Integration - Troubleshooting Guide

## Quick Diagnostics

### 1. Check Configuration Status

Open your browser console and look for these messages on app startup:

```
✓ Google Sheets integration is enabled
  Spreadsheet ID: 13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo
  Sheet Name: Referrals
Google Sheets initialized with URL: https://script.google.com/macros/s/...
```

**If you don't see these messages:**
- Check `/src/config/googleSheets.config.ts` - ensure `enabled: true`
- Verify the script URL is set correctly
- Check that initialization is called in `Router.tsx`

### 2. Test Connection

The Partner Dashboard now includes a connection status indicator:
- **Green Wifi Icon**: ✓ Connected and working
- **Gray Wifi Off Icon**: ✗ Not connected or offline
- **"Data synced from Google Sheets"**: Data is being pulled successfully

### 3. Check Browser Console

When submitting a referral, you should see:
```
Pushing referral to Google Sheet: {action: 'addRow', ...}
✓ Referral pushed to Google Sheet successfully
```

When refreshing the dashboard:
```
Fetching data from Google Sheets for company: YourCompanyName
✓ Fetched referrals from Google Sheet: {success: true, data: [...]}
```

---

## Common Issues & Solutions

### Issue 1: "Google Sheets not configured"

**Symptoms:**
- Console shows: `Google Sheets not configured. Skipping push.`
- No data syncing to sheet
- Connection status shows "Offline"

**Solutions:**

1. **Check the script URL in config:**
   ```typescript
   // /src/config/googleSheets.config.ts
   scriptUrl: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec'
   ```

2. **Verify initialization:**
   ```typescript
   // /src/components/Router.tsx
   if (GOOGLE_SHEETS_CONFIG.enabled && GOOGLE_SHEETS_CONFIG.scriptUrl) {
     initializeGoogleSheets(GOOGLE_SHEETS_CONFIG.scriptUrl, GOOGLE_SHEETS_CONFIG.sheetName);
   }
   ```

3. **Check environment variables (if using):**
   ```bash
   # .env file
   REACT_APP_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/.../exec
   ```

---

### Issue 2: CORS Errors

**Symptoms:**
- Console shows: `Failed to fetch` or CORS-related errors
- Requests appear to fail but data might still be added to sheet

**Solutions:**

1. **Verify Google Apps Script deployment settings:**
   - Go to your Apps Script project
   - Click **Deploy** → **Manage deployments**
   - Check that "Execute as" is set to **Me (your email)**
   - Check that "Who has access" is set to **Anyone**

2. **Redeploy the script:**
   - In Apps Script, click **Deploy** → **New deployment**
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
   - Copy the new URL and update your config

3. **Check the deployment URL format:**
   - Should end with `/exec` (not `/dev` or `/usercontent`)
   - Example: `https://script.google.com/macros/s/AKfycby.../exec`

**Note:** The integration now handles CORS gracefully. If you see a CORS warning but the console says "request was sent", check your Google Sheet - the data likely was added successfully.

---

### Issue 3: Data Not Appearing in Sheet

**Symptoms:**
- No errors in console
- Success messages appear
- But Google Sheet remains empty

**Solutions:**

1. **Verify sheet structure:**
   - Open your Google Sheet
   - Check that row 1 has these exact headers (case-sensitive):
     ```
     Timestamp | Company Name | Customer Name | Email | Phone | Loan Type | Loan Amount | Submission Date | Status | Commission | Commission Status
     ```

2. **Check the sheet name:**
   - In your Google Sheet, verify the tab is named exactly **"Referrals"**
   - Or update the config to match your sheet name:
     ```typescript
     sheetName: 'YourSheetName'
     ```

3. **Test the Apps Script directly:**
   - In Apps Script, click **Run** → Select `testConnection`
   - Check the execution log for errors
   - Should see: `✓ Connection test successful`

4. **Check Apps Script permissions:**
   - Run the script manually once to grant permissions
   - Apps Script → Run → `initializeSheet`
   - Authorize the script when prompted

---

### Issue 4: Dashboard Not Showing Google Sheets Data

**Symptoms:**
- Data is in Google Sheet
- But dashboard shows "No referrals yet"
- Or shows CMS data instead of Sheet data

**Solutions:**

1. **Check company name matching:**
   - The company name in the partner profile must exactly match the "Company Name" in the sheet
   - Case-sensitive
   - Check for extra spaces or special characters

2. **Verify the fetch is working:**
   - Open browser console
   - Click "Refresh" button on dashboard
   - Look for: `Fetching data from Google Sheets for company: YourCompany`
   - Should see: `✓ Fetched referrals from Google Sheet`

3. **Check the response data:**
   - In console, look for the full response object
   - Should have: `{success: true, data: [...], count: X}`
   - If `data` is empty, no rows match your company name

4. **Test with a manual entry:**
   - Add a row directly in Google Sheet
   - Use the exact company name from your partner profile
   - Refresh the dashboard
   - Data should appear

---

### Issue 5: "Connection test failed"

**Symptoms:**
- Connection status shows "Offline"
- Console shows connection test errors

**Solutions:**

1. **Verify the script URL is accessible:**
   - Copy the deployment URL
   - Open it in a new browser tab
   - You should see a JSON response (might be an error, but should respond)

2. **Check for script errors:**
   - In Apps Script, go to **Executions** (left sidebar)
   - Look for failed executions
   - Click on them to see error details

3. **Common script errors:**
   - **"Sheet not found"**: Create a sheet named "Referrals" or update the script
   - **"Permission denied"**: Run the script manually once to authorize
   - **"Spreadsheet not found"**: Check the SPREADSHEET_ID in the script

4. **Redeploy with a new version:**
   - Apps Script → Deploy → Manage deployments
   - Click the pencil icon (Edit)
   - Change "Version" to "New version"
   - Add description: "Troubleshooting deployment"
   - Click **Deploy**
   - Update your config with the new URL

---

### Issue 6: Referrals Submitting but Not Syncing

**Symptoms:**
- Form submission succeeds
- Referral appears in CMS
- But not in Google Sheet

**Solutions:**

1. **Check the submission flow:**
   - Open browser console
   - Submit a referral
   - Look for these messages in order:
     ```
     Pushing referral to Google Sheets...
     Pushing referral to Google Sheet: {...}
     ✓ Referral successfully pushed to Google Sheets
     ```

2. **Verify partner profile has company name:**
   - The partner must have a `companyName` set in their profile
   - Check in console: `Partner company name not available - skipping Google Sheets sync`

3. **Check the payload format:**
   - In console, expand the "Pushing referral to Google Sheet" log
   - Verify all required fields are present:
     - timestamp, companyName, customerName, email, phone, loanType, loanAmount, submissionDate, status

4. **Test with minimal data:**
   - Try submitting a referral with simple, short values
   - No special characters
   - If this works, the issue is with data formatting

---

## Advanced Troubleshooting

### Enable Detailed Logging

Add this to your browser console to see all fetch requests:

```javascript
// Monitor all fetch requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
  console.log('FETCH REQUEST:', args);
  return originalFetch.apply(this, args)
    .then(response => {
      console.log('FETCH RESPONSE:', response);
      return response;
    });
};
```

### Test the Apps Script Directly

Use this in your browser console to test the script:

```javascript
fetch('YOUR_SCRIPT_URL', {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'test'
  })
})
.then(r => r.json())
.then(data => console.log('Test result:', data))
.catch(err => console.error('Test error:', err));
```

### Check Apps Script Execution Log

1. Open your Apps Script project
2. Click **Executions** in the left sidebar
3. Look for recent executions
4. Click on any failed executions to see error details
5. Common errors:
   - **"Exception: Service invoked too many times"**: Rate limit hit, wait a moment
   - **"Exception: Authorization required"**: Run script manually once
   - **"ReferenceError: X is not defined"**: Script code error, check syntax

### Verify Data Format

The data sent to Google Sheets should match this structure:

```javascript
{
  action: 'addRow',
  sheetName: 'Referrals',
  data: {
    timestamp: '2024-01-15T10:30:00.000Z',
    companyName: 'ABC Finance',
    customerName: 'John Smith',
    email: 'john@example.com',
    phone: '0412345678',
    loanType: 'Home Loan',
    loanAmount: '500000',
    submissionDate: '15/01/2024',
    status: 'PENDING',
    commission: '',
    commissionStatus: ''
  }
}
```

---

## Performance Issues

### Slow Dashboard Loading

**Solutions:**

1. **Reduce data volume:**
   - Archive old referrals in Google Sheet
   - Move to a separate "Archive" sheet
   - Keep only recent data in "Referrals" sheet

2. **Optimize fetch frequency:**
   - Don't auto-refresh on every page load
   - Use the manual "Refresh" button
   - Consider caching data locally

3. **Check sheet size:**
   - Large sheets (1000+ rows) can be slow
   - Consider pagination in the Apps Script
   - Or filter by date range

### Rate Limiting

Google Apps Script has quotas:
- **Consumer accounts**: 20,000 URL Fetch calls per day
- **Workspace accounts**: 100,000 URL Fetch calls per day

**Solutions:**
- Implement caching
- Batch operations
- Use webhooks instead of polling

---

## Testing Checklist

Use this checklist to verify your integration:

- [ ] Google Sheet exists with correct name
- [ ] Headers are in row 1 with exact names
- [ ] Apps Script is deployed as Web app
- [ ] Deployment access is set to "Anyone"
- [ ] Script URL is in config file
- [ ] Config has `enabled: true`
- [ ] Initialization is called in Router.tsx
- [ ] Partner profile has company name set
- [ ] Connection status shows "Connected" on dashboard
- [ ] Test referral submission works
- [ ] Data appears in Google Sheet
- [ ] Dashboard refresh pulls data from sheet
- [ ] Console shows no errors

---

## Getting Help

### Information to Provide

When asking for help, include:

1. **Console logs:**
   - Full console output from submission/refresh
   - Any error messages

2. **Configuration:**
   - Script URL (first 50 characters)
   - Sheet name
   - Spreadsheet ID

3. **Apps Script execution log:**
   - Recent executions
   - Any failed executions with error details

4. **What you've tried:**
   - Steps you've already taken
   - What worked/didn't work

### Useful Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Apps Script Quotas](https://developers.google.com/apps-script/guides/services/quotas)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## Success Indicators

Your integration is working correctly when you see:

1. ✓ Connection status shows "Connected" with green wifi icon
2. ✓ Submitting a referral shows success message
3. ✓ Data appears in Google Sheet within seconds
4. ✓ Dashboard shows "Data synced from Google Sheets"
5. ✓ Refresh button updates data from sheet
6. ✓ No errors in browser console
7. ✓ Apps Script execution log shows successful runs

---

## Maintenance

### Regular Checks

- **Weekly**: Check Apps Script execution log for errors
- **Monthly**: Review sheet size and archive old data
- **Quarterly**: Verify deployment is still active
- **Yearly**: Review and update Apps Script code

### Backup Strategy

1. **Google Sheet**: Enable version history
2. **Apps Script**: Keep a copy of the code in your repo
3. **Configuration**: Document all settings
4. **Data**: Regular exports to CSV

---

## Version Information

- **Integration Version**: 1.1
- **Last Updated**: 2024-01-15
- **Google Apps Script Version**: See GOOGLE_APPS_SCRIPT_CODE.gs
- **Compatibility**: React 18+, Wix Vibe platform
