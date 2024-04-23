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

function drawHorrorText() {
  fill(255, 0, 0);  
  textSize(32);  
  textStyle(BOLD);  
  textAlign(CENTER, CENTER);  
  textFont('Creepster'); 

  text("Which course should you take right now?", width / 2, height - 85);
}


function pickRandomDay() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const index = floor(random(days.length));  
  day = days[index];  
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
  text(day + "\n7AM", x + rectangleWidth / 2, y + rectangleHeight / 2);  
}

function drawSchedule() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = ["7AM", "11AM", "1PM", "5PM"];
  const scheduleWidth = 400; 
  const scheduleHeight = 200; 
  const startX = (width - scheduleWidth) / 2; 
  const startY = (height - scheduleHeight) / 2; 
  const cellWidth = scheduleWidth / days.length;
  const cellHeight = scheduleHeight / hours.length;

  textSize(12);
  textAlign(CENTER, CENTER);
  
  for (let i = 0; i < days.length; i++) {
    for (let j = 0; j < hours.length; j++) {
      const x = startX + i * cellWidth;
      const y = startY + j * cellHeight;
      fill(255);  
      stroke(0);  
      rect(x, y, cellWidth, cellHeight);
      fill(0);  
      text(days[i] + "\n" + hours[j], x + cellWidth / 2, y + cellHeight / 2);
    }
  }
}
