/* REFERENCES */

// Przygotuj referencję do szablonu oraz listy .books-list.

const bookTemplate = Handlebars.compile(
  document.querySelector("#template-book").innerHTML
);
const booksList = document.querySelector(".books-list");

/* FUNCTIONS */

/* Adding Products */

// Dodaj nową funkcję render.
function render() {
  // Wewnątrz niej przejdź po każdym elemencie z dataSource.books. Pamiętaj, że plik script.js ma do tego obiektu bezpośredni dostęp.
  for (let eachBookdata of dataSource.books) {
    // Wewnątrz tej pętli zadbaj o wygenerowanie kodu HTML na podstawie szablonu oraz danych o konkretnej książce.
    const generatedHTML = bookTemplate(eachBookdata);
    // Na postawie tego kodu HTML wygeneruj element DOM.
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    // Wygenerowany element DOM dołącz jako nowe dziecko DOM do listy .books-list.
    booksList.appendChild(generatedDOM);
  }
}

/* Adding products to favorities */

function initActions() {
  //Stwórz referencję do .book__image, klasy favourite
  //const booksImages = booksList.querySelectorAll(".book__image");

  const favoriteBook = "favorite";

  //Stwórz tablicę favoriteBooks z identyfikatorami książek
  const favoriteBooks = [];
  console.log("favoriteBooks", favoriteBooks);

  //Do każdego zdjęcia książek
  // for (let bookImage of booksImages) {
  //   console.log("bookImage", bookImage);
  //Stwórz referencję do Atrybutu}

  //Dodaj nasłuchiwacz
  booksList.addEventListener("dblclick", function (event) {
    event.preventDefault();
    const clickedElementIsBook =
      event.target.offsetParent.classList.contains("book__image");
    console.log("event.target", clickedElementIsBook);

    if (clickedElementIsBook == true) {
      const favoriteBookAtribute =
        event.target.offsetParent.getAttribute("data-id");
      const theBookIndex = favoriteBooks.indexOf(favoriteBookAtribute);
      //Jeśli id znajduje się w tablicy ulubionych książek
      if (!favoriteBooks[theBookIndex]) {
        //Dodaj id książki do tablicy favoriteBooks
        favoriteBooks.push(favoriteBookAtribute);
        //oraz nada mu klasę 'favourite'
        event.target.offsetParent.classList.add(favoriteBook);

        console.log("add " + favoriteBookAtribute + " to favoriteBooks");
      } else {
        favoriteBooks.splice(theBookIndex, 1);
        console.log("remove " + favoriteBookAtribute + " to favoriteBooks");
        event.target.offsetParent.classList.remove(favoriteBook);
      }
    } else {
      console.log("Clicked elemenet is not a book");
    }
  });

  /* FILTERS */

  const filters = [];
  console.log("filters", filters);
  const form = document.querySelector(".filters");

  form.addEventListener("click", function (event) {
    const clickedElement = event.target;

    const tagName = clickedElement.tagName;

    const type = clickedElement.getAttribute("type");

    const name = clickedElement.getAttribute("name");

    const value = clickedElement.getAttribute("value");

    const clickedElementIsCheckbox =
      tagName == "INPUT" && type == "checkbox" && name == "filter";

    if (clickedElementIsCheckbox && clickedElement.checked == true) {
      console.log("Add", value, "to filters");
      filters.push(value);
    } else if (clickedElementIsCheckbox && clickedElement.checked == false) {
      console.log("Remove", value, "from filters");
      const valueIndex = filters.indexOf(value);
      filters.splice(valueIndex, 1);
    }
    filterBooks();
  });

  /* FILTER BOOKS */

  function filterBooks() {
    for (let eachBookdata of dataSource.books) {
      let shouldBeHidden = false;

      for (const option of filters) {
        if (!eachBookdata.details[option] == false) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = booksList.querySelector(
        '.book__image[data-id="' + eachBookdata.id + '"'
      );

      if (shouldBeHidden === true) {
        bookImage.classList.add("hidden");
      } else {
        bookImage.classList.remove("hidden");
      }
    }
  }
}

/*RUN FUNCTIONS */

render();
initActions();
