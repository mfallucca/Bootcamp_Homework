var gameQuestions = [
{
	question: "What team did Babe Ruth play for before joining the Boston Red Sox?",
	answerList: ["Boston Braves", "Kansas City Monarchs", "New York Yankees", "Baltimore Orioles"],
	answer: 3
},
	{
	question: "What team moved to D.C. to become the Washington Nationals in 2005?",
	answerList: ["Kansas City Monarchs", "Brooklyn Dodgers", "Montreal Expos", "Tokyo Giants"],
	answer: 2
},
	{
	question: "Who has played the most consecutive games of baseball on September 6, 1995?",
	answerList: ["Moises Alou", "Cal Ripken, Jr", "Mark McGuire", "Barry Bonds"],
	answer: 1
},
	{
	question: "What is the oldest active ball park in Major League Baseball?",
	answerList: ["Camden Yards", "Fenway Park", "Kauffman Stadium", "Wrigley Field"],
	answer: 1
},
	{
	question: "What baseball announcer was famous for his signature phrase, 'Holy Cow!'?",
	answerList: ["Joe Garagiola", "Vin Scully", "Mel Allen", "Harry Caray"],
	answer: 3
}];

function countdown() {
	seconds = 30;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;

	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

$('#startButton').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame() {
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion() {
	$('#message').empty();
	$('#trueAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+gameQuestions.length);
	$('.question').html('<h2>' + gameQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(gameQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty();
	$('.question').empty();

	var rightAnswerText = gameQuestions[currentQuestion].answerList[gameQuestions[currentQuestion].answer];
	var rightAnswerIndex = gameQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] + '" width = "400px">');

	if ((userSelect === rightAnswerIndex) && (answered === true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} 
	else if ((userSelect != rightAnswerIndex) && (answered === true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#trueAnswer').html('The correct answer was: ' + rightAnswerText);
	} 
	else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#trueAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if (currentQuestion === (gameQuestions.length-1)) {
		setTimeout(score, 3000)
	} 
	else {
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}

function score() {
	$('#timeLeft').empty();
	$('#message').empty();
	$('#trueAnswer').empty();
	$('#gif').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}




var gifArray = ['babe.gif', 'montreal.gif', 'cal.gif', 'fenway.gif', 'harry.gif'];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;

var messages = {
	correct: "That...is...correct!",
	incorrect: "Maybe you should've used Google?",
	endTime: "Out of time!",
	finished: "Here are your results!"
}