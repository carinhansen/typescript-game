class Powerup {
    protected _element: HTMLElement
    public posy:number
    public posx:number
    behaviour:Movement
    character:Character


    constructor(character:Character){
        this.character = character

        this._element = document.createElement("powerup")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this._element);

        this.posx = 100;
        this.posy = window.innerHeight -175;

        this._element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }

    action(){
        this.character.behaviour = new Running(this.character);
        this._element.classList.add("powerupLoading")
        setTimeout(()=> { this.character.noPowerup() }, 10000);
        
    }

    

    get element():HTMLElement {
        return this._element;
    }

}