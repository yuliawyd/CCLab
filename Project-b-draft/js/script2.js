let day;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("canvasContainer");
  noLoop();  
  pickRandomDay(); 
}

function draw() {
  background(0);  
  drawSchedule();
  drawCalendar();
  drawHorrorText();
  drawText("Good Morning !", width / 2, 100);
}

function drawText(textStr, centerX, y) {
  textSize(40); 
  fill('blue'); 
  textAlign(CENTER, CENTER); 
  text(textStr, centerX, y); 
}

function drawCalendar() {
  const rectangleWidth = 100; 
  const rectangleHeight = 50; 
  const x = width - rectangleWidth - 10; 
  const y = 10; 
  fill(255);  
  stroke(0);  
  rect(x, y, rectangleWidth, rectangleHeight, 10);  

  fill(0);  
  textSize(14);
  textAlign(CENTER, CENTER);
  text(day + "\n9AM", x + rectangleWidth / 2, y + rectangleHeight / 2);  
}
