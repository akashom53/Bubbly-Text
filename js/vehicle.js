function Vehicle(x, y) {
  this.pos = createVector(random(width), random(height));
  this.target = createVector(x, y);

  this.vel = p5.Vector.random2D();
  this.acc = createVector();

  this.r = 8;
  this.maxSpeed = 10;
  this.maxForce = 1;

  this.zeroVector = createVector(0, 0);

  this.xOff = 0;

  this.color = {
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255)
  };
}

Vehicle.prototype.update = function() {
  this.vel.add(this.acc);
  this.pos.add(this.vel);

  this.acc.mult(0);
}

Vehicle.prototype.show = function(xOff, yOff) {
  stroke(this.color.r, this.color.g, this.color.b);
  strokeWeight(this.r);
  this.xOff = xOff;
  point(this.pos.x - xOff, this.pos.y);
}

Vehicle.prototype.applyBehaviors = function() {
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX + xOff, mouseY);
  var flee = this.flee(mouse);

  arrive.mult(1);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
};

Vehicle.prototype.applyForce = function(force) {
  this.acc.add(force);
};

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  if (desired.mag() < 100) {
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return this.zeroVector;
  }
};

Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var speed = this.maxSpeed;
  var d = desired.mag();
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxSpeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
};