const books = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории персональных компьютеров в целом. В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, сопровождающиеся большим количеством оригинальных студийных фотографий. Книга предназначена для широкого круга читателей, интересующихся историей электроники. Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },

  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, оставаясь в безопасности. Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - объясняются наглядно с помощью иллюстраций и схем.`,
  },

  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными знаниями будете в течение всей карьеры. Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, какими инструментами ему нужно пользоваться.`,
  },
];

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

const showPreviewOnClick = (event) => {
  if (event.target.nodeName != "P") {
    return;
  }

  const currentOblect = books.find(
    (book) => book.title === event.target.textContent
  );
  rightDivEl.innerHTML = "";
  rightDivEl.insertAdjacentHTML(
    "afterbegin",
    renderBookPreviewMarkup(currentOblect)
  );
};

const bookEditOnClick = () => {
  console.log("EDIT");
};

const bookDeleteOnClick = () => {
  console.log("DELETE");
};

const addBookOnClick = () => {
  console.log("ADD");
};

btnAddBookEl.addEventListener("click", addBookOnClick);

const renderBooksListMarkup = () => {
  const itemsBooksEl = books
    .map(({ title, id }) => {
      return `<li id=${id} class="list__item"><p class="list__title">${title}</p><button class="button--edit" type="button">EDIT</button><button class="button--delete" type="button">DELETE</button></li>`;
    })
    .join("");

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

renderBooksListMarkup();
