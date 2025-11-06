let canvasW=900;
let canvasH=600;
let ball;
let sbw;
let ground;
let swb_json_data;
let engine;
let world;
let World=Matter.World;
let Bodies=Matter.Bodies;
let Constraint=Matter.Constraint;
let Engine=Matter.Engine;
let Mouse=Matter.Mouse;
let MouseConstraint=Matter.MouseConstraint;

function preload(){
    console.log("preloading");
    swb_json_data=loadJSON('/assets/images/sprites/sbw/data.json');
    console.log(swb_json_data);
}
function setup() {
  createCanvas(canvasW, canvasH);
  initPhysics();
  ball= new Ball(canvasW/2,canvasH/2,50,{isStatic:false});
  sbw=new SteamBoatWilli(200,100,50,50,'',{isStatic:false});
  sbw.loaSpriteFromJson(swb_json_data);
  ground= new Ground(canvasW/2,canvasH,canvasW,30,{isStatic:true});
  console.log(ball);

}
function initPhysics(){
  engine=Engine.create();
  world=engine.world;
}
function draw() {
  background(160);
  Engine.update(engine);
  ball.show();
  sbw.show();
  ground.show();

}
/** MANAGE SPRITE */
function keyPressed() {
  sbw.manageMovement(key);
  sbw.controlArrows(key);
}


//