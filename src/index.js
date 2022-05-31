/* global fxhash, fxpreview */

import p5 from 'p5';
import {
  pick,
  seedFromHash,
} from '@thi.ng/random-fxhash';
import debounce from 'lodash.debounce';

import { LetterStyle, styleClasses } from './letterstyle';

import './styles/sample1';
import './styles/sample2';

const pickedStyle = {};
window.$fxhashFeatures = {};

const WTBS = ['W', 'T', 'B', 'S'];

for (let letter of WTBS) {
  const s = pick(styleClasses);
  pickedStyle[letter] = s;
  window.$fxhashFeatures[letter] = `${s.name} by ${s.author}`;
}

console.table({
  fxhash,
  ...window.$fxhashFeatures,
});

new p5((p5) => {
  const letters = {};
  const svgLetters = {};
  let fxpreviewDone = false;
  let s;

  const setupSize = () => {
    s = Math.min(p5.windowWidth, p5.windowHeight);
    if (s % 2 !== 0) { s -= 1; }
  }

  p5.preload = () => {
    for (let letter of WTBS) {
      const lc = letter.toLowerCase();
      svgLetters[letter] = p5.loadImage(`./images/${lc}.svg`);
    }
    LetterStyle.svgLetters = svgLetters;
  };

  p5.setup = () => {
    const seed = seedFromHash(fxhash);
    setupSize();
    p5.noLoop();
    p5.randomSeed(seed[0]);
    p5.noiseSeed(seed[1]);
    p5.pixelDensity(1);
    p5.createCanvas(s, s);
    for (let letter of WTBS) {
      const pg = p5.createGraphics(s/2, s/2);
      letters[letter] = new pickedStyle[letter](pg, s/2, letter);
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
    for (let letter of WTBS) {
      letters[letter].resize(s/2);
    }
    p5.resizeCanvas(s, s);
  }, 50);

}, window.document.body);
