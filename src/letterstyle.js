export class LetterStyle {
  static author = '';
  static name = '';

  constructor(pg, size, letter) {
    this.pg = pg;
    this.size = size;
    this.letter = letter;
  }

  resize(size) {
    this.size = size;
    this.pg.resizeCanvas(this.size, this.size);
  }

  setup() {
  }

  draw() {
  }
}

export function addLetterStyle(styleClass) {
  styleClasses.push(styleClass);
}

export const styleClasses = [];
