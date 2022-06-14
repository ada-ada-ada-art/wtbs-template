/* global fxhash, fxpreview */

import p5 from 'p5';
import { RND, pick } from '@thi.ng/random-fxhash';
import debounce from 'lodash.debounce';

import { styleClasses } from './letterstyle';

import './styles/sample-pixels';
import './styles/sample-image';
import './styles/ada-ada-ada';

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

  const restoreDefaults = () => {
    p5.colorMode(p5.RGB);
    p5.ellipseMode(p5.CENTER);
    p5.rectMode(p5.CORNER);
    p5.blendMode(p5.BLEND);
    p5.imageMode(p5.CORNER);
    p5.angleMode(p5.RADIANS);
    p5.pixelDensity(window.devicePixelRatio);
    p5.strokeWeight(1);
    p5.drawingContext.shadowBlur = 0;
    p5.drawingContext.filter = 'none';
    p5.noiseDetail(4, 0.5);
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
      p5.push();
      restoreDefaults();
      letters[letter].reseed();
      letters[letter].draw();
      p5.pop();
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
