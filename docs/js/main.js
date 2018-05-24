"use strict";
var Character = (function () {
    function Character() {
        var _this = this;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.htmlElement = document.createElement("div");
        document.body.appendChild(this.htmlElement).className = "character";
        this.posx = window.innerWidth / 2 - 125;
        this.posy = window.innerHeight - 250;
        this.htmlElement.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Character.prototype.update = function () {
        if (this.leftSpeed) {
            this.htmlElement.style.transform = "translate(" + (this.posx -= this.leftSpeed) + "px, " + this.posy + "px)";
        }
        if (this.rightSpeed) {
            this.htmlElement.style.transform = "translate(" + (this.posx += this.rightSpeed) + "px, " + this.posy + "px)";
        }
    };
    Character.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 65:
                this.leftSpeed = 5;
                break;
            case 68:
                this.rightSpeed = 5;
                break;
        }
    };
    Character.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 65:
                this.leftSpeed = 0;
                break;
            case 68:
                this.rightSpeed = 0;
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
//# sourceMappingURL=main.js.map