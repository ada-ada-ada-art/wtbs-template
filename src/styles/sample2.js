// Laurent Houdard
// Twitter: @CablesAndPixels
// Fxhash: https://www.fxhash.xyz/u/Laurent%20Houdard

import {
  // RND,
  pick,
  // probability,
  // pickKey,
  // weighted,
  // weightedKey,
} from '@thi.ng/random-fxhash';
import { addLetterStyle, LetterStyle } from '../letterstyle';

addLetterStyle(class Sample2 extends LetterStyle {

  static author = 'Laurent Houdard';
  static name = 'Sample #2';

  static backgrounds = ['#f00', '#0f0', '#00f'];

  setup() {
    this.background = pick(Sample2.backgrounds);
  }

  draw() {
    this.pg.fill(this.background);
    this.pg.strokeWeight(0);
    this.pg.rect(0, 0, this.size, this.size);
  }

});
