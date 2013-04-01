var request = require('request');

describe('NewsCred CMS API: domains', function () {
  it('should return the domains of that website for GET /website/1/domains', function (done) {
    request('http://localhost:3000/website/1/domains', function (err, res, body) {
      var data = JSON.parse(body);
      //expect some data is returned
      //and verify they are correct
      done();
    });
  });

  it('should create a page in the website for POST /website/1/domains', function (done) {
    request.post({
        headers:{'content-type':'application/json'},
        url:'http://localhost:3000/website/1/domains',
        body:JSON.stringify({}, null, 2)
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        //todo request the website again and check if it contains the domain data
        done();
      }
    );
  });

});
