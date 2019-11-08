const shape = document.querySelector('.root');
const classes = ['edge', 'edgeflip1', 'edgeflip2', 'edgeflip3', 'edgeflip4', 'transforming-edge', 'newEdge1', 'newEdge2', 'newEdge'];
const durations = [1200, 300, 300, 150, 200, 150, 200, 150, 3000];

let index = 0;
const loop = () => {
  index++;
  if (index > classes.length - 1) index = 0;
  shape.className = `root ${classes[index]}`;
  setTimeout(loop, durations[index]);
}

setTimeout(loop, durations[0]);