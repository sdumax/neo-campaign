import { google } from "googleapis";

const auth = new google.auth.JWT();
auth.fromJSON({
  client_email: process.env.GOOGLE_CLIENT_EMAIL!,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
});
auth.scopes = ["https://www.googleapis.com/auth/spreadsheets"];

const sheets = google.sheets({ version: "v4", auth });

export async function appendToSheet(sheetName: string, values: string[]) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });
}
