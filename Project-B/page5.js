let videos = [];
let bg,
  c,
  clickCount = 0,
  frameStart,
  frame = 1;

function preload() {
  bg = loadImage("./assets/bg2.png");
  for (let i = 1; i <= 3; i++) {
    videos[i] = createVideo(`./assets/5p${i}.mp4`);
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
  image_center(c, windowWidth / 4, windowHeight / 2);

  text("After that day...", windowWidth / 4, windowHeight / 4 + 10);

  if (Date.now() - frameStart > 1000) {
    text(
      "Start to study hard...",
      (windowWidth * 3) / 4,
      (windowHeight * 2) / 4 - 100
    );
  }
  if (Date.now() - frameStart > 2000) {
    text(
      "Study day and night...",
      (windowWidth * 3) / 4,
      (windowHeight * 2) / 4 - 50
    );
  }
  if (Date.now() - frameStart > 3000) {
    text("year and year...", (windowWidth * 3) / 4, (windowHeight * 2) / 4 + 0);
  }
  if (Date.now() - frameStart > 4000) {
    text("and year.", (windowWidth * 3) / 4, (windowHeight * 2) / 4 + 50);
  }
}

function drawFrame2() {
  processPixels(videos[2], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 2);

  text("Finally, pass the exams", windowWidth / 2, (windowHeight * 1) / 4 - 50);

  if (Date.now() - frameStart > 1000) {
    textSize(64);
    text(
      "Admitted to university!!!",
      windowWidth / 2,
      (windowHeight * 3) / 4 + 50
    );
    textSize(32);
  }
}

function drawFrame3() {
  processPixels(videos[3], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 2);
  text(
    "Honestly, this should be a happy thing.",
    windowWidth / 2,
    (windowHeight * 3) / 4 + 0
  );
  text(
    "However，it actually doesn’t feel so.",
    windowWidth / 2,
    (windowHeight * 3) / 4 + 50
  );
}

function mousePressed() {
  if (frame === 1) {
    frameStart = Date.now();
    videos[1].stop();
    videos[2].loop();
    c = createGraphics(windowWidth / 2, windowHeight / 2);
    frame = 2;
  } else if (frame === 2) {
    frameStart = Date.now();
    videos[2].stop();
    videos[3].loop();
    c = createGraphics(windowWidth / 2, windowHeight / 2);
    frame = 3;
  } else if (frame === 3) {
    window.location.href = "./page6.htm";
  }
}
