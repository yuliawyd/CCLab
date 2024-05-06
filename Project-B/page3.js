let bg;
let player = {
  history: [],
};
let enemies = [];
let frameStart;
let bgMusic;
let video3p1, video2p4;
let pg1, pg2;

function preload() {
  bg = loadImage("./assets/bg2.png");
  bgMusic = loadSound("./assets/bgm3.mp3");
  // video3p1 = createVideo("./assets/3p1.mp4");
  // video2p4 = createVideo("./assets/2p4.mp4");
  video3p1 = loadImage("./assets/3p1.png")
  video2p4 = loadImage("./assets/2p4.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusic.loop();
  frameStart = Date.now();
  player = {
    history: [],
    pos: createVector(windowWidth / 2, windowHeight / 2),
  };
  enemies[0] = {
    history: [],
    pos: createVector(random(windowWidth), random(windowHeight)),
  };
 
  pg1 = createGraphics(200, 200);
  pg2 = createGraphics(200, 200);
}

function draw() {
  background(bg);

  noStroke();

  fill(255);
  if (mouseX != 0 && mouseY != 0) {
    updatePlayer(player, mouseX, mouseY, 4, draw11Cat)
  }

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
    if (distance < 50) {
      bgMusic.stop();
      window.location.href = "./page4.html";
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function updatePlayer(player, x, y, size = 1, func) {
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
  func && func(x, y)
  player.history = history;
}

function updateEnemy(enemy, player) {
  updatePlayer(enemy, enemy.pos.x, enemy.pos.y, 2, draw22Cat);
  let direction = p5.Vector.sub(player.pos, enemy.pos);
  direction.normalize();
  direction.mult(4);
  enemy.pos.add(direction);
  return enemy;
}

function draw11Cat(x, y) {
  processPixels(video3p1, pg1, 200);
  image_center(pg1, x, y + 20);
}

function draw22Cat(x, y) {
  processPixels(video2p4, pg2, 200);
  image_center(pg2, x, y + 20);
}
