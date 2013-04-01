var getData = function (module, success) {
  var body = {"text": "This is a test"};
  success(body);

};

var editorsPicksFetcher = {
  fetch: getData
};

module.exports.editorsPicksFetcher = editorsPicksFetcher;