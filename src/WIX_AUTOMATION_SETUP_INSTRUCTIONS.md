# Wix Automation Setup Instructions - Partner Referral Form

Complete step-by-step instructions for setting up Wix Forms and Automation to sync partner referrals to Google Sheets.

---

## 📋 Prerequisites

- ✅ Wix Editor access with Automations enabled
- ✅ Google Sheet ID: `13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo`
- ✅ Google Apps Script Deployment URL: `https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec`

---

## 🎯 Part 1: Create the Wix Form

### Step 1.1: Add a New Form

1. Open your **Wix Editor**
2. Click **Add** (left sidebar)
3. Search for **"Form"**
4. Click **Form** → **Blank Form**
5. Name it: **"Partner Referral Form"**

### Step 1.2: Add Form Fields

Add these fields in order by clicking **Add Field**:

#### Field 1: Customer Name
- **Field Type**: Text Input
- **Field Name**: `customer_name` (or similar)
- **Label**: Customer Name
- **Placeholder**: Full name
- **Required**: ✅ Yes

#### Field 2: Email Address
- **Field Type**: Email
- **Field Name**: `email_address`
- **Label**: Email Address
- **Placeholder**: customer@example.com
- **Required**: ✅ Yes

#### Field 3: Phone Number
- **Field Type**: Phone
- **Field Name**: `phone_number`
- **Label**: Phone Number
- **Placeholder**: 0412 345 678
- **Required**: ✅ Yes

#### Field 4: Loan Type
- **Field Type**: Dropdown
- **Field Name**: `loan_type`
- **Label**: Loan Type
- **Required**: ✅ Yes
- **Options**:
  - Home Loan
  - Car Loan
  - Personal Loan
  - Business Loan
  - Debt Consolidation
  - Other

#### Field 5: Loan Amount
- **Field Type**: Number
- **Field Name**: `loan_amount`
- **Label**: Loan Amount (AUD)
- **Placeholder**: 500000
- **Required**: ✅ Yes
- **Min Value**: 0
- **Step**: 1000

### Step 1.3: Configure Form Settings

1. Click **Form Settings** (gear icon)
2. **Submission Action**: Select "Show a custom message"
3. **Message**: "Thank you! Your referral has been submitted successfully. We'll review it and contact you soon."
4. **Redirect after submission**: Optional (leave unchecked for now)
5. Click **Save**

### Step 1.4: Get Your Form ID

1. Right-click on the form
2. Select **Edit Form Settings**
3. Look for **Form ID** (usually in format: `form_abc123xyz`)
4. **Copy and save this ID** - you'll need it for automation

### Step 1.5: Publish the Form

1. Click **Publish** (top right)
2. Confirm the form is live

---

## 🔄 Part 2: Set Up Wix Automation

### Step 2.1: Create a New Automation

1. In Wix Editor, click **Automations** (left sidebar)
2. Click **Create Automation**
3. Click **Choose a trigger**

### Step 2.2: Select the Trigger

1. Search for **"Form submitted"**
2. Click **Form submitted**
3. Select your **"Partner Referral Form"** from the dropdown
4. Click **Continue**

### Step 2.3: Add the Webhook Action

1. Click **Add Action**
2. Search for **"Webhook"** or **"Make a request"**
3. Click **Webhook** (or similar option)

### Step 2.4: Configure the Webhook

#### Method
- Select: **POST**

#### URL
```
https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec
```

#### Headers
Add a header:
- **Key**: `Content-Type`
- **Value**: `application/json`

#### Body (Request Payload)

Click on the body field and enter the following JSON. **Replace field names** with your actual Wix form field names:

```json
{
  "action": "addRow",
  "source": "wix_form",
  "formId": "YOUR_FORM_ID_HERE",
  "data": {
    "timestamp": "{current_date_time}",
    "companyName": "PARTNER_COMPANY_NAME",
    "customerName": "{customer_name}",
    "email": "{email_address}",
    "phone": "{phone_number}",
    "loanType": "{loan_type}",
    "loanAmount": "{loan_amount}",
    "submissionDate": "{current_date}",
    "status": "PENDING",
    "commission": "",
    "commissionStatus": ""
  }
}
```

### Step 2.5: Map Form Fields

In Wix Automations, you'll see field mapping options. The syntax depends on your Wix version:

**Common Wix field mapping syntax:**
- `{form_field_name}` - For form fields
- `{current_date}` - Current date
- `{current_date_time}` - Current date and time
- `{current_time}` - Current time

**Example mapping:**
```json
{
  "action": "addRow",
  "source": "wix_form",
  "formId": "form_abc123xyz",
  "data": {
    "timestamp": "{current_date_time}",
    "companyName": "Your Company Name",
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

### Step 2.6: Save the Automation

1. Click **Save** (top right)
2. Give your automation a name: **"Sync Partner Referral to Google Sheet"**
3. Toggle **Enable** to turn it on
4. Click **Save**

---

## ✅ Part 3: Test the Integration

### Test 3.1: Manual Form Submission

1. Go to your website where the form is embedded
2. Fill out the form with test data:
   - **Customer Name**: John Test
   - **Email**: john.test@example.com
   - **Phone**: 0412345678
   - **Loan Type**: Home Loan
   - **Loan Amount**: 500000
3. Click **Submit**
4. You should see the success message

### Test 3.2: Check Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo
2. Go to the **"Referrals"** sheet
3. Check if a new row was added with your test data
4. If yes, ✅ integration is working!

### Test 3.3: Check Wix Automation Logs

1. Go to **Automations** in Wix Editor
2. Click on your automation
3. Look for **"Logs"** or **"History"** tab
4. Check if the automation was triggered
5. Look for any error messages

### Test 3.4: Check Google Apps Script Logs

1. Open Google Apps Script: https://script.google.com/home
2. Find your project (associated with the spreadsheet)
3. Click **View** → **Logs**
4. Look for your test submission
5. Check for any error messages

---

## 🔧 Part 4: Troubleshooting

### Issue: Form submission doesn't appear in Google Sheet

**Checklist:**
- [ ] Automation is **enabled** (toggle is on)
- [ ] Webhook URL is correct
- [ ] Form is **published**
- [ ] All required fields are filled in the form
- [ ] Google Sheet has the correct headers

**Solution:**
1. Check Wix Automation logs for errors
2. Check Google Apps Script logs for errors
3. Verify webhook URL is exactly: `https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec`
4. Test webhook manually with cURL (see below)

### Issue: Webhook returns error

**Common errors:**
- `"Missing required fields"` - Not all fields are being sent
- `"Sheet not found"` - Google Sheet doesn't have "Referrals" sheet
- `"Headers mismatch"` - Column headers don't match expected format

**Solution:**
1. Check field names in webhook payload match your form fields
2. Verify Google Sheet has "Referrals" sheet with correct headers
3. Check Google Apps Script logs for detailed error message

### Issue: Field values are empty in Google Sheet

**Cause:** Field mapping syntax is incorrect

**Solution:**
1. Check Wix documentation for correct field mapping syntax
2. Use Wix's field picker in the automation builder
3. Test with hardcoded values first, then add dynamic fields

---

## 🧪 Part 5: Manual Testing with cURL

If you want to test the webhook directly without using Wix:

### Test Command

```bash
curl -X POST "https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "addRow",
    "source": "wix_form",
    "formId": "form_test123",
    "data": {
      "timestamp": "2024-01-12T10:30:00Z",
      "companyName": "Test Company",
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
  }'
```

### Expected Response

```json
{
  "success": true,
  "message": "Referral added successfully",
  "data": {
    "companyName": "Test Company",
    "customerName": "Jane Smith",
    "email": "jane@example.com",
    "status": "PENDING"
  }
}
```

---

## 📊 Part 6: Monitor and Maintain

### Daily Monitoring

1. **Check Google Sheet** for new referrals
2. **Review submission quality** - Are all fields filled correctly?
3. **Monitor for errors** - Check Wix and Google Apps Script logs

### Weekly Tasks

1. **Update referral status** - Mark approved/rejected referrals
2. **Calculate commissions** - Add commission amounts to sheet
3. **Review partner performance** - Analyze referral trends

### Monthly Tasks

1. **Backup Google Sheet** - Download as CSV
2. **Review automation performance** - Check success rate
3. **Update form fields** - Add new loan types or options if needed

---

## 🚀 Part 7: Advanced Configuration

### Add Company Name Dynamically

Currently, company name is hardcoded. To make it dynamic:

1. **Option A**: Add a hidden field to the form that captures the partner's company
2. **Option B**: Use Wix's member/user data to pull company name
3. **Option C**: Create separate forms for each partner company

### Add File Uploads

To support document uploads (e.g., proof of identity):

1. Add **File Upload** field to form
2. Configure Wix file storage
3. Update webhook to include file URLs
4. Store URLs in Google Sheet

### Add Conditional Fields

Show/hide fields based on other field values:

1. Example: Show "Vehicle Details" only if Loan Type = "Car Loan"
2. In Wix Form editor, click **Conditional Logic**
3. Set up rules for field visibility

### Add Email Notifications

Send confirmation emails to partners:

1. In Wix Automation, add another action: **Send Email**
2. Configure email template
3. Set recipient to partner's email

---

## 📞 Support & Debugging

### Check Logs

**Wix Automation Logs:**
1. Go to Automations
2. Click your automation
3. Look for "Logs" or "History" tab
4. Check for errors or failed triggers

**Google Apps Script Logs:**
1. Go to Google Apps Script editor
2. Click **View** → **Logs**
3. Look for your submission
4. Check for error messages

### Common Log Messages

| Message | Meaning | Solution |
|---------|---------|----------|
| `"Missing required fields"` | Not all fields sent | Check field mapping |
| `"Sheet not found"` | Wrong sheet name | Verify sheet is named "Referrals" |
| `"Row data length mismatch"` | Wrong number of columns | Check headers match |
| `"Successfully added row"` | ✅ Working! | No action needed |

---

## 📝 Checklist

- [ ] Created Wix Form with 5 fields
- [ ] Got Form ID from form settings
- [ ] Created Wix Automation with form trigger
- [ ] Added webhook action with correct URL
- [ ] Configured webhook payload with field mapping
- [ ] Enabled automation
- [ ] Tested with manual form submission
- [ ] Verified data appears in Google Sheet
- [ ] Checked Wix automation logs
- [ ] Checked Google Apps Script logs
- [ ] Documented form field names for reference
- [ ] Trained partners on form submission

---

## 📚 Reference

### Google Apps Script Endpoints

**Add Row (Wix Form)**
```
POST /exec
{
  "action": "addRow",
  "source": "wix_form",
  "data": { ... }
}
```

**Get Rows by Company**
```
POST /exec
{
  "action": "getRowsByCompany",
  "companyName": "Company Name"
}
```

**Update Row**
```
POST /exec
{
  "action": "updateRow",
  "identifier": "customer@email.com",
  "data": { "status": "APPROVED" }
}
```

**Test Connection**
```
GET /exec?action=test
```

### Google Sheet Structure

**Sheet Name**: Referrals

**Headers**:
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
11. Commission status

---

## ✨ Next Steps

1. ✅ Complete setup following this guide
2. ✅ Test with multiple form submissions
3. ✅ Train partners on using the form
4. ✅ Monitor submissions daily
5. ✅ Update referral statuses and commissions
6. ✅ Generate reports from Google Sheet

---

**Last Updated**: January 2024
**Version**: 1.0
