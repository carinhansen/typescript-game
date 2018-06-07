"use strict";
var Character = (function () {
    function Character() {
        var _this = this;
        this.speed = 0;
        this._htmlElement = document.createElement("div");
        document.body.appendChild(this.htmlElement).className = "character";
        this.posx = window.innerWidth / 2 - 125;
        this.posy = window.innerHeight - 250;
        this.htmlElement.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Character.prototype.update = function () {
        this.htmlElement.style.transform = "translate(" + (this.posx += this.speed) + "px, " + this.posy + "px)";
        for (var i = 0; i < Game.getInstance().food.length; i++) {
            if (this.htmlElement.getBoundingClientRect().left < Game.getInstance().food[i].element.getBoundingClientRect().right &&
                this.htmlElement.getBoundingClientRect().right > Game.getInstance().food[i].element.getBoundingClientRect().left &&
                this.htmlElement.getBoundingClientRect().bottom > Game.getInstance().food[i].element.getBoundingClientRect().top &&
                this.htmlElement.getBoundingClientRect().top < Game.getInstance().food[i].element.getBoundingClientRect().bottom) {
                console.log("collision");
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
                this.speed = -5;
                break;
            case 68:
                this.speed = 5;
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
var Food = (function () {
    function Food() {
        this._element = document.createElement("food");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this._element);
        this.posy = 0;
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
    return Food;
}());
var Game = (function () {
    function Game() {
    }
    Game.prototype.initialize = function () {
        console.log("New Game");
        this.c = new Character();
        this.food = [new Food(), new Food(), new Food(), new Food()];
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
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
    g.initialize();
});
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
//# sourceMappingURL=main.js.map