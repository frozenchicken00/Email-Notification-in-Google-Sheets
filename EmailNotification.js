function onEdit(e) {
    if (!e) {
      // The function was not triggered by an edit event
      return;
    }
    
    var sheet = e.source.getActiveSheet();
    var tutorEmail = sheet.getRange(52, 1).getValue(); // Assuming tutor's email is in A52
  
    // Check if the edited row is 3, if so, exit the function without sending an email
    if (e.range.getRow() === 3) {
      return;
    }
    
  
    // List of tutor emails and their corresponding sheets
    var tutors = {
    //  "Put the email here": "Put the unique identifier (ID) for that particular spreadsheet"
      // Add more tutors and sheet IDs as needed
    };
  
    if (tutorEmail in tutors) {
      var tutorSheetId = tutors[tutorEmail];
      if (e.source.getId() === tutorSheetId) {
        var editedRange = e.range.getA1Notation();
        var editorEmail = Session.getActiveUser().getEmail();
  
        // Customize the email subject and message
        var subject = "Sheet Edit Notification";
        var message = "Hello Tutor,\n\nYour sheet (" + editedRange + ") was edited by " + editorEmail + ".\n\nPlease review the changes.";
  
        // Send email
        MailApp.sendEmail(tutorEmail, subject, message);
      }
    }
  }