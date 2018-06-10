"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Food = (function () {
    function Food() {
        this.posy = 0;
        this.posx = Math.random() * window.innerWidth;
        this.speed = Math.random() * 10;
        this.game = Game.getInstance();
        this.test();
    }
    Food.prototype.update = function () {
        if (this.posy >= window.innerHeight) {
            this.posy = -100;
        }
        else {
            this.posy += this.speed;
            this._element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        }
    };
    Object.defineProperty(Food.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Food.prototype.test = function () {
        console.log("food test");
    };
    return Food;
}());
var Brain = (function (_super) {
    __extends(Brain, _super);
    function Brain() {
        var _this = _super.call(this) || this;
        _this._element = document.createElement("brain");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this._element);
        return _this;
    }
    Brain.prototype.test = function () {
        console.log("override");
    };
    Brain.prototype.missed = function () {
        if (this.posy > 200) {
            console.log("out of screen");
        }
    };
    return Brain;
}(Food));
var Character = (function () {
    function Character() {
        var _this = this;
        this.speed = 0;
        this.total = 0;
        this.speedRight = 5;
        this.speedLeft = -5;
        this._htmlElement = document.createElement("div");
        document.body.appendChild(this.htmlElement).className = "character";
        this.posx = window.innerWidth / 2 - 125;
        this.posy = window.innerHeight - 250;
        this.htmlElement.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        this.behaviour = new Walking(this);
    }
    Character.prototype.update = function () {
        this.htmlElement.style.transform = "translate(" + (this.posx += this.speed) + "px, " + this.posy + "px)";
        this.behaviour.update();
        for (var i = 0; i < Game.getInstance().brain.length; i++) {
            if (this.htmlElement.getBoundingClientRect().left < Game.getInstance().brain[i].element.getBoundingClientRect().right &&
                this.htmlElement.getBoundingClientRect().right > Game.getInstance().brain[i].element.getBoundingClientRect().left &&
                this.htmlElement.getBoundingClientRect().bottom > Game.getInstance().brain[i].element.getBoundingClientRect().top &&
                this.htmlElement.getBoundingClientRect().top < Game.getInstance().brain[i].element.getBoundingClientRect().bottom) {
                console.log("collision" + this.total);
                this.total++;
            }
        }
    };
    Object.defineProperty(Character.prototype, "htmlElement", {
        get: function () {
            return this._htmlElement;
        },
        enumerable: true,
        configurable: true
    });
    Character.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 65:
                this.speed = this.speedLeft;
                break;
            case 68:
                this.speed = this.speedRight;
                break;
        }
    };
    Character.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 65:
                this.speed = 0;
                break;
            case 68:
                this.speed = 0;
                break;
        }
    };
    return Character;
}());
var Cherry = (function (_super) {
    __extends(Cherry, _super);
    function Cherry() {
        var _this = _super.call(this) || this;
        _this._element = document.createElement("cherry");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this._element);
        return _this;
    }
    Cherry.prototype.test = function () {
        console.log("override cherry");
    };
    return Cherry;
}(Food));
var Game = (function () {
    function Game() {
    }
    Game.prototype.initialize = function () {
        console.log("New Game");
        this.c = new Character();
        this.brain = [new Brain(), new Brain(), new Brain(), new Brain()];
        this.cherry = [new Cherry(), new Cherry()];
        this.gameLoop();
        Start.getInstance().show();
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.c.update();
        for (var _i = 0, _a = this.brain; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
            b.missed();
        }
        for (var _b = 0, _c = this.cherry; _b < _c.length; _b++) {
            var c = _c[_b];
            c.update();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
    g.initialize();
});
var Running = (function () {
    function Running(character) {
        this.character = character;
    }
    Running.prototype.update = function () {
        this.character.speedRight = 20;
        this.character.speedLeft = -20;
        if (this.character.posx >= window.innerWidth / 2) {
            this.character.behaviour = new Walking(this.character);
        }
    };
    return Running;
}());
var Start = (function () {
    function Start() {
    }
    Start.getInstance = function () {
        if (!this.instance) {
            this.instance = new Start();
        }
        return this.instance;
    };
    Start.prototype.show = function () {
        var _this = this;
        this.start = document.createElement('div');
        this.start.classList.add('start');
        this.button = document.createElement('button');
        this.button.classList.add('button');
        this.button.innerText = "Start";
        this.start.appendChild(this.button);
        this.button.addEventListener("click", function () {
            _this.hide();
        }, false);
        document.body.appendChild(this.start);
    };
    Start.prototype.hide = function () {
        document.body.removeChild(this.start);
    };
    return Start;
}());
var Walking = (function () {
    function Walking(character) {
        this.character = character;
    }
    Walking.prototype.update = function () {
        console.log("walking");
        this.character.speedRight = 5;
        this.character.speedLeft = -5;
        if (this.character.posx <= window.innerWidth / 2) {
            console.log("Maak floating");
            this.character.behaviour = new Running(this.character);
        }
    };
    return Walking;
}());
//# sourceMappingURL=main.js.map