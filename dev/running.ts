class Running implements Movement {
    private character:Character

    constructor(character:Character){
       this.character = character
    }

    // running wordt uiteindelijk een powerup wanneer er een collision is met iets.
    update(){
        this.character.speedRight = 20
        this.character.speedLeft = -20

        if(this.character.posx >= window.innerWidth/2){
            
            this.character.behaviour = new Walking(this.character)
        }
    }

}