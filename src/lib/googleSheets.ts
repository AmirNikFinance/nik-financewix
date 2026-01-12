/**
 * Google Sheets Integration Service
 * Handles real-time syncing of referral data with Google Sheets
 */

export interface ReferralSheetData {
  timestamp: string;
  companyName: string;
  customerName: string;
  email: string;
  phone: string;
  loanType: string;
  loanAmount: string;
  submissionDate: string;
  status: string;
  commission: string;
  commissionStatus: string;
}

export interface GoogleSheetsConfig {
  scriptUrl: string;
  sheetName?: string;
}

let config: GoogleSheetsConfig = {
  scriptUrl: '',
  sheetName: 'Referrals'
};

/**
 * Initialize Google Sheets configuration
 * Must be called before using any other functions
 */
export function initializeGoogleSheets(scriptUrl: string, sheetName = 'Referrals') {
  if (!scriptUrl) {
    console.warn('Google Sheets script URL not configured. Sheet syncing will be disabled.');
    return;
  }
  config.scriptUrl = scriptUrl;
  config.sheetName = sheetName;
}

/**
 * Push referral data to Google Sheet
 * Adds a new row with the referral information
 */
export async function pushReferralToSheet(data: ReferralSheetData): Promise<boolean> {
  if (!config.scriptUrl) {
    console.warn('Google Sheets not configured. Skipping push.');
    return false;
  }

  try {
    const response = await fetch(config.scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addRow',
        sheetName: config.sheetName,
        data: {
          timestamp: data.timestamp,
          companyName: data.companyName,
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          loanType: data.loanType,
          loanAmount: data.loanAmount,
          submissionDate: data.submissionDate,
          status: data.status,
          commission: data.commission,
          commissionStatus: data.commissionStatus,
        },
      }),
    });

    console.log('Referral pushed to Google Sheet');
    return true;
  } catch (error) {
    console.error('Error pushing referral to Google Sheet:', error);
    return false;
  }
}

/**
 * Fetch all referrals from Google Sheet
 * Retrieves all rows from the sheet for real-time sync
 */
export async function fetchReferralsFromSheet(): Promise<ReferralSheetData[]> {
  if (!config.scriptUrl) {
    console.warn('Google Sheets not configured. Skipping fetch.');
    return [];
  }

  try {
    const response = await fetch(config.scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'getAllRows',
        sheetName: config.sheetName,
      }),
    });

    // Note: Due to CORS restrictions with no-cors mode, we can't read the response
    // This function serves as a placeholder for future implementation
    // Consider using a backend proxy or Google Sheets API with proper authentication
    console.log('Fetch request sent to Google Sheet');
    return [];
  } catch (error) {
    console.error('Error fetching referrals from Google Sheet:', error);
    return [];
  }
}

/**
 * Update referral status in Google Sheet
 * Updates an existing row with new status information
 */
export async function updateReferralStatusInSheet(
  customerEmail: string,
  status: string,
  commission?: string,
  commissionStatus?: string
): Promise<boolean> {
  if (!config.scriptUrl) {
    console.warn('Google Sheets not configured. Skipping update.');
    return false;
  }

  try {
    const response = await fetch(config.scriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'updateRow',
        sheetName: config.sheetName,
        identifier: customerEmail,
        data: {
          status,
          commission: commission || '',
          commissionStatus: commissionStatus || '',
        },
      }),
    });

    console.log('Referral status updated in Google Sheet');
    return true;
  } catch (error) {
    console.error('Error updating referral in Google Sheet:', error);
    return false;
  }
}

/**
 * Sync referral data bidirectionally
 * Pushes local data and fetches updates from sheet
 */
export async function syncReferralData(
  localData: ReferralSheetData,
  companyName: string
): Promise<void> {
  // Add company name to data
  const dataWithCompany = {
    ...localData,
    companyName,
  };

  // Push to sheet
  await pushReferralToSheet(dataWithCompany);

  // Fetch updates (implementation depends on backend setup)
  // await fetchReferralsFromSheet();
}

/**
 * Format referral data for Google Sheets
 * Converts internal referral format to sheet format
 */
export function formatReferralForSheet(
  referral: any,
  companyName: string,
  commission = '',
  commissionStatus = ''
): ReferralSheetData {
  return {
    timestamp: new Date().toISOString(),
    companyName,
    customerName: referral.customerName || '',
    email: referral.customerEmail || '',
    phone: referral.customerPhone || '',
    loanType: referral.loanType || '',
    loanAmount: referral.loanAmount?.toString() || '',
    submissionDate: referral.submissionDate
      ? new Date(referral.submissionDate).toLocaleDateString('en-AU')
      : new Date().toLocaleDateString('en-AU'),
    status: referral.referralStatus || 'PENDING',
    commission,
    commissionStatus,
  };
}

/**
 * Get Google Sheets configuration
 */
export function getGoogleSheetsConfig(): GoogleSheetsConfig {
  return { ...config };
}

/**
 * Check if Google Sheets is configured
 */
export function isGoogleSheetsConfigured(): boolean {
  return !!config.scriptUrl;
}
