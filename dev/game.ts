class Game {
    private static instance: Game;
    private c: Character;
    public b:Brain;
    public brain:Brain[];
    public cherry:Cherry[];

    private constructor() {

    }

    public initialize(){
        console.log("New Game")
        this.c = new Character();
        // this.child = new Child();
        this.brain = [new Brain(), new Brain(), new Brain(), new Brain()]
        this.cherry = [new Cherry(), new Cherry()]
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
        

        for(let b of this.brain){
            b.update()
            b.missed();
        }
        for(let c of this.cherry){
            c.update()
        }
        requestAnimationFrame(() => this.gameLoop())
    }
}

   window.addEventListener("load", ()=> {
       const g = Game.getInstance()
       g.initialize()
    })


