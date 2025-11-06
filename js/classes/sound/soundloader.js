class SoundAnimator {
  constructor(sounddata) {
    //this.soundfile=soundfile;
    this.bass_energy = 0;
    this.mid_energy = 0;
    this.high_energy = 0;
    this.treble = 0;
    this.loaded_sound = sounddata;

    this.duration = 0;
    this.centroid = 0;
    this.waveForm = null;
    this.amp_limit_for_amp_display = 0.3;
    //this.setProps();
    this.particleEmitter=null;

  }
  setProps() {
    this.fft = new p5.FFT();
    this.fft.setInput(this.loaded_sound);
    this.duration = this.loaded_sound.duration();
    this.amp = new p5.Amplitude();
    this.amp.setInput(this.loaded_sound);
    this.particleEmitter= new Emitter(width/2,height/2);

  }

  play() {
    if (!this.fft) {
      this.setProps(); // set it up the first time we play
    }
    this.loaded_sound.play();
  }
  analyzeSound() {
    let spectrum = this.fft.analyze();
    this.bass_energy = this.fft.getEnergy(20, 200);
    this.mid_energy = this.fft.getEnergy(200, 500);
    this.high_energy = this.fft.getEnergy(500, 1000);
    this.treble = this.fft.getEnergy(4000, 20000);
    this.centroid = this.fft.getCentroid();
  }
  drawEnergy() {
    let b_size = map(this.bass_energy, 0, 255, 0, 200);
    let m_size = map(this.mid_energy, 0, 255, 0, 100);
    let h_size = map(this.high_energy, 0, 255, 0, 50);
    let t_size = map(this.treble, 0, 255, 0, 100);
    fill(255, 0, 0);
    circle(100, 50, b_size);
    fill(0, 255, 0);
    circle(200, 50, m_size);
    fill(0, 0, 255);
    circle(300, 50, h_size);
    fill(255, 255, 0);
    circle(this.centroid, 180, 20);
    fill(0);
    rect(400, 180, t_size);
  }
  spash() {}
  // draw wave lines
  displaySoundWave() {
    this.waveForm = this.fft.waveform();
    console.log(this.waveForm);
    noFill();
    stroke(255);
    beginShape();
    for (let i = 0; i < this.waveForm.length; i++) {
      let x = map(i, 0, this.waveForm.length, 0, width);
      let y = map(this.waveForm[i], -1, 1, 0, height);
      vertex(x, y);
    }
    endShape();
  }
  drawAmplitudes(x, y, radius_low, radius_high) {
    let level = this.amp.getLevel();
    let size = map(
      level,
      0,
      this.amp_limit_for_amp_display,
      radius_low,
      radius_high
    );
    fill(100, 200, 255);
    noStroke();
    circle(x, y, size);
  }
  drawMotionParticles(){
    console.log("Drawing particles", this.particleEmitter);
    this.particleEmitter.emit();
    this.particleEmitter.update();
  } 
  control(key) {
    if (key === "p" || key === "P") {
      this.play();
    }
    if (key === "s" || key === "S") {
      this.loaded_sound.pause();
    }
    if (key === "x") {
      this.displaySoundWave();
    }
  }
}
