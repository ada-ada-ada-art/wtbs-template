// <name>
// Twitter: @<twitter>
// Fxhash: https://www.fxhash.xyz/u/<fxhash>

import { addLetterStyle, LetterStyle } from '../letterstyle';

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
    // All randomness should be initialized here

    // Get letter image (see style-image)
    this._img = this.letterImage();

    // ...or pixels (see style-pixels)
    this._pixels = this.letterPixels();
    for (const p of this._pixels) {
      // ...
    }
  }

  draw() {
    // this.pg = p5.Renderer context
    // this.size = current letter size (1/2 total size)
    // ...

    // Checklist:
    // - Same fxhash produces same outpout (You can set ?fxhash=... in URL)
    // - Same output when resizing browser window (draw() will be
    //   automatically called on resize, nothing to code here for this)
  }

});
