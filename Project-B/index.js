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
  timetable = loadImage("./assets/timetable.jpg");
  day = random(days);
  video = createVideo("./assets/1p1.mp4");
  video2 = createVideo("./assets/1p2.mp4");
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
  text("Good Morning! Welcome to my school life!", windowWidth / 2, windowHeight / 4 - 120);
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
    windowWidth / 4,
    windowWidth * 1378/ 1080 / 4
  );
  pop();
  t += 0.01;

  drawFrame1();
  if (showFrame2) {
    drawFrame2();
  }

  textSize(32);
  fill(255);
  rect(windowWidth / 2 - 160, (3 * windowHeight) / 4 + 80, 160, 40);
  rect(windowWidth / 2 + 20, (3 * windowHeight) / 4 + 80, 160, 40);

  fill(0);
  text("MATH", windowWidth / 2 - 80, (3 * windowHeight) / 4 + 102);
  text("ENGLISH", windowWidth / 2 + 100, (3 * windowHeight) / 4 + 102);
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
    mouseY > (3 * windowHeight) / 4 + 80 &&
    mouseY < (3 * windowHeight) / 4 + 120
  ) {
    window.location.href = "page2.htm";
  }
  if (
    mouseX > windowWidth / 2 + 20 &&
    mouseX < windowWidth / 2 + 180 &&
    mouseY > (3 * windowHeight) / 4 + 80 &&
    mouseY < (3 * windowHeight) / 4 + 120
  ) {
    frame2StartTime = Date.now();
    showFrame2 = true;
    video2.play();
  }
}

function drawFrame1() {
  processPixels(video, c, 400);
  image(c, 0, windowHeight - 240);
}

function drawFrame2() {
  processPixels(video2, c2, windowWidth / 2);
  image_center(c2, windowWidth / 2, windowHeight / 2);

  textSize(48);

  text("NO！WRONG！", windowWidth / 2, windowHeight / 4 + 20);

  if (Date.now() - frame2StartTime >= 5000) {
    video2.stop();
    showFrame2 = false;
  }
}
