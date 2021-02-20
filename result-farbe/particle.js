class Particle {

    constructor(x, y) {
        this.particleColor = getColor();
        this.x = x;
        this.y = y;
        this.radius = random(1, 15);
        this.xFactor = random([-1, 1]);
        this.yFactor = random([-1, 1]);
    }

    setColor(changedColor) {
        this.particleColor = changedColor;
    }

    updateParticle(opts) {
        if (typeof opts === 'object' && opts != null) {
            if (opts['x'] != null) {
                this.x = opts['x'];
            }
            if (opts['y'] != null) {
                this.y = opts['y'];
            }
            if (opts['radiusFactor'] != null) {
                this.radiusFactor = opts['radiusFactor'];
            }
            if (opts['color'] != null) {
                this.particleColor = opts['color'];
            }
        }
    }

    movement() {
        this.x += drawingParams.particleSpeed / 10 * this.xFactor;
        this.y += drawingParams.particleSpeed / 10 * this.yFactor;
        if (this.x > width - this.radius || this.x < this.radius) {
            this.xFactor = -this.xFactor;
        }
        if (this.y > height - this.radius || this.y < this.radius) {
            this.yFactor = -this.yFactor;
        }
        this.drawParticle();
    }

    drawParticle() {
        strokeWeight(0);
        this.particleColor = getColor();
        fill(this.particleColor);
        ellipse(this.x, this.y, this.radius, this.radius)
    }

}