let character = document.getElementById("character");
let spikeBottom = document.getElementById("spikeBottom");
let spikeTop = document.getElementById("spikeTop");

let isTop = false;
let canPressW = true;
let isInvincible = false;

let yu = 100;
let yd = 400;

let TopCollision = false;
let BottomCollision = false;
let isGameOver = false;
let TopDelay = 1500;
let ActiveTopCollision = false;

let points = 0;
let activePoints = 300;

var lastUpdate = Date.now(); /*Code from StackOverflow, to add the closest thing to deltaTime*/

function tick() {
    var now = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;

    return dt;
}

character.classList.add("skipping");

function toggleFlag(value){
    var toggle = value ? false : true;
    return toggle;
 }

/*When the Animation ends for both */
function onAnimationEndUp() {
    character.style.transform = 'translatey(-300px)';
    character.classList.add("skipping");
 }
 function onAnimationEndDown() {
    character.style.transform = 'translatey(0px)';
    character.classList.add("skipping");
 }
 function onAnimationEndForward() {
    character.classList.add("skipping");
 }
 

function logOnKeyPress(event) {
    // Check if the pressed key is 'W' (case-insensitive)
    if (event.key.toLowerCase() === 'w' && canPressW) {
        if (isTop ==true) {
            /*Go Down */
            character.style.top = yd;
            character.classList.add("animateDown");
            isTop = toggleFlag(isTop);
            setTimeout(function() {
                character.classList.remove("animateDown");},340);
            onAnimationEndDown();
            
            /*Delay */
            canPressW = false;
            setTimeout(() => {
            canPressW = true;
            }, 400);

        }
        else {
            /*Go Up */
            character.classList.add("animateUp");
            character.style.top = yu;
            isTop = toggleFlag(isTop);
            setTimeout(function() {
                character.classList.remove("animateUp");},340);
                onAnimationEndUp();
            
            /*Delay */
            canPressW = false;
            setTimeout(() => {
            canPressW = true;
            }, 400);
        }
    }
    if (event.key.toLowerCase() === 'd' && activePoints >= 100) {
        character.classList.add("animateForward");
        setTimeout(function() {
            character.classList.remove("animateForward");},340);
        onAnimationEndForward();
            
        /*Delay */
        canPressW = false;
        isInvincible = true;
        setTimeout(() => {
         canPressW = true;
        }, 400);
        setTimeout(() => {isInvincible = false;}, 600);
        activePoints -= 100;
    }
  }

  document.addEventListener('keydown', logOnKeyPress);


character.addEventListener('w', function jump() {
    console.log("Clicked");
    if (isTop == false) {
        character.classList.add("animateUp");
        
        }
    else {
        
        isTop = false;
        
        }
    console.log(isTop);
    });

function TopCollisions () { /*These two functions are some serious yandere-dev bs.*/
    if (isGameOver != true) {    
        if (ActiveTopCollision === true) {    
            if (TopCollision == false) {
                setTimeout(TopCollision = true, 1370);
            }
            if ((isTop == true && TopCollision == true) && isInvincible != true) {
                isGameOver = true;
                window.alert(`You got ${points} pts. If the top spike syncs with the bottom one, traverse forward!`);
                window.location.reload();
            }
            if (TopCollision == true) {
                setTimeout(TopCollision = false, 130);
            }
            } else { /*I'm pretty sure this is a placebo. But collisions work this way so who cares.*/
                if (TopDelay <= 0) {
                    ActiveTopCollision = true;
                } else {
                    TopDelay -= tick();
                }
        }
    }
}

function BottomCollisions () { 
    if (isGameOver != true) {
        if (BottomCollision == false) {
            setTimeout(BottomCollision = true, 1370);
        }
        if ((isTop == false && BottomCollision == true) && isInvincible != true) {
            isGameOver = true;
            window.alert(`You got ${points} pts. Remember the lower spike is faster!`);
            window.location.reload();
        }
        if (BottomCollision == true) {
            setTimeout(BottomCollision = false, 130);
        }
    }
}

setInterval(BottomCollisions, 1500);
setInterval(TopCollisions, 2500);

function addPoints() { /*Adds 5 points to the scores each half second. Could be snappier but nobody likes odd numbers.*/
    if (isGameOver != true) {    
        points += 5;
        activePoints += 5;
        document.getElementById("Total").innerHTML = `Your Total Points: ${points}`;
        document.getElementById("Active").innerHTML = `AP Available: ${activePoints}`;
    }
}

setInterval(addPoints, 500);