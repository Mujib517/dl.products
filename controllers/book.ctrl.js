var books = [{ id: 1, name: "Speaking JS", price: 100, inStock: false },
{ id: 2, name: "Eloquent JS", price: 150, inStock: false },
{ id: 3, name: "HeadFirst JS", price: 100, inStock: false }];


class BookCtrl {

  //Rest api, websvc, svc, Rest svc, api
  get(req, res) {
    //conventions
    //status codes
    //successful, successfully done,

    //1xx 
    //2xx -- Success  200,201,204, 
    //3xx -- Redirects 301,302
    //4xx -- Client error  404, 401, 400
    //5xx -- Server error  500,501,502

    res.status(200); //OK
    res.json(books);
  }

  save(req, res) {
    console.log(req.body);
    
    res.status(201); //Created
    res.send("Success");
  }

  authors(req, res) {
    res.send("List of authors");
  }
}

module.exports = new BookCtrl();