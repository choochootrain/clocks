function initialize(container, name, id, total_time, elapsed_time){

    // initialize the html for a new clock
    container.append(
      '<div id=' + id + ' class="clock-container">\
        <span class="clock-title">'+ name + '</span>\
        <div class="clock"></div>\
        <button type="button" class="start button">start</button>\
        <button type="button" class="stop button">stop</button>\
        <button type="button" class="edit button">edit</button>\
      </div>');
      
    clockSelector = $('#'+id);

    // create a FlipClock
    var clock = clockSelector.find('.clock').FlipClock({
                id: id,
                totalTime: total_time,
                elapsedTime: elapsed_time,
                clockFace: 'HourlyCounter',
                countdown: true,
                autoStart: false,
                callbacks: {
                    stop: function() {
                      clockSelector.find('.clock-title').html('The clock has stopped!');
                    },
                    interval: function() {
                      // this.elapsedTime = this.parent.getTime();
                      clock.elapsedTime = clock.totalTime - clock.getTime().time;
                      socket.emit('ping', clock.elapsedTime);
                    }
                }
            });
          
    clockSelector.find('.start').click( function () {
      clock.start();
    });
    
    clockSelector.find('.stop').click( function () {
      clock.stop();
    });

    clockSelector.find('.edit').click( function () {
      clock.stop();
      clockPrompt = editClock();
      clock.totalTime = clockPrompt.time;
      clock.elapsedTime = 0;
      clock.setTime(clock.totalTime);
    });

    clock.setTime(clock.totalTime);
}

function setupClock () {
  var name = prompt('Name your new clock');
  var time = parseInt(prompt('How much time (in seconds) do you want to dedicate to ' + name + '?'));
  time = time ? time : 0;
  return {'name': name, 'time': time};
}

function editClock () {
  var time = parseInt(prompt('How much time (in seconds) do you want to dedicate to ' + name + '?'));
  time = time ? time : 0;
  return {'time': time};
}

$(document).ready(function() {
    window.socket = io.connect('http://localhost:3000');

    socket.on('new', function(data) {
      initialize($('#container-wrapper'), data.id, data.name, data.total_time, data.elapsed_time);
    });

    socket.on('get', function(data) {
      initialize($('#container-wrapper'), data.id, data.name, data.total_time, data.elapsed_time);
    });

    socket.on('status', function(data) {
      console.log('status');
      console.log(data);
    });

    socket.emit('new', 'foobar', 250);

    $('#newClock').click( function() {
      var clockPrompt = setupClock();
      var clockInfo = socket.emit('new', clockPrompt.name, clockPrompt.time);
    });
});
