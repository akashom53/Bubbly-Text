var font;
var vehicles = [];

var xOff;

function preload() {
  font = loadFont('montserrat.ttf');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  var bounds = font.textBounds('akash', width / 2, height / 2, 192);

  xOff = bounds.x - bounds.w / 2;

  var points = font.textToPoints('akash', width / 2, height / 2, 255, CENTER, CENTER);
  for (var i = 0; i < points.length; i++) {
    var p = points[i];
    vehicles[i] = new Vehicle(p.x, p.y);
  }
}

function draw() {
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].applyBehaviors();
    vehicles[i].update();
    vehicles[i].show(xOff);
  }
}