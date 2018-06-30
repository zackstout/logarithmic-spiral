
let width, height;
const e = Math.exp(1);
let count = 0;
let slider;

function setup() {
  width = 600;
  height = 600;
  createCanvas(width, height);
  background(220);
  // drawPoint(100, PI/2);
  drawSpiral(1, 0.17);
  // slider = createSlider(0, 1, 0.23, 0.01);
  slider = createSlider(0, 1000, 250, 4);
}

// x will be like resolution: how finely to draw?
function drawSpiral(a, b) {
  let prevPoint = {r: a, theta: 0};

  for (let i=0; i < 1000; i++) {
    // drawPoint()
    let theta = i * 2 * PI / 100;
    let radius = a * Math.pow(e, b * theta);
    // drawPoint(radius, theta);
    let point = {r: radius, theta: theta};
    connectPoints(prevPoint, point);
    // Can we copy like this?:
    prevPoint = point;
  }
}

// Hmm I was going to do it by drawing line at angle, walking a short distance, at iterating. But it'd be nicer to just use the polar formula.
function drawPoint(r, theta) {
  push();
  translate(width/2, height/2);
  const x = r * cos(theta);
  const y = r * sin(theta);
  noStroke();
  fill('steelblue');
  ellipse(x, y, 3);
  pop();
}

// Interesting, appears to be unwinding:
// function draw() {
//   background(220);
//   drawSpiral(1, 0.17 + count);
//   count += 0.001;
// }

function draw() {
  background(220);
  // drawSpiral(1, slider.value());
  drawSpiral(1, 0.23);

  drawRadius(slider.value(), 1, 0.23);
}

function connectPoints(x, y) {
  push();
  translate(width/2, height/2);
  const ax = x.r * cos(x.theta);
  const ay = x.r * sin(x.theta);
  const bx = y.r * cos(y.theta);
  const by = y.r * sin(y.theta);
  // line(0, 0, ax, ay);

  line(ax, ay, bx, by);
  pop();
}

function drawRadius(val, a, b) {

  translate(width/2, height/2);
  let theta = val * 2 * PI / 100;
  let radius = a * Math.pow(e, b * theta);
  const x = radius * cos(theta);
  const y = radius * sin(theta);
  line(0, 0, x, y);

  push();
  translate(x, y);
  let rotation = Math.atan(1 / b);
  let pitch = PI - rotation;
  let radialAngle = Math.atan(y / x);
  // if (x < 0) radialAngle = PI - Math.atan(y / x);
  rotate(radialAngle - pitch - PI / 6);
  line(-50, -50, 50, 50);
  pop();

  console.log('radialangle', radialAngle);

}





// angle should be arctan(1/b) !!!




// chillin
