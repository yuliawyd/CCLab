// CCLab Mini Project - 9.R Particle World Template

let snowflakes = []; 
let accumulatedSnowY = []; 
let fireworks = []; 

function setup() {
  createCanvas(800, 600);
  fill(255); 
  noStroke();
  
  for (let x = 0; x < width; x++) {
    accumulatedSnowY[x] = height; 
  }
}

function draw() {
  background(30); 
  
  // Handle snowflakes
  if (random(1) < 0.3) { 
    let isShiningBall = random() < 0.1; 
    snowflakes.push(new snowflake(isShiningBall)); 
  }
  for (let flake of snowflakes) {
    flake.update(); 
    flake.display();
  }

  drawStick();

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }

  fill(255); 
  noStroke();
  beginShape();
  vertex(0, height);
  for (let x = 0; x < width; x++) {
    vertex(x, accumulatedSnowY[x]);
  }
  vertex(width, height);
  endShape(CLOSE);
}

function drawStick() {
  stroke(255); 
  strokeWeight(10); 
  line(mouseX, mouseY, mouseX, mouseY + 50); 
  noStroke(); 
}

function mousePressed() {
  fireworks.push(new Firework(mouseX, mouseY));
}

// Snowflake class
function snowflake(isShiningBall) {
  this.posX = random(width);
  this.posY = random(-50, 0);
  this.size = random(2, 5);
  this.isShiningBall = isShiningBall;
  this.stopped = false; 

  this.update = function() {
    if (!this.stopped) {
      this.posY += pow(this.size, 0.5); 

      // Accumulate snow
      if (this.posY >= accumulatedSnowY[floor(this.posX)] - this.size) {
        this.stopped = true;
        accumulatedSnowY[floor(this.posX)] -= this.size; 
      }
    }
  };

  this.display = function() {
    if (this.isShiningBall) {
      fill(127, 187, 250); 
    } else {
      fill(255); 
    }
    ellipse(this.posX, this.posY, this.size * 2);
  };
}

// Simplified Firework class
class Firework {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.particles = [];
    this.exploded = false;
    this.lifespan = 255;
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      this.particles.push(new Particle(this.pos.x, this.pos.y));
    }
    this.exploded = true;
  }

  update() {
    if (!this.exploded) {
      this.explode();
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
    this.lifespan -= 4;
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  display() {
    if (!this.exploded) {
    }
    for (let particle of this.particles) {
      particle.display();
    }
  }
}

// Particle class for fireworks
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 6));
    this.lifespan = 255;
    // Assign a random color
    this.color = [random(255), random(255), random(255)];
  }

  update() {
    this.vel.mult(0.95); 
    this.pos.add(this.vel);
    this.lifespan -= 4;
  }

  done() {
    return this.lifespan < 0;
  }

  display() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.lifespan); 
    ellipse(this.pos.x, this.pos.y, 4);
  }
}
