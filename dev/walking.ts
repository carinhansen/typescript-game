class Walking implements Movement {
    private character:Character

    constructor(character:Character){
       this.character = character
    }

    update(){
        this.character.speedRight = 5
        this.character.speedLeft = -5
    }
}