// Initialize Firebase
var config = {
    apiKey: "AIzaSyAZ1vCZShaIO1Io42Q_eXkSAnEa46GfT-M",
    authDomain: "train-schedule-89661.firebaseapp.com",
    databaseURL: "https://train-schedule-89661.firebaseio.com",
    projectId: "train-schedule-89661",
    storageBucket: "train-schedule-89661.appspot.com",
    messagingSenderId: "637662492731"
};
firebase.initializeApp(config);


//variables 
var database = firebase.database();

var name = "";
var destination = "";
var firstTrain;
var frequency;



var firstTrainConverted = "";

var currentTime = "";

var diffTime = "";

var tRemainder = "";

var minutesAway = "";

var nextArrival = "";



//functions


function tCalculations() {
    firstTrainConverted = moment(firstTrain, "hh:mm");
    console.log("Converted: " + firstTrainConverted);

    currentTime = moment();
    console.log("Current Time: " + currentTime.format("hh:mm"));

    diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("Diff in time: " + diffTime);

    tRemainder = diffTime % parseInt(frequency);
    console.log(tRemainder);

    minutesAway = parseInt(frequency) - tRemainder;
    console.log("Minutes Till Next Train :" + minutesAway);

    nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + nextArrival.format("hh:mm"));


};





$("#button").on("click", function(event) {
    event.preventDefault();

    name = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    // if (firstTrain < 00: 00 || firstTrain > 23: 59) {
   //     alert("Please enter a valid time from 00:00-23:59 for the first train time")
   // } else {


        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency

        });
        tCalculations();
        $("#trainName").html("Train Name");
        $("#destination").html("Destination");
        $("#firstTrain").html("First Train Time");
        $("#frequency").html("Frequency");
    

})





database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);
    //console.log(childSnapshot.val().dateAdded);
    name = (childSnapshot.val().name);
    destination = (childSnapshot.val().destination);
    firstTrain = (childSnapshot.val().firstTrain);
    frequency = (childSnapshot.val().frequency);

    tCalculations();

    // full list of items to the well
    $("#infoGoesHere").append("<tr class='well'><td id='name'> " + childSnapshot.val().name +
        " </td><td > " + childSnapshot.val().destination +
        " </td><td > " + childSnapshot.val().frequency +
        " </td><td > " + moment(nextArrival).format("hh:mm") +
        " </td><td > " + minutesAway + " </td></tr>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
