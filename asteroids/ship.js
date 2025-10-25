function Ship() {
  this.pos = createVector(width/2, height/2);
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0,0);
  this.isBoosting = false;

  this.boosting = function(b) {
    this.isBoosting = b;
  }

  this.update = function() {
    if (this.isBoosting){
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  this.boost = function() {
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }

  this.render = function()  {
    push(); // save teh current translation and rotation.
    translate(this.pos.x, this.pos.y); // tells p5 to start drawing at this position (treat the passed coords as the origin)
    rotate (this.heading + PI/2);
    fill(0); // fill with black to cover lasers if ship is drawn after lasers.
    stroke(255);
    triangle (-this.r, this.r, this.r, this.r, 0, -this.r);
    pop(); // restore previous rotation and translation settings...
  }

  this.edges = function() {
    if (this.pos.x > width + this.r){
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r){
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r){
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r){
      this.pos.y = height + this.r;
    }
  }

  this.hits = function(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  this.setRotation = function(a){
    this.rotation = a;
  }

  this.turn = function() {
    this.heading += this.rotation;
  }
}
