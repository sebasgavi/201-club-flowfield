class Particle extends PIXI.Container {

  static radius = 5;
  static maxSpeed = 5;

  constructor(pos, color) {
    super();
    this.pos = pos;
    this.color = color;
    this.vel = new Vector(0, 0);

    const gr = new PIXI.Graphics();
    gr.beginFill(this.color)
      .drawCircle(0, 0, Particle.radius, Particle.radius);
    gr.cacheAsBitmap = true;

    this.addChild(gr);

    this.position.set(this.pos.x, this.pos.y);
  }

  move(dir) {
    this.vel = this.vel.add(dir);
    const mag = this.vel.length();
    if(mag > Particle.maxSpeed){
      this.vel = this.vel.divide(mag).multiply(Particle.maxSpeed);
    }
    this.pos = this.pos.add(this.vel);
    this.position.set(this.pos.x, this.pos.y);
  }

  wrap(size){
    const pad = 10;
    const r = Math.random() * size;
    if(this.pos.x >= size) {
      this.pos.x = pad;
      this.pos.y = r;
    }
    if(this.pos.x <= 0) {
      this.pos.x = size - pad;
      this.pos.y = r;
    }
    if(this.pos.y >= size) {
      this.pos.y = pad;
      this.pos.x = r;
    }
    if(this.pos.y <= 0) {
      this.pos.y = size - pad;
      this.pos.x = r;
    }
  }
}