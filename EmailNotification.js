function onEdit(e) {
  if (!e) {
    return;
  }

  var sheet = e.source.getActiveSheet();
  var tutorEmail = sheet.getRange(52, 1).getValue();

  var editedRange = e.range;
  var editedRow = editedRange.getRow();
  var editedCol = editedRange.getColumn();

  if (editedRow < 5 || editedRow > 34 || 
      (editedCol < 2 || editedCol > 6) && (editedCol < 8 || editedCol > 12)) {
    return;
  }
    
  
  // List of tutor emails and their corresponding sheets
  var tutors = {
  // Put the email here "Put the unique identifier (ID) for that particular spreadsheet"
  // For example, "helloworld@example.com": "The unique identifier is in between /d/ and /edit? in URL"
  // Add more tutor's email and sheet IDs as needed
  };
  
  if (tutorEmail in tutors) {
    var tutorSheetId = tutors[tutorEmail];
    if (e.source.getId() === tutorSheetId) {
      var editorInfo = getEditorInfo(e);
      var editedCells = getEditedCellsInfo(editedRange);
      var subject = "Sheet Edit Notification - Time Slot Changes";
      var message = createDetailedMessage(editedCells, editorInfo);
  
      MailApp.sendEmail(tutorEmail, subject, message);
    }
  }
}
  
function getEditorInfo(e) {
  var email = e.user ? e.user.getEmail() : "Unknown";
  var name = e.user ? e.user.getUsername() : "Unknown";
  return {
    email: email,
    name: name,
    time: new Date().toLocaleString()
  };
}
  
function getEditedCellsInfo(range) {
  var editedCells = [];
  for (var i = 1; i <= range.getNumRows(); i++) {
    for (var j = 1; j <= range.getNumColumns(); j++) {
      var cell = range.getCell(i, j);
      var row = cell.getRow();
      var col = cell.getColumn();
      editedCells.push({
        cell: cell.getA1Notation(),
        day: getDayFromColumn(col),
        time: getTimeFromRow(row)
      });
    }
  }
  return editedCells;
}
  
function getDayFromColumn(col) {
  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  if (col >= 2 && col <= 6) {
    return days[col - 2];
  } else if (col >= 8 && col <= 12) {
    return days[col - 8];
  }
  return "Unknown Day";
}

function getTimeFromRow(row) {
  var hour = Math.floor((row - 5) / 2) + 7;
  var minute = (row - 5) % 2 === 0 ? "00" : "30";
  var endHour = minute === "30" ? hour + 1 : hour;
  var endMinute = minute === "30" ? "00" : "30";
  
  return `${formatHour12(hour)}:${minute} ${getAMPM(hour)} - ${formatHour12(endHour)}:${endMinute} ${getAMPM(endHour)}`;
}
  
function formatHour12(hour) {
  hour = hour % 12;
  return hour === 0 ? "12" : hour.toString();
}

function getAMPM(hour) {
  return hour < 12 ? "AM" : "PM";
}
  
function createDetailedMessage(editedCells, editorInfo) {
  var cellDetails = editedCells.map(cell => 
    `${cell.day} ${cell.time}`
  ).join("\n");

  return `Hello Tutor,

The following time slots in your schedule were edited:

${cellDetails}

Please review these changes.`;
}