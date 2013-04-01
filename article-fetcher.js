var getData = function (module, success) {
  var body = {"text": "This is a test article fetcher"};
  success(body);

};

var articleFetcher = {
  fetch: getData
};

module.exports.articleFetcher = articleFetcher;