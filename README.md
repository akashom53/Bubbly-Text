# Bubbly-Test
Fun with steering algorithms! I have used javascript with p5.js to implement steering algorithms in this project. Check out this [Live link](https://akashom53.github.io/Bubbly-Test/).

### Details
Here are the basic steps:
* Get the list of points for a particular text
```javascript
var points = font.textToPoints('akash', 100, 200, 192);
```
* Add autonomous agents to the points (vehicles)
```javascript
for (var i = 0; i < points.length; i++) {
    var p = points[i];
    vehicles[i] = new Vehicle(p.x, p.y);
}
```
* Add steering algorithm to each vehicle, i.e., every vehicle experiences a force which directs it towards its target location. The force depends on how far it is from the target (this is done to prevent overshooting and oscillation).
```javascript
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
```
* Add fleeing algorithm which makes the vehicles run away from the mouse. Here, every vehicle experiences a strong force which pushes it away from the mouse if the mouse is within 50 pixels if its location.
```javascript
Vehicle.prototype.flee = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    if (desired.mag() < 50) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return this.zeroVector;
    }
};
```

### Credits
* [The Coding Train](https://www.youtube.com/user/shiffman)
