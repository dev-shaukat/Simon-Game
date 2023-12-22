var buttonColors = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var level = 0;
var started = false;
// For storing userClicked values
var userClickedPattern = [];


$(document).keydown(function () { 

    if (!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// =============== Button Click =======================

$(".box").click(function(){ 
    console.log("JQuery Function");
    // Here the value is being stored as an object and then we have to get just id so
    // here we can simply use this.id too to get the id
    var userChoosenColor = $(this).attr("id");
    // Here we are accessing only value of id out of the whole object
    // userChoosenColor = userChoosenColor.id;
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


// ================== Check Answer =======================

// Check Answer Function
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
    console.log("success");
    
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
            nextSequence();
        } , 1000);
    }
    }

    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 200)
        console.log("Wrong");
        $("h1").text("Game Over , Press Any Key To Start Over");
        startOver();
    }
}



// =================== Next Sequence Function ==================

function nextSequence(){
    userClickedPattern = [];
    
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);

    // ------------------- Moving this code so we can refactor our code -------------------
    // var playAudio = new Audio("sounds/" + randomChoosenColor + ".mp3");
    // playAudio.play();
}

// ============= Play Audio ===============

function playSound(name) {
    
    var playAudio = new Audio("sounds/" + name + ".mp3");
    playAudio.play();
}

// Animate Function to play animations 

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#" + currentColor).removeClass("pressed");
    } , 100);

    // ============ OLD CODE ===========
    // console.log("Current Color inside animate : ", currentColor);
    // currentColor = "." + currentColor;
    // console.log("AFTER COLOR  :::: " , currentColor);
    // $(currentColor).addClass(".pressed");
    // console.log("After::::::");
}


// ==================== Start Over ===================

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    console.log("Game ended here ");
}