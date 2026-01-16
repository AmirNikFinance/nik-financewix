/**
 * Google Sheets Configuration
 * 
 * Spreadsheet ID: 13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo
 * Sheet Name: Referrals
 * Deployment URL: https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec
 */

export const GOOGLE_SHEETS_CONFIG = {
  // Google Apps Script deployment URL
  // This is the production deployment URL for the referral management script
  scriptUrl: import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzis07haVEhz7AEtU3jlg1km_T_XhS2ZHp8sQMq9AmX46UEZtmXJt6zA4G5Tu_caXbC6Q/exec',
  
  // Sheet name (must match the sheet in your Google Sheets document)
  sheetName: import.meta.env.VITE_GOOGLE_SHEETS_SHEET_NAME || 'Referrals',
  
  // Spreadsheet ID for reference
  spreadsheetId: '13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo',
  
  // Enable/disable Google Sheets integration
  enabled: import.meta.env.VITE_GOOGLE_SHEETS_ENABLED === 'true' || true,
  
  // Retry configuration
  maxRetries: 3,
  retryDelay: 1000, // milliseconds
  
  // Timeout configuration
  timeout: 10000, // milliseconds
};

/**
 * Initialize Google Sheets configuration from environment variables
 * Call this function on app startup
 */
export function initializeGoogleSheetsConfig() {
  if (!GOOGLE_SHEETS_CONFIG.enabled) {
    console.warn(
      'Google Sheets integration is disabled. ' +
      'Set VITE_GOOGLE_SHEETS_ENABLED environment variable to enable it.'
    );
  } else {
    console.log('✓ Google Sheets integration is enabled');
    console.log('  Script URL: ' + GOOGLE_SHEETS_CONFIG.scriptUrl);
    console.log('  Sheet Name: ' + GOOGLE_SHEETS_CONFIG.sheetName);
  }
}
