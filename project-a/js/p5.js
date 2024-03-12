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

function setup() {
  createCanvas(800, 500);
  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  startTime = millis();
  textAlign(RIGHT, TOP);
  textSize(16);

  // Initialize circles with specified colors and behavior
  for (let i = 0; i < numCircles; i++) {
    let col;
    if (i < 6) {
      col = 255; 
    } else if (i < 8) {
      col = 'red'; 
    } else {
      col = 'green'; 
    }

    circles.push({
      x: random(width),
      y: random(height),
      size: random(20, 40),
      color: col,
      visible: true,
      disappearTime: i >= 8 ? millis() + 10000 : null // For green circles
    });
  }
}

function draw() {
  background(0);
  let elapsedTime = millis() - startTime;

  if (elapsedTime > startAnimationTime) {
    let cycleTime = (elapsedTime - startAnimationTime) % cyclePeriod;
    let verticalOffset = getVerticalOffset(cycleTime);

    theta += 0.02;
    calcWave(verticalOffset);
    fillBelowWave();
    renderWave();
    
    if (cycleTime > animationDuration && cycleTime <= animationDuration + fullyRisenDuration) {
      waveHasFullyRisen = true; // Wave has reached its fully risen state
      let countdownTime = fullyRisenDuration - (cycleTime - animationDuration);
      displayCountdownTimer(countdownTime);
    }
  }

  if (waveHasFullyRisen) {
    updateAndDrawCircles();
  }

  drawFishOrBird(mouseX, mouseY);
}

function getVerticalOffset(cycleTime) {
  if (cycleTime <= animationDuration) {
    // Rising
    return map(cycleTime, 0, animationDuration, height, height / 2 + amplitude * 0.5);
  } else if (cycleTime <= animationDuration + fullyRisenDuration) {
    // Fully risen
    return height / 2 + amplitude * 0.5;
  } else if (cycleTime <= animationDuration + fullyRisenDuration + animationDuration) {
    // Descending
    return map(cycleTime, animationDuration + fullyRisenDuration, animationDuration + fullyRisenDuration + animationDuration, height / 2 + amplitude * 0.5, height);
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
}

function calcWave(verticalOffset) {
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude + noise(x) * 20 + verticalOffset - amplitude;
    x += dx;
  }
}

function renderWave() {
  noStroke();
  fill(255); // Wave color
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
  
    if (isMouseAboveWave) {
        // Randomly changing color for the fish
        let fishColor = color(random(189,238), random(101,150), random(194,242));
        fill(fishColor); 
        //fish body
        ellipse(0, 0, 50, 48); 
        //eyes
        fill(0);
        circle(-5,-5,8);
        fill(255);
        circle(-3,-3,5);
        //tail
        
      
      
      
    } else {
        let vibrationX = random(-3, 3);
        let vibrationY = random(-2, 1);
        translate(vibrationX, vibrationY);
        fill('pink'); // Standard bird color
        noStroke()
        // Draw bird
        ellipse(0, 0,40,40); // Body
        // left wings
        rotate(radians(300));
        ellipse(10,-35, 30, 50); 
        rotate(radians(320));
        ellipse(8,-20,28,48);
        rotate(radians(300));
        ellipse(6,-10,25,45);
        //right wings
        rotate(radians(30));
        ellipse(5,38,30,50);
        rotate(radians(35));
        ellipse(2,25,28,48);
        rotate(radians(48));
        ellipse(-2,12,25,45);
        //eyes
        fill(0);
        circle(-2,-8,8);
        circle(11,5,8);
        fill(255);
        circle(6,8,5);
        
    }
  
    pop(); // Restore original state
}


function updateAndDrawCircles() {
  circles.forEach((circle, index) => {
    // Handle visibility based on color and disappearTime for green circles
    if (circle.color === 'green' && millis() >= circle.disappearTime) {
      circle.visible = !circle.visible;
      circle.disappearTime = millis() + (circle.visible ? 10000 : 5000);
    }

    if (!circle.visible) return;

    // Enhance movement with random velocities and bounce on edges
    if (!circle.vx || !circle.vy) {
      // Assign initial velocities if not set
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
    if (waveIndex >= 0 && waveIndex < yvalues.length && circle.y < yvalues[waveIndex]) {
      circle.vy = abs(circle.vy); // Ensure it moves downward if above the wave
    } else if (waveIndex >= 0 && waveIndex < yvalues.length) {
      // Allow free movement below the wave
      fill(circle.color);
      noStroke();
      ellipse(circle.x, circle.y, circle.size);
    }
  });
}