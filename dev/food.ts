class Food {
    
    protected _element: HTMLElement
    public posy:number
    public posx:number
    protected speed:number
    protected game:Game
        
    constructor() {
        // this._element = document.createElement("food")
        // let foreground = document.getElementsByTagName("foreground")[0]
        // foreground.appendChild(this._element);
        
        this.posy = 0
        this.posx = Math.random() * window.innerWidth
        this.speed = Math.random() * 10

        this.game = Game.getInstance()
        this.test();
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

    test(){
        console.log("food test")
    }
}