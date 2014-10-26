var db = {}

module.exports = {
  'new_clock': function(name, total_time) {
    db.id = {
      'total_time': total_time,
      'elapsed_time': 0,
      'name': name,
      'id': Math.floor(Math.random() * 10000)
    };
  
    return db.id;
  },
  
  'get_clock': function(id) {
    return db.id;
  },
  
  'ping_clock': function(id, elapsed_time) {
    db.id.elapsed_time = elapsed_time;
  
    return db.id;
  }
};
