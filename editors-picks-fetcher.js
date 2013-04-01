var getData = function (module, success) {
  var body = {"text": "This is a test"};

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qweqwe',
    database: 'cms'
  });

  connection.connect();
  var sql = 'select a.title, a.description, a.guid, a.category from articles as a, modules_modulearticleassociation as m where m.article_id = a.id and m.module_id=' + connection.escape(module.id);
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;

    var articles = [];
    rows.forEach(function(row) {
      var article = {};
      article.title = row.title;
      article.description = row.description;
      article.guid = row.guid;
      article.category = row.category;

      articles.push(article);
    });

    var result = {"article_set": articles};
    success(result);
  });

  connection.end();

};

var editorsPicksFetcher = {
  fetch: getData
};

module.exports.editorsPicksFetcher = editorsPicksFetcher;