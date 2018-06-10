class Character {
    public _htmlElement : HTMLElement
    public posx:number
    public posy:number
    public speed:number = 0
    total:number = 0
    brain:Brain
    behaviour:Movement
    speedRight:number = 5
    speedLeft:number = -5
 

    constructor(){
        this._htmlElement = document.createElement("div")
        document.body.appendChild(this.htmlElement).className = "character";

        this.posx = window.innerWidth / 2 - 125;
        this.posy = window.innerHeight - 250;

        this.htmlElement.style.transform = `translate(${this.posx}px, ${this.posy}px)`

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
        this.behaviour = new Walking(this)
        
    }

    public update(){
        this.htmlElement.style.transform = `translate(${this.posx += this.speed}px, ${this.posy}px)`
        this.behaviour.update()

        for(let i = 0; i < Game.getInstance().brain.length; i++){
            
            if(
                this.htmlElement.getBoundingClientRect().left < Game.getInstance().brain[i].element.getBoundingClientRect().right &&
                this.htmlElement.getBoundingClientRect().right > Game.getInstance().brain[i].element.getBoundingClientRect().left &&
                this.htmlElement.getBoundingClientRect().bottom > Game.getInstance().brain[i].element.getBoundingClientRect().top &&
                this.htmlElement.getBoundingClientRect().top < Game.getInstance().brain[i].element.getBoundingClientRect().bottom
            ){
                console.log("collision" + this.total);
                // Game.getInstance().brain.splice(i, 1);
                // this.brain.remove();

                this.total++;
            }
        }
        
    }

    get htmlElement():HTMLElement {
        return this._htmlElement;
    }

    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.speed = this.speedLeft
            break
        case 68:
            this.speed = this.speedRight
            break
        }
    }
    
    onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.speed = 0
            break
        case 68:
            this.speed = 0
            break
        }
    }
}
