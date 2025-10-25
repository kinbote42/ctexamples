let ship;
let asteroids = []; // array
let lasers = [];

// run npm install to get all dependencies needed to run the project...

function setup() {
  createCanvas(windowWidth - 50, windowHeight - 125);
  ship = new Ship();
  for (let i = 0; i < 3; i++){
    asteroids.push(new Asteroid());
  }
};

function draw() {
  background(0);

  for (let i = 0; i < asteroids.length; i++){
    if (ship.hits(asteroids[i])) {
      console.log ('oopps');
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (let i = lasers.length - 1; i >= 0; i--){
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--){
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          } else {
            // increase the score.
          }

          asteroids.splice(j, 1);
          lasers.splice(i, 1); // remove values from an array...
          break; // get out of asteroids loop since we removed the laser...
        }
      }
    }
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
};

function keyReleased(){
    ship.setRotation(0);
    ship.boosting(false);
};

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW){
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW){
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW){
    ship.boosting(true);
  }
};
