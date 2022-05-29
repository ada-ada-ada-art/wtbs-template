/* global fxhash, fxpreview */

import p5 from 'p5';
import debounce from 'lodash.debounce';
import {
  RND,
  pick,
  // probability,
  // pickKey,
  // weighted,
  // weightedKey,
  seedFromHash,
} from '@thi.ng/random-fxhash';

import { styleClasses } from './letterstyle';

import './styles/sample1';
import './styles/sample2';

const seed = seedFromHash(fxhash);
RND.seed(seed);

const letterStyle = {};
window.$fxhashFeatures = {};

const WTBS = ['W', 'T', 'B', 'S'];

for (let letter of WTBS) {
  const s = pick(styleClasses);
  letterStyle[letter] = s;
  window.$fxhashFeatures[letter] = `${s.name} by ${s.author}`;
}

console.table({
  fxhash,
  ...window.$fxhashFeatures,
});

new p5((p5) => {
  const letters = {};
  let fxpreviewDone = false;
  let s;

  const setupSize = () => {
    s = Math.min(p5.windowWidth, p5.windowHeight);
    if (s % 2 !== 0) { s -= 1; }
  }

  p5.setup = () => {
    setupSize();
    p5.noLoop();
    p5.randomSeed(seed[0]);
    p5.noiseSeed(seed[1]);
    p5.pixelDensity(1);
    p5.createCanvas(s, s);
    for (let letter of WTBS) {
      const pg = p5.createGraphics(s/2, s/2);
      letters[letter] = new letterStyle[letter](pg, s/2, letter);
      letters[letter].setup();
    }
  };

  p5.draw = () => {
    p5.background(0);
    for (let letter of WTBS) {
      letters[letter].draw();
    }
    p5.image(letters['W'].pg, 0, 0, s/2, s/2);
    p5.image(letters['T'].pg, s/2, 0, s/2, s/2);
    p5.image(letters['B'].pg, 0, s/2, s/2, s/2);
    p5.image(letters['S'].pg, s/2, s/2, s/2, s/2);

    if (!fxpreviewDone) {
      fxpreview();
      fxpreviewDone = true;
    }
  };

  p5.windowResized = debounce(() => {
    setupSize();
    p5.resizeCanvas(s, s);
    for (let letter of WTBS) {
      letters[letter].resize(s);
    }
  }, 50);

}, window.document.body);
