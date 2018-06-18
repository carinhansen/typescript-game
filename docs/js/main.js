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
        this.posy = -200;
        this.posx = Math.random() * window.innerWidth;
        this.speed = Math.random() * 10;
        this.game = Game.getInstance();
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
    Food.prototype.remove = function () {
        this._element.remove();
    };
    Food.prototype.action = function () {
        console.log("Food action");
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
    Brain.prototype.missed = function () {
        if (this.posy > 200) {
            console.log("out of screen");
        }
    };
    Brain.prototype.action = function () {
        console.log("brain shit");
    };
    return Brain;
}(Food));
var Character = (function () {
    function Character() {
        var _this = this;
        this.speed = 0;
        this.speedRight = 5;
        this.speedLeft = -5;
        this._htmlElement = document.createElement("div");
        document.body.appendChild(this.htmlElement).className = "character";
        this.powerup = new Powerup(this);
        this.food = Game.getInstance().food;
        this.posx = window.innerWidth / 2 - 125;
        this.posy = window.innerHeight - 200;
        this.htmlElement.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        this.noPowerup();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Character.prototype.update = function () {
        this.behaviour.update();
        this.htmlElement.style.transform = "translate(" + (this.posx += this.speed) + "px, " + this.posy + "px)";
        for (var i = 0; i < this.food.length; i++) {
            if (this.htmlElement.getBoundingClientRect().left < this.food[i].element.getBoundingClientRect().right &&
                this.htmlElement.getBoundingClientRect().right > this.food[i].element.getBoundingClientRect().left &&
                this.htmlElement.getBoundingClientRect().bottom > this.food[i].element.getBoundingClientRect().top &&
                this.htmlElement.getBoundingClientRect().top < this.food[i].element.getBoundingClientRect().bottom) {
                this.food[i].action();
                this.food[i].remove();
                Game.getInstance().food.splice(i, 1);
            }
        }
        if (this.htmlElement.getBoundingClientRect().left < this.powerup.element.getBoundingClientRect().right &&
            this.htmlElement.getBoundingClientRect().right > this.powerup.element.getBoundingClientRect().left &&
            this.htmlElement.getBoundingClientRect().bottom > this.powerup.element.getBoundingClientRect().top &&
            this.htmlElement.getBoundingClientRect().top < this.powerup.element.getBoundingClientRect().bottom) {
            this.powerup.action();
        }
    };
    Character.prototype.noPowerup = function () {
        this.behaviour = new Walking(this);
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
                this._htmlElement.classList.add("characterLeft");
                this._htmlElement.classList.remove("characterRight");
                break;
            case 68:
                this.speed = this.speedRight;
                this._htmlElement.classList.add("characterRight");
                this._htmlElement.classList.remove("characterLeft");
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
    Cherry.prototype.action = function () {
        console.log("cherry shit");
    };
    return Cherry;
}(Food));
var Game = (function () {
    function Game() {
        this.food = [];
    }
    Game.prototype.initialize = function () {
        this.food = [new Brain(), new Brain(), new Cherry(), new Cherry(), new Cherry(), new Cherry()];
        this.c = new Character();
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
        for (var _i = 0, _a = this.food; _i < _a.length; _i++) {
            var f = _a[_i];
            f.update();
        }
        if (this.food.length <= 4) {
            this.food.push(new Brain(), new Cherry());
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
    g.initialize();
});
var Powerup = (function () {
    function Powerup(character) {
        this.character = character;
        this._element = document.createElement("powerup");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this._element);
        this.posx = 100;
        this.posy = window.innerHeight - 175;
        this._element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
    }
    Powerup.prototype.action = function () {
        var _this = this;
        this.character.behaviour = new Running(this.character);
        this._element.classList.add("powerupLoading");
        setTimeout(function () { _this.character.noPowerup(); }, 10000);
    };
    Object.defineProperty(Powerup.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    return Powerup;
}());
var Running = (function () {
    function Running(character) {
        this.character = character;
    }
    Running.prototype.update = function () {
        this.character.speedRight = 20;
        this.character.speedLeft = -20;
        console.log("RUN");
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
    Start.prototype.playAudio = function () {
        var audio = new Audio();
        audio.src = "audio/soundtrack.mp3";
        audio.load();
        audio.play();
    };
    Start.prototype.hide = function () {
        document.body.removeChild(this.start);
        this.playAudio();
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
    };
    return Walking;
}());
//# sourceMappingURL=main.js.map