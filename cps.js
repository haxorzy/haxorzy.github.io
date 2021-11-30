var button = document.getElementById("button");
var text = document.getElementById("text");
var moreInfo = document.getElementById("moreInfo")

var gameStart = false;
var gameFullyStart = false;
var cooldown = false;
var clickingMethod;
var clicks = 0;
var leftClicks = 0;
var rightClicks = 0;
var time = 0;
var timeoutTime = 5;

function countDown(){
  if(time >= timeoutTime - 0.1 && cooldown == false){
    if(clicks/timeoutTime >= 8 && clicks/timeoutTime < 14 ){
      clickingMethod = "Butterfly Clicking"
    }
    else if(clicks/timeoutTime < 8 && clicks/timeoutTime >= 3){
      clickingMethod = "Single Clicking"
    }
    else if(clicks/timeoutTime < 3){
      clickingMethod = "Inconsistent Clicking"
    }
    else if(clicks/timeoutTime >= 14 && clicks/timeoutTime < 16){
      clickingMethod = "Jitter Clicking"
    }
    else{
      clickingMethod = "Drag-Clicking"
    }
    
    if(clicks/timeoutTime >= 15){
      text.style.color = "red"
    }  
    else if(clicks/timeoutTime > 13.5 && clicks/timeoutTime < 15){
      text.style.color = "orange"
    }
    else if(clicks/timeoutTime >= 10){
      text.style.color = "yellow"
    }
    
    text.innerHTML = "CPS = " + (clicks/time).toFixed(2);
    moreInfo.innerHTML = "Total Clicks in " + timeoutTime + " Seconds: " + clicks + ", Probable Clicking Method: " + clickingMethod + ". Amount of Left Clicks: " + leftClicks + ", and amount of Right Clicks: " + rightClicks;
    gameStart = false;
    cooldown = true
    time = 0
    clicks = 0
    setTimeout(function(){
      cooldown = false
      moreInfo.innerHTML = "Start Clicking To Play Again"
      rightClicks = 0;
      leftClicks = 0;
    }, 3000);
  }
  else if(cooldown == false && gameStart == true){
    time += 0.1
    text.innerHTML = "TEST IN PROGRESS";
    text.style.color = "white"
    if((timeoutTime - time).toFixed(1) <= 0){
      moreInfo.innerHTML = "Displaying Your Results"
    }
    else{
      moreInfo.innerHTML = "Total Clicks: " + clicks + ". Full Results in " + (timeoutTime - time).toFixed(1) + " seconds"
    }
    /*button.style.background = "#" + (clicks/(timeoutTime*2)).toFixed(0) + "f" + (clicks/(timeoutTime)).toFixed(0) + "f" + "0f";
    //time = time.toFixed(1);
    console.log((clicks/(timeoutTime*2)).toFixed(0))*/
  }
}

function btnClicked(){
  if(gameFullyStart == false && cooldown == false){
    gameFullyStart = true;
    setInterval(countDown, 100);
  }
  
  if(gameStart == false && cooldown == false){
    clicks = 0;
    gameStart = true;
    leftClicks = 0;
  }
  else{
    leftClicks += 1;
  }
  clicks+=1;
  //console.log(time, clicks, gameStart, cooldown)
}

button.onclick = btnClicked
button.onmouseup = mouseUpFunc;
button.onmousedown = mouseDownFunc;

function mouseUpFunc(){
  button.style.background = "#191919"
}

function mouseDownFunc(){
  if(gameStart == true && gameFullyStart == true && cooldown == false){
    var buttonStyle = Math.round(Math.random()*5) + "3"
    button.style.background = "#" + buttonStyle + buttonStyle + buttonStyle
  }
}

button.addEventListener('contextmenu', function(ev) {
  ev.preventDefault();
  rightClicks += 1;
  if(gameStart == false && cooldown == false){
    rightClicks = 0;
    rightClicks += 1;
  }
  leftClicks -= 1;
  btnClicked()
}, false);