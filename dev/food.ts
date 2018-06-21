class Food {
    
    protected _element: HTMLElement
    public posy:number = -200;
    public posx:number
    protected speed:number
    protected game:Game
        
    constructor() {
        this.posx = Math.random() * window.innerWidth;
        this.speed = Math.random() * 10 + 1;

        this.game = Game.getInstance();
    }

    public update():void {
        if(this.posy >= window.innerHeight){
            if (this instanceof Cherry) {
                this.subject.unsubscribe(this);
            }
            this.remove();
            const index = this.game.food.indexOf(this);
            this.game.food.splice(index, 1);
        } else {
            this.posy += this.speed;
            this._element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
        }
    }

    get element():HTMLElement {
        return this._element;
    }

    public remove(){
        this._element.remove();
    }

    public action(){}
}