// <name>
// Twitter: @<twitter>
// Fxhash: https://www.fxhash.xyz/u/<fxhash>

import { addLetterStyle, LetterStyle } from '../letterstyle';

// To make a new style, copy this template in a new file and import it
// at the begining of ../index.js

// random-fxhash helpers
// (see https://www.npmjs.com/package/@thi.ng/random-fxhash)
import {
  RND,
  pick,
  weighted,
  probability,
} from '@thi.ng/random-fxhash';

addLetterStyle(class StyleName extends LetterStyle {

  static author = '<name>';
  static name = 'StyleName';

  setup() {
    // All randomness should be initialized here.
    // You can use either P5 this.pg.random(...), or random-fxhash
    // helpers

    // Get letter image (see style-image)
    this._img = this.letterImage();

    // ...or pixels (see style-pixels)
    // this._pixels = this.letterPixels();
    // for (const p of this._pixels) {
    //   ...
    // }
  }

  draw() {
    // this.pg = p5.Renderer context
    // this.size = current letter size (1/2 total size)
    // ...
    this.pg.strokeWeight(0);
    this.pg.fill(255);
    this.pg.rect(0, 0, this.size);
    this.pg.image(this._img, 0, 0, this.size, this.size);
  }

});
