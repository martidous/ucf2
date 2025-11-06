class Emitter{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.particles=[];
  }
  emit(){
    let particle=new MotionParticle(this.x,this.y);
    this.particles.push(particle);
  }
  
  update(){
    let ar_size=this.particles.length;
    for(let i=ar_size-1;i>=0;i--){
      let p=this.particles[i];
      p.update();
      p.display();
      p.checkBoundsAndReact();
      if(p.isDead()){
        // remove faded one. give it time to die
        this.particles.splice(i,1);
      }
      
    }
  }
  
  
}