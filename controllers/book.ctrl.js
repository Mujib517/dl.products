class BookCtrl {

  get(req, res) {
    var books = [{ id: 1, name: "Speaking JS", price: 100, inStock: false },
    { id: 2, name: "Eloquent JS", price: 150, inStock: false },
    { id: 3, name: "HeadFirst JS", price: 100, inStock: false }];

    res.json(books);
  }


  authors(req, res) {
    res.send("List of authors");
  }
}

module.exports = new BookCtrl();