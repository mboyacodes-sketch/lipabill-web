/**
 * Paste into a Google Sheet: Extensions → Apps Script.
 * Deploy → New deployment → Web app.
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the web app URL into GOOGLE_SHEETS_WEBHOOK_URL.
 * The URL is the secret — don't share it.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var body = JSON.parse(e.postData.contents);
    var email = String(body.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return json_({ ok: false });
    }

    var ss = SpreadsheetApp.getActive();
    var sheet = ss.getSheetByName("Emails");
    if (!sheet) {
      sheet = ss.insertSheet("Emails");
      sheet.appendRow(["submitted_at", "email"]);
    } else if (sheet.getLastRow() === 0) {
      sheet.appendRow(["submitted_at", "email"]);
    }

    var last = sheet.getLastRow();
    if (last >= 2) {
      var existing = sheet.getRange(2, 2, last - 1, 1).getValues();
      for (var i = 0; i < existing.length; i++) {
        if (String(existing[i][0]).trim().toLowerCase() === email) {
          return json_({ ok: true, duplicate: true });
        }
      }
    }

    sheet.appendRow([body.submittedAt || new Date().toISOString(), email]);
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
