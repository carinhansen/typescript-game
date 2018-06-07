class Game {
    private static instance: Game;
    private c: Character;
    public food:Food[];

    private constructor() {

    }

    public initialize(){
        console.log("New Game")
        this.c = new Character();
        this.food = [new Food(), new Food(), new Food(), new Food()]
        this.gameLoop()
        Start.getInstance().show()
    }

    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    gameLoop() {
        this.c.update();

        for(let f of this.food){
            f.update()
        }
        requestAnimationFrame(() => this.gameLoop())
    }
}

   window.addEventListener("load", ()=> {
       const g = Game.getInstance()
       g.initialize()
    })


