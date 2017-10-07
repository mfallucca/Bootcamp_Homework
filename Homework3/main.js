// words array
var words = ["monkey", "cat", "dog", "lion"];

// choose which word to use from the words array
// setting a variable for the randomly chosen word for easier reference
var gameWord = words[Math.floor(Math.random() * words.length)];


// creating an array of blanks
var answerArray = [];

for (var i = 0; i < gameWord.length; i++) {
  answerArray[i] = "_";
}

// confirming in the log that it works
console.log(answerArray);


// setting the blanks in the html

for (i = 0; i < gameWord.length; i++) {
	$('.realword').append(answerArray[i] + " ");
}

var remaining = gameWord.length;
var remainingguesses = 15;
var wincount = 0;
var losscount = 0;

console.log(remaining);
console.log(remainingguesses);


function presskey () {
	remainingguesses--;
    var tempChar = $('#inputletter').val().toLowerCase();
    $('#wrongletters').append(tempChar);
    $('#inputletter').val("");
    // loops through array to see if the guessed letter matches any position
    if (remainingguesses > 0) {
	    for (var x = 0; x < gameWord.length; x++) {
	   	if (gameWord[x] === tempChar) { 
	   		answerArray[x] = tempChar; 
	   		remaining = remaining - 1;
			}
	// else if (gameWord[x] != tempChar) {
	// 	remainingguesses--;
	// }
		}
	}
	else {
		alert("You've lost!");
		losscount++;
	}
	$('.realword').empty();
	for (i = 0; i < gameWord.length; i++) {
		$('.realword').append(answerArray[i] + " ");
	}
	$('#remainingguesses').html(remainingguesses);
	console.log(answerArray);
	console.log(remainingguesses);
	console.log(remaining);
	if (remaining === 0) {
		alert("You won! The word was " + gameWord + "." + " Click ok for a new game!");
		wincount++;
		$(".recordwins").html(wincount);
		resetgame();
		remainingguesses = 15;
		remaining = gameWord.length;
	}
	if (remainingguesses === 0) {
		alert("You lost! The word was " + gameWord + "." + " Click ok for a new game!");
		$(".recordlosses").html(losscount); 
		losscount++;
		resetgame();
	}
}




function resetgame() {
	gameWord = words[Math.floor(Math.random() * words.length)];

	for (var i = 0; i < gameWord.length; i++) {
	  answerArray[i] = "_";
	}
	$('.realword').empty();
	for (i = 0; i < gameWord.length; i++) {
		$('.realword').append(answerArray[i] + " ");
	}

	remaining = gameWord.length;
	remainingguesses = 15;
	$('#remainingguesses').html(remainingguesses);
	$('#wrongletters').empty();

}

	$('#inputletter').keyup(presskey);

