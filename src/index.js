/* global fxhash, fxpreview */

import p5 from 'p5';
import { RND, pick } from '@thi.ng/random-fxhash';
import debounce from 'lodash.debounce';

import { styleClasses } from './letterstyle';

import './styles/sample-pixels';
import './styles/sample-image';

const pickedStyle = {};
window.$fxhashFeatures = {};

const WTBS = ['W', 'T', 'B', 'S'];

for (let letter of WTBS) {
  const s = pick(styleClasses);
  pickedStyle[letter] = s;
  window.$fxhashFeatures[letter] = `${s.name} by ${s.author}`;
}

console.info('Waiting To Be Signed Collaborative Logo');
console.info(fxhash);
for (let [k, v] of Object.entries(window.$fxhashFeatures)) {
  console.info(`${k}: ${v}`);
}

new p5((p5) => {
  const letters = {};
  const fonts = {};
  let fxpreviewDone = false;
  let s;

  const setupSize = () => {
    s = Math.min(p5.windowWidth, p5.windowHeight);
    if (s % 2 !== 0) { s -= 1; }
  }

  p5.preload = () => {
    fonts.dejaVu = {
      font: p5.loadFont('./fonts/DejaVuSansMono-Bold-subset.ttf'),
      sizeFactor: 0.85,
      posFactor: 0.42,
    };
  };

  p5.setup = () => {
    setupSize();
    p5.noLoop();
    p5.pixelDensity(1);
    p5.createCanvas(s, s);
    for (let i = 0; i < 4; i += 1) {
      const letter = WTBS[i];
      const pg = p5.createGraphics(s/2, s/2);
      const xseed = [RND.int(), RND.int(), RND.int(), RND.int()];
      letters[letter] = new pickedStyle[letter](pg, s/2, letter, fonts, xseed);
      letters[letter].reseed();
      letters[letter].setup();
    }
  };

  p5.draw = () => {
    p5.background(0);
    for (let letter of WTBS) {
      letters[letter].reseed();
      letters[letter].draw();
    }
    for (const [l, x, y] of [
      ['W', 0, 0],
      ['T', s/2, 0],
      ['B', 0, s/2],
      ['S', s/2, s/2],
    ]) {
      p5.image(letters[l].pg, x, y, s/2, s/2);
    }

    if (!fxpreviewDone) {
      fxpreview();
      fxpreviewDone = true;
    }
  };

  p5.windowResized = debounce(() => {
    setupSize();
    for (let letter of WTBS) {
      letters[letter].resize(s/2);
    }
    p5.resizeCanvas(s, s);
  }, 50);

}, window.document.body);
