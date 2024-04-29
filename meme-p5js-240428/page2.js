let bg;
let frame = 0;
let video1;
let video2;
let video3;
let video4;
let video5;
let video6;
let video7;
let c, c2;
let bgMusic;
let clickCount = 0;
let frameStart;
let wakeup = false;

function preload() {
  bg = loadImage("./assets/bg2.png");
  video1 = createVideo("./assets/山羊与huh猫（有声）.mp4");
  video2 = createVideo("./assets/吐舌头山羊（有声）.mp4");
  video3 = createVideo("./assets/高坚果瞌睡猫猫（有声）.mp4");
  video4 = createVideo("./assets/愤怒猫猫（有声）.mp4");
  video5 = createVideo("./assets/震惊黑猫（无声）.mp4");
  video6 = createVideo("./assets/敲碗猫猫（有声）.mp4");
  video7 = createVideo("./assets/零食袋猫咪（有声）.mp4");
  bgMusic = loadSound("./assets/念经.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  video1.hide();
  video2.hide();
  video3.hide();
  video4.hide();
  video5.hide();
  video6.hide();
  video7.hide();
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
      video1.play();
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
      video4.stop();
      video5.play();
    }
  } else {
    clickCount = 0;
  }
  if (frame == 5) {
    frameStart = Date.now();
    video6.play();
    frame = 6;
  }
  if (frame == 7) {
    video7.stop();
    window.location.href = "page3.htm";
  }
}

function drawFrame1() {
  c.image(video1, 0, 0, windowWidth / 2, getVideoHeight(windowWidth / 2));
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
  image_center(c, windowWidth / 2, windowHeight / 2);

  if (Date.now() - frameStart >= 9000) {
    frameStart = Date.now();
    video1.stop();
    video2.play();
    frame = 2;
  }
}

function drawFrame2() {
  c.image(video2, 0, 0, windowWidth / 2, getVideoHeight(windowWidth / 2));
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
  image_center(c, windowWidth / 2, windowHeight / 2);

  text("#??--//**#_#/o-o-o-", windowWidth / 2, (windowHeight * 3) / 4 + 50);

  if (Date.now() - frameStart >= 8000) {
    frameStart = Date.now();
    video2.stop();
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
    video3.loop();
    video4.loop();
    frame = 4;
  }
}

function drawFrame4() {
  c.image(
    clickCount >= 5 ? video5 : video3,
    0,
    0,
    windowWidth / 2,
    getVideoHeight(windowWidth / 2)
  );
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
  image(c, windowWidth / 5, windowHeight / 4);

  c2.image(video4, 0, 0, windowWidth / 2, getVideoHeight(windowWidth / 2));
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
    video3.stop();
    video5.stop();
    bgMusic.loop();
    frameStart = Date.now();
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
  c.image(video6, 0, 0, windowWidth / 2, getVideoHeight(windowWidth / 2));
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
    video6.stop();
    video7.loop();
  }
}

function drawFrame7() {
  c.image(video7, 0, 0, windowWidth / 2, getVideoHeight(windowWidth / 2));
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

function getVideoHeight(width) {
  return (9 * width) / 16;
}

function image_center(img, x, y) {
  image(img, x - img.width / 2, y - img.height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
