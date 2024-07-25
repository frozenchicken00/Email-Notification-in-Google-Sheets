# Hoyoung
Here's a README for the provided code:

# Google Sheets Edit Notification Script

## Overview

This Google Apps Script sends email notifications to tutors when specific ranges in a Google Sheet are edited. The script checks the edited cells, identifies the tutor responsible, and sends an email with details of the changes.

## Features

- Monitors edits within specified ranges on a Google Sheet.
- Sends email notifications to tutors when their respective ranges are edited.
- Provides detailed information about the edited cells, including day and time slots.

## Script Details

### `onEdit(e)`

This is the main function triggered when any cell in the sheet is edited. It performs the following tasks:

1. **Check if the event object exists**: If not, the function exits.
2. **Get the active sheet**: Retrieves the active sheet where the edit occurred.
3. **Get the tutor's email**: Retrieves the tutor's email from a specific cell (A52).
4. **Get the edited range, row, and column**: Determines the range, row, and column of the edited cell(s).
5. **Range validation**: Ensures edits are within the specified row (5-34) and column ranges (2-6 and 8-12). If not, the function exits.
6. **Tutor sheet mapping**: Checks if the tutor's email is in the predefined list of tutor emails and their corresponding sheet IDs.
7. **Email notification**: If the edited sheet matches the tutor's sheet ID, it gathers editor information, the edited cells' information, and sends an email to the tutor with the details.

### Helper Functions

- **`getEditorInfo(e)`**: Retrieves the editor's email, username, and the time of edit.
- **`getEditedCellsInfo(range)`**: Retrieves information about the edited cells, including their A1 notation, corresponding day, and time slot.
- **`getDayFromColumn(col)`**: Converts column numbers to corresponding days of the week.
- **`getTimeFromRow(row)`**: Converts row numbers to corresponding time slots.
- **`formatHour12(hour)`**: Formats hours in 12-hour format.
- **`getAMPM(hour)`**: Determines AM/PM for a given hour.
- **`createDetailedMessage(editedCells, editorInfo)`**: Creates a detailed message to be sent via email with information about the edited cells.

## How to Use

1. **Open the Script Editor** in your Google Sheets (`Extensions > Apps Script`).
2. **Copy and paste the provided code** into the script editor.
3. **Update the `tutors` object**: Add the tutor emails and their corresponding sheet IDs.
   ```javascript
   var tutors = {
     "example@example.com": "SHEET_ID_HERE",
     // Add more tutor's email and sheet IDs as needed
   };
   ```
4. **Save and deploy** the script.
5. **Authorize the script**: When running for the first time, it will ask for necessary permissions. Allow them to enable the script to function correctly.

## Example

Here is an example of how to add a tutor's email and sheet ID:
```javascript
var tutors = {
  "tutor1@example.com": "1GfYdXaP1aLWLmKZ8dF9u4v7e6Qh",
  "tutor2@example.com": "2HgXhZcQ2bMWOmN9fJ0v5x7j8Kl",
};
```

With this setup, whenever a cell within the specified ranges is edited, an email will be sent to the corresponding tutor with the details of the edit.

## Notes

- Ensure that the email addresses and sheet IDs are correctly mapped in the `tutors` object.
- Customize the email message format as needed in the `createDetailedMessage` function.

This script helps in keeping tutors informed about changes in their schedules, ensuring better communication and management.