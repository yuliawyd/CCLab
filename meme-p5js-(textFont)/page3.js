let bg;
let player = {
  history: [],
};
let enemies = [];
let frameStart;

function preload() {
  bg = loadImage("./assets/bg2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameStart = Date.now();
  player = {
    history: [],
    pos: createVector(windowWidth / 2, windowHeight / 2),
  };
  enemies[0] = {
    history: [],
    pos: createVector(random(windowWidth), random(windowHeight)),
  };
}

function draw() {
  background(bg);

  fill(255);
  updatePlayer(player, mouseX, mouseY, 2);

  if (Date.now() - frameStart > 3000) {
    enemies.push({
      history: [],
      pos: createVector(random(windowWidth), random(windowHeight)),
    });
    frameStart = Date.now();
  }

  fill(255, 0, 0);
  enemies.forEach((enemy, i) => {
    enemies[i] = updateEnemy(enemy, player);

    let distance = dist(player.pos.x, player.pos.y, enemy.pos.x, enemy.pos.y);
    if (distance < 25) {
      window.location.href = "./page4.html";
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updatePlayer(player, x, y, size = 1) {
  player.pos = createVector(x, y);
  let history = player.history;
  history.push(player.pos);
  if (history.length > 25) {
    history.splice(0, 1);
  }
  for (let i = 0; i < history.length; i++) {
    let pos = history[i];
    ellipse(pos.x, pos.y, i * size, i * size);
  }
  player.history = history;
}

function updateEnemy(enemy, player) {
  updatePlayer(enemy, enemy.pos.x, enemy.pos.y, 1);
  let direction = p5.Vector.sub(player.pos, enemy.pos);
  direction.normalize();
  direction.mult(4);
  enemy.pos.add(direction);
  return enemy;
}
