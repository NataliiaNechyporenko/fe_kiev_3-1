let startBtn = document.querySelector("#start_btn"),
    stopBtn = document.querySelector("#stop_btn");

function Timer () {
    this.startTime = this.start;
    this.stopTime = this.stop;
    this.interval = (this.stopTime - this.startTime)/1000;
};

let clickHandler = (event) => {
    if (event.target == startBtn) {
        console.log(`Start`);
        Timer.prototype.start = Date.now();
    }
    if (event.target == stopBtn) {
        console.log(`Stop`);
        Timer.prototype.stop = Date.now();
        let newTimer = new Timer();
        console.log(newTimer);
        console.log(`Timer interval = ${newTimer.interval} sec`);
    };
};

window.addEventListener('click', clickHandler);
