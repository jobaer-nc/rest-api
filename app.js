var express = require('express');
var app = express();
var fs = require('fs');
var data_file = __dirname + '/data/modules.json';

app.use(express.bodyParser());

app.get('/pages', function (req, res) {
  res.send('hello world');
});

app.get('/page/1', function (req, res) {
  res.send({"url": "/page/1"});
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

app.get('/module/:id', function (req, res) {
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

app.get('/mysql/:id', function (req, res) {
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qweqwe',
    database: 'cms'
  });

  connection.connect();
  var sql = 'SELECT * FROM modules where id='+ connection.escape(req.params.id);
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
    var result = {
      "id": rows[0].id,
      "title": rows[0].title,
      "module_type": rows[0].module_type,
      "block": rows[0].block,
      "page_id": rows[0].page_id,
      "order": rows[0].order,
      "sub_title": rows[0].sub_title
    };

    console.log('The solution is: ', rows[0].id);
    for(var prop in rows[0]) {
      console.log(prop + ':' + rows[0].prop);
    }

    res.setHeader('Content-type', 'application/json');
    res.send(result);
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