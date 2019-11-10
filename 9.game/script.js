// Made with Zdog

let isActive = true;
let angle = 0;

let illo = new Zdog.Illustration({
  element: ".zdog-canvas",
  dragRotate: true,
  // stop spinning when drag starts
  onDragStart: function() {
    isSpinning = false;
  }
});

const faceTop = new Zdog.Hemisphere({
  addTo: illo,
  diameter: 150,
  stroke: false,
  color: "#111",
  backface: "#EA0",
  rotate: { x: Zdog.TAU / 4 }
});

const faceBottom = faceTop.copy({
  rotate: { x: -Zdog.TAU / 4 },
  color: "#111",
});

const leftEye = new Zdog.Ellipse({
  addTo: illo,
  height: 17,
  width: 20,
  color: "white",
  fill: true,
  stroke: 20,
  translate: { z: 60, x: -30 },
  rotate: { y: -15 },
});

const eyeOuter = new Zdog.Ellipse({
  addTo: leftEye,
  diameter: 50,
  color: '#777',
  fill: true,
  stroke: 15,
  translate: {z: 4, x: 10},
  scale: { x: 1.2, y: 0.9 }
});

const eyeInner = new Zdog.Ellipse({
  addTo: leftEye,
  diameter: 2,
  fill: true,
  stroke: 10,
  color: '#001',
  translate: {z: -4, x: -13},
});

const eyeBrowLeft = new Zdog.Rect({
  addTo: illo,
  color: 'orange',
  stroke: 5,
  fill: true,
  width: 70,
  height: 8,
  translate: {z: 62, y: -25, x: -35},
  rotate: {z: -Zdog.TAU/30, y: -15}
});

const rightEye = leftEye.copyGraph({
  translate: { z: 60, x: 30 },
  rotate: {z: Zdog.TAU/2, y: 15}
});

const eyeBrowRight = new Zdog.Rect({
  addTo: illo,
  color: 'orange',
  stroke: 5,
  fill: true,
  width: 70,
  height: 8,
  translate: {z: 62, y: -25, x: 35},
  rotate: {z: Zdog.TAU/30, y: 15}
});

const beakTop = new Zdog.Shape({
  addTo: illo,
  color: 'orangered',
  stroke: 5,
  fill: true,
  path: [
    {x: -30, y: 50},
    {arc: [
      {x: 0, y: 20},
      {x: 30, y: 50},
    ]},
    {arc: [
      {x: 0, y: 35},
      {x: -30, y: 50},
    ]},
  ],
  translate: {z: 55}
});

const beakBottom = new Zdog.Shape({
  addTo: illo,
  color: 'orangered',
  stroke: 5,
  fill: true,
  path: [
    {x: -25, y: 55},
    {arc: [
      {x: 0, y: 45},
      {x: 25, y: 55},
    ]},
    {x: 0, y: 62},
  ],
  translate: {z: 52},
});

const headMark = new Zdog.Ellipse({
  addTo: illo,
  fill: true,
  stroke: 5,
  width: 17,
  height: 20,
  color: 'rgba(200,200,200,0.7)',
  translate: {z: 50, y: -50},
});

const hair = new Zdog.Shape({
  addTo: illo,
  fill: true,
  stroke: 5,
  translate: {z: 5,},
  path: [
    {x: -10, y: -70},
    {arc: [
      {x: -15, y: -85},
      {x: -5, y: -100},
    ]},
    {x: 5, y: -105},
    {arc: [
      {x: -5, y: -85},
      {x: 0, y: -70},
    ]},
  ],
  color: '#111',
});

const hair2 = hair.copy({
  rotate: {z: Zdog.TAU/30},
})

function animate() {
  const rotation = 0.01*Math.sin(angle);
  angle+=Math.PI/4;
  illo.rotate.y += isActive ? rotation : 0;
  illo.rotate.x += isActive ? rotation : 0;
  illo.updateRenderGraph();
  requestAnimationFrame(animate);
}

animate();