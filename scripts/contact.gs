/**
 * Contact form backend — Google Apps Script.
 *
 * This is not part of the Next.js build. It is pasted into script.google.com
 * and deployed there; the site only ever sees the resulting /exec URL.
 *
 * ---------------------------------------------------------------- Setup ---
 *  1. Create a Google Sheet (any name). This is where submissions land.
 *  2. In that Sheet: Extensions -> Apps Script. Delete the stub, paste this.
 *  3. Set TO_EMAIL below to wherever you want the notification.
 *  4. Deploy -> New deployment -> type "Web app":
 *       Execute as:      Me
 *       Who has access:  Anyone          <- not "Anyone with Google account"
 *     Authorise when prompted (the "unverified app" warning is expected —
 *     Advanced -> Go to <project>).
 *  5. Copy the /exec URL into Satyam/.env.local as NEXT_PUBLIC_CONTACT_ENDPOINT,
 *     and into the same variable in Vercel's project settings.
 *
 *  After ANY edit here: Deploy -> Manage deployments -> edit -> Version: New
 *  version -> Deploy. The /exec URL keeps serving the old code otherwise.
 */

/** Where the notification mail goes. */
const TO_EMAIL = "satyamsaurav2001@gmail.com";

/** Tab inside the spreadsheet. Created automatically if missing. */
const SHEET_NAME = "Submissions";

const HEADERS = ["Timestamp", "Name", "Email", "Message"];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    // Honeypot: the form's hidden "company" field. Anything in it is a bot.
    // Returning ok keeps the bot from retrying or probing for the real check.
    if (String(body.company || "").trim() !== "") {
      return json({ ok: true });
    }

    if (!name || !email || !message) {
      return json({ ok: false, error: "Missing fields" });
    }

    appendRow(name, email, message);
    notify(name, email, message);

    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

/** Lets you open the /exec URL in a browser to confirm the deploy is live. */
function doGet() {
  return json({ ok: true, status: "contact endpoint is up" });
}

function appendRow(name, email, message) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([new Date(), name, email, message]);
}

function notify(name, email, message) {
  MailApp.sendEmail({
    to: TO_EMAIL,
    subject: "Portfolio enquiry — " + name,
    // replyTo means hitting Reply in Gmail answers the sender, not yourself.
    replyTo: email,
    body:
      "Name:  " + name + "\n" +
      "Email: " + email + "\n\n" +
      message + "\n",
  });
}

function json(payload) {
  return ContentService.createTextOutput(
    JSON.stringify(payload),
  ).setMimeType(ContentService.MimeType.JSON);
}
