// Ada Ada Ada
// Twitter: @ada_ada_ada_art
// Fxhash: https://www.fxhash.xyz/u/<fxhash>

import { addLetterStyle, LetterStyle } from '../letterstyle';

// To make a new style, copy this template in a new file and import it
// at the begining of ../index.js

addLetterStyle(class AdaAdaAda extends LetterStyle {

  static author = 'Ada Ada Ada';
  static name = 'AdaAdaAda';
  isDebugging = true

  setup() {
    this._inverted = this.probability(0.5);
  }

  draw() {
    // this.pg = p5.Renderer context
    // this.size = current letter size (1/2 total size)
    // this.letter = current letter char

    this.pg.strokeWeight(0);
    this.pg.colorMode(this.pg.HSL, 360, 100, 100)
    this.pg.fill(52, 5, 80)
    // this.pg.fill(this._inverted ? 0 : 255);
    this.pg.rect(0, 0, this.size);
    // this.pg.fill(this._inverted ? 255 : 0);
    this.drawLetter();
    console.count('drawletter')
    const noiseLevel = 5
    // // noiseLevel = 0
    const scratchCount = this.pg.random(3, 9)
    // // scratchCount = 0
    const spotCount = this.pg.random(5, 10)

    this.pg.blendMode(this.pg.OVERLAY)
    this.drawFilmGradients()
    this.pg.blendMode(this.pg.BLEND)

    this.hasDrawnNoise = true
    if(!this.hasDrawnNoise){
        for(let i = 0; i < scratchCount; i++) {
            const placement = this.pg.createVector(this.pg.random(this.pg.width * .1, this.pg.width * .9), this.pg.random(this.pg.height * .1, this.pg.height * .9))
            const gfx = this.drawScratch(placement)
            // Draw the graphic with some random alpha level
            this.pg.tint(0, 0, 100, this.pg.random(90, 100))
            // p5.Graphics have a weird black border around shapes, so we get rid of them with this.pg.LIGHTEST blend
            this.pg.blendMode(this.pg.OVERLAY)
            this.pg.image(gfx, placement.x, placement.y)
        }

        for(let i = 0; i < spotCount; i++) {
            const placement = this.pg.createVector(this.pg.random(this.pg.width * .1, this.pg.width * .9), this.pg.random(this.pg.height * .1, this.pg.height * .9))
            const gfx = this.drawSpot(placement)
            // Draw the graphic with some random alpha level
            this.pg.tint(0, 0, 100, this.pg.random(90, 100))
            // p5.Graphics have a weird black border around shapes, so we get rid of them with this.pg.LIGHTEST blend
            this.pg.blendMode(this.pg.LIGHTEST)
            this.pg.image(gfx, placement.x, placement.y)
        }
        for(let i = 0; i < noiseLevel; i++) {
            this.drawNoise()
        }
        this.hasDrawnNoise = true
    }
  }

  drawLetter(fontName = 'dejaVu') {
    const f = this.fonts[fontName];
    this.pg.textFont(f.font);
    this.pg.textSize(this.size * f.sizeFactor);
    this.pg.textAlign(this.pg.CENTER, this.pg.CENTER);
    let textBounds = f.font.textBounds(this.letter, 0, this.size * f.posFactor, this.size)
    let textPoints = f.font.textToPoints(this.letter, 0, this.size * f.posFactor, this.size * f.sizeFactor)
    console.log(textPoints)
    console.log(textBounds)
    // this.pg.stroke(255, 0, 0);
    // this.pg.strokeWeight(5)
    const ctx = this.pg.drawingContext
    const gradient = ctx.createLinearGradient(
        textBounds.x, textBounds.y,
        textBounds.x + textBounds.w * 2, textBounds.y
    )

    gradient.addColorStop(0, this.pg.color(this.pg.random(330, 360 + 60) % 360, 90, 20))
    gradient.addColorStop(.25, this.pg.color(this.pg.random(330, 360 + 60) % 360, 90, 20))
    gradient.addColorStop(.75, this.pg.color(this.pg.random(330, 360 + 60) % 360, 90, 20))
    gradient.addColorStop(1, this.pg.color(this.pg.random(330, 360 + 60) % 360, 90, 20))
    // this.pg.noFill()
    this.pg.beginShape()
    let edges = this.pg.random(10, 100)
    for(let i = 0; i < textPoints.length; i += Math.round(textPoints.length / edges)) {
        this.pg.curveVertex(textPoints[i].x, this.size * f.posFactor + textPoints[i].y)
        if(i === textPoints.length - (textPoints.length / edges)) {
            this.pg.curveVertex(textPoints[0].x, this.size * f.posFactor + textPoints[0].y)
        }
        let satVal = this.pg.map(i, 0, textPoints.length, 0, 100)
        this.pg.strokeWeight(10)
        this.pg.stroke(0, satVal, 50)
        this.pg.point(textPoints[i].x, this.size * f.posFactor + textPoints[i].y)
    }
    this.pg.noStroke()
    this.pg.fill('transparent')
    ctx.fillStyle = gradient
    this.pg.endShape(this.pg.CLOSE)
    // this.pg.rect(textBounds.x + textBounds.w * .5, textBounds.y + textBounds.h * .5, textBounds.w, textBounds.h)
    // this.pg.text(this.letter, 0, this.size * f.posFactor, this.size);
  }

  drawFilmGradients() {
    const gradients = 10
    const ctx = this.pg.drawingContext
    this.pg.noStroke()
    for(let grad = 0; grad < gradients; grad++) {
      const gradient = ctx.createLinearGradient(
        this.pg.width * this.pg.random(0, .5), this.pg.height * this.pg.random(0, .5),
        this.pg.width * this.pg.random(0.5, 1), this.pg.height * this.pg.random(.5, 1)
      )
      const stops = this.pg.random(10)
      for(let stop = 0; stop < stops; stop++) {
        const stopVal = this.pg.map(stop, 0, stops, 0, 1, true)
        gradient.addColorStop(stopVal, this.pg.color(0, 0, this.pg.random(40, 70), this.pg.random(1, 5)))
      }
      this.pg.fill('transparent')
      ctx.fillStyle = gradient
      this.pg.rect(0, 0, this.pg.width, this.pg.height)
    }
  }

  drawScratch(placement) {
    console.log('place', placement)
    const gfx = this.createGraphics(this.pg.width * .2, this.pg.height * .2)
    console.log('place', placement)
    const scratchLength = this.pg.random(5, 10)
    if (this.isDebugging) {
      this.pg.noFill()
      this.pg.stroke(240, 100, 50)
      this.pg.rect(placement.x, placement.y, gfx.width, gfx.height)
    }
    gfx.colorMode(this.pg.HSL, 360, 100, 100)
    gfx.stroke(0, 0, 20)
    gfx.strokeWeight(this.pg.random(1.5, 3))
    gfx.noFill()
    gfx.push()
    const center = this.pg.createVector(gfx.width / 2, gfx.height / 2)
    gfx.translate(center.x, center.y)
    gfx.rotate(this.pg.random(0, this.pg.TWO_PI))
    gfx.beginShape()
    for(let i = 0; i < scratchLength; i++) {
      const noiseVal = this.pg.noise(i*.1)

      gfx.curveVertex(i * this.pg.random(-5, 5), noiseVal * 100)
    }
    gfx.endShape()
    gfx.filter(this.pg.BLUR, this.pg.random(2, 4))
    gfx.pop()
    return gfx
  }

  drawSpot(placement) {
    const gfx = this.createGraphics(this.pg.width * .2, this.pg.height * .2)
    if (this.isDebugging) {
      this.pg.noFill()
      this.pg.stroke(0, 100, 50)
      this.pg.rect(placement.x, placement.y, gfx.width, gfx.height)
    }
    gfx.colorMode(this.pg.HSL, 360, 100, 100)
    gfx.fill(0, 0, 20)
    gfx.noStroke()
    gfx.push()
    const eWidth = this.pg.random(3, 10)
    const eHeight = eWidth * this.pg.random(.8, 1.2)
    const center = this.pg.createVector(gfx.width / 2, gfx.height / 2)
    gfx.translate(center.x, center.y)
    gfx.rotate(this.pg.random(0, this.pg.TWO_PI))
    gfx.ellipse(0, 0, eWidth, eHeight)
    gfx.filter(this.pg.BLUR, this.pg.random(2, 4))
    gfx.pop()
    return gfx
  }

  drawNoise() {
    console.count('drawNoise')
    // Add noise
    // SRC: Hashed City Blocks by Yazid
    this.pg.loadPixels()
    const amount = this.pg.random(8, 12)
    for (let i = 0; i < (this.pg.width * this.pg.pixelDensity()) * (this.pg.height * this.pg.pixelDensity()) * 4; i += 4) {
      const noise = this.pg.map(this.pg.random(), 0, 1, -amount, amount)
      this.pg.pixels[i] = this.pg.pixels[i] + noise
      this.pg.pixels[i + 1] = this.pg.pixels[i + 1] + noise
      this.pg.pixels[i + 2] = this.pg.pixels[i + 2] + noise
      this.pg.pixels[i + 3] = this.pg.pixels[i + 3] + noise
    }
    this.pg.updatePixels()
  }

});
