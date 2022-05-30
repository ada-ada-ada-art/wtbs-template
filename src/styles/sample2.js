// Laurent Houdard
// Twitter: @CablesAndPixels
// Fxhash: https://www.fxhash.xyz/u/Laurent%20Houdard

import {
  // RND,
  // pick,
  // probability,
  // pickKey,
  // weighted,
  // weightedKey,
} from '@thi.ng/random-fxhash';

import { addLetterStyle, LetterStyle } from '../letterstyle';

addLetterStyle(class Sample2 extends LetterStyle {

  static author = 'Laurent Houdard';
  static name = 'Sample #2';

  setup() {
  }

  draw() {
    const bg = '#fff';

    this.pg.strokeWeight(1);
    this.pg.fill(bg);
    this.pg.stroke(bg);
    this.pg.rect(0, 0, this.size);

    this.pg.image(this.letterImage(), 0, 0, this.size, this.size);
  }

});
