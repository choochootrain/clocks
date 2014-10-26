module.exports = function(io, db) {
  io.on('connection', function(socket) {
  
    var _id;
  
    // create a new clock
    socket.on('new', function(name, total_time) {
      data = db.new_clock(name, total_time);
      _id = data.id;
  
      socket.emit('new', data);
    });
  
    socket.on('get', function(id) {
      _id = id;
  
      socket.emit('get', db.get_clock(_id));
    });
  
    // update an existing clock
    socket.on('ping', function(elapsed_time) {
      socket.emit('status', db.ping_clock(_id, elapsed_time));
    });
  });
};
