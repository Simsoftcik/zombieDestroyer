const SIZE_DOWN_BOUND = 100;
const SIZE_UPPER_BOUND = 300;
const MIN_HEIGHT = 0;
const MAX_HEIGHT = 300;
const MIN_SPAWN_TIME = 1000;
const MAX_SPAWN_TIME = 5000;
const MIN_SPEED = 0.0000001;
const MAX_SPEED = 0.00000002;
let END_GAME = true;

window.onload = function() {
    game();
};

function game() {
    if (END_GAME) {
        const spawnTime = Math.floor(Math.random() * (MAX_SPAWN_TIME - MIN_SPAWN_TIME + 1)) + MIN_SPAWN_TIME;
        addZombie();
        setTimeout(game, spawnTime);
    }
}


function addZombie() {
    const zombie = document.createElement('div');
    const div = document.querySelector("main");
    const zombieWidth = Math.floor(Math.random() * (SIZE_UPPER_BOUND - SIZE_DOWN_BOUND + 1)) + SIZE_DOWN_BOUND;
    const zombieBotPosition = Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT + 1)) + MIN_HEIGHT;
    const zombieSpeed = Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED + 1)) + MIN_SPEED;

    zombie.style.width = zombieWidth + 'px';
    zombie.style.height = Math.floor(312*zombieWidth/200) + 'px';
    zombie.classList.add("zombie");
    zombie.style.right = -zombieWidth;
    zombie.style.bottom = zombieBotPosition;
    zombie.style.backgroundSize = `${zombieWidth}px`
    // Dodanie diva do ciała strony
    div.appendChild(zombie);
    animateZombie(zombie,zombieWidth, zombieSpeed)
  }

// function zombieWalk(frame) {
//     const framePosition = `-${frame * 200}px`; // Przesuwaj sprite sheet w lewo lub prawo, aby wybrać odpowiednią klatkę
  
//     character.style.backgroundPosition = framePosition;
//     setInterval(function() {
//         zombieWalk((frame + 1) % 10);
//       }, 1000);
//   }
  
function animateZombie(zombie, zombieWidth, zombieSpeed) {
    let position = -zombieWidth; // Początkowa pozycja poza ekranem
    let speed = zombieSpeed; // Prędkość poruszania się zombie
    let frame = 0; // Aktualna klatka animacji

    function step() {
        position += speed;
        frame = (frame + 1) % 10;
        const framePosition = `-${frame * 200}px`;
        zombie.style.backgroundPosition = framePosition;
        zombie.style.right = position + 'px';

        if (position > window.innerWidth) {
            zombie.remove(); // Usuń zombie, gdy przekroczy ekran
        } else {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}
