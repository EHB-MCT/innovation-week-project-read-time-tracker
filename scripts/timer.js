//a timer that starts when a new page is loaded and stops when the user clicks on a link
//the timer is then sent to the server and stored in the database
//the timer is then sent back to the client and displayed on the page
//the timer is then reset and the process repeats
//the timer is displayed in the format of minutes:seconds
//the timer is displayed in the top right corner of the page
//the timer is displayed in a div with the id of timer
//start coding

//create a variable to store the timer
var timer;
//create a variable to store the time
var time;
//create a variable to store the minutes
var minutes;
//create a variable to store the seconds
var seconds;
//create a variable to store the timer div
var timerDiv;
//create a variable to store the timer text
var timerText;
//create a variable to store the timer interval
var timerInterval;


//create a function to start the timer
function startTimer() {
    //get the timer div
    timerDiv = document.getElementById("timer");
    //get the timer text
    timerText = document.getElementById("timerText");
    //get the time
    time = 0;
    //get the minutes
    minutes = 0;
    //get the seconds
    seconds = 0;
    //set the timer interval
    timerInterval = setInterval(function() {
        //increment the time
        time++;
        //increment the seconds
        seconds++;
        //if the seconds are greater than or equal to 60
        if(seconds >= 60) {
            //increment the minutes
            minutes++;
            //reset the seconds
            seconds = 0;
        }
        //if the seconds are less than 10
        if(seconds < 10) {
            //set the seconds to 0 + the seconds
            seconds = "0" + seconds;
        }
        //set the timer text to the minutes:seconds
        timerText.innerHTML = minutes + ":" + seconds;
    }, 1000);
}

//create a function to stop the timer
function stopTimer() {
    //clear the timer interval
    clearInterval(timerInterval);
    //send the timer to the server
    sendTimer();
}

//add the timer to the DOM
function addTimer() {
    //get the timer div
    timerDiv = document.getElementById("timer");
    //get the timer text
    timerText = document.getElementById("timerText");
    //set the timer text to the minutes:seconds
    timerText.innerHTML = minutes + ":" + seconds;
    //add the timer to the DOM
    timerDiv.appendChild(timerText);
}