module.exports = function(io, db) {
  io.on('connection', function(socket) {
    // create a new clock
    socket.on('new', function(name, total_time) {
      db.new_clock(name, total_time, function(data) {
        socket.emit('new', data);
      });
    });
  
    // get an existing clock
    socket.on('get', function(id) {
      db.get_clock(_id, function(data) {
        socket.emit('get', data);
      });
    });
  
    // update an existing clock
    socket.on('ping', function(elapsed_time) {
      db.ping_clock(_id, elapsed_time, function(data) {
        socket.emit('pong', data);
      });
    });
  });
};
