class Powerup {
    protected _element: HTMLElement
    public posy:number
    public posx:number

    constructor(){

        this._element = document.createElement("powerup")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this._element);

        this.posx = 100;
        this.posy = window.innerHeight -175;

        this._element.style.transform = `translate(${this.posx}px, ${this.posy}px)`

    }

    action(){
        console.log("powerup run")
    }

    get element():HTMLElement {
        return this._element;
    }

}