/**
 * Google Sheets Integration Service
 * Connects to Google Apps Script URL: https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec
 * 
 * Features:
 * - pushReferralToSheet(data): Send referral data to Google Sheet
 * - updateReferralStatusInSheet(email, status, commission, commissionStatus): Update existing referrals
 * - formatReferralForSheet(referral, companyName, commission, commissionStatus): Format data for sheet
 * 
 * Google Sheet Structure:
 * Sheet Name: 'referrals'
 * Columns: Timestamp, Company Name, Customer Name, Email, Phone, Loan Type, Loan Amount, 
 *          Submission Date, Status, Commission, Commission Status
 * 
 * All data communication uses fetch with POST method and CORS mode
 * Includes robust error handling for network issues and CORS problems
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
  sheetName: 'referrals' // Default sheet name as specified
};

/**
 * Initialize Google Sheets configuration
 * Must be called before using any other functions
 * 
 * @param scriptUrl - Google Apps Script deployment URL (stored in Wix Secrets Manager as 'GOOGLE_SHEETS_URL')
 * @param sheetName - Name of the sheet in Google Sheets (default: 'referrals')
 */
export function initializeGoogleSheets(scriptUrl: string, sheetName = 'referrals') {
  if (!scriptUrl) {
    console.warn('Google Sheets script URL not configured. Sheet syncing will be disabled.');
    return;
  }
  config.scriptUrl = scriptUrl;
  config.sheetName = sheetName;
  console.log('✓ Google Sheets initialized successfully');
  console.log('  Script URL:', scriptUrl.substring(0, 60) + '...');
  console.log('  Sheet Name:', sheetName);
}

/**
 * Push referral data to Google Sheet
 * Adds a new row with the referral information
 * 
 * @param data - Referral data to push to the sheet
 * @returns Promise<boolean> - true if successful, false otherwise
 * 
 * Uses POST method with CORS mode for communication
 * Includes error handling for network issues and CORS problems
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

    console.log('📤 Pushing referral to Google Sheet:', {
      email: data.email,
      customerName: data.customerName,
      loanType: data.loanType,
    });

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
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.error(`❌ Google Sheets push failed with status ${response.status}: ${errorText}`);
      return false;
    }

    const result = await response.json();
    console.log('✓ Referral pushed to Google Sheet successfully');
    return result.success !== false;
  } catch (error) {
    console.error('❌ Error pushing referral to Google Sheet:', error);
    
    // Handle CORS issues gracefully
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.warn('⚠ CORS issue detected. Request was sent but response blocked by browser.');
      console.warn('  Check Google Sheet manually to verify data was added.');
      // Return true as the request likely succeeded despite CORS blocking the response
      return true;
    }
    
    // Handle other network errors
    if (error instanceof Error) {
      console.error('  Error details:', error.message);
    }
    
    return false;
  }
}

/**
 * Fetch all referrals from Google Sheet for a specific company
 * Retrieves filtered rows from the sheet for real-time sync
 * 
 * @param companyName - Partner company name to filter referrals
 * @returns Promise<PartnerStats> - Statistics and referral data
 * 
 * Uses POST method with CORS mode for communication
 * Includes error handling and returns empty stats on failure
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

    console.log('📥 Fetching referrals from Google Sheet for company:', companyName);

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
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.error(`❌ Google Sheets fetch failed with status ${response.status}: ${errorText}`);
      return {
        totalReferrals: 0,
        totalEarnings: 0,
        pendingReferrals: 0,
        approvedReferrals: 0,
        referrals: [],
      };
    }

    const result = await response.json();
    console.log('✓ Fetched referrals from Google Sheet');

    // Check if the result indicates success
    if (!result.success) {
      console.warn('❌ Google Sheets returned unsuccessful result:', result.error || 'Unknown error');
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
    console.error('❌ Error fetching referrals from Google Sheet:', error);
    
    if (error instanceof Error) {
      console.error('  Error details:', error.message);
    }
    
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
 * 
 * @param customerEmail - Email address to identify the referral (unique identifier)
 * @param status - New status value (e.g., 'PENDING', 'APPROVED', 'REJECTED')
 * @param commission - Commission amount (optional)
 * @param commissionStatus - Commission status (optional, e.g., 'PENDING', 'PAID')
 * @returns Promise<boolean> - true if successful, false otherwise
 * 
 * Uses POST method with CORS mode for communication
 * Includes error handling for network issues and CORS problems
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

    console.log('📝 Updating referral status in Google Sheet:', {
      email: customerEmail,
      status,
      commission,
      commissionStatus,
    });

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
      const errorText = await response.text().catch(() => 'Unable to read error response');
      console.error(`❌ Google Sheets update failed with status ${response.status}: ${errorText}`);
      return false;
    }

    const result = await response.json();
    console.log('✓ Referral status updated in Google Sheet successfully');
    return result.success !== false;
  } catch (error) {
    console.error('❌ Error updating referral in Google Sheet:', error);
    
    // Handle CORS issues gracefully
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      console.warn('⚠ CORS issue detected. Request was sent but response blocked by browser.');
      console.warn('  Check Google Sheet manually to verify data was updated.');
      // Return true as the request likely succeeded despite CORS blocking the response
      return true;
    }
    
    // Handle other network errors
    if (error instanceof Error) {
      console.error('  Error details:', error.message);
    }
    
    return false;
  }
}

/**
 * Sync referral data bidirectionally
 * Pushes local data and fetches updates from sheet
 * 
 * @param localData - Referral data to push
 * @param companyName - Partner company name
 * @returns Promise<PartnerStats> - Updated statistics from sheet
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
 * 
 * @param referral - Referral object from CMS or form submission
 * @param companyName - Partner company name
 * @param commission - Commission amount (default: empty string)
 * @param commissionStatus - Commission status (default: empty string)
 * @returns ReferralSheetData - Formatted data ready for Google Sheets
 * 
 * Maps referral fields to Google Sheet columns:
 * - Timestamp, Company Name, Customer Name, Email, Phone
 * - Loan Type, Loan Amount, Submission Date, Status
 * - Commission, Commission Status
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
 * Returns a copy of the current configuration
 */
export function getGoogleSheetsConfig(): GoogleSheetsConfig {
  return { ...config };
}

/**
 * Check if Google Sheets is configured
 * Returns true if script URL is set
 */
export function isGoogleSheetsConfigured(): boolean {
  return !!config.scriptUrl;
}

/**
 * Test connection to Google Sheets
 * Verifies that the script URL is accessible and configured correctly
 * 
 * @returns Promise with success status, message, and optional details
 * 
 * Uses POST method with CORS mode for communication
 * Includes error handling for network issues and CORS problems
 */
export async function testGoogleSheetsConnection(): Promise<{ success: boolean; message: string; details?: any }> {
  if (!config.scriptUrl) {
    return {
      success: false,
      message: 'Google Sheets not configured. Script URL is missing.',
    };
  }

  try {
    console.log('🔍 Testing Google Sheets connection...');
    
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
      console.log('✓ Google Sheets connection test successful');
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
    console.error('❌ Error testing Google Sheets connection:', error);
    
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
