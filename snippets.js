// read json file 

var fs = require('fs');
var file = __dirname + '/test.json';
 
fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
 
  data = JSON.parse(data);
 
  console.dir(data);
});


// write json to file 
var fs = require('fs');

var myData = {
  name:'test',
  version:'1.0'
}

var outputFilename = '/tmp/my.json';

fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to ");
    }
}); 
