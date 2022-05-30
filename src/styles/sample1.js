// Laurent Houdard
// Twitter: @CablesAndPixels
// Fxhash: https://www.fxhash.xyz/u/Laurent%20Houdard

import { addLetterStyle, LetterStyle } from '../letterstyle';

addLetterStyle(class Sample1 extends LetterStyle {

  static author = 'Laurent Houdard';
  static name = 'Sample #1';

  setup() {
  }

  draw() {
    const bg = '#fff';
    const fg = '#000';

    this.pg.strokeWeight(1);
    this.pg.fill(bg);
    this.pg.stroke(bg);
    this.pg.rect(0, 0, this.size);

    this.pg.fill(fg);
    this.pg.stroke(fg);
    const step = Math.round(this.size / 9);
    for (let {x, y, value} of this.letterPixels()) {
      if (value) {
        this.pg.rect(x * step, y * step, step);
      }
    }
  }

});
