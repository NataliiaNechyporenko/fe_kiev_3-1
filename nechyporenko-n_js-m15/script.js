let startBtn = document.querySelector("#start_btn"),
    stopBtn = document.querySelector("#stop_btn");

class Shape {
    constructor (color, initX, initY) {
        this.color = color;
        this.initX = initX;
        this.initY = initY;
    }
    getColor() {
        return this.color;
    }
    setColor (val) {
        this.color = val;
    }
    getCoords() {
        return `x: ${this.initX}, y: ${this.initY}`;
    }
    moveTo(newX, newY) {
        this.initX = newX;
        this.initY = newY;
    }
};

class Rectangle extends Shape {
    constructor(color, initX, initY, initWidth, initHeight) {
        super (color, initX, initY);
        this.initWidth = initWidth;
        this.initHeight = initHeight;
    }
    setWidth(newWidth) {
        this.initWidth = newWidth;
    }
    setHeight(newHeight) {
        this.initHeight = newHeight;
    }
    getDims() {
        return `   width: ${this.initWidth}\n   height: ${this.initHeight}`;
    }
    draw() {
        console.log(`Drawing a Rectangle at:\n   (${this.getCoords()})\nWith dimentions:\n${this.getDims()}\nFilled with Color: ${this.getColor()}`);
    }
};

let figure1 = new Rectangle ('#333', 20, 30, 200, 50);
figure1.draw();

class Circle extends Shape {
    constructor (color, initX, initY, initRadius) {
        super (color, initX, initY);
        this.initRadius = initRadius;
    }
    getRadius() {
        return `   radius: ${this.initRadius}`;
    }
    setRadius(val) {
        this.initRadius = val;
    }
    draw() {
        console.log(`Drawing a Circle at:\n   (${this.getCoords()})\nWith dimentions:\n${this.getRadius()}\nFilled with Color: ${this.getColor()}`);
    }
};

let circle1 = new Circle ('#dcdcdc', 150, 150, 100);
circle1.setRadius(120);
circle1.draw();
