class Walking implements Movement {
    private character:Character

    constructor(character:Character){
       this.character = character
    }

    update(){
        console.log("walking")
        this.character.speedRight = 5
        this.character.speedLeft = -5

    }

}