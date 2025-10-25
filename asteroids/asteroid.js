function Asteroid(pos, r){
// this uses polar to cartesian coordinate processing to make the asteroids look jagged.

  if (pos) {
    this.pos = pos.copy(); // pos is a reference value - don't want it to point to something that will change on us - make a copy.
  }
  else {
    this.pos = createVector(random(width), random(height));
  }

  if (r) {
    this.r = r * 0.5;  // make it smaller...
  }
  else {
    this.r = random(15,50);
  }

  this.total = floor(random(5, 15));
  this.xoffset = [];
  this.yoffset = [];
  this.vel  = p5.Vector.random2D(); //generates a random vector with length of 1.

  for (let i=0; i < this.total; i++){
    this.xoffset[i] = random(-this.r*0.5, this.r*0.5);
    this.yoffset[i] = random(-this.r*0.5, this.r*0.5);
  }

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.render = function() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y); // set where to draw in relativeness to... (these are cumulative - ships translation methods affect this as well - need to separate them...)
    //  ellipse(0,0,this.r*2); // this takes the diamter so we multiply radius * 2.

    beginShape();
    for (let i = 0; i < this.total; i++){
      let angle = map(i, 0, this.total, 0 , TWO_PI); // changes values from one range to another...
      let rx = this.r + this.xoffset[i];
      let ry = this.r + this.xoffset[i];
      // polar is a radius and an angle from the center. (pole)
      // cartesian is x and y.  these next 2 lines convert from angle and distance to x,y
      let x = rx *cos(angle);
      let y = ry * sin(angle);
      vertex (x,y);
    }
    endShape(CLOSE);
    pop();
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

  this.breakup = function() {
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }
}
