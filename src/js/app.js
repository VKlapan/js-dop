import { booksDB } from "./books.js";
import { Book } from "./Book.js";

const rootEl = document.querySelector("#root");
const leftDivEl = document.createElement("div");
const rightDivEl = document.createElement("div");

rootEl.append(leftDivEl, rightDivEl);

leftDivEl.classList.add("div--left");
rightDivEl.classList.add("div--right");

const titleEl = document.createElement("h1");
titleEl.textContent = "Library";
titleEl.classList.add("title--left");

leftDivEl.append(titleEl);

const listBooksEl = document.createElement("ul");
const btnAddBookEl = document.createElement("button");

listBooksEl.classList.add("books-list");
btnAddBookEl.textContent = "ADD";

leftDivEl.append(listBooksEl, btnAddBookEl);

if (JSON.parse(localStorage.getItem("books")) === null) {
  localStorage.setItem("books", JSON.stringify(booksDB));
}

let booksArr = [];

const getBooks = () => {
  booksArr = JSON.parse(localStorage.getItem("books"));
};

const postRightBlock = (markup) => {
  rightDivEl.innerHTML = "";
  rightDivEl.insertAdjacentHTML("afterbegin", markup);
  console.log("posr right block");
};

const showPreviewOnClick = (event) => {
  if (event.target.nodeName != "P") {
    return;
  }

  const currentObject = booksArr.find(
    (book) => book.id === event.target.parentNode.id
  );

  const markup = renderBookPreviewMarkup(currentObject);

  postRightBlock(markup);
};

const saveBook = () => {
  const id = document.querySelector(".form-add-edit-book").dataset.bookid;
  const title = document.querySelector("input[name=title]").value;
  const author = document.querySelector("input[name=author]").value;
  const img = document.querySelector("input[name=img]").value;
  const plot = document.querySelector("input[name=plot]").value;
  console.log("id", id);

  if (id != " ") {
    booksArr[id].title = title;
    booksArr[id].author = author;
    booksArr[id].img = img;
    booksArr[id].plot = plot;

    const markup = renderBookPreviewMarkup(booksArr[id]);
    postRightBlock(markup);
  } else {
    const newBook = new Book(title, author, img, plot);
    console.log(newBook);

    booksArr.push(newBook);

    const markup = renderBookPreviewMarkup(newBook);

    postRightBlock(markup);
  }

  localStorage.setItem("books", JSON.stringify(booksArr));

  renderBooksListMarkup();
};

const bookEditOnClick = (event) => {
  const markup = renderFormAddEditBook();
  console.log(markup);
  postRightBlock(markup);

  console.log(event.target.parentNode.id);

  const currentObject = booksArr.find(
    (book) => book.id === event.target.parentNode.id
  );
  document.querySelector(".form-add-edit-book").dataset.bookid =
    booksArr.indexOf(currentObject);
  document.querySelector("input[name=title]").value = currentObject.title;
  document.querySelector("input[name=author]").value = currentObject.author;
  document.querySelector("input[name=img]").value = currentObject.img;
  document.querySelector("input[name=plot]").value = currentObject.plot;

  const btnSubmitEl = document.querySelector(".button--save");
  console.log(btnSubmitEl);
  console.log("EDIT");

  btnSubmitEl.addEventListener("click", saveBook);
};

const bookDeleteOnClick = (event) => {
  const booksArrAfterDelete = booksArr.filter(
    (book) => book.id != event.target.parentNode.id
  );
  localStorage.setItem("books", JSON.stringify(booksArrAfterDelete));

  if (document.querySelector("[data-previewid]") != null) {
    const previewId =
      document.querySelector("[data-previewid]").dataset.previewid;
    if (event.target.parentNode.id === previewId) {
      rightDivEl.innerHTML = "";
    }
  }

  renderBooksListMarkup();

  console.log("DELETE");
};

const addBookOnClick = () => {
  const markup = renderFormAddEditBook();
  postRightBlock(markup);

  const btnSubmitEl = document.querySelector(".button--save");
  btnSubmitEl.addEventListener("click", saveBook);
};

btnAddBookEl.addEventListener("click", addBookOnClick);

const renderBooksListMarkup = () => {
  getBooks();

  console.log(booksArr);

  const itemsBooksEl = booksArr
    .map(({ title, id }) => {
      return `<li id=${id} class="list__item"><p class="list__title">${title}</p><button class="button--edit" type="button">EDIT</button><button class="button--delete" type="button">DELETE</button></li>`;
    })
    .join("");

  listBooksEl.innerHTML = "";
  listBooksEl.insertAdjacentHTML("afterbegin", itemsBooksEl);

  const bookNameEl = document.querySelectorAll(".list__title");
  bookNameEl.forEach(() => addEventListener("click", showPreviewOnClick));

  const btnBookEditEl = document.querySelectorAll(".button--edit");
  btnBookEditEl.forEach((item) =>
    item.addEventListener("click", bookEditOnClick)
  );

  const btnBookDeleteEl = document.querySelectorAll(".button--delete");
  btnBookDeleteEl.forEach((item) =>
    item.addEventListener("click", bookDeleteOnClick)
  );
};

const renderBookPreviewMarkup = ({ id, title, author, img, plot }) => {
  const itemBookEl = `
  <div data-previewid='${id}'>
    <h2>${title}</h2>
    <p>${author}</p>
    <img src="${img}" alt="">
    <p>${plot}</p>
  </div>
      `;

  return itemBookEl;
};

const renderFormAddEditBook = () => {
  const formMarkup = `
<form class='form-add-edit-book' data-bookid = ' '>
  <label class='form__label'> Title
  <input type='text' name='title' /> 
  </label>
  <label class='form__label'> Author
  <input type='text' name='author' /> 
  </label>
  <label class='form__label'> Image
  <input type='text' name='img' /> 
  </label>
  <label class='form__label'> Plot
  <input type='text' name='plot' /> 
  </label>
  <button type='button' class='button--save'>Save</button>
  </form>      `;

  return formMarkup;
};

renderBooksListMarkup();
