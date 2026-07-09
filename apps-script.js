/**
 * PROFITABLE TRADER — Google Sheets Registration Handler
 * ═══════════════════════════════════════════════════════
 *
 * HOW TO SET THIS UP (follow every step):
 *
 *  1. Go to https://sheets.google.com and create a new blank spreadsheet.
 *     Name it "PT Cohort Registrations" (or anything you like).
 *
 *  2. Click  Extensions  →  Apps Script
 *
 *  3. Delete everything in the editor and paste this entire file.
 *
 *  4. Click the floppy-disk icon (Save) or press Ctrl+S.
 *
 *  5. Click  Deploy  →  New Deployment
 *
 *  6. Click the gear icon next to "Type" and choose  Web App.
 *
 *  7. Set the fields:
 *        Description       →  PT Cohort Form
 *        Execute as        →  Me
 *        Who has access    →  Anyone
 *
 *  8. Click  Deploy  and authorise when prompted
 *     (click "Advanced" → "Go to … (unsafe)" if you see a warning — it's your own script).
 *
 *  9. Copy the  Web App URL  that appears.
 *
 * 10. Open  index.html  in a text editor.
 *     Find this line near the bottom:
 *
 *         var SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
 *
 *     Replace  YOUR_APPS_SCRIPT_URL_HERE  with the URL you just copied.
 *     Save the file.
 *
 * That's it. Every time someone submits the form their data lands in the sheet
 * on a new row, automatically. The sheet will look like this:
 *
 *  Timestamp | Full Name | Email | Phone | X Username | Telegram | Experience | NAHIMS Student | Confirmed Follow
 */

var SHEET_NAME = 'Registrations';

function doGet(e) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // Write header row on first submission
    if (sheet.getLastRow() === 0) {
      var headers = [
        'Timestamp',
        'Full Name',
        'Email',
        'Phone',
        'X Username',
        'Telegram Username',
        'Experience Level',
        'Referred By',
        'Confirmed Follow'
      ];
      sheet.appendRow(headers);

      // Style the header
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#D4AF37');
      headerRange.setFontColor('#000000');
      sheet.setFrozenRows(1);
    }

    var p = e.parameter;

    sheet.appendRow([
      new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' }),
      p.fullName   || '',
      p.email      || '',
      p.phone      || '',
      p.xUsername  || '',
      p.telegram   || '',
      p.experience || '',
      p.referredBy || 'None',
      p.confirmed  || 'No'
    ]);

    return ContentService
      .createTextOutput('OK')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService
      .createTextOutput('Error: ' + err.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
