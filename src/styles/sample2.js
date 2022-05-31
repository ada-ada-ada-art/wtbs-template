// Laurent Houdard
// Twitter: @CablesAndPixels
// Fxhash: https://www.fxhash.xyz/u/Laurent%20Houdard

import { addLetterStyle, LetterStyle } from '../letterstyle';
import {
  RND,
  pick,
  probability,
} from '@thi.ng/random-fxhash';

addLetterStyle(class Sample2 extends LetterStyle {

  static author = 'Laurent Houdard';
  static name = 'Sample #2';

  setup() {
    this._inverted = probability(0.5);
    this._img = this.letterImage();
    if (this._inverted) {
      this._img.filter(this.pg.INVERT);
    }
    this._gridSize = pick([30, 40, 50, 60]);
    this._grid = [];
    const noiseOffset = {
      u: RND.minmax(0, 10),
      v: RND.minmax(0, 10)
    };
    for (let u = 0; u < this._gridSize; u += 1) {
      for (let v = 0; v < this._gridSize; v += 1) {
        const noise = this.pg.noise(u / 10 + noiseOffset.u,
                                    v / 10 + noiseOffset.v);
        this._grid.push({u, v, noise});
      }
    }
  }

  draw() {
    this.pg.strokeWeight(0);
    this.pg.fill(this._inverted ? 0 : 255);
    this.pg.rect(0, 0, this.size);
    this.pg.image(this._img, 0, 0, this.size, this.size);
    this.pg.loadPixels();

    this.pg.strokeWeight(0.5);
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
