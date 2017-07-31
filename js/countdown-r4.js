var endDate = new Date(Date.UTC(2017, 07, 15, 0, 0, 0, 0));
//var endDate = new Date(2017, 06, 30, 19, 06, 55, 0);
var _mili = 1;
var _second = _mili*1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;
var secondsTimer;
var interval;
var currentTime;
var enhance;

var days;
var hours;
var minutes;
var seconds;
var milis;
var _enhance = true;
var played = false;
var ending = document.createElement("iframe");
var body = document.getElementsByClassName("body");
var _endingSounds = false;
var _endingSounds2 = false;
var _alert = false;

var endingSounds = document.getElementById("endingSounds").addEventListener("change", function() {
    if (document.getElementById("endingSounds").checked) {
        _endingSounds = true;
    } else {
        _endingSounds = false;
    }

    if (document.getElementById("endingSounds2").checked) {
        document.getElementById("endingSounds2").checked = false;
    }
});

var endingSounds = document.getElementById("endingSounds2").addEventListener("change", function() {

    if (document.getElementById("endingSounds2").checked) {
        _endingSounds2 = true;
        if (!_alert) {
            
            if (window.confirm("Are you sure? By confirming the animated cutscene that the Official Sonic Youtube Channel is uploading on August 14th will be played.")) {
                _alert = true;
            }
            else {
                document.getElementById("endingSounds2").checked  = false;
            }
        }
    } else {
        _endingSounds2 = false;
    }

    if (document.getElementById("endingSounds").checked) {
        document.getElementById("endingSounds").checked = false;
    }

});

Setup();
function Setup() {
    timer = document.getElementById("timer");
    secondsTimer = document.getElementById("secondsTimer");
    console.log(new Date().getUTCDate());
     console.log(new Date().getTimezoneOffset());
    console.log(endDate);
    //PlayEnd();
    CalculateTime();
}

function CalculateTime() {
    currentTime = new Date();
    var timeLeft = endDate - currentTime;

    if (timeLeft < 0) {
        clearInterval(timer);
        timer.innerHTML = "Hey! What are you doing here?";
        secondsTimer.innerHTML = "Sonic Mania is out NOW!!!";
        ending.src="https://www.youtube.com/embed/OLcblxrrE0Q?autoplay=1";
        return;
    }

     days = Math.floor(timeLeft / _day);
     hours = Math.floor((timeLeft % _day) / _hour);
     minutes = Math.floor((timeLeft % _hour) / _minute);
     seconds = Math.floor((timeLeft % _minute) / _second);
     milis = Math.floor((timeLeft % _second) / _mili);

     if (days == 0 && hours == 0 && minutes <= 1 && seconds <= 35 && !played && (_endingSounds || _endingSounds2)) {
         PlayEnd();
         played = true;
     }

    if (days < 2 && days > 0) {
        timer.innerHTML = days + " day ";
    } else {
        timer.innerHTML = days + " days ";
    }
    if (hours < 2 && hours > 0) {
        timer.innerHTML += hours + " hour ";
    } else {
        timer.innerHTML += hours + " hours ";
    }
    if (minutes < 2 && minutes > 0) {
        timer.innerHTML += minutes + " minute";
    } else {
        timer.innerHTML += minutes + " minutes";
    }
    if (seconds < 2 && seconds > 0) {
        secondsTimer.innerHTML = seconds + " second";
    } else {
        secondsTimer.innerHTML = seconds + " seconds";
    }
    
    if (_enhance) {
        MiliCount();
    } else {
        setTimeout(CalculateTime, 50);
    }
}

function MiliCount() {
    var countdownTime = new Date();
    var timeInterval = countdownTime - currentTime;
    var __days = Math.floor(timeInterval / _day);
    var __hours = Math.floor((timeInterval % _day) / _hour);
    var __minutes = Math.floor((timeInterval % _hour) / _minute);
    var __seconds = Math.floor((timeInterval % _minute) / _second);
    var __milis = Math.floor((timeInterval % _second) / _mili);
    //console.log(__milis+milis);
    if (milis + __milis >= 1000) {
        CalculateTime();
    } else {
        milis += __milis;
        setTimeout(MiliCount,50);
    }
}

function PlayEnd() {
    if (endingSounds) {
        ending.src = "https://www.youtube.com/embed/wvD8NZN9Zsg?autoplay=1";
    } else if (endingSounds2) {
        ending.src = "https://www.youtube.com/embed/wvD8NZN9Zsg?autoplay=1";
    }
    ending.frameBorder = "0";
    ending.id = "ending";
    body.item(0).appendChild(ending);
    ending = document.getElementById("ending");
}