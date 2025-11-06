class Ball extends Particles{
    constructor(x,y,radius,options={isStatic:false}){
        super(x,y,radius*2,radius*2,options,false,0);
        this.radius=radius;
        this.options=options;
        this.color=color(255);
        this.createPhysicsBody();
    }
    createPhysicsBody(){
        this.body=Bodies.circle(this.x,this.y,this.radius,this.options);
        World.add(world,this.body);
    }
    
    drawParticle(){
        fill(this.color);
        circle(0,0,this.radius*2);
    }
    show(){
        super.show();
    }


}