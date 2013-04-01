URL = "http://api.newscred.com/articles?access_key=8ca80eb94abfb3b4bf7794b43a3aea64&format=json";
FIELDS = "&fields=article.source.name+article.source.website+article.source.guid+article.source.thumbnail+article.title+article.created_at+article.published_at+article.description+article.category.name+article.category.dashed_name+article.link+article.source_guid+article.source_website+article.thumbnail.link+article.thumbnail.original_image+article.image.guid+article.image.caption+article.image.description+article.image.width+article.image.height+article.image.published_at+article.image.source.name+article.image.source.guid+article.image.source.website+article.image.urls.large+article.guid+article.tracking_pixel+article.author.name+article.author.guid+article.author.first_name+article.author.last_name";
FILTERS = "&topic_filter_mode=whitelist&source_filter_mode=whitelist&article_filter_mode=blacklist&article_filter_name=Deleted+Articles+on+CMS";
KEY_VALUE_PARAMS = ["query", "sort", "source_filter_name", "pagesize", "topic_filter_name"];
BOOLEAN_PARAMS = ["has_images", "fulltext"];
BOOL_MAP = {1: "True", 0: "False"};

var request = require('request');


function articleListQueryBuilder (module) {
  var query = URL;
  for (var prop in module) {
    if (_.indexOf(KEY_VALUE_PARAMS, prop) >= 0) {
      if (module[prop] != null) {
        query = query + '&' + prop + '=' + module[prop];
      }
    }
    else if (_.indexOf(BOOLEAN_PARAMS, prop) >= 0) {
      query = query + '&' + prop + '=' + BOOL_MAP[module[prop]];
    }
  }
  query = query + FILTERS;
  query = query + FIELDS;

  return query;
}

var getData = function(module, success) {
  var url = articleListQueryBuilder(module);
  request(url, function (err, res, body) {
    if(err) throw err;
    success(body);
  })
};

var articleListFetcher = {
  fetch: getData
};

module.exports.articleListFetcher = articleListFetcher;

var dataFetcher = require('./DataFetcher');
dataFetche