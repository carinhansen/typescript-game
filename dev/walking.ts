class Walking implements Movement {
    private character:Character

    constructor(character:Character){
       this.character = character
    }

    update(){
        console.log("walking")
        this.character.speedRight = 5
        this.character.speedLeft = -5

        if(this.character.posx <= window.innerWidth/2){
            console.log("Maak floating")
            // het gedrag van de ball moet Bouncing worden
            this.character.behaviour = new Running(this.character)
        }
    }

}