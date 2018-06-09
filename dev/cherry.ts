///<reference path='food.ts' />

class Cherry extends Food {
    constructor(){
        super();

        this._element = document.createElement("cherry")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this._element);

    }

    public test():void{
        console.log("override cherry");
    }

    // get element():HTMLElement {
    //     return this._element;
    // }

}