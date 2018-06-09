class Walking implements Movement {
    private character:Character

    constructor(character:Character){
       this.character = character
    }

    update(){
        this.character.speed = 10
    }

}