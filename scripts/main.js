//Create a Pixi Application
let app = new PIXI.Application({ 
  width: window.innerWidth, 
  height: window.innerHeight,
  antialias: true, 
  transparent: false, 
  resolution: 1
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

var circle;

noise.seed(10);

let scale = .05;
let mov = 0;

const group = new PIXI.Container();
app.stage.addChild(group);

const particles = [];
const vectors = [];

const widthCount = 30;
const heightCount = 30;

const rectSize = 30;

function setup() {

  app.ticker.add(draw);

  mov += .01;
  app.stage.removeChildren();

  for(let x = 0; x < widthCount; x++){
    for(let y = 0; y < heightCount; y++){
      const n = (noise.simplex3(x * scale, y * scale, mov) + 1) / 2;

      const a = n * Math.PI * 5;
      const v = Vector.fromAngles(0, a);

      const l = new PIXI.Graphics();
      const p = new Vector(x, y).multiply(rectSize);
      const end = p.add(v.multiply(10));
      l.lineStyle(2, 0xff0000);
      l.moveTo(p.x, p.y);
      l.lineTo(end.x, end.y);
      app.stage.addChild(l);

      vectors.push(v);
      
      /*const color =  PIXI.utils.rgb2hex([ n, n, n ]);
      r.beginFill(color);
      r.drawRect(x, y, 1, 1);
      group.addChild(r);*/
    }
  }

  
  window.addEventListener('click', (ev) => {
    const p = new Particle(new Vector(ev.clientX, ev.clientY), 0xffff00);
    app.stage.addChild(p);
    particles.push(p);
  });
}

function draw(delta) {
  
  particles.forEach((p) => {
    for(let x = 0; x < widthCount; x++){
      for(let y = 0; y < heightCount; y++){
        const i = x * heightCount + y;
        const v = vectors[i];

        const bigX = x * rectSize;
        const bigY = y * rectSize;

        /*const dist = v.subtract(p.pos).length();
        if(dist < )*/
        if(p.pos.x >= bigX && p.pos.x < bigX + rectSize && p.pos.y >= bigY && p.pos.y < bigY + rectSize){
          //p.vel = p.vel.add();
          p.move(v);
        }
      }
    }
    p.wrap(widthCount * rectSize);
  });
}

setup();