// global variables
var myhealth = 0;
var myattack = 0;
var mychar = "";
var firstbaddy = "";
var enemyhealth = 0;
var enemycounter = 0;
$("#attackButton").hide();
$(".chooseenemy").hide();
$("#yourHealth").hide();
$("#enemyHealth").hide();
$("#currentEnemy").hide();
$("#yourAttackpower").hide();
$("#enemyCounterpower").hide();

// players variables
let players = {
    'Luke': {
        name: 'luke',
        health: 120,
        attack: 8,
        imageUrl: "assets/images/luke.png",
        counterAttack: 15
    }, 
    'Vader': {
        name: 'vader',
        health: 100,
        attack: 14,
        imageUrl: "assets/images/vader.png",
        counterAttack: 5
    }, 
    'Han': {
        name: 'han',
        health: 150,
        attack: 8,
        imageUrl: "assets/images/han.png",
        counterAttack: 20
    }, 
    'Boba': {
        name: 'boba',
        health: 180,
        attack: 7,
        imageUrl: "assets/images/boba.png",
        counterAttack: 20
    }
};

var mystats = function() {
    var CC = $("#chosenChar");
    if (mychar === "Luke" ) {
    myhealth = players.Luke.health;
    myattack = players.Luke.attack;
    CC.attr("src", players.Luke.imageUrl);
    $(".enemydiv1").remove();
    }
    else if (mychar === "Vader" ) {
    myhealth = players.Vader.health;
    myattack = players.Vader.attack;
    CC.attr("src", players.Vader.imageUrl);
    $(".enemydiv2").remove();
    }
    else if (mychar === "Han" ) {
    myhealth = players.Han.health;
    myattack = players.Han.attack;
    CC.attr("src", players.Han.imageUrl);
    $(".enemydiv3").remove();
    }
    else if (mychar === "Boba" ) {
    myhealth = players.Boba.health;
    myattack = players.Boba.attack;
    CC.attr("src", players.Boba.imageUrl);
    $(".enemydiv4").remove();
    }
    CC.attr("class", "img-thumbnail")
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
    if (defeat === true) {
        alert("You've lost!");
        reset();
    }
}

var CheckFirstWin = function() {
    if (firstwin === true) {
        // reset to the next 2 baddies
    }
}

var CheckSecondWin = function() {
    if (secondwin === true) {
        // reset to the next 1 baddies
    }
}

var CheckThirdWin = function() {
    if (thirdwin === true) {
        alert("You've won!")
    }
}