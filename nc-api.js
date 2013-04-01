var articleListFetcher = require('./article-list-fetcher').articleListFetcher;

function DataFetcher() {

}

DataFetcher.prototype.fetch = function (m, success) {
  console.log("module_type = " + m.module_type);
  var fetcher = this.fetchers[m.module_type];
  return fetcher.fetch(m, success);
};

DataFetcher.prototype.fetchers = {
  "article-list": articleListFetcher
};

module.exports.dataFetcher = new DataFetcher();