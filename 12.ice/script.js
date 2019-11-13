const maxCount = 150;
const snowFlakes = [];
let snowFlake;

function setup() {
 createCanvas(window.innerWidth, window.innerHeight);
 fill(255);
 const initialX = random(width / 4,3*width/4);
 snowFlake = new SnowFlake(initialX);
}

function draw() {
 background(0);
 push();
 snowFlake.animate();
 pop();
 for(let i=snowFlakes.length-1;i>=0;i--) {
  if(snowFlakes[i].translation > height*1.1) {
   snowFlakes.splice(i,1);
  }
  else {
   push();
   snowFlakes[i].animate();
   pop();
  }
 }
 if(snowFlake.translation > height/3) {
  snowFlakes.push(snowFlake);
  const initialX = random(width / 4,3*width/4);
  snowFlake = new SnowFlake(initialX);
  console.log(snowFlakes.length);
 }
}

function SnowFlake(initialX) {
 this.initialX = initialX;
 this.translation = 0;
 this.rotation = 0;
 this.ices = [];
 this.ice = new SnowParticle(this.initialX, 0,this.ices);
 this.count = 0;
 
 this.animate = () => {
  translate(this.initialX, this.translation+=2);
  rotate(this.rotation+=PI/50);
  scale(0.4);
  for (let i = 0; i < 6; i++) {
   rotate(PI / 3);
   push();
   for (let i = 0; i < this.ices.length; i++) {
    this.ices[i].draw();
   }

   while (this.ice.shouldMove()) {
    this.ice.update();
   }
   this.ice.draw();

   if (this.count < maxCount && Math.random()<0.2) {
    this.ices.push(this.ice);
    this.ice = new SnowParticle(this.initialX, random(-40,40),this.ices);
    this.count++;
   }
   pop();
  }
 }
}

function SnowParticle(x, y, ices) {
 this.pos = createVector(x, y);
 this.radius = 5;
 this.ices = ices;

 this.draw = () => {
   ellipse(this.pos.x, this.pos.y, this.radius);
   ellipse(this.pos.x, -this.pos.y, this.radius);
 };

 this.update = () => {
  this.pos.x += -1;
  this.pos.y += random(1, -1);
  const angle = constrain(this.pos.heading(),0,PI/3);
  const magnitude = this.pos.mag();
  this.pos.x = magnitude * Math.cos(angle);
  this.pos.y = magnitude * Math.sin(angle);
 };

 this.shouldMove = () => {
  if (this.pos.x < 1 || isColliding()) {
   return false;
  }
  return true;
 };

 const isColliding = () => {
  for (let currentIce of this.ices) {
   const distance = dist(
    currentIce.pos.x,
    currentIce.pos.y,
    this.pos.x,
    this.pos.y
   );
   if (distance < this.radius) return true;
  }
  return false;
 };
}