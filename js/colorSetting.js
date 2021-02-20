function getColor(opts){
    let hue, saturation, brightness, alpha;
    if (typeof opts === 'object' && opts != null) {
        if (opts['hue'] != null) {
            this.hue = opts['hue'];
        } else this.hue = drawingParams.hueValue;
        if (opts['saturation'] != null) {
            this.saturation = opts['saturation'] + "%";
        } else this.saturation = drawingParams.saturationValue + "%";
        if (opts['brightness'] != null) {
            this.brightness = opts['brightness'] + "%";
        } else this.brightness = drawingParams.brightnessValue + "%";
        if (opts['alpha'] != null) {
            this.alpha = opts['alpha'];
        } else this.alpha = drawingParams.alphaValue;
    } else{
        this.hue = drawingParams.hueValue;
        this.saturation = drawingParams.saturationValue + "%";
        this.brightness = drawingParams.brightnessValue + "%";
        this.alpha = drawingParams.alphaValue;
    }
    return color(`hsba(${this.hue}, ${this.saturation}, ${this.brightness}, ${this.alpha})`);
}

function setColor(opts){
    fill(getColor(opts));
}

// for safe hue alterations, keep values between 0 and 360, everything else has thresholds of 100
function safeHSBAShift(hsba, originalValue, addedValue){
    let hsbaThreshold;
    switch (hsba){
        case "hue":
        case "Hue":
        case "HUE":
            this.hsbaThreshold = 360;
            break;
        default:
            this.hsbaThreshold = 100;
            break;
    }
    this.originalValue = originalValue;
    this.addedValue = addedValue % this.hsbaThreshold;
    if ((this.originalValue + this.addedValue) >= this.hsbaThreshold) {
        this.originalValue = ((this.originalValue + this.addedValue) - this.hsbaThreshold);
    } else if ((this.originalValue + this.addedValue) <= 0) {
        this.originalValue = hsbaThreshold + ((this.originalValue + this.addedValue));
    } else this.originalValue = this.originalValue + this.addedValue;
    if (hsba === "alpha" || hsba === "Alpha" || hsba === "ALPHA"){
        return floor(this.originalValue) / 100.00;
    }
    return floor(this.originalValue);
}
