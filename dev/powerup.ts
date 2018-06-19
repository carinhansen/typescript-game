class Powerup {
    private _element: HTMLElement
    private posy:number
    private posx:number
    public behaviour:Movement
    private character:Character
    public now:boolean = true;

    constructor(character:Character){
        this.character = character;

        this._element = document.createElement("powerup");
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this._element);

        this.posx = 100;
        this.posy = window.innerHeight -175;

        this._element.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }

    public action(){
        this.character.behaviour = new Running(this.character);
        setTimeout(()=> { this.character.noPowerup() }, 10000);
        this.changeStatusPlant();
    }

    get element():HTMLElement {
        return this._element;
    }

    public changeStatusPlant():void{
        this.now = false;
        this.element.classList.add("powerupLoading");
        setTimeout(()=> { this.element.classList.remove("powerupLoading"); this.now = true }, 30000);
    }
}