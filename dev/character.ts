class Character {
    public htmlElement : HTMLElement
    private posx:number
    private posy:number
    leftSpeed : number = 0
    rightSpeed : number = 0
    downSpeed : number = 0
    upSpeed : number = 0

    constructor(){
        this.htmlElement = document.createElement("div")
        document.body.appendChild(this.htmlElement).className = "character";

        this.posx = window.innerWidth / 2 - 125;
        this.posy = window.innerHeight - 250;

        this.htmlElement.style.transform = `translate(${this.posx}px, ${this.posy}px)`

        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e))
        
    }

    public update(){
        
        if (this.leftSpeed) {
            this.htmlElement.style.transform = `translate(${this.posx -= this.leftSpeed}px, ${this.posy}px)`
        }
        if (this.rightSpeed) {
            this.htmlElement.style.transform = `translate(${this.posx += this.rightSpeed}px, ${this.posy}px)`
        }
        
    }

    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.leftSpeed = 5
            break
        case 68:
            this.rightSpeed = 5
            break
        }
    }
    
    onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.leftSpeed = 0
            break
        case 68:
            this.rightSpeed = 0
            break
        }
    }
}
