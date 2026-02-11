/**
 * Google Sheets Configuration
 * 
 * Google Apps Script URL: Set via VITE_GOOGLE_SHEETS_SCRIPT_URL env var
 * Sheet Name: referrals
 * 
 * Sheet Columns:
 * - Timestamp, Company Name, Customer Name, Email, Phone
 * - Loan Type, Loan Amount, Submission Date, Status
 * - Commission, Commission Status
 * 
 * The script URL must be stored in Wix Secrets Manager
 * and accessed via VITE_GOOGLE_SHEETS_SCRIPT_URL environment variable
 */

export const GOOGLE_SHEETS_CONFIG = {
  // Google Apps Script deployment URL
  // This URL connects to the Google Sheet for referral management
  // Must be set via VITE_GOOGLE_SHEETS_SCRIPT_URL environment variable
  scriptUrl: import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL || '',
  
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
  if (!GOOGLE_SHEETS_CONFIG.scriptUrl) {
    console.error(
      'Google Sheets Script URL not configured. ' +
      'Set VITE_GOOGLE_SHEETS_SCRIPT_URL environment variable.'
    );
    return;
  }

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
