/*
Owen Scott-Smith
09/03/24
Computer Graphics
This JS file is called in the Lab2.html file in order to get the current date
*/

//This is the function for displaying on the page
function GetDateandTime() {
  //We use this array to convert the numbered month to the word Ex: 01 to January
  var montharray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();

  //This is where we get our information such as date and time and where we convert our month
  var month = montharray[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();

  //This is here to check if the drop down menu is on 24 hour or 12 hour
  if (document.getElementById("24/12").value == "12 Hours") {
    //This if is here because the minute will be missing a zero if it is below 10
    if (minute < 10) {
      document.querySelector("#CountGoesHere").innerHTML =
        "The date is: " +
        month +
        " " +
        day +
        ", " +
        year +
        "<br>" +
        "The time is: " +
        (hour % 12) +
        ":" +
        "0" +
        minute;
    } else {
      document.querySelector("#CountGoesHere").innerHTML =
        "The date is: " +
        month +
        " " +
        day +
        ", " +
        year +
        "<br>" +
        "The time is: " +
        (hour % 12) +
        ":" +
        minute;
    }
  } else {
    //This if is here because the minute will be missing a zero if it is below 10
    if (minute < 10) {
      document.querySelector("#CountGoesHere").innerHTML =
        "The date is: " +
        month +
        " " +
        day +
        ", " +
        year +
        "<br>" +
        "The time is: " +
        hour +
        ":" +
        "0" +
        minute;
    } else {
      document.querySelector("#CountGoesHere").innerHTML =
        "The date is: " +
        month +
        " " +
        day +
        ", " +
        year +
        "<br>" +
        "The time is: " +
        hour +
        ":" +
        minute;
    }
  }
}

//This is the function for the alert
function GetDateandTimeAlert() {
  //We use this array to convert the numbered month to the word Ex: 01 to January
  var montharray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();

  //This is where we get our information such as date and time and where we convert out month
  var month = montharray[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();

  //This is here to check if the drop down menu is on 24 hour or 12 hour
  if (document.getElementById("24/12").value == "12 Hours") {
    //This if is here because the minute will be missing a zero if it is below 10
    if (minute < 10) {
      alert(
        "The date is: " +
          month +
          " " +
          day +
          ", " +
          year +
          "\n" +
          "The time is: " +
          (hour % 12) +
          ":" +
          "0" +
          minute
      );
    } else {
      alert(
        "The date is: " +
          month +
          " " +
          day +
          ", " +
          year +
          "\n" +
          "The time is: " +
          (hour % 12) +
          ":" +
          minute
      );
    }
  } else {
    //This if is here because the minute will be missing a zero if it is below 10
    if (minute < 10) {
      alert(
        "The date is: " +
          month +
          " " +
          day +
          ", " +
          year +
          "\n" +
          "The time is: " +
          hour +
          ":" +
          "0" +
          minute
      );
    } else {
      alert(
        "The date is: " +
          month +
          " " +
          day +
          ", " +
          year +
          "\n" +
          "The time is: " +
          hour +
          ":" +
          minute
      );
    }
  }
}
