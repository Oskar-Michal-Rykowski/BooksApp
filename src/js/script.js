class BookList {
  constructor() {
    const thisBookList = this;

    thisBookList.getElements();
    thisBookList.render();

    thisBookList.initActions();
  }

  initData() {
    this.data = dataSource.books;
  }

  getElements() {
    this.booksList = document.querySelector(".books-list");
    this.bookTemplate = Handlebars.compile(
      document.querySelector("#template-book").innerHTML
    );
    this.favoriteBook = "favorite";
    this.filters = [];
  }

  render() {
    for (let eachBookdata of dataSource.books) {
      const ratingBgc = this.determineRatingBgc(eachBookdata.rating);
      const ratingWidth = eachBookdata.rating * 10;
      eachBookdata["ratingBgc"] = ratingBgc;
      eachBookdata["ratingWidth"] = ratingWidth;

      const generatedHTML = this.bookTemplate(eachBookdata);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      this.booksList.appendChild(generatedDOM);
    }
  }

  /* Adding products to favorities */

  initActions() {
    const favoriteBooks = [];
    console.log("favoriteBooks", favoriteBooks);

    this.booksList.addEventListener("dblclick", function (event) {
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
          event.target.offsetParent.classList.add(this.favoriteBook);

          console.log("add " + favoriteBookAtribute + " to favoriteBooks");
        } else {
          favoriteBooks.splice(theBookIndex, 1);
          console.log("remove " + favoriteBookAtribute + " to favoriteBooks");
          event.target.offsetParent.classList.remove(this.favoriteBook);
        }
      } else {
        console.log("Clicked elemenet is not a book");
      }
    });

    /* FILTERS */

    console.log("filters", this.filters);
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
        this.filters.push(value);
      } else if (clickedElementIsCheckbox && clickedElement.checked == false) {
        console.log("Remove", value, "from filters");
        const valueIndex = this.filters.indexOf(value);
        this.filters.splice(valueIndex, 1);
      }
      this.filterBooks();
    });
  }
  /* FILTER BOOKS */

  filterBooks() {
    for (let eachBookdata of dataSource.books) {
      let shouldBeHidden = false;

      for (const option of this.filters) {
        if (!eachBookdata.details[option] == false) {
          shouldBeHidden = true;
          break;
        }
      }

      const bookImage = this.booksList.querySelector(
        '.book__image[data-id="' + eachBookdata.id + '"'
      );

      if (shouldBeHidden === true) {
        bookImage.classList.add("hidden");
      } else {
        bookImage.classList.remove("hidden");
      }
    }
  }

  /* Ratings */

  determineRatingBgc(rating) {
    let ratingBackground = "";

    if (rating < 6) {
      ratingBackground =
        "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)";
    } else if (rating > 6 && rating <= 8) {
      ratingBackground = "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);";
    } else if (rating > 8 && rating <= 9) {
      ratingBackground = "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)";
    } else if (rating > 9) {
      ratingBackground = "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
    }
    return ratingBackground;

    // console.log("ratingBackground", ratingBackground);
  }
}

const app = new BookList();
