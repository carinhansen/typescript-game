class Food {
    
    protected _element: HTMLElement
    public posy:number = -200;
    public posx:number
    protected speed:number
    protected game:Game
        
    constructor() {
        this.posx = Math.random() * window.innerWidth
        this.speed = Math.random() * 10

        this.game = Game.getInstance()
    }

    public update():void {
        if(this.posy >= window.innerHeight){
            this.posy = -100;
        } else {
            this.posy += this.speed;
            this._element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
        }
    }

    get element():HTMLElement {
        return this._element;
    }

    remove(){
        this._element.remove();
    }

    action(){
        console.log("Food action")
    }
}