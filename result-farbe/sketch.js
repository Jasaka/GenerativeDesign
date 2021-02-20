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
let halfWidth, halfHeight, amountOfInitializedDots;
let dots = [];
let backgroundRedrawable = drawingParams.redrawBackground;

/* ###########################################################################
Custom Functions
############################################################################ */
function initializeDots(amountOfDots) {
    let angleUnit = 360 / elementParams.dotAmount;
    let radius = halfHeight - elementParams.dotSize;
    drawBackground();
    dots = [];
    for (let i = 0; i < amountOfDots; i++) {
        let addedHueValue = 360 / elementParams.dotAmount;
        if (elementParams.circleInitiation) {
            let x = halfWidth + cos(i * angleUnit) * radius;
            let y = halfHeight + sin(i * angleUnit) * radius;
            dots[dots.length] = new Dot(x, y, elementParams.dotSize, safeHSBAShift("HUE", drawingParams.hueValue, addedHueValue * i), drawingParams.saturationValue, drawingParams.brightnessValue, drawingParams.alphaValue);
        } else {
            let initiationOffset = elementParams.dotSize;
            dots[dots.length] = new Dot(random(initiationOffset, canvasParams.w - initiationOffset), random(initiationOffset, canvasParams.h - initiationOffset), elementParams.dotSize, safeHSBAShift("HUE", drawingParams.hueValue, addedHueValue * i), drawingParams.saturationValue, drawingParams.brightnessValue, drawingParams.alphaValue);
            }
    }
    this.amountOfInitializedDots = amountOfDots;
}

function setBlendMode() {
    switch (drawingParams.blendMode) {
        case "BLEND":
            blendMode(BLEND);
            break;
        case "MULTIPLY":
            blendMode(MULTIPLY);
            break;
        case "ADD":
            blendMode(ADD);
            break;
        case "DIFFERENCE":
            blendMode(DIFFERENCE);
            break;
        case "SCREEN":
            blendMode(SCREEN);
            break;
        case "OVERLAY":
            blendMode(OVERLAY);
            break;
        default:
            break;
    }
}

function drawBackground() {
    let bgColor = getColor({
        "hue": 0,
        "saturation": 0,
        "brightness": drawingParams.bgValue,
        "alpha": map(drawingParams.bgAlpha, 0, 100, 0, 1)
    });
    background(bgColor);
}

function setFill(fillColor) {
    stroke(fillColor);
    if (elementParams.noFill) {
        noFill();
    } else fill(fillColor);
}

/* ###########################################################################
P5 Functions
############################################################################ */


function setup() {

    let canvas = createCanvas(canvasParams.w, canvasParams.h);
    canvas.parent("canvas");

    // Display & Render Options
    frameRate(20);
    angleMode(DEGREES);
    colorMode(HSB, 360, 100, 100, 1);
    smooth();

    // GUI Management
    if (canvasParams.gui) {
        let sketchGUI = createGui('Canvas Parameters');
        sketchGUI.addObject(drawingParams);
        let elementGUI = createGui('Element Parameters');
        elementGUI.addObject(elementParams);
        elementGUI.setPosition(windowWidth - 300, 20);
    }

    // Anything else
    //fill(0, 150);
    halfWidth = width / 2;
    halfHeight = height / 2;
    fill(getColor());
    stroke(getColor());
    strokeWeight(0);
    background(drawingParams.bgValue);
    setBlendMode(drawingParams.blendMode);
    this.dots = [];
    initializeDots(elementParams.dotAmount);
}


function draw() {

    /* ----------------------------------------------------------------------- */
    // Provide your Code below.
    setBlendMode(drawingParams.blendMode);
    halfWidth = width / 2;
    halfHeight = height / 2;
    if (elementParams.linearMovement) {
        backgroundRedrawable = true;
    }
    if (backgroundRedrawable) {
        if (drawingParams.redrawBackground) {
            if (elementParams.linearMovement === false) {
                backgroundRedrawable = false;
            }
            drawBackground();
        }
    }
    strokeWeight(elementParams.strokeWeight);
    if (this.amountOfInitializedDots !== elementParams.dotAmount) {
        initializeDots(elementParams.dotAmount);
        background(0, 1);
    }
    if (elementParams.linearMovement) {
        for (let i = 0; i < dots.length; i++) {
            if (elementParams.iterateOverColors) {
                dots[i].setColor(5);
            }
            dots[i].move(i);
        }
        loop();

    } else {
        for (let i = 0; i < dots.length; i++) {
            if (elementParams.iterateOverColors) {
                dots[i].setColor(5);
            }
            dots[i].drawDot();
        }
        noLoop();
    }
    /* ----------------------------------------------------------------------- */
    // Log globals
    if (loggingParams) {
        canvasParams.mouseX = mouseX;
        canvasParams.mouseY = mouseY;
        logInfo();
    }
}
