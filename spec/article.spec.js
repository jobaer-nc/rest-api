var request = require('request');

describe('NewsCred CMS API: Articles', function () {
  it('should return a list of Articles for /articles', function (done) {
    request('http://localhost:3000/articles', function (err, res, body) {
      var data = JSON.parse(body);
      expect(data.articles).toBeDefined();
      expect(data.articles.length).toBeGreaterThan(0);
      done();
    })
  });

  it('should create a new article for POST /articles', function (done) {
    request.post({
        headers: {'content-type': 'application/json'},
        url: 'http://localhost:3000/articles',
        body: JSON.stringify(new_article, null, 2)
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(201);
        //todo request the article again and check if it contains the data
        done();
      }
    );
  });

  it('should return a single article for /article/guid', function (done) {
    request('http://localhost:3000/article/guid', function (err, res, body) {
      var article = JSON.parse(body);
      expect(article).toBeDefined();
      expect(article.id).toBe(1);
      done();
    })
  });

  it('should update a article for PUT /article/guid', function (done) {
    request.put({
        headers: {'content-type': 'application/json'},
        url: 'http://localhost:3000/article/1',
        body: JSON.stringify(article1, null, 2)
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it('should delete a article for DELETE /article/guid', function (done) {
    request.del({
        url: 'http://localhost:3000/article/guid'
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        //todo request the article again and check if it return 404
        done();
      }
    );
  });
});
