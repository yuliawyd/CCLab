let bg;
let frame = 0;
// let frame = 3;
// let frame = 4;
let videos = [];
let c, c2;
let bgMusic;
let clickCount = 0;
let frameStart;
let wakeup = false;

let charCount = 0;
let frameText = "";
let balls = []

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

  c = createGraphics(windowWidth * 0.7, getVideoHeight(windowWidth * 0.7));
  c2 = createGraphics(windowWidth * 0.7, getVideoHeight(windowWidth * 0.7));
  bgMusic.loop();

  frameStart = Date.now();

  let startX = windowWidth / 3
  let startY = windowHeight / 2
  balls.push(new Ball(startX - 150, startY - 150))
  balls.push(new Ball(startX - 150, startY))
  balls.push(new Ball(startX - 150, startY + 150))
  balls.push(new Ball(startX + 150, startY - 150))
  balls.push(new Ball(startX + 150, startY))
  balls.push(new Ball(startX + 150, startY + 150))
}

function draw() {
  background(bg);
  textAlign(CENTER, CENTER);
  textFont('Briem Hand');
  textSize(38);
  fill(95, 202, 232);
  text("Math Class", 100, 50);

  if (frame === 0) {
    if (Date.now() - frameStart > 3000) {
      videos[1].play();
      startFrame(1);
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
  if (frame === 4 && !wakeup) {
    for (let i = 0; i < balls.length; i++) {
      let b = balls[i]
      b.click();
    }
    let results = balls.filter(item => item.life)
    if (!results.length) {
      frameStart = Date.now();
      c = createGraphics(windowWidth * 0.7, getVideoHeight(windowWidth * 0.7));
      wakeup = true;
      videos[4].stop();
      videos[5].play();
    }
  }
  if (frame == 5) {
    videos[6].play();
    startFrame(6);
  }
  if (frame == 7) {
    videos[7].stop();
    window.location.href = "./page3.html";
  }
}

function drawFrame1() {
  processPixels(videos[1], c, windowWidth * 0.7);
  image_center(c, windowWidth / 2, windowHeight / 2);
  text("Math teacher", (windowWidth * 1) / 3, (windowHeight * 3) / 4 + 100);

  if (Date.now() - frameStart >= 9000) {
    videos[1].stop();
    videos[2].play();
    startFrame(2);
  }
}

function drawFrame2() {
  processPixels(videos[2], c, windowWidth * 0.7);
  image_center(c, windowWidth / 2, windowHeight / 2);

  text("(keep talking...)", windowWidth / 2, (windowHeight * 1) / 4 - 50);
  text("#??--//**#_#/o-o-o-", windowWidth / 2, (windowHeight * 3) / 4 + 100);

  if (Date.now() - frameStart >= 8000) {
    videos[2].stop();
    charCount = 0;
    frameText = "It's...so... boring...";
    startFrame(3);
    videos[3].loop();
  }
}

function drawFrame3() {
  textSize(48);
  text(
    frameText.substring(0, charCount),
    windowWidth / 2,
    (windowHeight * 1) / 4
  );
  textSize(32);

  if (
    charCount < frameText.length &&
    (Date.now() - frameStart) / 100 > charCount
  ) {
    charCount++;
  }
  textSize(32);

  if (Date.now() - frameStart >= 2000) {
    processPixels(videos[clickCount >= 5 ? 5 : 3], c, windowWidth * 0.7);
    image_center(c, windowWidth / 3, windowHeight / 2);
  }

  if (Date.now() - frameStart >= 4000) {
    bgMusic.pause();
    startFrame(4);
    videos[3].loop();
    videos[4].loop();
  }
}

function drawFrame4() {
  processPixels(videos[wakeup ? 5 : 3], c, windowWidth * 0.7);
  image_center(c, windowWidth / 3, windowHeight / 2);

  processPixels(videos[4], c2, windowWidth * 0.7);
  image_center(c2, (windowWidth * 2) / 3, windowHeight / 2);

  for (let i = 0; i < balls.length; i++) {
    let b = balls[i]
    b.display();
    b.move();
  }

  if (Date.now() - frameStart >= 2000 && !wakeup) {
    fill(255, 25, 0)
    text("Help to dispel Kitty's sleepiness!!", windowWidth / 3, (windowHeight * 1) / 4 - 0);
  }
  if (Date.now() - frameStart > 1000) {
    textSize(32);
    text(
      "The teacher",
      (windowWidth * 3) / 4 - 120,
      (windowHeight * 3) / 4 + 80
    );
    textSize(32);
  }

  if (wakeup && Date.now() - frameStart > 8000) {
    videos[3].stop();
    videos[5].stop();
    bgMusic.loop();
    charCount = 0;
    frameText = "Four hours later......";
    startFrame(5);
  }
}

function drawFrame5() {
  textSize(48);
  text(
    frameText.substring(0, charCount),
    windowWidth / 2,
    (windowHeight * 2) / 4 + 50
  );
  textSize(32);

  if (
    charCount < frameText.length &&
    (Date.now() - frameStart) / 100 > charCount
  ) {
    charCount++;
  }
}

function drawFrame6() {
  processPixels(videos[6], c, windowWidth * 0.7);
  image_center(c, windowWidth / 2, windowHeight / 2);
  text(
    "Getting a little bit hungry now...",
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
    videos[6].stop();
    videos[7].loop();
    startFrame(7);
  }
}

function drawFrame7() {
  processPixels(videos[7], c, windowWidth * 0.7);
  image_center(c, windowWidth / 2, windowHeight / 2);

  if (Date.now() - frameStart > 1000) {
    text("Yummy!", windowWidth / 4, (windowHeight * 2) / 4 - 50);
  }
  if (Date.now() - frameStart > 2000) {
    text("Delicious!", (windowWidth * 3) / 4, (windowHeight * 2) / 4 - 50);
  }
  if (Date.now() - frameStart > 3000) {
    text(
      "Best food in the world...",
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

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 25;
    this.dx = random(2) > 1 ? 1 : -1;
    this.life = true;
  }

  display() {
    if (this.life) {
      fill(255, 88, 163);
      ellipse(this.x, this.y, this.r * 2);
    }
  }

  move() {
    this.x += this.dx;
    this.dx *= -1;
  }

  click() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.r) {
      this.life = false;
    }
  }
}
