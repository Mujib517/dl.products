//credit card
//Trust issue
function addAsync(a, b) {

  var prms = new Promise(function (resolve, rejct) {
    var c = a + b;
    rejct("Validation failed");
  });

  return prms;
}

var prms = addAsync(10, 20);
prms.then(function (res) {
  console.log(res);
})
  .catch(function (err) {
    console.log(err);
  });