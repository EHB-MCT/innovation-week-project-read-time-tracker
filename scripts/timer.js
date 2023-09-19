//a timer that starts when a new page is loaded and stops when the user clicks on a link
//the timer is then sent to the server and stored in the database
//the timer is then sent back to the client and displayed on the page
//the timer is then reset and the process repeats
//the timer is displayed in the format of minutes:seconds
//the timer is displayed in the top right corner of the page
//the timer is displayed in a div with the id of timer

var minutes = 0;
var seconds = 0;
var timerDiv;
var timerText;
var timerInterval;

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
      console.log(`This is tab ${tabs[0].id}`);
      // Call the startTimer function when the message is received
    }
});
startTimer();

// Listen for messages from the background script
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.startTimer) {
//       startTimer();
//       console.log(`Timer started at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
//     }
//   });

function startTimer() {
    addTimer();
    //get the timer text
    timerText = document.getElementById("timerText");
    //get the minutes
    minutes = 0;
    //get the seconds
    seconds = 0;
    //set the timer interval
    timerInterval = setInterval(function() {
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

//add the timer to the DOM
function addTimer() {
    //get the timer text
    timerText = document.getElementById("timerText");
    //set the timer text to the minutes:seconds
    timerText.innerHTML = minutes + ":" + seconds;
}