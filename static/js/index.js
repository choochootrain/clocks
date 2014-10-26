function initialize(container, id, total_time, elapsed_time){

    // initialize the html for a new clock
    container.append(
      '<div id=' + id + ' class="clock-container">\
        <span class="clock-title"></span>\
        <div class="clock"></div>\
        <button type="button" class="start-button">start</button>\
        <button type="button" class="stop-button">stop</button>\
      </div>');
      
    clockSelector = $('#'+id);

    // create a FlipClock
    var clock = clockSelector.find('.clock').FlipClock({
                id: 'tits',
                totalTime: total_time,
                elapsedTime: elapsed_time,
                clockFace: 'HourlyCounter',
                countdown: true,
                autoStart: false,
                callbacks: {
                    stop: function() {
                      container.find('.clock-title').html('The clock has stopped!');
                    },
                    interval: function() {
                      // this.elapsedTime = this.parent.getTime();
                      clock.elapsedTime = clock.totalTime - clock.getTime().time;
                      socket.emit('ping', clock.elapsedTime);
                    }
                }
            });
          
    clockSelector.find('.start-button').click( function() {
        clock.start();
    });
    
    clockSelector.find('.stop-button').click( function() {
        clock.stop();
    });

    clock.setTime(clock.totalTime);
}

$(document).ready(function() {
    window.socket = io.connect('http://localhost:3000');

    socket.on('new', function(data) {
      initialize($('#container-wrapper'), data.id, data.total_time, data.elapsed_time);
    });

    socket.on('get', function(data) {
      initialize($('#container-wrapper'), data.id, data.total_time, data.elapsed_time);
    });

    socket.on('status', function(data) {
      console.log('status');
      console.log(data);
    });

    socket.emit('new', 'foobar', 250);
});
