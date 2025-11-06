class SteamBoatWilli extends Particles{
    constructor(x,y,w,h,img="",options={isStatic:false}){
        super(x,y,w,h,options,false,0);
        this.img=img;
        this.data=null;
        this.loader=null;
        this.config=null;
        this.frameIndex=0;
        this.createPhysicsBody();
        this.current="Idle";
        this.direction="right";

    }
    createPhysicsBody(){
         this.body=Bodies.rectangle(this.x,this.y,this.width,this.height,this.options);
         World.add(world,this.body);

    }
    changeDirection(direction,frames){
        if(direction==='left'){
            push();
            scale(-1,1);
           //translate(-this.width,0);
            image(frames[this.frameIndex], 0, 0, this.width, this.height);
            pop();
        }
        else if(direction==='right'){
            push();
             image(frames[this.frameIndex], 0, 0, this.width, this.height);
            pop();
        }
        else{
            image(frames[this.frameIndex], 0, 0, this.width, this.height);
        }
    }
    drawParticle(){
        imageMode(CENTER);
        //,make sure the jaons is loaded 
        if(!this.loader||!this.config)return;
        let state=this.current||this.config.defaultState;
        let frames=this.loader.get(state);
        //this.direction="left";
        // Since transled to the position
        //image(frames[this.frameIndex],0,0,this.width,this.height);
        this.changeDirection(this.direction,frames);
        // hoe many frames per secods. Slow it down a little and also save mem
        if(frameCount%this.config.frameDelay===0){
            this.frameIndex=(this.frameIndex+1)%frames.length;
        }
    }
    show(){
        super.show();
    }
    loaSpriteFromJson(data){
        this.data=data;
        this.config=this.data.config;
        this.loader= new SpriteLoader(this.data);
        this.loader.preloadAll() 
    }
  manageMovement(key){
    if (key === 'i' || key === 'I') this.current = "Idle";
    if (key === 'r' || key === 'R') this.current = "Run";
    if (key === 'k' || key === 'K') this.current = "Kick";
    // Remove direction changes here!
    this.frameIndex = 0;
}
    controlArrows(key){
        if (key === "ArrowLeft") {
        this.direction = "right";
        this.moveleft();
    }
    if (key === "ArrowRight") {
        this.direction = "left";
        this.moveRight();
    }
    if (key === "ArrowUp") this.jump();
    }
    moveleft(){
        Matter.Body.setVelocity(this.body,{x:-5,y:this.body.velocity.y});
        this.current="Run";
       // this.frameIndex=0;
    }
    moveRight(){
        Matter.Body.setVelocity(this.body,{x:5,y:this.body.velocity.y});
        this.current="Run";
        //this.frameIndex=0;  
    }
    
    jump() {
        // You may want to check if the body is on the ground before jumping
        Matter.Body.setVelocity(this.body, { x: this.body.velocity.x, y: -10 });
        this.current = "Jump";
    }
    
}