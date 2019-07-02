
$(document).ready(function(){
    $('.carousel').carousel();
    $('#run').on('click', go);
    $("#initial-hide").hide();
});


$("#run").on("click", function(){
    $("#splash").hide();
    $("#initial-hide").show();
  });



//This section for Ajax Calls














// This Section for Timer
var intervalId;

var clockRunning = false;
var time = 300;

function go() {
    if (!clockRunning) {
      intervalId = setInterval(count, 1000);
      clockRunning = true;
    }
}

function stop() {
    clearInterval(intervalId);
    clockRunning = false;
}

function count() {
    if (time === 0) {
        stop();
    } else {
        time--;
        var converted = timeConverter(time);
        console.log(converted);
        $('#timer').text(converted);
        }
}

function timeConverter(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;
  
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
  
    if (minutes === 0) {
      minutes = '00';
    } else if (minutes < 10) {
      minutes = '0' + minutes;
    }
  
    return minutes + ':' + seconds;
  }