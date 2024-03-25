/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new YuliaDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class YuliaDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    //..
    //..
    //..
    this.bounceAmplitude = 8; // Height of the bounce
    this.sideAmplitude = 8; // Width of the side movement
    this.rotationAmplitude = 2; // Degrees of rotation
    this.angle = 0; // Current angle for rotation
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    this.y += sin(frameCount * 0.1) * this.bounceAmplitude;
    this.x += cos(frameCount * 0.1) * this.sideAmplitude;
    this.angle = sin(frameCount * 0.2) * this.rotationAmplitude;
  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️

// Head and Body
noStroke();
fill(186, 189, 194);
ellipse(0, -35, 190, 160); 
ellipse(0, 50, 60, 80); 

// Mouth
stroke(0);
strokeWeight(2);
ellipse(10, 18, 20, 5); 
//Blood
stroke(255,0,0);
strokeWeight(5);
line(0,20,0,35);

// Arms and Legs
this.drawLimbs();

// Eyes
this.drawEyes();

pop(); 
}

drawLimbs() {
let swingAngle = sin(frameCount * 2) * 20;

// Arms
stroke(250);
this.drawLimb(-28, 42, swingAngle, -4, 40); // Left arm
this.drawLimb(28, 42, -swingAngle, -10, 40); // Right arm

// Legs
this.drawLimb(-10, 88, -swingAngle, -5, 27); // Left leg
this.drawLimb(10, 88, swingAngle, -2, 27); // Right leg
}

drawLimb(translateX, translateY, rotateAngle, lineStartX, lineEndY) {
push();
translate(translateX, translateY);
rotate(rotateAngle);
line(lineStartX, 0, 0, lineEndY);
pop();
}

drawEyes() {
// Left Eye
push();
noFill();
strokeWeight(3);
translate(-45, -28); 
rotate(-10);
ellipse(0, 0, 65, 80);
let time = frameCount * 0.1;
  for (let i = 0; i < 10; i++) {
    noFill();
    push(); 
    rotate(sin(time + i * 10) * 50);
    stroke(i * 25, 100, 100, 100);
    let offsetX = random(-5, 5);
    let offsetY = random(-5, 5);
    let size = i * 6;
    ellipse(offsetX, offsetY, size + sin(time) * 20, size + cos(time) * 20);
    pop();
  }
pop();

// Right Eye
push();
noFill();
strokeWeight(3);
translate(53, -45); 
rotate(3);
ellipse(0, 0, 64, 78);
let time2 = frameCount * 0.1;
  for (let i = 0; i < 10; i++) {
    noFill();
    push(); 
    rotate(sin(time2 + i * 10) * 50);
    stroke(i * 25, 100, 100, 100);
    let offsetX = random(-5, 5);
    let offsetY = random(-5, 5);
    let size = i * 5;
    ellipse(offsetX, offsetY, size + sin(time2) * 20, size + cos(time2) * 20);
    pop();
  }
pop();


translate(-120,-10);
  let time4 = frameCount * 0.1; 
  for (let i = 0; i < 10; i++) { 
    noFill(); 
    push(); 
    rotate(sin(time4 + i * 10) * 50); 
    stroke(224, 119, 155); 
    strokeWeight(1);
    let offsetX = random(-5, 5);
    let offsetY = random(-5, 5);
    let size = i * 3;
    ellipse(offsetX, offsetY, size + sin(time4) * 20, size + cos(time4) * 20);
    pop(); 
  }//pink circles

  translate(100,-120);
  let time5 = frameCount * 0.1; 
  for (let i = 0; i < 10; i++) { 
    noFill(); 
    push(); 
    rotate(sin(time5 + i * 10) * 50); 
    stroke(191, 237, 97); 
    strokeWeight(1);
    let offsetX = random(-5, 5);
    let offsetY = random(-5, 5);
    let size = i * 5;
    ellipse(offsetX, offsetY, size + sin(time5) * 20, size + cos(time5) * 20);
    pop(); 
  }//green circles
  
  translate(130,50);
  let time3 = frameCount * 0.1; 
  for (let i = 0; i < 10; i++) { 
    noFill(); 
    push(); 
    rotate(sin(time3 + i * 10) * 50); 
    stroke(126, 174, 204); 
    strokeWeight(1);
    let offsetX = random(-5, 5);
    let offsetY = random(-5, 5);
    let size = i * 4;
    ellipse(offsetX, offsetY, size + sin(time3) * 20, size + cos(time3) * 20);
    pop(); 
  }//blue circles

}

}