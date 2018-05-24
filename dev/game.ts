class Game {
    private static instance: Game;
    private c: Character;

    private constructor() {
        console.log("New Game")
        this.c = new Character();
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
        requestAnimationFrame(() => this.gameLoop())
    }
}

   window.addEventListener("load", ()=> { Game.getInstance() })


