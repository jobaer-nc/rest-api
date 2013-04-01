var modules = function(app) {
  app.get('/test', function (req, res) {
    res.send({"Title": "This is a test"});
  });
}
//var test = function () {
//   console.log("printing from a different file ....");
////  app.get('/test', function (req, res) {
////    res.send({"Title":"This is a test"});
////  });
//};

module.exports = test;

