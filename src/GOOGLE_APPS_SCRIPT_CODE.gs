/**
 * Google Apps Script for Partner Referral Management
 * 
 * Spreadsheet ID: 13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo
 * Sheet Name: Referrals
 * 
 * This script handles:
 * - Pushing new referral data
 * - Updating existing referral data (status, commission, commission status)
 * - Pulling data (all referrals or filtered by company name)
 * 
 * Deployment URL: https://script.google.com/macros/s/AKfycbx04_dcPCtnnAyUo8JDPrjLcLZFzv6BO9rLH0APnBpXb5dNkG2vqjQabdS23NQVhI79Dg/exec
 */

// Configuration
const SPREADSHEET_ID = '13Thgmyp6UW7e8gjLPl4ySwE2c6wD0IV3KtOjlrSGLgo';
const SHEET_NAME = 'Referrals';

// Column Headers (in order)
const HEADERS = [
  'Timestamp',
  'Company Name',
  'Customer Name',
  'Email',
  'Phone',
  'Loan Type',
  'Loan Amount',
  'Submission Date',
  'Status',
  'Commission',
  'Commission status'
];

/**
 * Initialize the spreadsheet with headers
 * Run this once to set up the sheet structure
 */
function initializeSheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      Logger.log('Created new sheet: ' + SHEET_NAME);
    }
    
    // Add headers if they don't exist
    const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    if (!firstRow[0] || firstRow[0] !== 'Timestamp') {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      Logger.log('Headers initialized');
    }
    
    return {
      success: true,
      message: 'Sheet initialized successfully',
      headers: HEADERS
    };
  } catch (error) {
    Logger.log('Error initializing sheet: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Main doPost handler for all requests
 * Routes requests based on the 'action' parameter
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;
    
    Logger.log('=== REQUEST RECEIVED ===');
    Logger.log('Action: ' + action);
    Logger.log('Payload: ' + JSON.stringify(payload));
    
    let result;
    
    switch(action) {
      case 'addRow':
        result = addRow(payload.data);
        break;
      case 'getRowsByCompany':
        result = getRowsByCompany(payload.companyName);
        break;
      case 'updateRow':
        result = updateRow(payload.identifier, payload.data);
        break;
      case 'getAllRows':
        result = getAllRows();
        break;
      case 'test':
        result = testConnection();
        break;
      default:
        result = {
          success: false,
          error: 'Unknown action: ' + action,
          availableActions: ['addRow', 'getRowsByCompany', 'updateRow', 'getAllRows', 'test']
        };
    }
    
    Logger.log('Result: ' + JSON.stringify(result));
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    Logger.log('=== ERROR ===');
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Add a new referral row to the sheet
 * 
 * Expected data structure:
 * {
 *   timestamp: string (ISO format),
 *   companyName: string,
 *   customerName: string,
 *   email: string,
 *   phone: string,
 *   loanType: string,
 *   loanAmount: string,
 *   submissionDate: string,
 *   status: string,
 *   commission: string,
 *   commissionStatus: string
 * }
 */
function addRow(data) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        error: 'Sheet "' + SHEET_NAME + '" not found'
      };
    }
    
    // Prepare row data in the correct order
    const row = [
      data.timestamp || new Date().toISOString(),
      data.companyName || '',
      data.customerName || '',
      data.email || '',
      data.phone || '',
      data.loanType || '',
      data.loanAmount || '',
      data.submissionDate || new Date().toLocaleDateString('en-AU'),
      data.status || 'PENDING',
      data.commission || '',
      data.commissionStatus || ''
    ];
    
    // Validate row length matches headers
    if (row.length !== HEADERS.length) {
      return {
        success: false,
        error: 'Row data length (' + row.length + ') does not match headers length (' + HEADERS.length + ')'
      };
    }
    
    // Append the row
    sheet.appendRow(row);
    
    Logger.log('✓ Row added successfully');
    Logger.log('Company: ' + data.companyName);
    Logger.log('Customer: ' + data.customerName);
    Logger.log('Email: ' + data.email);
    
    return {
      success: true,
      message: 'Referral added successfully',
      data: {
        companyName: data.companyName,
        customerName: data.customerName,
        email: data.email,
        status: data.status || 'PENDING'
      }
    };
  } catch(error) {
    Logger.log('Error adding row: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Get all referrals for a specific company
 * Filters by Company Name column
 */
function getRowsByCompany(companyName) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        error: 'Sheet "' + SHEET_NAME + '" not found'
      };
    }
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      Logger.log('No data found in sheet');
      return {
        success: true,
        data: [],
        count: 0,
        message: 'No referrals found'
      };
    }
    
    const headers = data[0];
    const companyNameIndex = headers.indexOf('Company Name');
    
    if (companyNameIndex === -1) {
      return {
        success: false,
        error: 'Company Name column not found in headers'
      };
    }
    
    const referrals = [];
    
    // Iterate through rows starting from row 2 (skip header)
    for (let i = 1; i < data.length; i++) {
      if (data[i][companyNameIndex] === companyName) {
        const referral = {};
        headers.forEach((header, index) => {
          // Convert header to camelCase for consistency
          const key = headerToCamelCase(header);
          referral[key] = data[i][index];
        });
        referrals.push(referral);
      }
    }
    
    Logger.log('✓ Found ' + referrals.length + ' referrals for company: ' + companyName);
    
    return {
      success: true,
      data: referrals,
      count: referrals.length,
      companyName: companyName
    };
  } catch(error) {
    Logger.log('Error getting rows by company: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Update an existing referral row
 * Identifies the row by email address
 * 
 * Expected updateData structure:
 * {
 *   status?: string,
 *   commission?: string,
 *   commissionStatus?: string
 * }
 */
function updateRow(customerEmail, updateData) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        error: 'Sheet "' + SHEET_NAME + '" not found'
      };
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const emailIndex = headers.indexOf('Email');
    
    if (emailIndex === -1) {
      return {
        success: false,
        error: 'Email column not found in headers'
      };
    }
    
    // Find the row with matching email
    for (let i = 1; i < data.length; i++) {
      if (data[i][emailIndex] === customerEmail) {
        // Update the row with new data
        Object.keys(updateData).forEach(key => {
          const headerName = camelCaseToHeader(key);
          const colIndex = headers.indexOf(headerName);
          
          if (colIndex !== -1) {
            sheet.getRange(i + 1, colIndex + 1).setValue(updateData[key]);
            Logger.log('Updated ' + headerName + ' to: ' + updateData[key]);
          }
        });
        
        Logger.log('✓ Row updated for email: ' + customerEmail);
        
        return {
          success: true,
          message: 'Referral updated successfully',
          email: customerEmail,
          updatedFields: Object.keys(updateData)
        };
      }
    }
    
    return {
      success: false,
      error: 'Referral not found for email: ' + customerEmail
    };
  } catch(error) {
    Logger.log('Error updating row: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Get all referrals from the sheet
 */
function getAllRows() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return {
        success: false,
        error: 'Sheet "' + SHEET_NAME + '" not found'
      };
    }
    
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      Logger.log('No data found in sheet');
      return {
        success: true,
        data: [],
        count: 0,
        message: 'No referrals found'
      };
    }
    
    const headers = data[0];
    const referrals = [];
    
    // Iterate through rows starting from row 2 (skip header)
    for (let i = 1; i < data.length; i++) {
      const referral = {};
      headers.forEach((header, index) => {
        const key = headerToCamelCase(header);
        referral[key] = data[i][index];
      });
      referrals.push(referral);
    }
    
    Logger.log('✓ Retrieved ' + referrals.length + ' total referrals');
    
    return {
      success: true,
      data: referrals,
      count: referrals.length
    };
  } catch(error) {
    Logger.log('Error getting all rows: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Test the connection and verify setup
 */
function testConnection() {
  try {
    Logger.log('=== TESTING CONNECTION ===');
    
    // Test 1: Open spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    Logger.log('✓ Successfully connected to spreadsheet');
    Logger.log('  Spreadsheet ID: ' + SPREADSHEET_ID);
    
    // Test 2: Find sheet
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      return {
        success: false,
        error: 'Sheet "' + SHEET_NAME + '" not found'
      };
    }
    Logger.log('✓ Found sheet: ' + SHEET_NAME);
    
    // Test 3: Check headers
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    Logger.log('✓ Sheet has ' + data.length + ' rows');
    Logger.log('✓ Headers: ' + headers.join(', '));
    
    // Test 4: Verify all required headers exist
    const missingHeaders = HEADERS.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      return {
        success: false,
        error: 'Missing headers: ' + missingHeaders.join(', ')
      };
    }
    Logger.log('✓ All required headers present');
    
    // Test 5: Count data rows
    const dataRowCount = data.length - 1;
    Logger.log('✓ Sheet contains ' + dataRowCount + ' data rows');
    
    return {
      success: true,
      message: 'Connection test successful',
      details: {
        spreadsheetId: SPREADSHEET_ID,
        sheetName: SHEET_NAME,
        headers: headers,
        dataRows: dataRowCount,
        totalRows: data.length
      }
    };
  } catch(error) {
    Logger.log('✗ Connection test failed: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Utility function: Convert header name to camelCase
 * "Company Name" -> "companyName"
 * "Commission status" -> "commissionStatus"
 */
function headerToCamelCase(header) {
  return header
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

/**
 * Utility function: Convert camelCase to header name
 * "companyName" -> "Company Name"
 * "commissionStatus" -> "Commission status"
 */
function camelCaseToHeader(camelCase) {
  return camelCase
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

/**
 * Utility function: Log all sheet data (for debugging)
 */
function logAllData() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    Logger.log('=== ALL SHEET DATA ===');
    Logger.log('Total rows: ' + data.length);
    
    data.forEach((row, index) => {
      Logger.log('Row ' + index + ': ' + JSON.stringify(row));
    });
  } catch(error) {
    Logger.log('Error logging data: ' + error.toString());
  }
}

/**
 * Utility function: Clear all data (except headers)
 * WARNING: This will delete all referral data!
 */
function clearAllData() {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    if (data.length > 1) {
      sheet.deleteRows(2, data.length - 1);
      Logger.log('✓ Cleared ' + (data.length - 1) + ' data rows');
    }
    
    return {
      success: true,
      message: 'All data cleared'
    };
  } catch(error) {
    Logger.log('Error clearing data: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}
