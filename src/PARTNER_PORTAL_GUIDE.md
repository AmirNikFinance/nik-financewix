# Referral Partner Portal - Implementation Guide

## Overview

The Referral Partner Portal is a complete system for managing referral partners, tracking commissions, and monitoring referral performance. Partners can register, complete profile setup, and access a comprehensive dashboard with real-time statistics.

## Architecture

### CMS Collections Created

#### 1. **Partners Collection** (`partners`)
Stores partner profile information and status.

**Fields:**
- `_id` (TEXT) - Unique partner identifier
- `companyName` (TEXT) - Legal company name
- `abn` (TEXT) - Australian Business Number (11 digits)
- `bankName` (TEXT) - Bank name for payouts
- `bankAccountName` (TEXT) - Account holder name
- `bankBsb` (TEXT) - Bank State Branch code (6 digits)
- `bankAccountNumber` (TEXT) - Account number (6-10 digits)
- `status` (TEXT) - Partner status: PENDING, APPROVED, ACTIVE, SUSPENDED
- `profileSetupComplete` (BOOLEAN) - Whether profile setup is finished
- `_createdDate` (DATETIME) - Account creation date
- `_updatedDate` (DATETIME) - Last update date

#### 2. **Commissions Collection** (`commissions`)
Tracks all referral commissions earned by partners.

**Fields:**
- `_id` (TEXT) - Unique commission identifier
- `commissionReference` (TEXT) - Unique reference code
- `amount` (NUMBER) - Commission amount in AUD
- `status` (TEXT) - PENDING or PAID
- `dateEarned` (DATE) - When commission was earned
- `datePaid` (DATE) - When commission was paid
- `currency` (TEXT) - Currency code (AUD)
- `_createdDate` (DATETIME) - Record creation date
- `_updatedDate` (DATETIME) - Last update date

#### 3. **Referrals Collection** (`referrals`)
Logs individual referrals submitted by partners.

**Fields:**
- `_id` (TEXT) - Unique referral identifier
- `customerName` (TEXT) - Referred customer's name
- `customerEmail` (TEXT) - Customer's email address
- `customerPhone` (TEXT) - Customer's phone number
- `loanType` (TEXT) - Type of loan (mortgage, personal, business, car, etc.)
- `loanAmount` (NUMBER) - Requested loan amount
- `referralStatus` (TEXT) - PENDING, APPROVED, or REJECTED
- `submissionDate` (DATETIME) - When referral was submitted
- `_createdDate` (DATETIME) - Record creation date
- `_updatedDate` (DATETIME) - Last update date

## Routes & Pages

### Public Routes

#### `/partner-login`
**Component:** `PartnerLoginPage.tsx`
- Dedicated login page for partners
- Features partner portal benefits
- Redirects authenticated users to `/partner-portal`

### Protected Routes (Require Authentication)

#### `/partner-portal`
**Component:** `PartnerPortalPage.tsx`
- Main partner portal entry point
- Routes to profile setup if incomplete
- Routes to dashboard if profile is complete
- Shows welcome message with company name

#### `/partner-portal` (Dashboard)
**Component:** `PartnerDashboard.tsx`
- Overview of partner statistics:
  - Total earnings (all-time)
  - Pending commissions
  - Paid commissions
  - Total referrals
  - Approved referrals
  - Pending referrals
- Recent commissions table (last 5)
- Recent referrals table (last 5)
- Quick action cards for profile, referrals, and commissions

#### `/partner-portal/commissions`
**Component:** `PartnerCommissionsPage.tsx`
- Complete commission history
- Filter by status: ALL, PENDING, PAID
- Summary statistics:
  - Total amount
  - Pending amount
  - Paid amount
- Export to CSV functionality
- Detailed commission table with:
  - Reference number
  - Amount
  - Status badge
  - Date earned
  - Date paid

#### `/partner-portal/referrals`
**Component:** `PartnerReferralsPage.tsx`
- Complete referral history
- Filter by status: ALL, PENDING, APPROVED, REJECTED
- Summary statistics:
  - Total referrals
  - Approved count
  - Pending count
  - Total loan value
- Export to CSV functionality
- Detailed referral table with:
  - Customer name
  - Email
  - Loan type
  - Loan amount
  - Status badge
  - Submission date

#### `/partner-portal/profile`
**Component:** `PartnerProfilePage.tsx`
- Edit partner profile information
- Update company details (name, ABN)
- Update banking information (bank name, account details, BSB)
- Form validation with error messages
- Success confirmation
- Account status display

## User Flow

### 1. Partner Registration
1. Partner visits `/partner-login`
2. Clicks "Register here" link
3. Creates account via Wix Members system
4. Redirected to `/partner-portal`
5. Sees profile setup form (if not complete)

### 2. Profile Setup
1. Partner fills in company information:
   - Company name
   - ABN (validated as 11 digits)
2. Partner fills in banking information:
   - Bank name
   - Account name
   - BSB (validated as 6 digits)
   - Account number (validated as 6-10 digits)
3. Partner submits form
4. Profile saved with status: PENDING
5. Partner sees success message
6. Redirected to dashboard

### 3. Dashboard Access
1. Partner logs in via `/partner-login`
2. Redirected to `/partner-portal`
3. Sees dashboard with:
   - Key statistics
   - Recent commissions
   - Recent referrals
   - Quick action links

### 4. Commission Tracking
1. Partner navigates to `/partner-portal/commissions`
2. Views all commissions with filtering
3. Can export data as CSV
4. Sees pending and paid amounts

### 5. Referral Management
1. Partner navigates to `/partner-portal/referrals`
2. Views all referrals with filtering
3. Can export data as CSV
4. Tracks approval status

### 6. Profile Management
1. Partner navigates to `/partner-portal/profile`
2. Updates company or banking details
3. Changes are saved immediately
4. Sees success confirmation

## Key Features

### Authentication
- Uses Wix Members system
- Auto-approval on registration (status: PENDING)
- Protected routes with `MemberProtectedRoute` wrapper
- Automatic redirect to login for unauthenticated users

### Profile Setup
- Required before dashboard access
- Form validation for all fields
- ABN format validation (11 digits)
- BSB format validation (6 digits)
- Account number validation (6-10 digits)
- Status tracking (PENDING/APPROVED/ACTIVE)

### Dashboard Analytics
- Real-time statistics calculation
- Approval rate percentage
- Total loan value tracking
- Commission breakdown (pending vs paid)

### Data Export
- CSV export for commissions
- CSV export for referrals
- Includes all relevant fields
- Timestamped filenames

### Status Management
- Partner Status: PENDING → APPROVED → ACTIVE → SUSPENDED
- Referral Status: PENDING → APPROVED/REJECTED
- Commission Status: PENDING → PAID

## Data Integration

### Creating Test Data

#### Add a Partner
```typescript
import { BaseCrudService } from '@/integrations';
import { Partners } from '@/entities';

const partner: Partners = {
  _id: 'partner-123',
  companyName: 'ABC Referral Services',
  abn: '12345678901',
  bankName: 'Commonwealth Bank',
  bankAccountName: 'ABC Services Pty Ltd',
  bankBsb: '062000',
  bankAccountNumber: '1234567',
  status: 'ACTIVE',
  profileSetupComplete: true,
};

await BaseCrudService.create('partners', partner);
```

#### Add a Commission
```typescript
const commission: Commissions = {
  _id: 'comm-123',
  commissionReference: 'COMM-2026-001',
  amount: 500,
  status: 'PENDING',
  dateEarned: new Date('2026-01-10'),
  datePaid: null,
  currency: 'AUD',
};

await BaseCrudService.create('commissions', commission);
```

#### Add a Referral
```typescript
const referral: Referrals = {
  _id: 'ref-123',
  customerName: 'John Smith',
  customerEmail: 'john@example.com',
  customerPhone: '0412345678',
  loanType: 'Home Loan',
  loanAmount: 500000,
  referralStatus: 'PENDING',
  submissionDate: new Date(),
};

await BaseCrudService.create('referrals', referral);
```

## Styling & Design

### Color Scheme
- **Primary:** Secondary color (#1e3a5f)
- **Accent:** Accent color (#10b981)
- **Status Colors:**
  - Pending: Yellow (#fbbf24)
  - Approved/Paid: Green (#10b981)
  - Rejected: Red (#ef4444)

### Components Used
- Framer Motion for animations
- Lucide React for icons
- Tailwind CSS for styling
- shadcn/ui components for UI elements

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Tables become scrollable on mobile
- Grid layouts adapt to screen size

## Google Sheets Integration (Future)

To sync commission data to Google Sheets:

1. Set up Google Sheets API credentials
2. Create a scheduled function to:
   - Query commissions collection
   - Filter for new/updated records
   - Append to Google Sheet
3. Include fields:
   - Commission Reference
   - Partner Company Name
   - Amount
   - Status
   - Date Earned
   - Date Paid

Example implementation location: `/src/lib/sheets-sync.ts`

## Security Considerations

1. **Authentication:** All partner routes protected with `MemberProtectedRoute`
2. **Data Validation:** Form validation on client and server
3. **Banking Info:** Stored in CMS (consider encryption for production)
4. **CSV Export:** Client-side only, no server transmission
5. **Access Control:** Partners can only see their own data

## Performance Optimization

1. **Data Fetching:** Parallel requests for commissions and referrals
2. **Caching:** Consider implementing React Query for data caching
3. **Pagination:** Current implementation shows all records (consider pagination for large datasets)
4. **Filtering:** Client-side filtering (consider server-side for large datasets)

## Future Enhancements

1. **Referral Link Generation:** Unique links for each partner
2. **Performance Charts:** Visual analytics with Recharts
3. **Notifications:** Email alerts for new commissions
4. **Bulk Actions:** Approve/reject multiple referrals
5. **Commission Tiers:** Different rates based on loan type/amount
6. **Partner Leaderboard:** Top performers ranking
7. **API Integration:** Webhook for external systems
8. **Two-Factor Authentication:** Enhanced security
9. **Audit Logs:** Track all changes
10. **Mobile App:** Native mobile experience

## Troubleshooting

### Partner Profile Not Saving
- Check ABN format (must be 11 digits)
- Check BSB format (must be 6 digits)
- Check account number (must be 6-10 digits)
- Verify member is authenticated

### Dashboard Not Loading
- Check if profile setup is complete
- Verify commissions and referrals collections exist
- Check browser console for errors

### Export CSV Not Working
- Verify browser allows downloads
- Check if data exists in table
- Try different browser

## Support & Maintenance

- Monitor CMS collection sizes
- Archive old referrals/commissions periodically
- Update partner status based on performance
- Regular security audits
- Performance monitoring

---

**Last Updated:** January 2026
**Version:** 1.0
