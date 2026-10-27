const width = 800;
const height = 600;
function setup() {
    createCanvas(width, height);
    spawnGhost();
    startTime = millis();
}

let ghost;
let enemy;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let baseSpawnEvery = 80; // spawn a ghost every 80 frames

function draw() {
    background(15, 10, 25);
    noStroke();

    if (state === 'start') {
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(22);
        text('Click to start', width / 2, height / 2);
        return;
    }

    if (state === 'over') {
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(22);
        text('Game over\nScore: ' + score + '\nClick to retry', width / 2, height / 2);
        return;
    }
    // background
    fill(78,69,92);
    ellipse(700, 60, 60, 60); // glow effect

    fill(255, 240, 200);
    ellipse(700, 60, 50, 50); // moon

    fill(40, 30, 50);
    rect(0, 542, width, 58); //ground

    fill(78,69,92);
    ellipse(200, 70, 10, 10) //star glow
    fill(255, 240, 200);
    ellipse(200, 70, 5, 5) //star

    fill(78,69,92);
    ellipse(350, 200, 10, 10) //star glow
    fill(255, 240, 200);
    ellipse(350, 200, 5, 5) //star

    fill(78,69,92);
    ellipse(690, 200, 10, 10) //star glow
    fill(255, 240, 200);
    ellipse(690, 200, 5, 5) //star

    fill(255, 240, 200);
    ellipse(400, 100, 2, 2)

    fill(255, 240, 200);
    ellipse(450, 300, 3, 3)

    fill(255, 240, 200);
    ellipse(100, 310, 3, 3)
    // end of background

    let elapsed = (millis() - startTime) / 1000;
    let timeLeft = max(0, duration - elapsed);
    if (timeLeft <= 0) {
        state = 'over';
        return;
    }

    let currentSpawnEvery = max(20, floor(baseSpawnEvery - (elapsed * 2))); // decrease spawn interval over time, but not less than 20 frames
    if (frameCount % currentSpawnEvery === 0) spawnGhost();
    if (frameCount % currentSpawnEvery === 0) spawnEnemy();
    drawGhost(ghost.x, ghost.y);
    drawEnemy(enemy.x, enemy.y);


    textAlign(LEFT, TOP);
    fill(255);
    textSize(16);
    text('Score: ' + score, 12, 10);
    textAlign(RIGHT, TOP);
    text('Time: ' + ceil(timeLeft), width - 12, 10);
}

function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}

function spawnEnemy() {
  enemy = { x: random(40, width - 40), y: random(40, height - 40) };
  while (enemy.x === ghost.x && enemy.y === ghost.y) {
    enemy = { x: random(40, width - 40), y: random(40, height - 40) };
  }
}

function drawGhost(x, y) {
    fill(152, 255, 152);
    ellipse(x, y, 50, 50);
    fill(20);
    ellipse(x - 12, y - 5, 10);
    ellipse(x + 12, y - 5, 10);
    fill(20);
    ellipse(x, y + 10, 30, 10); //mouth
}

function drawEnemy(x, y) {
    fill(238, 130, 238);
    rect(x - 25, y - 25, 50, 50);
    fill(20);
    ellipse(x - 12, y - 5, 10);
    ellipse(x + 12, y - 5, 10);
    // Frowning mouth
    stroke(0);
    strokeWeight(3);
    noFill();
    arc(x, y + 12, 18, 12, PI, TWO_PI);
    noStroke();
}
    

function mousePressed() {
    if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    spawnEnemy();
    return;
  }
  // Check if player clicked the enemy first (Game Over)
    if (dist(mouseX, mouseY, enemy.x, enemy.y) < 25) {
        state = 'over';
        return;
  }
  // clicking on the creature
    if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}