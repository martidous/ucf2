
// PARTICLE BASE CLASSS
class Particles {
  constructor(x, y, w, h, options = { isStatic: true },createBody = false) {
    this.x = x;
    this.y = y;
    this.options = options;
    this.width = w;
    this.height = h;
    //default
    this.color = color(0);
    //default structure
    //this.createBody=true;
    // Just for PObejct
    if (createBody) {
      this.createPhysicsBody();
    } else {
      this.body = null;
    }
    //this.angle = angle;
  }
 // CHECK TO SEE IF THE OBJEC IS OFF THE SCREEN
  isoffScreen() {
    if (this.body.position.y > height + 100) {
      // remove from the world
      return true;
    } else {
      return false;
    }
  }
  giveRamdomcolors(){
    this.color = color(random(255), random(255), random(255));
  }
  // REMOVE THE OBEJCT FROM THE WORLD
  removeFromWorld() {
    //world is defined in the sketch
    World.remove(world, this.body);
  }

  // DEFALT SHAPE
  createPhysicsBody() {
    this.body = Bodies.rectangle(
      this.x,
      this.y,
      this.width,
      this.height,
      this.options
    );
    World.add(world, this.body);
  }
  drawParticle() {
    
  }
  show() {
    push();
    let angle = this.body.angle;
    let pos=  this.body.position;
    translate(pos.x, pos.y);
    rotate(angle);
    this.drawParticle();
    pop();
  }
}
