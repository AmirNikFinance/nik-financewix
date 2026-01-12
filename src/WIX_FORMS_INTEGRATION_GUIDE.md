# Wix Forms Integration Guide for Partner Referral Submissions

This guide explains how to integrate Wix Forms with the Partner Portal referral system and set up automation to sync submissions to Google Sheets.

## Overview

The integration consists of three main components:

1. **Wix Form** - Collects referral data from partners
2. **Wix Automation** - Triggers when form is submitted
3. **Google Apps Script Webhook** - Receives and processes the form data

## Step 1: Create the Wix Form

### 1.1 Create a New Form in Wix

1. Go to your Wix Editor
2. Navigate to **Add** → **Forms** → **Form**
3. Choose **Blank Form** or customize from a template
4. Name it: **"Partner Referral Form"**

### 1.2 Add Form Fields

Add the following fields to your form in this order:

| Field Name | Field Type | Required | Placeholder |
|---|---|---|---|
| Customer Name | Text Input | Yes | Full name |
| Email Address | Email | Yes | customer@example.com |
| Phone Number | Phone | Yes | 0412 345 678 |
| Loan Type | Dropdown | Yes | Select a loan type |
| Loan Amount | Number | Yes | 500000 |

### 1.3 Configure Dropdown Options

For the **Loan Type** dropdown, add these options:
- Home Loan
- Car Loan
- Personal Loan
- Business Loan
- Debt Consolidation
- Other

### 1.4 Form Settings

1. Go to **Form Settings**
2. Set **Submission Action** to: "Show a custom message"
3. Message: "Thank you! Your referral has been submitted successfully."
4. **Enable** "Redirect after submission" (optional)
5. Get the **Form ID** from the form properties (you'll need this for automation)

## Step 2: Set Up Wix Automation

### 2.1 Create a New Automation

1. In Wix Editor, go to **Automations**
2. Click **Create Automation**
3. Choose **Trigger**: "Form submitted"
4. Select your **"Partner Referral Form"**

### 2.2 Add Webhook Action

1. Click **Add Action**
2. Search for **"Webhook"** or **"Make a request"**
3. Select **POST** method
4. Enter the **Google Apps Script Deployment URL**:
   ```
   https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec
   ```

### 2.3 Configure Webhook Payload

Set the request body to send form data. The payload should map form fields to the expected structure:

```json
{
  "action": "addRow",
  "source": "wix_form",
  "formId": "YOUR_FORM_ID",
  "data": {
    "timestamp": "{current_date_time}",
    "companyName": "{partner_company_name}",
    "customerName": "{form_field_customer_name}",
    "email": "{form_field_email_address}",
    "phone": "{form_field_phone_number}",
    "loanType": "{form_field_loan_type}",
    "loanAmount": "{form_field_loan_amount}",
    "submissionDate": "{current_date}",
    "status": "PENDING",
    "commission": "",
    "commissionStatus": ""
  }
}
```

### 2.4 Important Notes

- **Partner Company Name**: You'll need to capture this from the authenticated partner's profile
- **Form Field Variables**: Wix Automations use specific syntax for form fields (e.g., `{form_field_customer_name}`)
- **Date Format**: Ensure dates are in ISO format or the format expected by your Google Sheet

## Step 3: Update Google Apps Script

The Google Apps Script has been updated to handle Wix Form webhook payloads. The script now:

1. **Accepts Wix Form submissions** via the `doPost` handler
2. **Validates the payload** structure
3. **Extracts form data** from the Wix webhook
4. **Adds rows to Google Sheet** with proper formatting
5. **Returns success/error responses** to Wix

### 3.1 Key Changes to Google Apps Script

The script now includes:

- **Enhanced `doPost` handler** - Processes both custom API calls and Wix Form webhooks
- **Wix payload validation** - Checks for required fields
- **Automatic timestamp generation** - Uses current date/time if not provided
- **Error logging** - Detailed logging for debugging

### 3.2 Testing the Integration

#### Test 1: Direct API Call (via cURL or Postman)

```bash
curl -X POST "https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "addRow",
    "source": "wix_form",
    "data": {
      "timestamp": "2024-01-12T10:00:00Z",
      "companyName": "Test Company",
      "customerName": "John Doe",
      "email": "john@example.com",
      "phone": "0412345678",
      "loanType": "Home Loan",
      "loanAmount": "500000",
      "submissionDate": "2024-01-12",
      "status": "PENDING",
      "commission": "",
      "commissionStatus": ""
    }
  }'
```

#### Test 2: Connection Test

```bash
curl "https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec?action=test"
```

## Step 4: Update Partner Portal UI (Optional)

You can replace the custom referral form with an embedded Wix Form:

### Option A: Embed Wix Form in React Component

```tsx
// In PartnerSubmitReferralPage.tsx
import { useEffect } from 'react';

export default function PartnerSubmitReferralPage() {
  useEffect(() => {
    // Load Wix Forms script
    const script = document.createElement('script');
    script.src = 'https://www.wix.com/velo/wix-forms.js';
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-light-gray flex flex-col">
      <PartnerPortalHeader />
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 md:px-12 py-16">
        {/* Embed Wix Form */}
        <div id="wix-form-container">
          {/* Form will be embedded here */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
```

### Option B: Keep Custom Form (Recommended)

The current custom form in `PartnerSubmitReferralPage.tsx` works well. You can:
1. Keep the custom form for better UI control
2. Have Wix Form as an alternative submission method
3. Both will sync to Google Sheets via the same webhook

## Step 5: Webhook Payload Handling

### Wix Form Webhook Structure

When Wix submits the form, it sends a payload like:

```json
{
  "action": "addRow",
  "source": "wix_form",
  "formId": "abc123xyz",
  "data": {
    "timestamp": "2024-01-12T10:30:00Z",
    "companyName": "Partner Company Name",
    "customerName": "Jane Smith",
    "email": "jane@example.com",
    "phone": "0487654321",
    "loanType": "Car Loan",
    "loanAmount": "45000",
    "submissionDate": "2024-01-12",
    "status": "PENDING",
    "commission": "",
    "commissionStatus": ""
  }
}
```

### Google Apps Script Processing

The script:
1. Receives the webhook POST request
2. Parses the JSON payload
3. Validates all required fields are present
4. Appends a new row to the "Referrals" sheet
5. Returns success response with details

## Step 6: Troubleshooting

### Issue: Form submissions not appearing in Google Sheet

**Solution:**
1. Check Google Apps Script logs:
   - Go to Google Apps Script editor
   - Click **View** → **Logs**
   - Look for error messages
2. Verify webhook URL is correct
3. Test with cURL command above
4. Check that Google Sheet has proper headers

### Issue: Wix Automation not triggering

**Solution:**
1. Verify form is published
2. Check automation is enabled
3. Test form submission manually
4. Check Wix automation logs

### Issue: Data format errors

**Solution:**
1. Ensure all field values are strings or numbers (not objects)
2. Check date format is ISO 8601 (YYYY-MM-DDTHH:mm:ssZ)
3. Verify loan amount is a valid number

## Step 7: Monitoring and Maintenance

### Monitor Submissions

1. **Google Sheet**: Check the "Referrals" sheet for new entries
2. **Google Apps Script Logs**: Monitor for errors
3. **Wix Analytics**: Track form submission rates

### Update Partner Company Name

The webhook payload includes `companyName`. You can:
1. **Hardcode** it in the Wix Automation
2. **Fetch dynamically** from partner profile (requires additional setup)
3. **Prompt user** to select company during form submission

## Step 8: Advanced Configuration

### Add Custom Fields

To add more fields to the form:

1. Add field to Wix Form
2. Update Google Sheet headers (if needed)
3. Update webhook payload mapping
4. Update Google Apps Script field handling

### Add Conditional Logic

Wix Forms support conditional fields:
1. Show/hide fields based on other field values
2. Example: Show "Vehicle Details" only if Loan Type = "Car Loan"

### Add File Uploads

To support document uploads:
1. Add File Upload field to Wix Form
2. Configure file storage in Wix
3. Update webhook to include file URLs
4. Store file URLs in Google Sheet

## API Reference

### Google Apps Script Endpoints

#### Add Row (Wix Form Submission)
```
POST /exec
Content-Type: application/json

{
  "action": "addRow",
  "source": "wix_form",
  "data": { ... }
}
```

#### Get Rows by Company
```
POST /exec
Content-Type: application/json

{
  "action": "getRowsByCompany",
  "companyName": "Company Name"
}
```

#### Update Row
```
POST /exec
Content-Type: application/json

{
  "action": "updateRow",
  "identifier": "customer@email.com",
  "data": {
    "status": "APPROVED",
    "commission": "500"
  }
}
```

#### Get All Rows
```
POST /exec
Content-Type: application/json

{
  "action": "getAllRows"
}
```

#### Test Connection
```
GET /exec?action=test
```

## Security Considerations

1. **Webhook Security**: Wix Automations are authenticated by Wix
2. **Data Validation**: Google Apps Script validates all inputs
3. **Error Handling**: Script logs all errors for debugging
4. **CORS**: Google Apps Script handles CORS automatically

## Next Steps

1. ✅ Create Wix Form with required fields
2. ✅ Set up Wix Automation with webhook
3. ✅ Test webhook with cURL command
4. ✅ Monitor Google Sheet for submissions
5. ✅ Update Partner Portal UI (if needed)
6. ✅ Train partners on form submission process

## Support

For issues or questions:
1. Check Google Apps Script logs
2. Review this guide's troubleshooting section
3. Test webhook with cURL command
4. Verify Google Sheet structure matches expected headers
