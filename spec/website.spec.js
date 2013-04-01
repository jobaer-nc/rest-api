var request = require('request');

describe('NewsCred CMS API: websites', function () {
  it('should return a list of websites for /websites', function (done) {
    request('http://localhost:3000/websites', function (err, res, body) {
      var data = JSON.parse(body);
      expect(data.websites).toBeDefined();
      expect(data.websites.length).toBeGreaterThan(0);
      done();
    })
  });

  it('should return a single website for /website/1', function (done) {
    request('http://localhost:3000/website/1', function (err, res, body) {
      var website = JSON.parse(body);
      expect(website).toBeDefined();
      expect(website.id).toBe(1);
      done();
    })
  });

  it('should update a website for PUT /website/1', function (done) {
    request.put({
        headers:{'content-type':'application/json'},
        url:'http://localhost:3000/website/1',
        body:JSON.stringify(website1, null, 2)
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        //todo request the website again and check if it contains the updated data
        done();
      }
    );
  });

  it('should delete a website for DELETE /website/1', function (done) {
    request.del({
        url:'http://localhost:3000/website/99'
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        //todo request the website again and check if it return 404
        done();
      }
    );
  });

  it('should return the data of that website for GET /website/1/pages', function (done) {
    request('http://localhost:3000/website/1/pages', function (err, res, body) {
      var data = JSON.parse(body);
      //expect some data is returned
      //and verify they are correct
      done();
    });
  });

  it('should create a page in the website for POST /website/1/pages', function (done) {
    request.post({
        headers:{'content-type':'application/json'},
        url:'http://localhost:3000/website/1/pages',
        body:JSON.stringify({"id": 1, "url": "/my-page"}, null, 2)
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        //todo request the website again and check if it contains the updated data
        done();
      }
    );
  });

});
