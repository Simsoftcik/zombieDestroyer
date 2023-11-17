// Settings
let TIME_FACTOR = 1;
let MIN_HEIGHT = 0;
let MAX_HEIGHT = 90;
let MIN_SPAWN_TIME = 1000;
let MAX_SPAWN_TIME = 4000;
let MIN_SPEED = 5;
let MAX_SPEED = 10;
let MIN_SCALE = 0.3;
let MAX_SCALE = 1.2;
let IN_GAME = true;
let LIVES = 3;

// Ingame environmental variables
let SCORE = 30;
let LIVES_LEFT = LIVES;

const h1 = document.querySelector("h1");

window.onload = function() {
    let container = document.getElementById("heartContainer");
    for(let i=0;i<LIVES;i++){
        let img = document.createElement("img");
        img.src = "images/full_heart.png";
        img.style.width = "60px";
        img.style.margin = "5px";
        container.appendChild(img);

    }
    game();
    document.addEventListener('click', function(){
        if(IN_GAME && SCORE>=0){
            SCORE -= 3;
            if(SCORE>=0){
                h1.textContent = SCORE.toString().padStart(5, '0');
            }
            else{
                h1.textContent = "-"+Math.abs(SCORE).toString().padStart(5, '0');
            }
            
        }
    });
    const centeredImage = document.getElementById('aim');

    document.addEventListener('mousemove', function(event) {
        const x = event.clientX;
        const y = event.clientY;

        centeredImage.style.left = x + 'px';
        centeredImage.style.top = y + 'px';
    });
};

function game() {
    if (IN_GAME) {
        const spawnTime = Math.floor(Math.random() * (MAX_SPAWN_TIME - MIN_SPAWN_TIME + 1)) + MIN_SPAWN_TIME;
        addZombie();
        setTimeout(game, spawnTime);
    }
}


function addZombie() {
    const zombie = document.createElement('div');
    const div = document.querySelector("main");
    const zombieBotPosition = Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT + 1)) + MIN_HEIGHT;
    const walkDuration = Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED + 1)) + MIN_SPEED;
    const scaleSize = Math.random() * (MAX_SCALE - MIN_SCALE) + MIN_SCALE;
    zombie.classList.add("zombie");
    zombie.style.animation = `walkZombie ${walkDuration}s linear infinite, animateZombie 0.9s steps(10) infinite`;
    zombie.style.bottom = zombieBotPosition+'px';
    zombie.style.zIndex = -zombieBotPosition;
    zombie.style.scale = scaleSize;

    div.appendChild(zombie);
    TIME_FACTOR += 1;
    if(TIME_FACTOR % 10 == 0 && MIN_SPEED>2){
        MIN_SPEED -=0.5;
        MAX_SPEED -=0.5;
        MIN_SPAWN_TIME -=150;
        MAX_SPAWN_TIME -=500;
    };

    zombie.addEventListener('animationiteration', function (event) {
        // Sprawdzamy, czy zdarzenie dotyczy animacji walkZombie
        if (event.animationName === 'walkZombie') {
            div.removeChild(zombie);
            LIVES_LEFT -= 1;
            if(LIVES_LEFT==0){
                endGame();
            }
            const container = document.getElementById("heartContainer");
            container.innerHTML = "";
            for(let i=0;i<LIVES_LEFT;i++){
                let img = document.createElement("img");
                img.src = "images/full_heart.png";
                img.style.width = "60px";
                img.style.margin = "5px";
                container.appendChild(img);
            }
            for(let i=0;i<LIVES-LIVES_LEFT;i++){
                let img = document.createElement("img");
                img.src = "images/empty_heart.png";
                img.style.width = "60px";
                img.style.margin = "5px";
                container.appendChild(img);
            }
            console.log(LIVES_LEFT);
        }
    });

    // zombie.onclick = function(){
    //     div.removeChild(zombie);
    //     console.log("pies")
    // };

    zombie.addEventListener('click', function() {
        if(SCORE>=0){
            div.removeChild(zombie);
        SCORE += 13;
        if(SCORE>=0){
            h1.textContent = SCORE.toString().padStart(5, '0');
        }
        else{
            h1.textContent = "-"+Math.abs(SCORE).toString().padStart(5, '0');
        }
        }
        
    });
  }

  function endGame() {
    IN_GAME = false;
    const darkness = document.getElementById("endGameDarkness");
    const redhouse = document.getElementById("endGame");
    const scoreValue = document.getElementById("scoreValue");
    darkness.style.display = "block";
    redhouse.style.display = "block";
    scoreValue.textContent = `${SCORE}`;
    const zombies = document.querySelectorAll('.zombie');
    zombies.forEach(function (zombie) {
        document.querySelector("main").removeChild(zombie);
    });
    const body = document.querySelector("body");
    body.style.cursor = "pointer";
    const centeredImage = document.getElementById('aim')
    centeredImage.style.display = "none";
    console.log("Koniec gry!");
}