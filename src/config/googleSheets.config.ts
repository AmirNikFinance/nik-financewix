/**
 * Google Sheets Configuration
 * 
 * Google Apps Script URL: https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec
 * Sheet Name: referrals
 * 
 * Sheet Columns:
 * - Timestamp, Company Name, Customer Name, Email, Phone
 * - Loan Type, Loan Amount, Submission Date, Status
 * - Commission, Commission Status
 * 
 * The script URL can be stored in Wix Secrets Manager as 'GOOGLE_SHEETS_URL'
 * and accessed via environment variables for security
 */

export const GOOGLE_SHEETS_CONFIG = {
  // Google Apps Script deployment URL
  // This URL connects to the Google Sheet for referral management
  // Can be overridden with VITE_GOOGLE_SHEETS_SCRIPT_URL environment variable
  scriptUrl: import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec',
  
  // Sheet name (must match the sheet tab name in Google Sheets)
  // Default: 'referrals' as specified in requirements
  sheetName: import.meta.env.VITE_GOOGLE_SHEETS_SHEET_NAME || 'referrals',
  
  // Enable/disable Google Sheets integration
  enabled: import.meta.env.VITE_GOOGLE_SHEETS_ENABLED === 'true' || true,
  
  // Retry configuration for failed requests
  maxRetries: 3,
  retryDelay: 1000, // milliseconds
  
  // Timeout configuration for requests
  timeout: 10000, // milliseconds (10 seconds)
};

/**
 * Initialize Google Sheets configuration from environment variables
 * Call this function on app startup to verify configuration
 * 
 * Logs configuration status to console for debugging
 */
export function initializeGoogleSheetsConfig() {
  if (!GOOGLE_SHEETS_CONFIG.enabled) {
    console.warn(
      '⚠ Google Sheets integration is disabled. ' +
      'Set VITE_GOOGLE_SHEETS_ENABLED=true environment variable to enable it.'
    );
  } else {
    console.log('✓ Google Sheets integration is enabled');
    console.log('  Script URL:', GOOGLE_SHEETS_CONFIG.scriptUrl.substring(0, 60) + '...');
    console.log('  Sheet Name:', GOOGLE_SHEETS_CONFIG.sheetName);
    console.log('  Max Retries:', GOOGLE_SHEETS_CONFIG.maxRetries);
    console.log('  Timeout:', GOOGLE_SHEETS_CONFIG.timeout + 'ms');
  }
}
