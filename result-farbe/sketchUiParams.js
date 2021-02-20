let uiParamAdditions = {
    bgValue: 30,
    bgValueMax: 255,
    bgAlpha: 5,
    hueValue: 45,
    alphaValue: 0.6,
    blendMode: ["BLEND", "DIFFERENCE", "MULTIPLY", "ADD", "SCREEN", "OVERLAY"],
    redrawBackground: true
};

let elementParams = {
    strokeWeight: 2,
    dotAmount: 30,
    dotSize: 80,
    dotSizeMin: 10,
    dotSizeStep: 10,
    dotSpeedX: 2,
    dotSpeedXMax: 10,
    dotSpeedY: 2,
    dotSpeedYMax: 10,
    //hitBox: 0.0,
    //hitBoxMin: 0,
    //hitBoxMax: 1,
    //hitBoxStep: 0.01,
    randomSeed: 54,
    noFill: true,
    linearMovement: true,
    iterateOverColors: true,
    circleInitiation: true
}


drawingParams = Object.assign(drawingParams, uiParamAdditions)