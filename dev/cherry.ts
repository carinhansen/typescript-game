///<reference path='food.ts' />

class Cherry extends Food implements Observer {

    subject:Subject;

    constructor(s:Subject){
        super();

        this.subject = s;
        s.subscribe(this);

        this._element = document.createElement("cherry")
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this._element);

    }

    public action(){
        // alert("Dead!");
    }

    public notify(){
        this.element.remove();
        this.game.food.slice(this.game.food.indexOf(this), 1);
        this.subject.unsubscribe(this);
    }

}