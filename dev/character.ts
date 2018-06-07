class Character {
    public _htmlElement : HTMLElement
    public posx:number
    public posy:number
    private speed:number = 0
 

    constructor(){
        this._htmlElement = document.createElement("div")
        document.body.appendChild(this.htmlElement).className = "character";

        this.posx = window.innerWidth / 2 - 125;
        this.posy = window.innerHeight - 250;

        this.htmlElement.style.transform = `translate(${this.posx}px, ${this.posy}px)`

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
        
    }

    public update(){
        this.htmlElement.style.transform = `translate(${this.posx += this.speed}px, ${this.posy}px)`

        for(let i = 0; i < Game.getInstance().food.length; i++){
            
            if(
                this.htmlElement.getBoundingClientRect().left < Game.getInstance().food[i].element.getBoundingClientRect().right &&
                this.htmlElement.getBoundingClientRect().right > Game.getInstance().food[i].element.getBoundingClientRect().left &&
                this.htmlElement.getBoundingClientRect().bottom > Game.getInstance().food[i].element.getBoundingClientRect().top &&
                this.htmlElement.getBoundingClientRect().top < Game.getInstance().food[i].element.getBoundingClientRect().bottom
            ){
                console.log("collision");
            }
        }
        
    }

    get htmlElement():HTMLElement {
        return this._htmlElement;
    }

    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.speed = -5
            break
        case 68:
            this.speed = 5
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
