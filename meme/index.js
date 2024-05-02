let bg;
let timetable;
let days = ["MON", "TUE", "WED", "THU", "FRI"];
let day;
let video;
let video2;
let bgMusic;
let showFrame2 = false;
let frame2StartTime;
let c, c2;
let start = false;
let t = 0;

function preload() {
  bg = loadImage("./assets/bg1.png");
  timetable = loadImage("./assets/bg6.png");
  day = random(days);
  video = createVideo("./assets/bbxm.mp4");
  video2 = createVideo("./assets/btjjxmm.mp4");
  bgMusic = loadSound("./assets/bgm1.mp3"); // Load the background music
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video.hide();
  video2.hide();
  c = createGraphics(windowWidth / 2, windowHeight / 2);
  c2 = createGraphics(windowWidth / 2, windowHeight / 2);
  bgMusic.loop();
  video.muted = true;
  video.loop();
}

function draw() {
  background(bg);
  textAlign(CENTER, CENTER);
  textSize(32);

  fill(0);
  rect(windowWidth - 220, 10, 220, 50);
  fill(255, 0, 0);
  text(day + " 7:00 AM", windowWidth - 110, 40);

  textFont("Chiller");
  textSize(48);
  text("#%-/o--#...o--||//?!", windowWidth / 2, windowHeight / 4 - 50);
  textFont("Times New Roman");
  textSize(32);

  let rotation = map(noise(t), 0, 1, -PI / 32, PI / 32);
  push();
  translate(windowWidth / 4, windowHeight / 4);
  rotate(rotation);
  imageMode(CENTER);
  image(
    timetable,
    windowWidth / 4,
    windowHeight / 4,
    windowWidth / 2,
    windowHeight / 2
  );
  pop();
  t += 0.01;

  drawFrame1();
  if (showFrame2) {
    drawFrame2();
  }

  textSize(32);
  fill(255);
  rect(windowWidth / 2 - 160, (3 * windowHeight) / 4 + 40, 160, 40);
  rect(windowWidth / 2 + 20, (3 * windowHeight) / 4 + 40, 160, 40);

  fill(0);
  text("MATH", windowWidth / 2 - 80, (3 * windowHeight) / 4 + 62);
  text("ENGLISH", windowWidth / 2 + 100, (3 * windowHeight) / 4 + 62);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (!start) {
    start = true;
    bgMusic.loop();
    video.loop();
  }

  if (
    mouseX > windowWidth / 2 - 160 &&
    mouseX < windowWidth / 2 - 0 &&
    mouseY > (3 * windowHeight) / 4 + 40 &&
    mouseY < (3 * windowHeight) / 4 + 80
  ) {
    window.location.href = "page2.htm";
  }
  if (
    mouseX > windowWidth / 2 + 20 &&
    mouseX < windowWidth / 2 + 180 &&
    mouseY > (3 * windowHeight) / 4 + 40 &&
    mouseY < (3 * windowHeight) / 4 + 80
  ) {
    frame2StartTime = Date.now();
    showFrame2 = true;
    video2.play();
  }
}

function drawFrame1() {
  c.image(video, 0, 0, 400, getVideoHeight(400));
  c.loadPixels();

  for (let i = 0; i < c.pixels.length; i += 4) {
    let r = c.pixels[i];
    let g = c.pixels[i + 1];
    let b = c.pixels[i + 2];

    if (r < 100 && g > 150 && b < 100) {
      c.pixels[i + 3] = 0;
    }
  }

  c.updatePixels();
  image(c, 0, windowHeight - 240);
}

function drawFrame2() {
  c2.image(video2, 0, 0, windowWidth / 2, getVideoHeight(windowWidth / 2));
  c2.loadPixels();

  for (let i = 0; i < c2.pixels.length; i += 4) {
    let r = c2.pixels[i];
    let g = c2.pixels[i + 1];
    let b = c2.pixels[i + 2];

    if (r < 100 && g > 150 && b < 100) {
      c2.pixels[i + 3] = 0;
    }
  }

  c2.updatePixels();
  image_center(c2, windowWidth / 2, windowHeight / 2);

  textSize(48);

  text("NO！WRONG！", windowWidth / 2, windowHeight / 4 + 20);

  if (Date.now() - frame2StartTime >= 5000) {
    video2.stop();
    showFrame2 = false;
  }
}

function image_center(img, x, y) {
  image(img, x - img.width / 2, y - img.height / 2);
}

function getVideoHeight(width) {
  return (9 * width) / 16;
}
