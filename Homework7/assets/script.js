
// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDhlqAjUpBCv0SYFnMK7xJtbG7j3WkR6pk",
    authDomain: "kucoding-f6b4b.firebaseapp.com",
    databaseURL: "https://kucoding-f6b4b.firebaseio.com",
    projectId: "kucoding-f6b4b",
    storageBucket: "kucoding-f6b4b.appspot.com",
    messagingSenderId: "554502973013"
  };
firebase.initializeApp(config);

var database = firebase.database();


// 2. Button for adding Trains
$("#addTrainBtn").on("click", function() {

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDest = $("#trainDestInput").val().trim();
	var trainFirst = moment($("#trainFirstInput").val().trim(), "hh:mm").format("hh:mm");
	var trainFreq = $("#trainFreqInput").val().trim();

	// Creates local "temporary" object for holding Train data
	var newTrain = {
		name:  trainName,
		dest: trainDest,
		first: trainFirst,
		freq: trainFreq
	}

	// Uploads Train data to the database
	database.ref().push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.dest);
	console.log(newTrain.first);
	console.log(newTrain.freq);

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#trainDestInput").val("");
	$("#trainFirstInput").val("");
	$("#trainFreqInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding Train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().dest;
	var trainFirst = childSnapshot.val().first;
	var trainFreq = childSnapshot.val().freq;

	// train Info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainFirst);
	console.log(trainFreq);

	// Prettify the Train start
	var firstTimeConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainFreq;
    var minutesTillTrain = trainFreq - tRemainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainFormatted = moment(nextTrain).format("hh:mm");

	// Add each train's data into the table
	$("#TrainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextTrainFormatted + "</td><td>" + minutesTillTrain + "</td></tr>");

});

function validateHhMm(inputField) {
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField.value);

    if (isValid) {
        inputField.style.backgroundColor = '#bfa';
    } else {
        inputField.style.backgroundColor = '#fba';
    }

    return isValid;
};
