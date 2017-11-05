$(document).ready(function () {
  

  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyD5qtLOF357qJiT-96vRRXFBYRhBTRtZew",
      authDomain: "train-scheduler-19a16.firebaseapp.com",
      databaseURL: "https://train-scheduler-19a16.firebaseio.com",
      projectId: "train-scheduler-19a16",
      storageBucket: "",
      messagingSenderId: "316942109248"
  };
    firebase.initializeApp(config);
    console.log(firebase)

  var database = firebase.database();

  var minutesAway = 0;
  var nextArrival = "";
  var schedule = [];
  var trainTime = 0;

  //submit button functionality
  $("#submit-train").on("click", function() {
    event.preventDefault();
    

    var name = $("#train-name").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();

    // Push to firebase
    database.ref().push({
      name: name,
      destination: destination,
      frequency: frequency,
      nextArrival: nextArrival,
      minutesAway: minutesAway
    });

  }); 
    // Retrieve list of trains from firebase
  database.ref().on("child_added", function(snapshot) {
  
    //Add trains to train schedule
    $("#trains").append("<tr>" +
         "<th>" + snapshot.val().name + "</th>" +
         "<th>" + snapshot.val().destination + "</th>" +
         "<th>" + snapshot.val().frequency + "</th>" +
         "<th>" + snapshot.val().nextArrival + "</th>" +
         "<th>" + snapshot.val().minutesAway + "</th>" +
         "</tr>");
  });

  // // First Time (pushed back 1 year to make sure it comes before current time)
  //   var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  //   console.log(firstTimeConverted);
  //   // Current Time
  //   var currentTime = moment();
  //   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  //   // Difference between the times
  //   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  //   console.log("DIFFERENCE IN TIME: " + diffTime);
  //   // Time apart (remainder)
  //   var tRemainder = diffTime % frequency;
  //   console.log(tRemainder);
  //   // Minute Until Train
  //   var nextArrivalInMin = tFrequency - tRemainder;
  //   console.log("MINUTES TILL TRAIN: " + nextArrivalInMin);
  //   // Next Train
  //   var nextTrain = moment().add(nextArrivalInMin, "minutes");
  //   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

});