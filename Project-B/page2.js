let bg;
let frame = 0;
let videos = [];
let c, c2;
let bgMusic;
let clickCount = 0;
let frameStart;
let wakeup = false;

function preload() {
  bg = loadImage("./assets/bg2.png");
  bgMusic = loadSound("./assets/bgm2.mp3");
  for (let i = 1; i <= 7; i++) {
    videos[i] = createVideo(`./assets/2p${i}.mp4`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  videos.forEach((video) => video.hide());

  c = createGraphics(windowWidth / 2, windowHeight / 2);
  c2 = createGraphics(windowWidth / 2, windowHeight / 2);
  bgMusic.loop();

  frameStart = Date.now();
}

function draw() {
  background(bg);
  textAlign(CENTER, CENTER);
  textFont("Georgia");
  textSize(32);
  fill(255, 0, 0);
  text("Math Class", 100, 50);

  if (frame === 0) {
    if (Date.now() - frameStart > 3000) {
      frameStart = Date.now();
      videos[1].play();
      frame = 1;
    }
  } else if (frame === 1) {
    drawFrame1();
  } else if (frame === 2) {
    drawFrame2();
  } else if (frame === 3) {
    drawFrame3();
  } else if (frame === 4) {
    drawFrame4();
  } else if (frame === 5) {
    drawFrame5();
  } else if (frame === 6) {
    drawFrame6();
  } else if (frame === 7) {
    drawFrame7();
  }
}

function mousePressed() {
  if (
    frame === 4 &&
    !wakeup &&
    mouseX > (windowWidth * 2) / 5 &&
    mouseX < windowWidth / 2 &&
    mouseY > windowHeight / 4 &&
    mouseY < (windowHeight * 3) / 4
  ) {
    console.log("sssss");
    clickCount++;
    if (clickCount >= 5) {
      wakeup = true;
      frameStart = Date.now();
      videos[4].stop();
      videos[5].play();
      c = createGraphics(windowWidth / 2, windowHeight / 2);
    }
  } else {
    clickCount = 0;
  }
  if (frame == 5) {
    frameStart = Date.now();
    videos[6].play();
    frame = 6;
    c = createGraphics(windowWidth / 2, windowHeight / 2);
  }
  if (frame == 7) {
    videos[7].stop();
    window.location.href = "./page3.htm";
  }
}

function drawFrame1() {
  processPixels(videos[1], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 2);

  if (Date.now() - frameStart >= 9000) {
    frameStart = Date.now();
    videos[1].stop();
    videos[2].play();
    c = createGraphics(windowWidth / 2, windowHeight / 2);
    frame = 2;
  }
}

function drawFrame2() {
  processPixels(videos[2], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 2);

  text("#??--//**#_#/o-o-o-", windowWidth / 2, (windowHeight * 3) / 4 + 50);

  if (Date.now() - frameStart >= 8000) {
    frameStart = Date.now();
    videos[2].stop();
    c = createGraphics(windowWidth / 2, windowHeight / 2);
    frame = 3;
  }
}

function drawFrame3() {
  textSize(48);
  text("It’s...so... boring...", windowWidth / 2, (windowHeight * 2) / 4 + 50);
  textSize(32);

  if (Date.now() - frameStart >= 4000) {
    frameStart = Date.now();
    bgMusic.pause();
    videos[3].loop();
    videos[4].loop();
    c = createGraphics(windowWidth / 2, windowHeight / 2);
    frame = 4;
  }
}

function drawFrame4() {
  processPixels(videos[clickCount >= 5 ? 5 : 3], c, windowWidth / 2);
  image(c, windowWidth / 5, windowHeight / 4);

  processPixels(videos[4], c2, windowWidth / 2);
  image(c2, (windowWidth * 2) / 5, windowHeight / 4);

  if (!wakeup) {
    text(
      "Pat and wake it up!!",
      windowWidth / 2 - 40,
      (windowHeight * 1) / 4 - 0
    );
  }
  textSize(16);
  text("the teacher", (windowWidth * 3) / 4 - 120, (windowHeight * 3) / 4 + 0);
  textSize(32);

  if (wakeup && Date.now() - frameStart > 8000) {
    videos[3].stop();
    videos[5].stop();
    bgMusic.loop();
    frameStart = Date.now();
    c = createGraphics(windowWidth / 2, windowHeight / 2);
    frame = 5;
  }
}

let charCount = 0;
let frame5Text = "Four hours later......";

function drawFrame5() {
  textSize(48);
  text(
    frame5Text.substring(0, charCount),
    windowWidth / 2,
    (windowHeight * 2) / 4 + 50
  );
  textSize(32);

  if (
    charCount < frame5Text.length &&
    (Date.now() - frameStart) / 100 > charCount
  ) {
    charCount++;
  }
}

function drawFrame6() {
  processPixels(videos[6], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 2);
  text(
    "getting a little bit hungry now...",
    windowWidth / 2,
    (windowHeight * 3) / 4 + 20
  );

  if (Date.now() - frameStart > 3000) {
    text(
      "...Have some snacks then !",
      windowWidth / 2,
      (windowHeight * 3) / 4 + 80
    );
  }
  if (Date.now() - frameStart > 5000) {
    frameStart = Date.now();
    frame = 7;
    videos[6].stop();
    videos[7].loop();
    c = createGraphics(windowWidth / 2, windowHeight / 2);
  }
}

function drawFrame7() {
  processPixels(videos[7], c, windowWidth / 2);
  image_center(c, windowWidth / 2, windowHeight / 2);

  if (Date.now() - frameStart > 1000) {
    text("yummy", windowWidth / 4, (windowHeight * 2) / 4 - 50);
  }
  if (Date.now() - frameStart > 2000) {
    text("delicious", (windowWidth * 3) / 4, (windowHeight * 2) / 4 - 50);
  }
  if (Date.now() - frameStart > 3000) {
    text(
      "best food in the world...",
      windowWidth / 2,
      (windowHeight * 1) / 4 + 50
    );
  }
  if (Date.now() - frameStart > 5000) {
    textSize(48);
    text(
      "This will be discovered by the teacher soon,",
      windowWidth / 2,
      (windowHeight * 3) / 4 + 20
    );
    text(
      "try to play a dodge game with the teacher!",
      windowWidth / 2,
      (windowHeight * 3) / 4 + 80
    );
    textSize(32);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
