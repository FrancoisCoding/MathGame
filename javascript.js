// Variables to be Used Later
var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

// Sounds
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
var soundFlag = true;

// Start/Reset Button is Clicked
document.getElementById("startReset").onclick = function () {

    if (playing == true) {

        // Reloads Page
        location.reload();

    } else {

        // Initiate Start of Game
        playing = true;

        // Set Initial Score
        score = 0;
        document.getElementById("scoreValue").innerHTML = score;

        // Show Time Remaining
        show("timeRemaining");
        timeRemaining = 60;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;

        // Hide Game Over Screen
        hide("gameOver");

        // Change Start to Reset
        document.getElementById("startReset").innerHTML = "Reset Game";

        // Start Countdown
        startCountdown();

        // Generate New Q&A
        generateQA();
    }

}

//Clicking On Answer Box
for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        // Check to See If Game is Being Played   
        if (playing == true) {
            if (this.innerHTML == correctAnswer) {
                // Correct Sound
                if (soundFlag) {
                    correctSound.pause();
                    correctSound.currentTime = 0;
                    correctSound.play();
                }
                // Increase Score By 1 When Correct
                score++;
                document.getElementById("scoreValue").innerHTML = score;
                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);

                // Generate New Q&A
                generateQA();
            } else {
                // Wrong Sound
                if (soundFlag) {
                    wrongSound.pause();
                    wrongSound.currentTime = 0;
                    wrongSound.play();
                }
                // Wrong Answer
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }
}

// Functions

// Start Time Remaining
function startCountdown() {
    action = setInterval(function () {
        timeRemaining -= 1;
        document.getElementById("timeRemainingValue").innerHTML = timeRemaining;
        if (timeRemaining == 0) { // game over
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
            hide("timeRemaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";
        }
    }, 1000);
}

// Stop Time Remaining
function stopCountdown() {
    clearInterval(action);
}

// Hide Element
function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

// Show Element
function show(Id) {
    document.getElementById(Id).style.display = "block";
}

// Generate Q&A's
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());
    // Fill One Box With Correct Answer
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

    // Fill Other Boxes With Wrong Answers
    var answers = [correctAnswer];

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
            } while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

// Remove Hover From Mobile Devices
function watchForHover() {
    var hasHoverClass = false;
    var container = document.body;
    var lastTouchTime = 0;

    function enableHover() {
        // Filter Events From Touch
        if (new Date() - lastTouchTime < 500) return;
        if (hasHoverClass) return;

        container.className += ' hasHover';
        hasHoverClass = true;
    }

    function disableHover() {
        if (!hasHoverClass) return;

        container.className = container.className.replace(' hasHover', '');
        hasHoverClass = false;
    }

    function updateLastTouchTime() {
        lastTouchTime = new Date();
    }

    document.addEventListener('touchstart', updateLastTouchTime, true);
    document.addEventListener('touchstart', disableHover, true);
    document.addEventListener('mousemove', enableHover, true);

    enableHover();
}

watchForHover();
