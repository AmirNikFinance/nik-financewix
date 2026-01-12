# Wix Forms Integration - Quick Reference Card

## 🎯 Quick Links

| Resource | Location |
|----------|----------|
| **Setup Instructions** | `/src/WIX_AUTOMATION_SETUP_INSTRUCTIONS.md` |
| **Technical Guide** | `/src/WIX_FORMS_INTEGRATION_GUIDE.md` |
| **Integration Summary** | `/src/WIX_INTEGRATION_SUMMARY.md` |
| **Google Apps Script** | `/src/GOOGLE_APPS_SCRIPT_CODE.gs` |
| **Google Sheet** | https://docs.google.com/spreadsheets/d/13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo |

---

## 🔑 Key Information

### Google Apps Script Webhook URL
```
https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec
```

### Google Sheet Details
- **ID**: `13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo`
- **Sheet Name**: `Referrals`
- **Headers**: Timestamp, Company Name, Customer Name, Email, Phone, Loan Type, Loan Amount, Submission Date, Status, Commission, Commission status

---

## 📋 Form Fields

| Field | Type | Required | Example |
|-------|------|----------|---------|
| Customer Name | Text | ✅ Yes | John Doe |
| Email Address | Email | ✅ Yes | john@example.com |
| Phone Number | Phone | ✅ Yes | 0412345678 |
| Loan Type | Dropdown | ✅ Yes | Home Loan |
| Loan Amount | Number | ✅ Yes | 500000 |

### Loan Type Options
- Home Loan
- Car Loan
- Personal Loan
- Business Loan
- Debt Consolidation
- Other

---

## 🔄 Webhook Payload Template

```json
{
  "action": "addRow",
  "source": "wix_form",
  "formId": "YOUR_FORM_ID",
  "data": {
    "timestamp": "{current_date_time}",
    "companyName": "PARTNER_COMPANY_NAME",
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

---

## 🧪 Quick Test

### Test with cURL
```bash
curl -X POST "https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "addRow",
    "source": "wix_form",
    "data": {
      "timestamp": "2024-01-12T10:30:00Z",
      "companyName": "Test Company",
      "customerName": "Test User",
      "email": "test@example.com",
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

### Expected Response
```json
{
  "success": true,
  "message": "Referral added successfully",
  "data": {
    "companyName": "Test Company",
    "customerName": "Test User",
    "email": "test@example.com",
    "status": "PENDING"
  }
}
```

---

## ⚡ 5-Minute Setup

### Step 1: Create Form (2 min)
1. Wix Editor → Add → Form → Blank Form
2. Add 5 fields: Customer Name, Email, Phone, Loan Type, Loan Amount
3. Publish form
4. Copy Form ID

### Step 2: Create Automation (2 min)
1. Automations → Create Automation
2. Trigger: Form submitted → Select your form
3. Action: Webhook (POST)
4. URL: `https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec`
5. Body: Use payload template above
6. Enable automation

### Step 3: Test (1 min)
1. Submit test form
2. Check Google Sheet for new row
3. Done! ✅

---

## 🔍 Troubleshooting

### No data in Google Sheet?
- [ ] Automation is enabled
- [ ] Webhook URL is correct
- [ ] Form is published
- [ ] All required fields filled
- [ ] Check Wix automation logs

### Webhook errors?
- [ ] Check Google Apps Script logs
- [ ] Verify field mapping syntax
- [ ] Test with cURL command
- [ ] Verify Google Sheet headers

### Empty fields in sheet?
- [ ] Check field mapping in automation
- [ ] Use Wix's field picker
- [ ] Test with hardcoded values first

---

## 📊 Google Apps Script API

### Add Row
```json
{
  "action": "addRow",
  "source": "wix_form",
  "data": { ... }
}
```

### Get Rows by Company
```json
{
  "action": "getRowsByCompany",
  "companyName": "Company Name"
}
```

### Update Row
```json
{
  "action": "updateRow",
  "identifier": "customer@email.com",
  "data": {
    "status": "APPROVED",
    "commission": "500"
  }
}
```

### Get All Rows
```json
{
  "action": "getAllRows"
}
```

### Test Connection
```
GET /exec?action=test
```

---

## 📝 Wix Field Mapping

Common Wix automation field syntax:
- `{form_field_name}` - Form field value
- `{current_date}` - Current date (YYYY-MM-DD)
- `{current_date_time}` - Current date & time (ISO format)
- `{current_time}` - Current time

**Note**: Exact syntax may vary by Wix version. Use Wix's field picker in automation builder.

---

## ✅ Implementation Checklist

- [ ] Create Wix Form with 5 fields
- [ ] Get Form ID
- [ ] Publish form
- [ ] Create Wix Automation
- [ ] Add webhook action
- [ ] Configure payload
- [ ] Enable automation
- [ ] Test with form submission
- [ ] Verify data in Google Sheet
- [ ] Check logs
- [ ] Train partners
- [ ] Monitor submissions

---

## 🎯 Success Indicators

✅ Working when:
- Form submissions appear in Google Sheet within seconds
- All fields captured correctly
- No errors in logs
- Multiple submissions work consistently

---

## 📞 Support

**Need help?**
1. Check logs in Wix Automations
2. Check logs in Google Apps Script
3. Review documentation files
4. Test with cURL command
5. Verify Google Sheet structure

**Documentation:**
- Setup: `WIX_AUTOMATION_SETUP_INSTRUCTIONS.md`
- Technical: `WIX_FORMS_INTEGRATION_GUIDE.md`
- Summary: `WIX_INTEGRATION_SUMMARY.md`

---

## 🔐 Security

- ✅ Wix Automations are authenticated
- ✅ Google Apps Script validates inputs
- ✅ Data encrypted in transit (HTTPS)
- ✅ No sensitive data in logs

---

## 📈 Monitoring

### Daily
- Check Google Sheet for new submissions
- Review submission quality

### Weekly
- Update referral statuses
- Calculate commissions
- Review partner performance

### Monthly
- Backup Google Sheet
- Review automation performance
- Analyze trends

---

## 🚀 Next Steps

1. **Now**: Read this quick reference
2. **Today**: Follow 5-minute setup above
3. **Tomorrow**: Test with multiple submissions
4. **This Week**: Train partners
5. **Ongoing**: Monitor and maintain

---

**Last Updated**: January 2024
**Version**: 1.0
**Status**: Ready to Use ✅
