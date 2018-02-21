let startBtn = document.querySelector("#start_btn"),
    stopBtn = document.querySelector("#stop_btn");

class Timer {
    constructor (startTime, stopTime) {
        this.startTime = startTime;
        this.stopTime = stopTime;
        this.interval = this.stopTime - this.startTime;
    }
    start () {
        this.startTime = Date.now();
    }
    stop () {
        this.stopTime = Date.now();
        this.interval = (this.stopTime - this.startTime)/1000;
    }
    getTime () {
        console.log(`Timer interval = ${this.interval} sec`);
    }
    static timeToNY () {
        let today = new Date();
        let nextYear = today.getFullYear() + 1;
        let ny = new Date(nextYear, 1, 1, 0, 0, 1);
        let toNY = parseInt( (ny - today)/(24*60*60*1000) );
        console.log(`Days to NY ${toNY}`);
    }
};

let firstTimer = new Timer (12, 20);
console.log(firstTimer);

let secondTimer = new Timer (356, 798);
console.log(secondTimer);

let thirdTimer = new Timer (45, 76);
console.log(thirdTimer);

let stopwatch = new Timer ();

let clickHandler = (event) => {
    if (event.target == startBtn) {
        console.log(`Start`);
        stopwatch.start();
    }
    if (event.target == stopBtn) {
        console.log(`Stop`);
        stopwatch.stop();
        console.log(stopwatch);
        console.log(`Timer interval = ${stopwatch.interval} sec`);
    };
};
console.log(Timer.timeToNY());
window.addEventListener('click', clickHandler);
