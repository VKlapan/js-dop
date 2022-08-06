export class Book {
  constructor(title, author, img, plot) {
    this.id = Date.now().toString();
    this.title = title;
    this.author = author;
    this.img = img;
    this.plot = plot;
  }
}
