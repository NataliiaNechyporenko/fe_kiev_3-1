'use strict';

let trainingText = document.querySelector('#trainingText');
let timeSpan = document.querySelector('#time');
        let currentChar = 0;
        let timerID;
        let time = 0;
        let typingSpeed;
        let nextCharacter = document.querySelector("#nextCharacter");

let keyTrainer = {
    layouts: {
        en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./",
        ru: "йцукенгшщзхъфывапролджэячсмитьбю.",
        ua: "йцукенгшщзхїфівапролджєячсмитьбю."
    },

    langs: [],
    currentLang: '',
    string: {
        en: "lorem ipsum dolor sit amet",
        ru: "но чтобы вы поняли, откуда возникает это превратное представление людей",
        ua: "але щоб ви зрозуміли, звідки виникає це хибне уявлення людей"
    },
    numberOfCharacters: '',
    randChars: [],

    getLayouts: function() {
        if (typeof(this.layouts.en) == 'string') {
            for (let key in this.layouts) {
                this.layouts[key] = {
                    topRow: this.layouts[key].split('').slice(0, 12),
                    middleRow: this.layouts[key].split('').slice(12, 23),
                    bottomRow: this.layouts[key].split('').slice(23),
                    whiteSpace: [" "],
                };
                this.langs.push(`${key}`);
            };
        };
        return this;
    },

    getCurrentLang: function() {
        //let userLang = prompt('Please chose your language: en - 0, ru - 1, ua - 2');
        let userLang = document.querySelector('#userLang').value;
        if (userLang == null) {
            return;
        } else if (userLang != '' && userLang >= 0 && userLang <= 2 && Number.isInteger(+userLang)) {
            this.currentLang = this.langs[userLang];
        } else {
            alert('This language is not available. Please, chose language: en - 0, ru - 1, ua - 2');
            this.getCurrentLang();
        };

        return this;
    },

    createLayout: function() {
        let keyboard = document.querySelector('.keyboard');
        let htmlString = '';
        let rowData = {
            note: [],
            rowKeys: [],
        };
        let audioFiles = document.querySelectorAll(`audio`);
        for (let index of audioFiles) {
            rowData.note.push(index.dataset.note);
        };

        for (let key in this.layouts[this.currentLang]) {
            let obj = this.layouts[this.currentLang];
            rowData.rowKeys = obj[key];
            let html;

            if ( rowData.rowKeys.length == 1 ) {
                html = document.querySelector('#whitespace').textContent.trim();
            } else {
                html = document.querySelector('#letterkeys').textContent.trim();
            };

            let compiled = _.template(html);
            let result = compiled(rowData);
            htmlString += result;
        };

        trainingText.innerHTML = this.string[this.currentLang];
        nextCharacter.innerHTML = this.string[this.currentLang][0];
        keyboard.innerHTML = htmlString;
        return this;
    },


    callback: (event) => {
        let keyName = event.key;
        for (let items of buttons) {
            if (items.innerHTML == event.key) {
                items.classList.add('keyboard__item--active');

                if (sound.checked == true) {
                playSound(`${items.dataset.note}`);
                };
            };
        };
        if (timer.isActive == true) {
            if (currentChar == 0) {
                timer.startTime = Date.now();

                timerID = setInterval(() => {
                    time = parseInt( (Date.now() - timer.startTime)/1000);
                    timeSpan.innerHTML = time;
                    typingSpeed = currentChar/time;
                    document.querySelector("#typingSpeed").innerHTML = Math.round(typingSpeed * 100 / 100);
                    }, 1000);
            };
            let textChars = trainingText.innerHTML.split("");
            let mistakes = 0;
            if ( keyName == textChars[currentChar]) {
                currentChar++;

                if (currentChar == textChars.length) {
                    timer.stop();
                    console.log(`Good job! you do all`);
                }
                document.querySelector("#numCorrectLetters").innerHTML = currentChar;
                nextCharacter.innerHTML = textChars[currentChar];
        } else {
            mistakes++;
            document.querySelector("#mistakes").innerHTML = mistakes;
            return;
        };
    };
        return this;
    },

 };

keyTrainer.getLayouts()
.getCurrentLang()
.createLayout();

let buttons = Array.from(document.querySelectorAll("button"));
let sound = document.getElementById("volume");

let keyUpHandler = (event) => {
    for (let items of buttons) {
        if (items.classList.contains('keyboard__item--active')) {
        items.classList.remove('keyboard__item--active');
        };
    };
};


let playSound = note => {
  let audio = document.querySelector(`audio[data-note=${note}]`);
  audio.currentTime = 0;
  audio.play();
};

let startBtn = document.querySelector(`#startTraining`);
let userLang = document.querySelector('#userLang');
let renderKeyboard = (event) => {
    keyTrainer.getCurrentLang()
    .createLayout();
    buttons = Array.from(document.querySelectorAll("button"));
    sound = document.getElementById("volume");
    textChars = trainingText.innerHTML.split('');
};

let timer = {
    isActive: false,
    startTime: 0,
    stopTime: 0,


    start: function () {
        this.isActive = true;
        startBtn.innerHTML = `Stop Training`;
    },
    stop: function () {
        clearInterval(timerID);
        this.isActive = false;
        this.stopTime = Date.now();
        startBtn.innerHTML = `Start Training`;
        currentChar = 0;
        nextCharacter.innerHTML = keyTrainer.string[keyTrainer.currentLang][0];
        let bestScore = localStorage.getItem('bestScore') || '';
        if (bestScore < typingSpeed) {
            bestScore = localStorage.setItem('bestScore', typingSpeed);
        };
        document.querySelector("#bestResult").innerHTML = bestScore;
    },
    countKPS: function(event) {
        if ( timer.isActive == true ) {
            timer.stop();
        } else {
            timer.start();
        };
    },
};

window.addEventListener("keydown", keyTrainer.callback);
window.addEventListener("keyup", keyUpHandler);
userLang.addEventListener("change", renderKeyboard);
startBtn.addEventListener("click", timer.countKPS);
