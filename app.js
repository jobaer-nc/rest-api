var express = require('express');
var app = express();
var fs = require('fs');
var data_file = __dirname + '/data/modules.json';

app.use(express.bodyParser());

app.get('/pages', function (req, res) {
  res.send('hello world');
});

app.get('/modules', function (req, res) {
  fs.readFile(data_file, 'utf8', function (err, data) {
    if (err) {
      //todo return 500 error
      console.log('Error: ' + err);
      return;
    }

    modules = JSON.parse(data);
    res.setHeader('Content-type', 'application/json');
    res.send(modules);
  });

});

app.get('/module-dummy/:id', function (req, res) {
  fs.readFile(data_file, 'utf8', function (err, data) {
    if (err) {
      //todo return 500 error
      console.log('Error: ' + err);
      return;
    }

    data = JSON.parse(data);
    modules = data.modules;

    var module;
    for (var i = 0; i < modules.length; i++) {
      if (modules[i].id == req.params.id)
        module = modules[i];
    }
    if (module != null) {
      res.setHeader('Content-type', 'application/json');
      res.send(module);
    } else {
      res.send("Not found", 404);
    }
  });

});

app.post('/modules', function (req, res) {
  fs.readFile(data_file, 'utf8', function (err, data) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }

    data = JSON.parse(data);
    modules = data.modules;

    var module = req.body;
    //save it and send 201 created with the link
    data.modules[data.modules.length] = module;

    fs.writeFile(data_file, JSON.stringify(data, null, 2), function (err) {
      if (err) {
        console.log(err);
        res.send("error occurred ...")
      } else {
        console.log("JSON saved to ");
      }
      res.send("Created", 201);
    })

  })
});

app.put('/module/:id', function (req, res) {
  fs.readFile(data_file, 'utf8', function (err, data) {
    if (err) {
      console.log('Error: ' + err);
      return;
    }

    data = JSON.parse(data);

    var module = req.body;
    for (var i = 0; i < data.modules.length; i++) {
      if (data.modules[i].id == req.params.id) {
        data.modules[i] = module;
      }
    }

    fs.writeFile(data_file, JSON.stringify(data, null, 2), function (err) {
      if (err) {
        console.log(err);
        res.send("error occurred ...")
      } else {
        console.log("JSON saved to ");
      }
      res.send("Update successful", 200);
    })

  })
});

app.get('/module/:id', function (req, res) {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qweqwe',
    database: 'cms'
  });

  connection.connect();
  var sql = 'SELECT * FROM modules where id=' + connection.escape(req.params.id);
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;

    var parser = require('./row-parser');
    var result = parser.moduleParser(rows[0]);

    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify(result));
  });

  connection.end();

});

app.get('/module/:id/data', function (req, res) {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qweqwe',
    database: 'cms'
  });

  connection.connect();
  var sql = 'SELECT * FROM modules where id=' + connection.escape(req.params.id);
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;

    var parser = require('./row-parser');
    var result = parser.moduleParser(rows[0]);

    var dataFetcher = require('./nc-api').dataFetcher;
    console.log(dataFetcher);
    for(var prop in dataFetcher) {
      console.log(prop);
    }
    dataFetcher.fetch(result, function (data) {
      res.setHeader('Content-type', 'application/json');
      res.send(data);
    });
  });

  connection.end();
});

app.get('/page/:id', function (req, res) {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qweqwe',
    database: 'cms'
  });

  connection.connect();
  var sql = 'SELECT * FROM pages where id=' + connection.escape(req.params.id);
  connection.query(sql, function (err, rows, fields) {
    if (err) throw err;

    var parser = require('./row-parser');
    var result = parser.moduleParser(rows[0]);

    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify(result));
  });

  connection.end();

});

app.get('/*', function (req, res) {
  res.send({
    "status": 404,
    "message": "404 Not found"
  })
});

process.on('uncaughtException', function (e) {
  console.log(e.stack);
});

app.listen(3000);