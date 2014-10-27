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
      db.get_clock(id, function(data) {
        socket.emit('get', data);
      });
    });
  
    // update an existing clock
    socket.on('ping', function(id, elapsed_time) {
      db.ping_clock(id, elapsed_time, function(data) {
        socket.emit('pong', data);
      });
    });
  });
};
