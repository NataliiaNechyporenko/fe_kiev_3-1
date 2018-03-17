let startBtn = document.querySelector("#start_btn"),
    stopBtn = document.querySelector("#stop_btn");

function Timer () {
    this.startTime = 0;
    this.stopTime = 0;
    this.interval = 0;
};

Timer.prototype.start = function() {
    this.startTime = Date.now();
    };

Timer.prototype.stop = function() {
    this.stopTime = Date.now();
    timer.interval = (timer.stopTime - timer.startTime)/1000;
    console.log(`Interval: ${timer.interval} sec`);
    };

const timer = new Timer ();

let clickHandler = (event) => {
    if (event.target === startBtn) {
        timer.start();
    }
    if (event.target === stopBtn) {
        timer.stop();
    };
};

window.addEventListener('click', clickHandler);
