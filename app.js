var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var db = require('./db');
require('./protocol')(io, db);

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res){
    res.sendfile('static/index.html');
});

server.listen(3000, function() {
  console.log("listening on 3000");
});
