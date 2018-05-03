var font;
var vehicles = [];

function preload() {
  font = loadFont('montserrat.ttf');
}

function setup() {
  createCanvas(800, 300);
  var points = font.textToPoints('akash', 100, 200, 192);
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
    vehicles[i].show();
  }
}