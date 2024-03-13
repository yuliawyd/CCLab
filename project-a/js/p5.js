let xspacing = 16;
let w;
let theta = 0.0;
let amplitude = 75.0;
let period = 500.0;
let dx;
let yvalues;
let startTime;
let startAnimationTime = 10000;
let animationDuration = 5000;
let fullyRisenDuration = 20000;
let cyclePeriod = 30000;
let circles = [];
let numCircles = 10;
let waveHasFullyRisen = false;
let gameStatus = 1; 
let bubbles = []; 
let showBubble = false; 
let bublePos; // position
let fishScale = 0.1; // fish size
let star = []; 
let tentaclNum = 5; 
let tentaclGroupsNum = 20; 
let tentacles = []; 
let eatCount = 0; // every 20 seconds num of eaten green balls
let showMess = false; 
let showBomb = false; 
let bombTime = 0; 
let messTime = 0; 
let pos = { x: 0, y: 0 }; // fish position
let particles = []; 
let lastCheckTime = 0;

function setup() {
  let canvas=createCanvas(800, 500);
  canvas.id=("p5_canvas")
  canvas.parent("p5-canvas-container")
  reset();
}

function reset() {
  xspacing = 16;
  w = width + 16;
  theta = 0.0;
  amplitude = 75.0;
  period = 500.0;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  startTime = millis();
  startAnimationTime = 10000;
  animationDuration = 5000;
  fullyRisenDuration = 20000;
  cyclePeriod = 30000;
  circles = [];
  numCircles = 10;
  waveHasFullyRisen = false;
  gameStatus = 1;
  bubbles = [];
  showBubble = false;
  bublePos = { x: 0, y: 0 };
  fishScale = 0.1;
  star = [];
  tentaclNum = 5;
  tentaclGroupsNum = 20;
  tentacles = [];
  eatCount = 0;
  showMess = false;
  showBomb = false;
  bombTime = 0;
  messTime = 0;
  pos = { x: 0, y: 0 };

  // Initialize circles with specified colors and behavior
  for (let i = 0; i < numCircles; i++) {
    let col;
    if (i < 6) {
      col = 255;
    } else if (i < 8) {
      col = "red";
    } else {
      col = "green";
    }

    circles.push({
      x: random(width),
      y: random(height),
      size: random(20, 40),
      color: col,
      visible: true,
      disappearTime: i >= 8 ? millis() + 10000 : null, // For green circles
    });
  }

  for (let i = 0; i < 500; i++) {
    star.push({
      x: random(width),
      y: random(height),
    });
  }

  for (let i = 0; i < tentaclGroupsNum; i++) {
    tentacles.push(
      new Tentacles(0, height / 2, (-1 * PI) / 4, random(170, 220))
    );
  }
  rectMode(CENTER);
  textSize(16);
}

function draw() {
  background(0);
  colorMode(RGB);
  angleMode(RADIANS);
  textStyle(NORMAL);

  noStroke();
  if (gameStatus == 1) {
    //first page
    fill(227, 25, 55);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Survival Rules", width / 2, height / 2 - 180);
    text("1. Eat two green cells within every 20 second countdown.", width/2, height/2-130);
    text("2. Never touch the red bacteria.", width/2, height/2-80);
    text("3. Press ENTER to respawn.", width/2, height/2-30);
    text("4. Click the button below if you fully understand.", width/2, height/2+20);
    text("Understand", width / 2, height / 2 + 100);
    noFill();
    stroke(255);
    strokeWeight(3)
    rect(width / 2, height / 2 + 100, 120, 50);
  } else if (gameStatus == 2) {
    // draw background stars
    for (let i = 0; i < star.length; i++) {
      fill(random(1000) > 950 ? 0 : 255);
      rect(star[i].x, star[i].y, 2, 2);
    }

    textAlign(RIGHT, TOP);

    let elapsedTime = millis() - startTime;

    if (elapsedTime > startAnimationTime) {
      let cycleTime = (elapsedTime - startAnimationTime) % cyclePeriod;
      let verticalOffset = getVerticalOffset(cycleTime);

      theta += 0.02;
      calcWave(verticalOffset);
      fillBelowWave();
      renderWave();

      if (
        cycleTime > animationDuration &&
        cycleTime <= animationDuration + fullyRisenDuration
      ) {
        waveHasFullyRisen = true; // Wave has reached its fully risen state
        let countdownTime =
          fullyRisenDuration - (cycleTime - animationDuration);
        displayCountdownTimer(countdownTime);
      }
    }

    if (waveHasFullyRisen) {
      updateAndDrawCircles();
      colorMode(HSB, 360, 100, 100, 100);
      for (let i = 0; i < tentacles.length; i++) {
        push();
        translate(i * 50, height - 50);
        scale(0.3);
        tentacles[i].run();
        pop();
      }
    }

    colorMode(RGB);

    if (!showMess && !showBomb) {
      pos.x = mouseX;
      pos.y = mouseY;
    }
    drawFishOrBird(pos.x, pos.y);

    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].update();
      bubbles[i].display();
    }

    if (showBubble && frameCount % 10 == 0) {
      bubbles.push(new Bubble(bublePos.x, bublePos.y));
      if (bubbles.length == 3) {
        showBubble = false;
      }
    }
  } else if (gameStatus == 3) {
    textAlign(CENTER);
    fill("red");
    textSize(80);
    text("OVER", width / 2, height / 2-30);
  }
}

function getVerticalOffset(cycleTime) {
  if (cycleTime <= animationDuration) {
    // Rising
    return map(
      cycleTime,
      0,
      animationDuration,
      height,
      height / 2 + amplitude * 0.5
    );
  } else if (cycleTime <= animationDuration + fullyRisenDuration) {
    // Fully risen
    return height / 2 + amplitude * 0.5;
  } else if (
    cycleTime <=
    animationDuration + fullyRisenDuration + animationDuration
  ) {
    // Descending
    return map(
      cycleTime,
      animationDuration + fullyRisenDuration,
      animationDuration + fullyRisenDuration + animationDuration,
      height / 2 + amplitude * 0.5,
      height
    );
  } else {
    // Waiting at the bottom
    return height;
  }
}

function displayCountdownTimer(countdownTime) {
  let seconds = Math.floor(countdownTime / 1000);
  let timerText = "00:" + nf(seconds, 2); // Format time as MM:SS
  fill(255);
  text(timerText, width - 10, 10);
  if (millis() - lastCheckTime > 2000 && nf(seconds, 2) <= 0) {
    lastCheckTime = millis();
    if (eatCount < 2) {
      showMess = true;
      messTime = millis();
    }
    eatCount = 0;
  }
}

function calcWave(verticalOffset) {
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] =
      sin(x) * amplitude + noise(x) * 20 + verticalOffset - amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255); 
  for (let x = 0; x < yvalues.length; x++) {
    ellipse(x * xspacing, yvalues[x], 16, 16);
  }
}

function fillBelowWave() {
  noStroke();
  fill(173, 216, 230); // Light blue color
  beginShape();
  vertex(0, height);
  for (let x = 0; x < yvalues.length; x++) {
    vertex(x * xspacing, yvalues[x]);
  }
  vertex(width, height);
  endShape(CLOSE);
}

function drawFishOrBird(x, y) {
  let isMouseAboveWave = false;
  for (let i = 0; i < yvalues.length; i++) {
    if (y > yvalues[i]) {
      isMouseAboveWave = true;
      break;
    }
  }

  push(); // Start a new drawing state
  translate(x, y);

  //messy and bomb state
  if (showMess) {
    drawMess(0, 0);
    if (millis() - messTime > 1000) {
      gameStatus = 3;
    }
  } else if (isMouseAboveWave) {
    if (showBomb) {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].show();
      }
      if (millis() - bombTime > 1000) {
        gameStatus = 3;
      }
    } else {
      // (normal state) Randomly change fish color
      let fishColor = color(
        random(189, 238),
        random(101, 150),
        random(194, 242)
      );
      drawFish(fishColor);
    }
  } else {
    let vibrationX = random(-3, 3);
    let vibrationY = random(-2, 1);
    translate(vibrationX, vibrationY);
    fill("pink"); 
    noStroke();
    // draw bird
    ellipse(0, 0, 40, 40); // body
    // left wings
    rotate(radians(300));
    ellipse(10, -35, 30, 50);
    rotate(radians(320));
    ellipse(8, -20, 28, 48);
    rotate(radians(300));
    ellipse(6, -10, 25, 45);
    //right wings
    rotate(radians(30));
    ellipse(5, 38, 30, 50);
    rotate(radians(35));
    ellipse(2, 25, 28, 48);
    rotate(radians(48));
    ellipse(-2, 12, 25, 45);
    //eyes
    fill(0);
    circle(-2, -8, 8);
    circle(11, 5, 8);
    fill(255);
    circle(6, 8, 5);
  }

  pop(); // restore original state
}

function updateAndDrawCircles() {
  circles.forEach((circle, index) => {
    // handle visibility based on color and disappearTime for green circles
    if (circle.color === "green" && millis() >= circle.disappearTime) {
      circle.visible = !circle.visible;
      circle.disappearTime = millis() + (circle.visible ? 10000 : 5000);
    }

    if (!circle.visible) return;

    // enhance movement with random velocities and bounce on edges
    if (!circle.vx || !circle.vy) {
      // assign initial velocities if not set
      circle.vx = random(-2, 2);
      circle.vy = random(-2, 2);
    }

    circle.x += circle.vx;
    circle.y += circle.vy;

    // Bounce off the edges
    if (circle.x <= 0 || circle.x >= width) circle.vx *= -1;
    if (circle.y <= 0 || circle.y >= height) circle.vy *= -1;

    // Ensure circles stay within the wave area by adjusting their velocities
    let waveIndex = floor(circle.x / xspacing);
    if (
      waveIndex >= 0 &&
      waveIndex < yvalues.length &&
      circle.y < yvalues[waveIndex]
    ) {
      circle.vy = abs(circle.vy); 
    } else if (waveIndex >= 0 && waveIndex < yvalues.length) {
      // Allow free movement below the wave
      fill(circle.color);
      noStroke();
      ellipse(circle.x, circle.y, circle.size);
    }

    // bomb if touch red balls
    if (circle.color == "red") {
      if (dist(circle.x, circle.y, mouseX, mouseY) <= circle.size / 2 + 25) {
        showBomb = true;
        bombTime = millis();
        
        particles = [];
        let numParticles = random(30, 50);
        let explosionForce = random(2, 5);
        for (let i = 0; i < numParticles; i++) {
          let particle = new Particle(0, 0);
          particle.velocity = p5.Vector.random2D().mult(explosionForce);
          particles.push(particle);
        }
      }
    }
  });
}

function mousePressed() {
  if (gameStatus == 1) {
    gameStatus = 2;
  }
  if (gameStatus == 2) {
    circles.forEach((circle, index) => {
      if (!circle.visible) return;

      // categorize eaten balls
      if (circle.color == "green") {
        if (dist(circle.x, circle.y, mouseX, mouseY) <= circle.size / 2 + 25) {
          circle.visible = false;
          showBubble = true;
          bublePos = { x: mouseX, y: mouseY };
          bubbles = [];
          eatCount++;
        }
      } else if (circle.color == 255) {
        if (dist(circle.x, circle.y, mouseX, mouseY) <= circle.size / 2 + 25) {
          circle.visible = false;
          fishScale += 0.05;
        }
      }
    });
  }
}

function keyPressed() {
  if (gameStatus == 3) {
    reset();
    gameStatus = 1;
  }
}
//draw fish
function drawFish(fishColor) {
  push();
  translate(0, 0);
  scale(fishScale);
  noStroke();
  fill(fishColor);
  beginShape();
  vertex(0, 0);
  bezierVertex(69, -120, 338, -17, 346, -17);
  bezierVertex(360, -53, 385, -73, 415, -88);
  bezierVertex(385, -34, 375, 21, 421, 75);
  bezierVertex(386, 71, 363, 50, 344, 24);
  bezierVertex(233, 65, 186, 76, 113, 64);
  bezierVertex(84, 64, 18, 43, 0, 0);

  endShape(CLOSE);
  fill(0);
  ellipse(66, -6, 17, 17);

  arc(120, 0, 10, 40, -PI / 2, PI / 2);
  arc(140, 0, 10, 40, -PI / 2, PI / 2);
  arc(160, 0, 10, 40, -PI / 2, PI / 2);
  arc(180, 0, 10, 40, -PI / 2, PI / 2);

  pop();
}

class Bubble {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.speed = 3;
    this.time = millis();
  }

  display() {
    if (millis() - this.time < 500) {
      noStroke();
      fill(55, 126, 34);
      let s = map(this.pos.y, height, 0, 5, 20);
      ellipse(this.pos.x, this.pos.y, s, s);
    }
  }

  update() {
    if (millis() - this.time < 500) {
      this.pos.y -= this.speed;
    }
  }
}

// tentacles
class Tentacles {
  constructor(_x, _y, _angle, _hue) {
    this.location = new p5.Vector(_x, _y);
    this.angle = _angle;
    this.hue = _hue;
    this.tentacle = [];
    for (let i = 0; i < tentaclNum; i++) {
      this.tentacle[i] = new Tentacle(_hue);
    }
  }
  run() {
    push();
    translate(this.location.x, this.location.y);
    rotate(this.angle);
    for (let i = 0; i < this.tentacle.length; i++) {
      rotate(PI / 10);
      this.tentacle[i].run();
    }
    pop();
  }
}

class Tentacle {
  constructor(_hue) {
    this.thetaRate = random(50, 200);
    this.size = random(10, 45);
    this.hue = _hue;
    this.theta = 0;
  }
  run() {
    this.theta += PI / this.thetaRate;
    this.display(-this.size, PI / 20, 0, 0);
  }
  display(y, amp, thetaStart, wiggle) {
    wiggle = 0.8 * sin(this.theta + thetaStart);
    strokeWeight(abs(y) + abs(wiggle));
    stroke(this.hue, 70, -y * 2);
    line(0, 0, 0, y);
    if (y < 0) {
      push();
      translate(0, y);
      rotate(wiggle / 50);
      this.display(y + this.size / 30, amp + 1, thetaStart - 0.1, wiggle);
      pop();
    }
  }
}

// messy circles if die
function drawMess(x, y) {
  angleMode(DEGREES);
  push();
  translate(x, y);
  scale(0.4);
  let time = frameCount * 0.1;

  for (let i = 0; i < 10; i++) {
    noFill();
    push();
    rotate(sin(time + i * 10) * 50);
    stroke(i * 25, 100, 100, 100);

    let offsetX = random(-5, 5);
    let offsetY = random(-5, 5);
    let size = i * 20;
    ellipse(offsetX, offsetY, size + sin(time) * 20, size + cos(time) * 20);

    pop();
  }
  pop();
  angleMode(RADIANS);
}

// explosive particles
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector(0, 0.1);
    this.lifespan = 255;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  show() {
    noStroke();
    fill(this.color, this.lifespan);
    circle(this.position.x, this.position.y, 10);
  }
}