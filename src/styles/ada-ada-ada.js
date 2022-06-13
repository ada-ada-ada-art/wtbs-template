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

    this.pg.strokeWeight(0)
    this.pg.colorMode(this.pg.HSL, 360, 100, 100)
    this.pg.fill(52, 0, 80)
    this.pg.rect(0, 0, this.size)
    this.drawBackground()
    const noiseLevel = 2

    this.pg.blendMode(this.pg.OVERLAY)
    this.drawFilmGradients()

    let episodeCount = 25
    for(let i = 0; i < episodeCount; i++) {
      this.drawLetter('dejaVu', this.pg.DIFFERENCE)
    }
    this.drawLetter('dejaVu', this.pg.BLEND, 0)
    this.pg.blendMode(this.pg.OVERLAY)
    this.drawFilmGradients()

    this.pg.blendMode(this.pg.BLEND)
    this.hasDrawnNoise = false
    if(!this.hasDrawnNoise){
        for(let i = 0; i < noiseLevel; i++) {
            this.drawNoise()
        }
        this.hasDrawnNoise = true
    }
  }

  drawBackground() {
    const ctx = this.pg.drawingContext
    let centerX = this.pg.width / 2
    let centerY = this.pg.height / 2
    const gradient = ctx.createRadialGradient(
      centerX, centerY, this.pg.width * 0.01,
      centerX, centerY, this.pg.width * 2
    )

    gradient.addColorStop(0, this.pg.color(this.pg.random(0, 360), 90, 50))
    gradient.addColorStop(.33, this.pg.color(this.pg.random(0, 360), 90, 50))
    gradient.addColorStop(.66, this.pg.color(this.pg.random(0, 360), 90, 50))
    gradient.addColorStop(1, this.pg.color(this.pg.random(0, 360), 90, 50))
    
    this.pg.noStroke()
    this.pg.fill('transparent')
    ctx.fillStyle = gradient
    this.pg.rect(0, 0, this.pg.width, this.pg.height)
  }

  drawLetter(fontName = 'dejaVu', blendMode = this.pg.BLEND, randomOffset = this.size * .1) {
    const f = this.fonts[fontName];
    this.pg.textFont(f.font);
    this.pg.textSize(this.size * f.sizeFactor);
    this.pg.textAlign(this.pg.CENTER, this.pg.CENTER);
    let letterPos = this.pg.createVector(
      this.pg.random(-randomOffset, randomOffset),
      (this.size * f.posFactor) + this.pg.random(-randomOffset, randomOffset)
    )
    let textBounds = f.font.textBounds(this.letter, letterPos.x, letterPos.y, this.size)
    const ctx = this.pg.drawingContext
    const radialGradient = ctx.createRadialGradient(
      textBounds.x + textBounds.w * .5, textBounds.y + textBounds.h * .5, 0.1,
      textBounds.x + textBounds.w * .5, textBounds.y + textBounds.h * .5, textBounds.w * 2,
    )
    
    radialGradient.addColorStop(0, this.pg.color(this.pg.random(0,360), 90, 50))
    radialGradient.addColorStop(.33, this.pg.color(this.pg.random(0,360), 90, 50))
    radialGradient.addColorStop(.66, this.pg.color(this.pg.random(0,360), 90, 50))
    radialGradient.addColorStop(1, this.pg.color(this.pg.random(0,360), 90, 50))
    
    this.pg.noStroke()
    this.pg.fill('transparent')
    ctx.fillStyle = radialGradient
    this.pg.blendMode(blendMode)
    this.pg.text(this.letter, letterPos.x, letterPos.y, this.size);
  }

  drawFilmGradients() {
    const gradients = 5
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
        gradient.addColorStop(stopVal, this.pg.color(0, 0, this.pg.random(40, 75), this.pg.random(1, 5)))
      }
      this.pg.fill('transparent')
      ctx.fillStyle = gradient
      this.pg.rect(0, 0, this.pg.width, this.pg.height)
    }
  }

  drawNoise() {
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
