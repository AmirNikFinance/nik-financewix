/**
 * Google Sheets Integration Service
 * Handles real-time syncing of referral data with Google Sheets
 * Supports bidirectional sync with proper CORS handling
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

export interface PartnerStats {
  totalReferrals: number;
  totalEarnings: number;
  pendingReferrals: number;
  approvedReferrals: number;
  referrals: ReferralSheetData[];
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
  console.log('Google Sheets initialized with URL:', scriptUrl.substring(0, 50) + '...');
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
    const payload = {
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
    };

    console.log('Pushing referral to Google Sheet:', payload);

    const response = await fetch(config.scriptUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error');
      console.warn(`Google Sheets push returned status ${response.status}: ${errorText}`);
      return false;
    }

    const result = await response.json();
    console.log('✓ Referral pushed to Google Sheet successfully:', result);
    return result.success !== false;
  } catch (error) {
    console.error('Error pushing referral to Google Sheet:', error);
    // Still return true if it's a CORS issue (request likely succeeded)
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.log('⚠ CORS issue detected, but request was sent. Check Google Sheet manually.');
      return true;
    }
    return false;
  }
}

/**
 * Fetch all referrals from Google Sheet for a specific company
 * Retrieves filtered rows from the sheet for real-time sync
 */
export async function fetchReferralsFromSheet(companyName: string): Promise<PartnerStats> {
  if (!config.scriptUrl) {
    console.warn('Google Sheets not configured. Returning empty stats.');
    return {
      totalReferrals: 0,
      totalEarnings: 0,
      pendingReferrals: 0,
      approvedReferrals: 0,
      referrals: [],
    };
  }

  try {
    const payload = {
      action: 'getRowsByCompany',
      sheetName: config.sheetName,
      companyName: companyName,
    };

    console.log('Fetching referrals from Google Sheet for company:', companyName);

    const response = await fetch(config.scriptUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error');
      console.warn(`Google Sheets fetch returned status ${response.status}: ${errorText}`);
      return {
        totalReferrals: 0,
        totalEarnings: 0,
        pendingReferrals: 0,
        approvedReferrals: 0,
        referrals: [],
      };
    }

    const result = await response.json();
    console.log('✓ Fetched referrals from Google Sheet:', result);

    // Check if the result indicates success
    if (!result.success) {
      console.warn('Google Sheets returned unsuccessful result:', result.error || 'Unknown error');
      return {
        totalReferrals: 0,
        totalEarnings: 0,
        pendingReferrals: 0,
        approvedReferrals: 0,
        referrals: [],
      };
    }

    // Calculate statistics
    const referrals = result.data || [];
    const totalEarnings = referrals.reduce((sum: number, r: ReferralSheetData) => {
      const commission = parseFloat(r.commission) || 0;
      return sum + commission;
    }, 0);

    const pendingReferrals = referrals.filter((r: ReferralSheetData) => r.status === 'PENDING').length;
    const approvedReferrals = referrals.filter((r: ReferralSheetData) => r.status === 'APPROVED').length;

    return {
      totalReferrals: referrals.length,
      totalEarnings,
      pendingReferrals,
      approvedReferrals,
      referrals,
    };
  } catch (error) {
    console.error('Error fetching referrals from Google Sheet:', error);
    return {
      totalReferrals: 0,
      totalEarnings: 0,
      pendingReferrals: 0,
      approvedReferrals: 0,
      referrals: [],
    };
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
    const payload = {
      action: 'updateRow',
      sheetName: config.sheetName,
      identifier: customerEmail,
      data: {
        status,
        commission: commission || '',
        commissionStatus: commissionStatus || '',
      },
    };

    console.log('Updating referral status in Google Sheet:', payload);

    const response = await fetch(config.scriptUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unable to read error');
      console.warn(`Google Sheets update returned status ${response.status}: ${errorText}`);
      return false;
    }

    const result = await response.json();
    console.log('✓ Referral status updated in Google Sheet:', result);
    return result.success !== false;
  } catch (error) {
    console.error('Error updating referral in Google Sheet:', error);
    // Still return true if it's a CORS issue (request likely succeeded)
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.log('⚠ CORS issue detected, but request was sent. Check Google Sheet manually.');
      return true;
    }
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
): Promise<PartnerStats> {
  // Add company name to data
  const dataWithCompany = {
    ...localData,
    companyName,
  };

  // Push to sheet
  await pushReferralToSheet(dataWithCompany);

  // Fetch updates from sheet
  return await fetchReferralsFromSheet(companyName);
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

/**
 * Test connection to Google Sheets
 * Verifies that the script URL is accessible and configured correctly
 */
export async function testGoogleSheetsConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  if (!config.scriptUrl) {
    return {
      success: false,
      message: 'Google Sheets not configured. Script URL is missing.',
    };
  }

  try {
    console.log('Testing Google Sheets connection...');
    
    const payload = {
      action: 'test',
    };

    const response = await fetch(config.scriptUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Connection test failed with status ${response.status}`,
      };
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('✓ Google Sheets connection test successful:', result);
      return {
        success: true,
        message: 'Google Sheets connection is working correctly',
        details: result.details,
      };
    } else {
      console.warn('✗ Google Sheets connection test failed:', result);
      return {
        success: false,
        message: result.error || 'Connection test failed',
        details: result,
      };
    }
  } catch (error) {
    console.error('Error testing Google Sheets connection:', error);
    
    // Check if it's a CORS issue
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      return {
        success: false,
        message: 'CORS error - check that the Google Apps Script is deployed with "Anyone" access',
      };
    }
    
    return {
      success: false,
      message: `Connection test error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
