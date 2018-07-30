//credit card
//Trust issue
function addAsync(a, b) {

  var prms = new Promise(function (resolve, rejct) {
    var c = a + b;
    rejct("Validation failed");
  });

  return prms;
}

// addAsync(10, 20)
//   .then(function (res) {
//     console.log(res);
//      new Promise()
     
//      return book.find().exec();
//   })
//   .then()

//   .catch(function (err) {
//     console.log(err);
//   });