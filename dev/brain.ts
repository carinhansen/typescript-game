///<reference path='food.ts' />

class Brain extends Food {
    constructor(){
        super();

        this._element = document.createElement("brain")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this._element);

    }

    // end game when out of screen
    missed(){
        if(this.posy > 200){
            console.log("out of screen")
        }
    }

    action(){
        console.log("brain shit")
    }


}