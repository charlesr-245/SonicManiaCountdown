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
var musicPlayerChoice = document.getElementById("musicPlayerChoice").addEventListener("change",function() {
    RemoveMusic(false);
    if (document.getElementById("musicPlayerChoice").checked) {
        document.getElementById("musicPlayerChoice2").checked = false;
        PlayMusic();
    }
});

var musicPlayerChoice2 = document.getElementById("musicPlayerChoice2").addEventListener("change",function() {
    RemoveMusic(false);
    if (document.getElementById("musicPlayerChoice2").checked) {
        document.getElementById("musicPlayerChoice").checked = false;
        PlayMusic();
    }
});


var musicPlayer = document.createElement("div");
musicPlayer.id="musicPlayer";

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

//YOUTUBE API IMPLEMENTATION
  // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Replace the 'ytplayer' element with an <iframe> and
  // YouTube player after the API code downloads.
  var player;

  function onReady(event) {
      setTimeout(function() {
          event.target.setShuffle(true);
      },150);
  }


Setup();
function Setup() {
    timer = document.getElementById("timer");
    secondsTimer = document.getElementById("secondsTimer");
    console.log(new Date().getUTCDate());
    console.log(new Date().getTimezoneOffset());
    console.log(endDate);
    CalculateTime();
}

function CalculateTime() {
    currentTime = new Date();
    var timeLeft = endDate - currentTime;

    if (timeLeft < 0) {
        timer.innerHTML = "Hey! What are you doing here?";
        secondsTimer.innerHTML = "Sonic Mania is out NOW!!!";
        if (_endingSounds) {
            ending.src="https://www.youtube.com/embed/OLcblxrrE0Q?autoplay=1";
        } else if (_endingSounds2) {
            //To be added
            ending.src="";
        }
        
        return;
    }

     days = Math.floor(timeLeft / _day);
     hours = Math.floor((timeLeft % _day) / _hour);
     minutes = Math.floor((timeLeft % _hour) / _minute);
     seconds = Math.floor((timeLeft % _minute) / _second);
     milis = Math.floor((timeLeft % _second) / _mili);

     if (days == 0 && hours == 0 && minutes <= 1 && seconds <= 50 && !played && (_endingSounds || _endingSounds2)) {
         RemoveMusic(true);
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

  function PlayMusic() {
    body.item(0).appendChild(musicPlayer);
    var randomIndex = Math.floor(Math.random()*16);
    console.clear();
    console.log(randomIndex);
    var playlist;
    if (document.getElementById("musicPlayerChoice").checked) {
        playlist = "PL6YtbPaCgKrSPGQcud92UaT2daUfYq1L_";
    } else {
        playlist = 'PL9kRoOntv7eDUBf_Fxu4JrHsozuBBP4wD';
    }
    player = new YT.Player('musicPlayer', {
      height: '0',
      width: '0',
      playerVars:
      {
        loop: "1",
        autoplay: "1",
        listType: 'playlist',
        list: playlist,
        disablekb: "1",
        origin: "mania.charlez245.com",
        index: randomIndex,
        start: 1500,
      },
    events: {
        "onReady": onReady,
    }
    });
  }


function RemoveMusic(full) {
    if (full) {
        body.item(0).removeChild(document.getElementById("musicPlayerChoice"));
    }
    if (document.getElementById("musicPlayer")) {
        body.item(0).removeChild(document.getElementById("musicPlayer"));
    }
}
