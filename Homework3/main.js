// words array
var words = ["cat", "dog", "monkey", "dolphin", "giraffe", "tiger"]

// choose which word to use from the words array
function chooseWord () {
return words[Math.floor(Math.random() * words.length)];
    }
    


function blanks ( resultWord ) {  
    var x = ""; 
    for ( i in resultWord ) {
        x = "_ " + x;
    }
    return x;
}

var gameWord = chooseWord();

var gameBlanks = blanks(gameWord);

function alterAt ( n, c, originalString ) {
    return originalString.substr(0,n) + c + originalString.substr(n+1,originalString.length);
}

$('.realword').html(gameBlanks);