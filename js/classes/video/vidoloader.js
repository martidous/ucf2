class  VideoLoader{
    constructor(videoFile, x, y, w, h){
        this.videoFile=videoFile;
        this.vid=createVideo(this.videoFile);
        this.vid.hide();
        this.duration = 0;
        this.videoWidth = 0;
        this.videoHeight = 0;
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.sampleSize=10;
        this.scaleX=1;
        this.scaleY=1;
        this.shape="circle";
        this.color=color(255,255,255,255);
        // The constructor can't be async, but we can kick off the loading.
        // A better pattern might be a static factory method.
        this.metadataPromise = this.loadMetadata();
        // take a snopshot of the image 
        this.snapshot=null;
        this.showSnapshot=false;

        this.setupVideo();
    
    }
    // Loads the meta data
    loadMetadata() {
        return new Promise((resolve) => {
            this.vid.elt.addEventListener('loadedmetadata', () => {
                console.log('Metadata loaded.');
                this.duration = this.vid.elt.duration;
                this.videoWidth = this.vid.elt.videoWidth;
                this.videoHeight = this.vid.elt.videoHeight;
                console.log('Duration (size):', this.videoHeight,this.videoWidth);
                resolve(); // Resolve the promise when metadata is loaded
            });
        });
    }
    // set up initial values
    setupVideo(){
        this.vid.position(this.x,this.y);
        this.vid.size(this.w,this.h);
        this.scaleX=this.w/this.videoWidth;
        this.scaleY=this.h/this.videoHeight;
    }
    // place the image
    show(){
        image(this.vid,this.x,this.y,this.w,this.h);
    }

    drawShape(x,y,w,h,color){
        switch(this.shape){
            case "circle":
                this.drawCircle(x,y,w,h,color);
                break;
            case "square":
                this.drawSquare(x,y,w,h,color);
                break
        
    }
}
    drawCircle(pos_x,pos_y,width,height,color){
        push();
        //console.log(color);
        fill(color);
        noStroke();
        ellipse(pos_x,pos_y,width,height);
        pop();

    }
    drawSquare(pos_x,pos_y,width,height,color){
        push()
        fill(color);
        noStroke();
        rect(pos_x,pos_y,width,height);
        pop();
    }


    pixalate(){
        this.vid.loadPixels();
        // lets create a 2D array from a 1 data
        //2552552552555 
        // Get the pixels and overlay a shape for every sample site
        for(let y=0;y<this.videoHeight;y+=this.sampleSize){
            for(let x=0;x<this.videoWidth;x+=this.sampleSize){
                // every 4. since it is a 1D
                let index=((x+y*this.videoWidth)*4);
                let red=this.vid.pixels[index];
                let green=this.vid.pixels[index+1];
                let blue=this.vid.pixels[index+2];
                let avg_brightness=(red+green+blue)/3;
                this.color=color(red,green,blue,avg_brightness);
                console.log(this.color);
                this.drawShape(
                    x * this.scaleX + this.x,
                    y * this.scaleY + this.y,
                    this.sampleSize * this.scaleX,
                    this.sampleSize * this.scaleY,
                    this.color
                );
            }
        }   
    }
    takeSnapshot(){
        image(this.vid, this.x, this.y, this.w, this.h);
        this.snapshot = this.vid.get();  // Just copy the whole video frame!
        //this.pixalateSnapShot();
    }
    pixalateSnapShot(){
        this.snapshot.loadPixels();
        for(let y=0;y<this.snapshot.height;y+=this.sampleSize){
            for(let x=0;x<this.snapshot.width;x+=this.sampleSize){
                let index=((x+y*this.snapshot.width)*4);
                let red=this.snapshot.pixels[index];
                let green=this.snapshot.pixels[index+1];
                let blue=this.snapshot.pixels[index+2]; 
                let avg_brightness=(red+green+blue)/3;  
                let col = color(red, green, blue); // <-- FIX
                this.color=col;
               this.drawShape(
                    x * this.scaleX + this.x,
                    y * this.scaleY + this.y,
                    this.sampleSize * this.scaleX,
                    this.sampleSize * this.scaleY,
                    col
                );
            }
        }
    
    }

    manage(key){
        console.log(key);
        if(key==='p'||key==='P'){
            this.vid.loop()
            this.showSnapshot=false;
        }
        if(key==='s'||key==='S'){
            this.vid.pause();
        }
        if(key==='x'){
            this.vid.pause();
            this.takeSnapshot();
            this.showSnapshot=true
        }
        if (key==='X'){
            this.pixalate();
        }


    }
}