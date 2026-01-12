/**
 * Google Sheets Configuration
 * Update this file with your Google Apps Script deployment URL
 */

export const GOOGLE_SHEETS_CONFIG = {
  // Replace with your actual Google Apps Script deployment URL
  // Format: https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercontent
  scriptUrl: process.env.REACT_APP_GOOGLE_SHEETS_URL || '',
  
  // Sheet name (must match the sheet in your Google Sheets document)
  sheetName: 'Referrals',
  
  // Enable/disable Google Sheets integration
  enabled: !!process.env.REACT_APP_GOOGLE_SHEETS_URL,
  
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
      'Set REACT_APP_GOOGLE_SHEETS_URL environment variable to enable it.'
    );
  } else {
    console.log('Google Sheets integration is enabled');
  }
}
