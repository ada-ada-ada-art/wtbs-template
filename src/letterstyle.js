export class LetterStyle {
  static author = '';
  static name = '';
  static svgLetters = [];

  constructor(pg, size, letter) {
    this.pg = pg;
    this.size = size;
    this.letter = letter;
  }

  setup() {}

  draw() {}

  resize(size) {
    this.size = size;
    this.pg.resizeCanvas(this.size, this.size);
  }

  letterImage() {
    return LetterStyle.svgLetters[this.letter];
  }

  *letterPixels() {
    const pxl = LetterStyle.pixelData[this.letter];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        yield {x: i, y: j, value: (pxl[j] >>> (8 - i)) & 1};
      }
    }
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
