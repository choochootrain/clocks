function initialize(container, id){

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
                totalTime: 150,
                elapsedTime: 10,
                clockFace: 'HourlyCounter',
                countdown: true,
                autoStart: false,
                callbacks: {
                    stop: function() {
                      container.find('.clock-title').html('The clock has stopped!');
                    },
                    interval: function() {
                      // this.elapsedTime = this.parent.getTime();
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
    initialize($('#container-wrapper'), 'penis');
});
