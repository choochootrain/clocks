var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
    res.sendfile('static/index.html');
});

var db = {}

function new_clock(name, total_time) {
  db.id = {
    'total_time': total_time,
    'elapsed_time': 0,
    'name': name,
    'id': Math.floor(Math.random() * 10000)
  };

  return db.id;
}

function get_clock(id) {
  return db.id;
}

function ping_clock(id, elapsed_time) {
  db.id.elapsed_time = elapsed_time;

  return db.id;
}

io.on('connection', function(socket) {

  var _id;

  // create a new clock
  socket.on('new', function(name, total_time) {
    data = new_clock(name, total_time);
    _id = data.id;

    socket.emit('status', data);
  });

  socket.on('get', function(id) {
    _id = id;

    socket.emit('status', get_clock(_id));
  });

  // update an existing clock
  socket.on('ping', function(elapsed_time) {
    socket.emit('status', ping_clock(_id, elapsed_time));
  });
});

server.listen(3000, function() {
  console.log("listening on 3000");
});
