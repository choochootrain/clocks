var Datastore = require('nedb');

module.exports = function(path) {
  var db = new Datastore({'filename': path, 'autoload': true});
  db.persistence.setAutocompactionInterval(60 * 1000);

  return {
    'new_clock': function(name, total_time, cb) {
      db.insert({
        'total_time': total_time,
        'elapsed_time': 0,
        'name': name,
      }, function(err, doc) {
        cb(doc);
      });
    },

    'get_clock': function(id, cb) {
      db.findOne({ '_id': id }, function(err, doc) {
        cb(doc);
      });
    },

    'ping_clock': function(id, elapsed_time, cb) {
      db.update({ '_id': id }, {
        '$set': {
          'elapsed_time': elapsed_time
        }
      }, function(err, num, doc) {
        cb(doc);
      });
    },

    '_db': db
  };
};
