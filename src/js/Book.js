export class Book {
  #id;

  constructor(title, autor, img, plot) {
    this.#id = Date.now();
    this.title = title;
    this.autor = autor;
    this.img = img;
    this.plot = plot;
  }

  get id() {
    return this.#id;
  }
}
