var articleListFetcher = require('./article-list-fetcher').articleListFetcher;
var editorPicksFetcher = require('./editors-picks-fetcher').editorsPicksFetcher;
var articleFetcher = require('./article-fetcher').articleFetcher;

function DataFetcher() {

}

DataFetcher.prototype.fetch = function (m, success) {
  var fetcher = this.fetchers[m.module_type];
  return fetcher.fetch(m, success);
};

DataFetcher.prototype.fetchers = {
  "article-list": articleListFetcher,
  "editors-picks": editorPicksFetcher,
  "article": articleFetcher
};

module.exports.dataFetcher = new DataFetcher();