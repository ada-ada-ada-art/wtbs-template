// Laurent Houdard
// Twitter: @CablesAndPixels
// Fxhash: https://www.fxhash.xyz/u/Laurent%20Houdard

import { addLetterStyle, LetterStyle } from '../letterstyle';

addLetterStyle(class SampleImage extends LetterStyle {

  static author = 'Laurent Houdard';
  static name = 'SampleImage';

  setup() {
    console.log(this.letter, this.RND.buffer[0]);
    this._inverted = this.probability(0.5);
    this._gridSize = this.pick([30, 40, 50, 60]);
    this._grid = [];
    for (let u = 0; u < this._gridSize; u += 1) {
      for (let v = 0; v < this._gridSize; v += 1) {
        const noise = this.pg.noise(u / 10, v / 10);
        this._grid.push({u, v, noise});
      }
    }
  }

  draw() {
    this.pg.strokeWeight(0);
    this.pg.fill(this._inverted ? 0 : 255);
    this.pg.rect(0, 0, this.size);
    this.pg.fill(this._inverted ? 255 : 0);
    this.drawLetter();
    this.pg.loadPixels();

    this.pg.strokeWeight(this.size / 800);
    const ds = this.size * this.pg.pixelDensity();
    const len = this.size / this._gridSize;
    for (let {u, v, noise} of this._grid) {
      const x = Math.round(u / this._gridSize * ds);
      const y = Math.round(v / this._gridSize * ds);
      const i = 4 * (x + y * ds);
      const inside = (this._inverted && this.pg.pixels[i] > 127) ||
                     (!this._inverted && this.pg.pixels[i] <= 127);
      let p = 255 - this.pg.pixels[i];
      let a = (noise - 0.5) * Math.PI;
      if (inside) { a /= 3; }
      const x2 = x + 2 * len * Math.cos(a);
      const y2 = y + 2 * len * Math.sin(a);
      this.pg.stroke(p);
      this.pg.line(x - len, y, x2 - len, y2);
    }
  }

});
