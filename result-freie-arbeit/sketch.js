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
Global Parameters
############################################################################ */
let capture, captureScale;

/* ###########################################################################
Custom Functions
############################################################################ */


/* ###########################################################################
P5 Functions
############################################################################ */


function setup() {

    let canvas = createCanvas(canvasParams.w, canvasParams.h);
    canvas.parent("canvas");
    // Display & Render Options
    //frameRate(0.5);
    colorMode(HSB, 360, 100, 100, 1);
    angleMode(DEGREES);
    smooth();

    // GUI Management
    if (canvasParams.gui) {
        let sketchGUI = createGui('Params');
        sketchGUI.addObject(drawingParams);
    }

    background(0);
    // Anything else
    captureScale = drawingParams.captureScale;
    pixelDensity(1);
    capture = createCapture(VIDEO);
    capture.size(canvasParams.w / captureScale, canvasParams.h / captureScale);
    rectMode(CENTER);
}


function draw() {
    //background(0);
    captureScale = drawingParams.captureScale;
    capture.size(width / captureScale, height / captureScale);
    capture.loadPixels();
    loadPixels();

    for (let x = 0; x < capture.width; x++) {
        for (let y = 0; y < capture.height; y++) {
            let i = (x + y * capture.width) * 4;
            let r = capture.pixels[i];
            let g = capture.pixels[i + 1];
            let b = capture.pixels[i + 2];

            let brightness = map(drawingParams.brightnessValue, 0, 100, 0, (r + g + b) / 3);
            if (drawingParams.sketchMode === "Color") {
                fill(getColor({
                    hue: drawingParams.hueValue,
                    saturation: drawingParams.saturationValue,
                    brightness: brightness,
                    alpha: drawingParams.alphaValue
                }))
            } else fill(brightness);

            rect(x * captureScale + captureScale / 2, y * captureScale + captureScale / 2, captureScale, captureScale);
        }
    }

    /* ----------------------------------------------------------------------- */
    // Log globals
    if (loggingParams) {
        canvasParams.mouseX = mouseX;
        canvasParams.mouseY = mouseY;
        logInfo();
    }

}



