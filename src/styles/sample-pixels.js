// Laurent Houdard
// Twitter: @CablesAndPixels
// Fxhash: https://www.fxhash.xyz/u/Laurent%20Houdard

import { addLetterStyle, LetterStyle } from '../letterstyle';
import {
  RND,
  pick,
  probability,
} from '@thi.ng/random-fxhash';

addLetterStyle(class SamplePixels extends LetterStyle {

  static author = 'Laurent Houdard';
  static name = 'SamplePixels';

  setup() {
    this._inverted = probability(0.5);
    this._bg = this._inverted ? 0 : 1;
    this._pixels = this.letterPixels();
    for (const p of this._pixels) {
      p.shape = pick(['circle', 'square']);
      p.color = RND.minmax(0, 0.2);
      if (!p.value) { p.color = 1 - p.color; }
      if (this._inverted) { p.color = 1 - p.color; }
    }
  }

  draw() {
    this.pg.strokeWeight(0);
    this.pg.fill(this._bg * 255);
    this.pg.rect(0, 0, this.size);

    const step = Math.ceil(this.size / 9);
    for (let {x, y, color, shape} of this._pixels) {
      if (shape === 'square') {
        this.pg.fill(color * 255);
        this.pg.rect(x * step, y * step, step);
      }
      else {
        this.pg.fill(color * 255);
        for (let [ox, oy] of [[0.25, 0.25], [0.25, 0.75],
                              [0.75, 0.25], [0.75, 0.75]]) {
          this.pg.circle((x + ox) * step, (y + oy) * step, step / 2);
        }
      }
    }

    this.pg.loadPixels();
    const ds = this.pg.pixelDensity() * this.size;
    for (let x = 0; x < ds; x += 1) {
      for (let y = 0; y < ds; y += 1) {
        const i = 4 * (x + y * ds);
        const noise = this.pg.noise(x / 50, y) - 0.5;
        for (let n = 0; n < 3; n += 1) {
          this.pg.pixels[i + n] += noise * 32;
        }
      }
    }
    this.pg.updatePixels();
  }

});
