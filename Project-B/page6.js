let videos = [];
let bg,
  c,
  clickCount = 0,
  frameStart,
  frame = 1;

function preload() {
  bg = loadImage("./assets/bg2.png");
  for (let i = 1; i <= 3; i++) {
    videos[i] = createVideo(`./assets/6p${i}.mp4`);
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
  text(
    "When it sorted out the results of its three years of hard work, it just felt tired...",
    windowWidth / 2,
    windowHeight / 4 + 10
  );
}

function drawFrame2() {
  processPixels(videos[2], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 2);
  text("It begins to ask itself...", windowWidth / 2, windowHeight / 4 - 60);

  if (Date.now() - frameStart > 1000 && Date.now() - frameStart < 2000) {
    text(
      "What did you get from these three years?",
      windowWidth / 4,
      (windowHeight * 1) / 4 + 80
    );
  }
  if (Date.now() - frameStart > 2000 && Date.now() - frameStart < 3000) {
    text(
      "University admission letter.",
      (windowWidth * 3) / 4,
      (windowHeight * 1) / 4 + 80
    );
  }
  if (Date.now() - frameStart > 3000 && Date.now() - frameStart < 4000) {
    text("Nothing else?", windowWidth / 4, (windowHeight * 1) / 4 + 80);
  }
  if (Date.now() - frameStart > 4000 && Date.now() - frameStart < 5000) {
    text("No.", (windowWidth * 3) / 4, (windowHeight * 1) / 4 + 80);
  }
  if (Date.now() - frameStart > 5000 && Date.now() - frameStart < 6000) {
    text("Are you happy?", (windowWidth * 1) / 4, (windowHeight * 1) / 4 + 80);
  }
  if (Date.now() - frameStart > 6000 && Date.now() - frameStart < 7000) {
    text("No.", (windowWidth * 3) / 4, (windowHeight * 1) / 4 + 80);
  }
}

function drawFrame3() {
  processPixels(videos[3], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 3);

  if (Date.now() - frameStart > 1000) {
    text(
      "It often fantasizes now,",
      windowWidth / 2,
      (windowHeight * 3) / 4 - 50
    );
  }
  if (Date.now() - frameStart > 2000) {
    text(
      "if it had spent these three years happily eating snacks and comfortably sleeping,",
      windowWidth / 2,
      (windowHeight * 3) / 4 - 0
    );
  }
  if (Date.now() - frameStart > 3000) {
    text(
      "where would it be now?",
      windowWidth / 2,
      (windowHeight * 3) / 4 + 50
    );
  }
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
  }
}
