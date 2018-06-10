///<reference path='food.ts' />

class Brain extends Food {
    constructor(){
        super();

        this._element = document.createElement("brain")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this._element);

    }

    public test():void{
        console.log("override");
    }

    // end game when out of screen
    missed(){
        if(this.posy > 200){
            console.log("out of screen")
        }
    }

    // remove(){
    //    remove dom element when collision
    // }
}