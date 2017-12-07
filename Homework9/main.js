var prompt = require("prompt");
var Game = require('./game.js');
var hangmanGame = new Game();
var userGuess = 10;

	prompt.start();
	startGame(userGuess);

		function startGame(guesses){
			console.log("Guesses left: " + guesses);
			if(hangmanGame.currentWord.comparingWords() == true){
				console.log("You win");
				console.log("The word was " + hangmanGame.randomWord)
				return;
			}

			if(guesses <= 0){
				console.log("Game Over!");
				console.log("The word was " + hangmanGame.randomWord)
				return;
			}

		console.log(hangmanGame.currentWord.display());

	prompt.get(["Guess a letter"], function(err, result){
		if(err){
			return err;
		}

		if(hangmanGame.currentWord.foundLetter(result.theGuess) == false){
			guesses --;
		}
		startGame(guesses);

	});
}