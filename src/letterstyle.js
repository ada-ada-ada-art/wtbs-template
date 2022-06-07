import {
  RND,
  pick,
  pickKey,
  probability,
  weightedKey,
} from '@thi.ng/random-fxhash';
// See https://docs.thi.ng/umbrella/random-fxhash/

export class LetterStyle {
  static author = '';
  static name = '';
  static svgLetters = [];

  constructor(pg, size, letter, fonts, seed) {
    this.pg = pg;
    this.size = size;
    this.letter = letter;
    this.fonts = fonts;
    this.seed = seed;
    this.RND = RND;
  }

  setup() {}

  draw() {}

  drawLetter(fontName = null, renderer = null) {
    if (fontName === null) {
      fontName = Object.keys(this.fonts)[0];
    }
    if (renderer === null) {
      renderer = this.pg;
    }
    const f = this.fonts[fontName];
    renderer.textFont(f.font);
    renderer.textSize(this.size * f.sizeFactor);
    renderer.textAlign(this.pg.CENTER, this.pg.CENTER);
    renderer.text(this.letter, 0, this.size * f.posFactor, this.size);
  }

  resize(size) {
    this.size = size;
    this.pg.resizeCanvas(this.size, this.size);
  }

  reseed() {
    this.RND.seed(this.seed);
    this.pg.randomSeed(this.seed[0]);
    this.pg.noiseSeed(this.seed[0]);
  }

  pick(a) {
    return pick(a);
  }

  pickKey(o) {
    return pickKey(o);
  }

  probability(x) {
    return probability(x);
  }

  weightedKey(o) {
    return weightedKey(o);
  }

  letterPixels() {
    const pixelData = LetterStyle.pixelData[this.letter];
    const pixels = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        pixels.push({
          x: i,
          y: j,
          value: (pixelData[j] >>> (8 - i)) & 1
        });
      }
    }
    return pixels;
  }

  createGraphics(w, h, renderer = this.pg.P2D) {
    return this.pg._pInst.createGraphics(w, h, renderer);
  }

  static pixelData = {
    W: [
      0b000000000,
      0b000000000,
      0b001000100,
      0b001000100,
      0b001010100,
      0b001010100,
      0b000101000,
      0b000000000,
      0b000000000,
    ],
    T: [
      0b000000000,
      0b000000000,
      0b001111100,
      0b000010000,
      0b000010000,
      0b000010000,
      0b000010000,
      0b000000000,
      0b000000000,
    ],
    B: [
      0b000000000,
      0b000000000,
      0b001111000,
      0b001000100,
      0b001111000,
      0b001000100,
      0b001111000,
      0b000000000,
      0b000000000,
    ],
    S: [
      0b000000000,
      0b000000000,
      0b000111100,
      0b001000000,
      0b000111000,
      0b000000100,
      0b001111000,
      0b000000000,
      0b000000000,
    ],
  }

}

export function addLetterStyle(styleClass) {
  styleClasses.push(styleClass);
}

export const styleClasses = [];
