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
      "liuqiuyuan@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "mitch@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "tinachi2021@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "taejeongyim@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "jamiejeong@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "jieun550@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "hy0918@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "ypham98@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "sayu721@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "buhsoh@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "ellieshek@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "marbrowne3@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "hoferkri@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "eliasjessop@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "dallinmckinney@hotmail.com": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "taleahbutler@go.byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y",
      "catbc@byuh.edu": "18Rtdyuwp0d1MGxPt-4V01rcTYy-SHe31iQigriHyt7Y"
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