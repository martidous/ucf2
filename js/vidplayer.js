let videoloader;
let vidPosX=100;
let vidPosY=100;
let vid_height=300;
let vid_width=600;
function preload() {
  videoloader = new VideoLoader("/assets/video/sbw/Steamboat_360p.webm",vidPosX,vidPosY,vid_width,vid_height);
  videoloader.color=color(255,255,255,255);
  videoloader.shape="circle";
  videoloader.sampleSize=1;
  console.log(videoloader);
}
function setup() {
  createCanvas(900, 450);
  videoloader.metadataPromise.then(()=>{
        console.log('Video metadata loaded:', videoloader.videoWidth, videoloader.videoHeight);

  });
 
}
function draw() {
  background(220);
  if(videoloader.videoHeight>0&&videoloader.videoWidth>0){
    if(videoloader.showSnapshot && videoloader.snapshot){
        videoloader.pixalateSnapShot();
       // videoloader.snapshot.show();
    }
    else{
        //videoloader.pixalate();
        videoloader.show();
    }
  
  }
}
function keyPressed() {
  console.log(key);
  videoloader.manage(key);
}   