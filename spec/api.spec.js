var request = require('request'), 
		$ = require('cheerio'); 

//todo refactor to reduce duplicacy from the following methods 

describe('NewsCred CMS API', function() {
	it('/pages should return a list of 10 pages', function(done) {
		request('http://localhost:3000/pages', function(err, res, body) {
			expect(body).toEqual('hello world');
			done();
		})
	})

	it('/pages/1 should return the home page', function(done) {
		request('http://localhost:3000/page/1', function(err, res, body) {			
			if (err) throw err; 
			// parse json
			// compare 1
			var page = JSON.parse(body);
			expect(page.url).toEqual('/page/1');

//			expect(body).toEqual(data);
			done();	
		})		
	})	

	it('should return 404 not found for any invalid url', function(done) {
		request('http://localhost:3000/dummy', function(err, res, body) {
			if (err) throw err;				
			var page = JSON.parse(body);

			expect(page.status).toEqual(404);
			expect(page.message).toEqual("404 Not found");
			done();
		})
	})

})