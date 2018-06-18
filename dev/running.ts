class Running implements Movement {
    private character:Character

    constructor(character:Character){
       this.character = character
    }

    update(){
        this.character.speedRight = 20
        this.character.speedLeft = -20

        console.log("RUN")
        

    }

}