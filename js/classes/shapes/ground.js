class Ground extends Particles{
     constructor(x,y,w,h,options={isStatic:true}){
        super(x,y,w,h,options,true,0);
        this.color=color(100);
    }
    drawParticle(){
        fill(this.color);
        rectMode(CENTER);
        rect(0,0,this.width,this.height);
    }
    show(){
        super.show();
    }

}