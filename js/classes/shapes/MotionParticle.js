class MotionParticle{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.velocityX=random(-1,1);// X movement velocity
    this.velocityY=random(-5,-1);// upward
    this.gravity=0.05;
    this.lifespan=255;  
    this.hue_=random(0,60);
    this.damping_factor=-0.9;
    
  }
  
  update(){
    // Add velocity to the position x,y
    //this.gravity+=0.01;
    this.x+=this.velocityX;
    this.velocityY+=this.gravity;
    this.y+=this.velocityY;
    
    // as soon as it starts it need to start loosing life
    this.lifespan-=3;
    
  }
  checkBoundsAndReact(){
    if(this.y<=height){
      console.log("height reached")
      this.vy-=-1;
      this.vy*=this.damping_factor;
    }
    if(this.x>width||this.x<=0){
      console.log("height reached")
      this.vy-=1;
    }
    
  }
  isDead(){
    return this.lifespan<0;
  }
  display(){
    let c_alpha=this.lifespan/255;
    push(); // Save current settings
    colorMode(HSB); // Switch to HSB for this particle
    noStroke();
    fill(this.hue_,90,90,c_alpha);
    circle(this.x,this.y,8);
    pop(); // Restore previous settings
  }
}