
let soundAnimator;
let soundFile="/assets/audio/upbeat.mp3";
let sound;
function preload(){
    console.log("preloading");
    sound = loadSound(soundFile);
   
}

function setup(){
    createCanvas(900,450);
    soundAnimator = new SoundAnimator(sound);
  
    soundAnimator.loaded_sound.onload = function() {
        soundAnimator.setProps();
    };
    console.log(soundAnimator);


}
function draw(){
    background(220);
    if (soundAnimator && soundAnimator.loaded_sound.isLoaded()&& soundAnimator.loaded_sound.isPlaying()) {
        soundAnimator.analyzeSound();
        soundAnimator.drawEnergy();
        soundAnimator.displaySoundWave();
        soundAnimator.drawMotionParticles();
    }
}
function keyPressed(){
    if(soundAnimator.loaded_sound.isLoaded()){
        soundAnimator.control(key);
    
    }
   // soundAnimator.control(key);
}   