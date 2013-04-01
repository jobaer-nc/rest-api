var request = require('request');
var module1 = {
  "id": 1,
  "page_id": 1,
  "module_type": "article-list",
  "block": "first-column",
  "title": "Latest news - updated",
  "page_size": 5,
  "order": 1
};

var new_module = {
  "id": 7,
  "page_id": 1,
  "module_type": "article-list",
  "block": "first-column",
  "title": "Latest news - new",
  "page_size": 5,
  "order": 1
};

describe('NewsCred CMS API: Modules', function () {
  it('should return a list of modules for /modules', function (done) {
    request('http://localhost:3000/modules', function (err, res, body) {
      var data = JSON.parse(body);
      expect(data.modules).toBeDefined();
      expect(data.modules.length).toBeGreaterThan(0);
      done();
    })
  });

  it('should create a new module for POST /modules', function (done) {
    request.post({
        headers: {'content-type': 'application/json'},
        url: 'http://localhost:3000/modules',
        body: JSON.stringify(new_module, null, 2)
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(201);
        //todo request the module again and check if it contains the data
        done();
      }
    );
  });

  it('should return a single module for /module/1', function (done) {
    request('http://localhost:3000/module/1', function (err, res, body) {
      var module = JSON.parse(body);
      expect(module).toBeDefined();
      expect(module.id).toBe(1);
      done();
    })
  });

  it('should update a module for PUT /module/1', function (done) {
    request.put({
        headers: {'content-type': 'application/json'},
        url: 'http://localhost:3000/module/1',
        body: JSON.stringify(module1, null, 2)
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        //todo request the module again and check if it contains the updated data
        done();
      }
    );
  });

  it('should delete a module for DELETE /module/1', function (done) {
    request.del({
        url: 'http://localhost:3000/module/99'
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        //todo request the module again and check if it return 404
        done();
      }
    );
  });

  it('should return the data of that module for GET /module/1/data', function (done) {
    request('http://localhost:3000/module/1/data', function (err, res, body) {
      var data = JSON.parse(body);
      //expect some data is returned
      //and verify they are correct
      done();
    });
  })

});
