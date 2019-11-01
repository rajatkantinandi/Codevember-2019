let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
const MIN_SIZE = Math.min(WIDTH, HEIGHT);
WIDTH = HEIGHT = MIN_SIZE;
const DIA = MIN_SIZE / 2;
const MIN_DIA = DIA / 10;
const MAX_SIDES = 6;
const MIN_SIDES = 3;
let sides = MIN_SIDES, deltaSides = 1;
let lightness = 100, deltaLightness = -1;
let baseHue;
let framesToShow = 30;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    stroke(255);
    noFill();
    colorMode(HSB, 100);
    baseHue = random(20, 90);
}

function draw() {
    background(0);
    const cx = MIN_SIZE / 2, cy = MIN_SIZE / 2;
    setLoopParams();
    drawTangentCircles(sides, cx, cy, DIA, scale, baseHue);
}

function drawTangentCircles(numOfCircles, cx, cy, dia, scale, baseHue) {
    const deltaAngle = TWO_PI / numOfCircles;
    let currentAngle = 0;

    if (dia < MIN_DIA) return;

    for (let i = 0; i < numOfCircles; i++) {
        const originX = cx + dia * Math.cos(currentAngle) * scale;
        const originY = cy + dia * Math.sin(currentAngle) * scale;
        stroke(baseHue + random(-5, 5), 100, lightness);
        circle(originX, originY, dia / 2);
        drawTangentCircles(numOfCircles, originX, originY, dia / 2, scale);
        currentAngle += deltaAngle;
    }
}

function setLoopParams() {
    setDeltaSides();
    setLightness();
}

function setDeltaSides() {
    if (sides === MIN_SIDES) {
        deltaSides = 1;
    }
    else if (sides === MAX_SIDES) {
        deltaSides = -1;
    }
}

function setLightness() {
    if (lightness === 100) {
        setDeltaLightness();
    }
    else if (lightness === 0) {
        deltaLightness = 2;
        setSidesHueScale();
    }
    lightness += deltaLightness;
}

function setDeltaLightness() {
    if (framesToShow === 0) {
        deltaLightness = -2;
        framesToShow = 50;
    }
    else {
        deltaLightness = 0;
        framesToShow -= 1;
    }
}

function setSidesHueScale() {
    sides += deltaSides;
    scale = 1 / random(2, 3);
    baseHue = random(20, 90);
}