
/* ###########################################################################
Service Functions
############################################################################ */


function getCanvasHolderSize() {
    canvasParams.w = canvasParams.holder.clientWidth;
    canvasParams.h = canvasParams.holder.clientHeight;
}


function resizeMyCanvas() {
    getCanvasHolderSize();
    resizeCanvas(canvasParams.w, canvasParams.h);
}


function windowResized() {
    resizeMyCanvas();
}


function logInfo(content) {

    if (loggingParams.targetDrawingParams) {
        loggingParams.targetDrawingParams.innerHTML = helperPrettifyLogs(drawingParams);
    }

    if (loggingParams.targetCanvasParams) {
        loggingParams.targetCanvasParams.innerHTML = helperPrettifyLogs(canvasParams);
    }

}