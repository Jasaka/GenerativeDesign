class Dot {
    constructor(x, y, radius, hue, saturation, brightness, alpha) {
        this.x = x;
        this.y = y;
        this.xFactor = random([-1, 1]);
        this.yFactor = random([-1, 1]);
        this.radius = radius;
        this.hue = hue;
        this.saturation = saturation;
        this.brightness = brightness;
        this.alpha = alpha;
        this.color = getColor({
            "hue": this.hue,
            "saturation": this.saturation,
            "brightness": this.brightness,
            "alpha": this.alpha
        });
    }

    drawDot() {
        if (this.radius != elementParams.dotSize){
            this.radius = elementParams.dotSize;
        }
        setFill(this.color);
        ellipse(this.x, this.y, this.radius * 2);
    }
    // TODO: get collision detection to work
    move(currentIndex) {
        let xCollision = false;
        let yCollision = false;
        for (let i = 0; i < dots.length; i++){
            if (!(i === currentIndex) && (this.x === dots[i].x)){
                xCollision = true;
            }
            if (!(i === currentIndex) && this.y === dots[i].y){
                yCollision = true;
            }
        }
        this.x += elementParams.dotSpeedX * this.xFactor;
        this.y += elementParams.dotSpeedY * this.yFactor;
        if (this.x > width - this.radius || this.x < this.radius || xCollision) {
            this.xFactor = -this.xFactor;
        }
        if (this.y > height - this.radius || this.y < this.radius || yCollision) {
            this.yFactor = -this.yFactor;
        }
        this.drawDot();
        xCollision = false;
        yCollision = false;
    }

    setColor(hueShift){
        this.hue = safeHSBAShift("HUE", this.hue, hueShift);
        this.color = getColor({
            "hue": this.hue,
            "saturation": this.saturation,
            "brightness": this.brightness,
            "alpha": this.alpha
        });
    }
}