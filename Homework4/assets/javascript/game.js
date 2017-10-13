// global variables
var myhealth = 0;
var myattack = 0;
var mychar = "";
var firstbaddy = "";
var enemyhealth = 0;
var enemycounter = 0;
var defeat = false;
var win = false;
var baseattack = 0;
var wincount = 0;
var playlist = ["assets/chewbacca.wav", "assets/laser.mp3", "assets/saber.wav"];
var audio = new Audio();

$("#attackButton").hide();
$(".chooseenemy").hide();
$("#yourHealth").hide();
$("#enemyHealth").hide();
$("#currentEnemy").hide();
$("#yourAttackpower").hide();
$("#enemyCounterpower").hide();
$("#chosenChar").hide();

// players variables
let players = {
    'Luke': {
        name: 'luke',
        health: 120,
        attack: 8,
        imageUrl: "assets/images/luke.png",
        counterAttack: 14
    }, 
    'Vader': {
        name: 'vader',
        health: 100,
        attack: 14,
        imageUrl: "assets/images/vader.png",
        counterAttack: 10
    }, 
    'Han': {
        name: 'han',
        health: 150,
        attack: 8,
        imageUrl: "assets/images/han.png",
        counterAttack: 12
    }, 
    'Boba': {
        name: 'boba',
        health: 180,
        attack: 7,
        imageUrl: "assets/images/boba.png",
        counterAttack: 10
    }
};

var mystats = function() {
    var CC = $("#chosenChar");
    if (mychar === "Luke" ) {
    myhealth = players.Luke.health;
    myattack = players.Luke.attack;
    baseattack = players.Luke.attack;
    CC.attr("src", players.Luke.imageUrl);
    $(".enemydiv1").remove();
    }
    else if (mychar === "Vader" ) {
    myhealth = players.Vader.health;
    myattack = players.Vader.attack;
    baseattack = players.Vader.attack;
    CC.attr("src", players.Vader.imageUrl);
    $(".enemydiv2").remove();
    }
    else if (mychar === "Han" ) {
    myhealth = players.Han.health;
    myattack = players.Han.attack;
    baseattack = players.Han.attack;
    CC.attr("src", players.Han.imageUrl);
    $(".enemydiv3").remove();
    }
    else if (mychar === "Boba" ) {
    myhealth = players.Boba.health;
    myattack = players.Boba.attack;
    baseattack = players.Boba.attack;
    CC.attr("src", players.Boba.imageUrl);
    $(".enemydiv4").remove();
    }
    CC.attr("class", "img-thumbnail")
    $("#chosenChar").show();
    removeChoosePics();
    setEnemies();
    $(".chooseenemy").show();
    $("#yourHealth").show();
    $("#yourHealth").html("Your Remaining Health: " + myhealth);
    $("#yourAttackpower").show();
    $("#yourAttackpower").html("Your Attack Power: " + myattack);
}

var removeChoosePics = function() {
    $(".choosecharacter").remove();
    $("#choosetitle").empty();
    $("#yourChar").html("You've Chosen " + mychar);
    $("#enemies").html("Choose Your First Enemy!");

}

var setEnemies = function() {
    if (mychar !== "Luke") {
        $("#enemy1").attr("src", players.Luke.imageUrl);
    }
    if (mychar !== "Vader") {
        $("#enemy2").attr("src", players.Vader.imageUrl);
    }
    if (mychar !== "Han") {
        $("#enemy3").attr("src", players.Han.imageUrl);
    }
    if (mychar !== "Boba") {
        $("#enemy4").attr("src", players.Boba.imageUrl);
    }
}

var firstEnemy = function() {
    var CC = $("#currentEnemy");
    if (firstbaddy === "enemy1" ) {
    enemyhealth = players.Luke.health;
    enemycounter = players.Luke.counterAttack;
    CC.attr("src", players.Luke.imageUrl);
    CC.show();
    $(".enemydiv1").remove();
    }
    if (firstbaddy === "enemy2" ) {
    enemyhealth = players.Vader.health;
    enemycounter = players.Vader.counterAttack;
    CC.attr("src", players.Vader.imageUrl);
    CC.show();
    $(".enemydiv2").remove();
    }
    if (firstbaddy === "enemy3" ) {
    enemyhealth = players.Han.health;
    enemycounter = players.Han.counterAttack;
    CC.attr("src", players.Han.imageUrl);
    CC.show();
    $(".enemydiv3").remove();
    }
    if (firstbaddy === "enemy4" ) {
    enemyhealth = players.Boba.health;
    enemycounter = players.Boba.counterAttack;
    CC.attr("src", players.Boba.imageUrl);
    CC.show();
    $(".enemydiv4").remove();
    }
    $(".choosefromenemies").hide();
    $("#enemies").hide();
    $("#attackButton").show();
    $("#enemyCounterpower").show();
    $("#enemyCounterpower").html("Enemy's Counter Attack: " + enemycounter);
    $("#enemyHealth").show();
    $("#enemyHealth").html("Enemy's Remaining Health: " + enemyhealth);
}

$('.choosecharacter').on("click", function() {
    mychar = this.id;
    mystats();
});

$('.chooseenemy').on("click", function() {
    firstbaddy = this.id;
    firstEnemy();
});

var checkDefeat = function() {
    if (defeat === true && wincount === 3) {
    }
    else if (defeat === true) {
        alert("You've lost!");
        reset();
    }
}

var CheckWin = function() {
    if (win === true) {
        wincount++;
        win = false;
    }
}

var reset = function() {
    location.reload();
}

$("#attackButton").on("click", function() {
    attackMove();
    myattack = myattack + baseattack;
    $("#yourAttackpower").html("Your Attack Power: " + myattack);
    randomSound();
    CheckFirstEnemyHealth();
    CheckWin();
    CheckMyHealth();
    checkDefeat();
    CheckVictory();
});

var attackMove = function() {
    enemyhealth = enemyhealth - myattack;
    myhealth = myhealth - enemycounter;
    $("#enemyHealth").html("Enemy's Remaining Health: " + enemyhealth);
    $("#yourHealth").html("Your Remaining Health: " + myhealth);
}

var CheckFirstEnemyHealth = function() {
    if (enemyhealth <= 0) {
        win = true;
        $("#attackButton").hide();
        $("#enemyHealth").hide();
        $("#currentEnemy").hide();
        $("#enemyCounterpower").hide();
        $(".choosefromenemies").show();
        $("#enemies").show();
        $("#enemies").html("Choose Your Next Enemy!");
    }
}

var CheckMyHealth = function() {
    if (myhealth <= 0) {
        defeat = true;
    }
}

var CheckVictory = function() {
    if (wincount === 3 && defeat === true) {
        alert("It's a draw!");
        reset();
    }
    else if (wincount === 3 && defeat === false) {
        alert("Congratulations, you've won!");
        reset();
    }
}

var randomSound = function() {
    audio.src = playlist[Math.floor(Math.random() * playlist.length)];
    audio.play();
}