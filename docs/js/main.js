"use strict";
var Character = (function () {
    function Character() {
        var _this = this;
        this.speed = 0;
        this.htmlElement = document.createElement("div");
        document.body.appendChild(this.htmlElement).className = "character";
        this.posx = window.innerWidth / 2 - 125;
        this.posy = window.innerHeight - 250;
        this.htmlElement.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Character.prototype.update = function () {
        this.htmlElement.style.transform = "translate(" + (this.posx += this.speed) + "px, " + this.posy + "px)";
    };
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
var Game = (function () {
    function Game() {
        console.log("New Game");
        this.c = new Character();
        this.gameLoop();
        Start.getInstance().show();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.c.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { Game.getInstance(); });
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