class Character {
    private _htmlElement : HTMLElement
    private posx:number
    private posy:number
    private speed:number = 0
    public behaviour:Movement
    public speedRight:number = 5
    public speedLeft:number = -5
    private food:Food[];
    public powerup:Powerup


    constructor(){
        this._htmlElement = document.createElement("div")
        document.body.appendChild(this.htmlElement).className = "character";
        this.powerup = new Powerup(this);
        this.food = Game.getInstance().food;
        this.posx = window.innerWidth / 2 - 125;
        this.posy = window.innerHeight - 200;

        this.htmlElement.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
        this.noPowerup();
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));
    }

    public update(){
        this.behaviour.update();
        this.htmlElement.style.transform = `translate(${this.posx += this.speed}px, ${this.posy}px)`;
        
        for(let i = 0; i < this.food.length; i++){
            if(
                this.htmlElement.getBoundingClientRect().left < this.food[i].element.getBoundingClientRect().right &&
                this.htmlElement.getBoundingClientRect().right > this.food[i].element.getBoundingClientRect().left &&
                this.htmlElement.getBoundingClientRect().bottom > this.food[i].element.getBoundingClientRect().top &&
                this.htmlElement.getBoundingClientRect().top < this.food[i].element.getBoundingClientRect().bottom
            ){
                this.food[i].action();
                this.food[i].remove();
                Game.getInstance().food.splice(i, 1);
            }
        }

        if(
            this.htmlElement.getBoundingClientRect().left < this.powerup.element.getBoundingClientRect().right &&
            this.htmlElement.getBoundingClientRect().right > this.powerup.element.getBoundingClientRect().left &&
            this.htmlElement.getBoundingClientRect().bottom > this.powerup.element.getBoundingClientRect().top &&
            this.htmlElement.getBoundingClientRect().top < this.powerup.element.getBoundingClientRect().bottom &&
            this.powerup.now
        ){
            this.powerup.action();
            Game.getInstance().powerup = true;
        }
    }

    public noPowerup(){
        this.behaviour = new Walking(this);
    }

    get htmlElement():HTMLElement {
        return this._htmlElement;
    }

    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
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
    }
    
    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.speed = 0;
            break;
        case 68:
            this.speed = 0;
            break;
        }
    }
}
