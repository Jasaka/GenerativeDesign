/*jshint esversion: 6 */

/* ############################################################################ 

Kurs «Generative Gestaltung» an der TH Köln
Christian Noss
christian.noss@th-koeln.de
https://twitter.com/cnoss
https://cnoss.github.io/generative-gestaltung/

############################################################################ */


let saveParams = {
    sketchName: "gg-sketch"
}


// Params for canvas
let canvasParams = {
    holder: document.getElementById("canvas"),
    state: false,
    mouseX: false,
    mouseY: false,
    background: 0,
    gui: true
};
getCanvasHolderSize();

// Params for logging
let loggingParams = {
    targetDrawingParams: document.getElementById("drawingParams"),
    targetCanvasParams: document.getElementById("canvasParams"),
    state: false
};


/* ###########################################################################
Globals
############################################################################ */
let particle;
let particles = [];


/* ###########################################################################
Custom Functions
############################################################################ */

function initializeParticles() {
    particles = [];
    for (let i = 0; i < drawingParams.particleAmount; i++) {
        particles[i] = new Particle(random(0, canvasParams.w), random(0, canvasParams.h));
    }
}

function checkParticleToParticleConnections() {
    for (let i = 0; i < drawingParams.particleAmount; i++) {
        for (let j = 1; j < drawingParams.particleAmount; j++) {
            if (dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y) < drawingParams.connectionDistance) {
                stroke(getColor());
                strokeWeight(1);
                line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
        }
    }
}

function checkMouseToParticleConnections() {
    for (let i = 0; i < drawingParams.particleAmount; i++) {
        if (dist(particles[i].x, particles[i].y, mouseX, mouseY) < drawingParams.connectionDistance + drawingParams.connectionDistance / 5) {
            stroke(getColor());
            strokeWeight(1);
            line(particles[i].x, particles[i].y, mouseX, mouseY);
        }
    }
}

function generateParticleMeshConnections() {
    for (let i = 0; i < drawingParams.particleAmount; i++) {
        for (let j = 1; j < drawingParams.particleAmount; j++) {
            stroke(getColor());
            strokeWeight(1);
            line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
        }
    }
}

function gradientLine(startX, startY, endX, endY) {
    strokeWeight(1);
    stroke(getColor());
    beginShape(LINES);
    let lineLength = dist(startX, startY, endX, endY);
    let cosAlpha = abs(startX - endX) / lineLength;
    let sinAlpha = abs(startY - endY) / lineLength;
    for (let i = 0; i < lineLength; i++){
        let brightnessStep = map(i, 0, lineLength, 0, 50);
        stroke(getColor({brightness: safeHSBAShift("brightness", 100, brightnessStep * -1)}));
        line(startX, startY, startX + cosAlpha, startY + sinAlpha);
        startX = startX + cosAlpha;
        startY = startY + sinAlpha;
    }
}

/* ###########################################################################
P5 Functions
############################################################################ */


function setup() {

    let canvas = createCanvas(canvasParams.w, canvasParams.h);
    canvas.parent("canvas");

    // Display & Render Options
    colorMode(HSB, 360, 100, 100, 1);
    angleMode(DEGREES);
    smooth();

    // GUI Management
    if (canvasParams.gui) {
        let sketchGUI = createGui('Params');
        sketchGUI.addObject(drawingParams);
    }

    // Anything else
    background(0);
    noStroke();
    initializeParticles();
}

function draw() {

    if (drawingParams.sketchMode === "Swarm Connections") {
        background(getColor({brightness: 0, alpha: 0.05}));
    } else if (drawingParams.sketchMode === "Particle Net") {
        background(getColor({brightness: 0, alpha: drawingParams.alphaValue}));
    } else if (drawingParams.sketchMode === "Mesh") {
        background(getColor({brightness: 0, alpha: 0.03}));
    }

    if (particles.length !== drawingParams.particleAmount) {
        initializeParticles();
    }

    for (let i = 0; i < drawingParams.particleAmount; i++) {
        if (particles[i] !== null) {
            particles[i].movement();
            particles[i].movement();
        }
    }

    if (drawingParams.sketchMode === "Swarm Connections" || drawingParams.sketchMode === "Particle Net") {
        checkParticleToParticleConnections();
        checkMouseToParticleConnections();
    } else if (drawingParams.sketchMode === "Mesh") {
        generateParticleMeshConnections();
    }


    /* ----------------------------------------------------------------------- */
    // Log globals
    if (loggingParams) {
        canvasParams.mouseX = mouseX;
        canvasParams.mouseY = mouseY;
        logInfo();
    }
}