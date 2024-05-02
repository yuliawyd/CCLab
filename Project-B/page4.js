let videos = [];
let bg,
  c,
  clickCount = 0,
  frameStart,
  frame = 1;

function preload() {
  bg = loadImage("./assets/bg2.png");
  for (let i = 1; i <= 3; i++) {
    videos[i] = createVideo(`./assets/4p${i}.mp4`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  videos.forEach((video) => video.hide());
  c = createGraphics(windowWidth / 2, windowHeight / 2);
  frameStart = Date.now();
  videos[1].loop();
}

function draw() {
  background(bg);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255, 0, 0);

  switch (frame) {
    case 1:
      drawFrame1();
      break;
    case 2:
      drawFrame2();
      break;
    case 3:
      drawFrame3();
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawFrame1() {
  processPixels(videos[1], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 2);
  text("Still got caught...", windowWidth / 2, windowHeight / 4 + 10);
}

function drawFrame2() {
  processPixels(videos[2], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 2);
  textFont("Chiller");

  if (Date.now() - frameStart > 1000) {
    text("Sleeping in class...", windowWidth / 4, (windowHeight * 2) / 4 - 50);
  }
  if (Date.now() - frameStart > 2000) {
    text(
      "Eating in class...",
      (windowWidth * 3) / 4,
      (windowHeight * 2) / 4 - 50
    );
  }
  if (Date.now() - frameStart > 3000) {
    text(
      "Who taught you to do like this...",
      windowWidth / 2,
      (windowHeight * 1) / 4 - 50
    );
  }
  if (Date.now() - frameStart > 4000) {
    text(
      "You won't be able to get into university if you keep doing this!",
      (windowWidth * 2) / 4,
      (windowHeight * 3) / 4 + 50
    );
  }
  textFont("Times New Roman");
}

function drawFrame3() {
  processPixels(videos[3], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 2);
  text(
    "no, I have to get in to university...",
    windowWidth / 2,
    windowHeight / 4 + 10
  );
}

function mousePressed() {
  if (frame === 1) {
    frame = 2;
    frameStart = Date.now();
    videos[1].pause();
    videos[2].loop();
    c = createGraphics(windowWidth / 2, windowHeight / 2);
  } else if (frame === 2) {
    frame = 3;
    frameStart = Date.now();
    videos[2].pause();
    videos[3].loop();
    c = createGraphics(windowWidth / 2, windowHeight / 2);
  } else if (frame === 3) {
    window.location.href = "./page5.htm";
  }
}
