$(document).ready(function () {
    $(".restart").hide();
    $(".attack").hide();
    
    // Character Attributes
    var charImage = ["https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/12143343_10153502487500020_2287617928083366756_n.jpg?_nc_cat=111&_nc_ht=scontent-sjc3-1.xx&oh=d23cf26834acf34247ee375297cc8a7d&oe=5C82CF06", "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/10489840_10102333562189519_9211457176484726882_n.jpg?_nc_cat=106&_nc_ht=scontent-sjc3-1.xx&oh=d33dbeb25fa18dca2d644025163bb968&oe=5C81B3C9", "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/36889380_10215492856851028_1348281412075126784_n.jpg?_nc_cat=105&_nc_ht=scontent-sjc3-1.xx&oh=f45c9364e6fba9bfd64d17f888cc7959&oe=5C75BEB6", "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-9/10489720_10154408757045301_4872662977005350940_n.jpg?_nc_cat=103&_nc_ht=scontent-sjc3-1.xx&oh=717b3cdf19e497e2e1a269f82f566c3e&oe=5C6ADF6B"];
    var name = ["River Guide", "Ski Patroller", "Mountain Guide", "Fishing Guide"];
    var healthPoints = [120, 100, 150, 180];
    var attack = [8, 10, 6, 4];
    var baseAttack = [8, 10, 6, 4];
    var counterAttack = [10, 5, 20, 25];
    
    // Global Game Variables
    var charIndex;
    var defenderPresent = false;
    var defenderIndex;
    var wins = 0;
    

    // Button to Start Game
    $(".start").on("click", function () {
        $(".start").hide();
        $(".attack").show();
        startGame(); 
    });
   

    // Generates Characters in Choose Your Character Section
    var startGame = function() {
    for (var i = 0; i < charImage.length; i++) {
        var player = $("<img>");
        player.attr("src", charImage[i]);
        var headline = $("<p>");
        headline.text(name[i]);
        var health = $("<p>");
        health.addClass("health" + i)
        health.text(healthPoints[i]);
        $("#" + i).append(health, headline, player);
        }
    }   
    

    // Generates clicked character in Your Character section
    $(".choose-character").on("click", function () {
        var charIndex = ($(this).attr("id"));
        charIndex = parseInt(charIndex);
        var generateYourChar = function () {
            for (var i = 0; i < charImage.length; i++) {
                if (i != charIndex) {
                    continue;
                }
                var player = $("<img>");
                player.attr("src", charImage[i]);
                var headline = $("<p>");
                headline.text(name[i]);
                var health = $("<p>");
                health.addClass("health" + i)
                health.text(healthPoints[i]);
                $("#" + (i + 10)).append(health, headline, player);
                attackerIndex = charIndex;
            }
        }
        // Generates the 3 Enemey characters in Enemy section
        var generateEnemyChar = function () {
            for (var i = 0; i < charImage.length; i++) {
                if (i === charIndex) {
                    continue;
                }
                var player = $("<img>");
                player.attr("src", charImage[i]);
                var headline = $("<p>");
                headline.text(name[i]);
                var health = $("<p>");
                health.addClass("health" + i)
                health.text(healthPoints[i]);
                $("#" + (i + 20)).append(health, headline, player);
                $("#0, #1, #2, #3").empty();
            }
        }
        generateYourChar();
        generateEnemyChar();
    });


    // Sends Clicked Enemy into Defender area
    $(".enemy").on("click", function () {
        if (defenderPresent) {
            return
        }
        var defender = ($(this).attr("id"));
        defender = parseInt(defender);
        defender = defender - 20;
        var pickEnemy = function () {
            for (var i = 0; i < charImage.length; i++) {
                 if (i != defender) {
                    continue;
                }
                var player = $("<img>");
                player.attr("src", charImage[i]);
                var headline = $("<p>");
                headline.text(name[i]);
                var health = $("<p>");
                health.addClass("health" + i)
                health.text(healthPoints[i]);
                $("#" + (i + 30)).append(health, headline, player);
                $("#" + (defender + 20)).empty();
                $("#theAttack, #theCounterAttack").empty();
                defenderIndex = defender;
            }
        }
        pickEnemy();
        defenderPresent = true;
    });


    // Attack Button Main Game Process
    $(".attack").on("click", function () {
        if (!defenderPresent) {
            return
        }
        healthPoints[attackerIndex] = healthPoints[attackerIndex] - counterAttack[defenderIndex];
        healthPoints[defenderIndex] = healthPoints[defenderIndex] - attack[attackerIndex];
        $(".health" + attackerIndex).html(healthPoints[attackerIndex]);
        $(".health" + defenderIndex).html(healthPoints[defenderIndex]);
        
        $("#theAttack").html("You Attacked " + name[defenderIndex] + " for " + attack[attackerIndex] + " Damage" )
        $("#theCounterAttack").html(name[defenderIndex] + " Attacked You for " + counterAttack[defenderIndex] + " Damage" )
        attack[attackerIndex] = (attack[attackerIndex] + baseAttack[attackerIndex]);
        // Attacker Defeats Defender
        if (healthPoints[defenderIndex] < 1) {
            $("#" + (defenderIndex + 30)).empty();
            $("#theAttack").html("You Defeated " + name[defenderIndex]);
            $("#theCounterAttack").html("choose another enemy to attack");
            defenderPresent = false;
            wins++;
        }
        // Defender Defeats Attacker
        if (healthPoints[attackerIndex] < 1) {
            alert("you have lost")
            $(".attack").hide();
            $(".restart").show();

            $("#theAttack").html("You have been defeated by " + name[defenderIndex]);
            $("#theCounterAttack").html("Click restart to play again");
        }
        // Attacker wins game by defeating all Enemies
        else if (wins === 3) {
            alert("you have won!")
            $(".attack").hide();
            $(".restart").show();

            $("#theAttack").html("You have defeated all dirtbags!");
            $("#theCounterAttack").html("Click restart to play again");
        }
    });

    
    // Restart Game
    $(".restart").on("click", function () {
        $(".enemy, .defender, .your-character").empty();
        healthPoints = [120, 100, 150, 180];
        attack = [8, 10, 6, 4];
        defenderPresent = false;
        wins = 0;
        $(".restart").hide();
        $(".attack").show();
        startGame(); 
});
});
