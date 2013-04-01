var request = require('request');

describe('NewsCred CMS API: pages', function () {
  it('should return a list of pages for /pages', function (done) {
    request('http://localhost:3000/pages', function (err, res, body) {
      var data = JSON.parse(body);
      expect(data.pages).toBeDefined();
      expect(data.pages.length).toBeGreaterThan(0);
      done();
    })
  });

  it('should return a single page for /page/1', function (done) {
    request('http://localhost:3000/page/1', function (err, res, body) {
      var page = JSON.parse(body);
      expect(page).toBeDefined();
      expect(page.id).toBe(1);
      done();
    })
  });

  it('should update a page for PUT /page/1', function (done) {
    request.put({
        headers:{'content-type':'application/json'},
        url:'http://localhost:3000/page/1',
        body:JSON.stringify(page1, null, 2)
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        //todo request the page again and check if it contains the updated data
        done();
      }
    );
  });

  it('should delete a page for DELETE /page/1', function (done) {
    request.del({
        url:'http://localhost:3000/page/99'
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        //todo request the page again and check if it return 404
        done();
      }
    );
  });

  it('should return the modules of that page for GET /page/1/modules', function (done) {
    request('http://localhost:3000/page/1/modules', function (err, res, body) {
      var data = JSON.parse(body);
      //expect some data is returned
      //and verify they are correct
      done();
    });
  });

  it('should create a module in the page for POST /page/1/modules', function (done) {
    request.post({
        headers:{'content-type':'application/json'},
        url:'http://localhost:3000/page/1/modules',
        body:JSON.stringify({"id": 44}, null, 2)
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        //todo request the page again and check if it contains the updated data
        done();
      }
    );
  });

});
