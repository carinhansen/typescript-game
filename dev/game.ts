class Game {
    private static instance: Game;
    private c: Character;
    public b:Brain;
    public food:Food[] = [];
    public p:Powerup;


    private constructor() {}

    public initialize(){
        this.food = [new Brain(), new Brain(), new Cherry(), new Cherry(), new Cherry(), new Cherry()]
        this.p = new Powerup();
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
  
        for(let f of this.food){
            f.update()
        }

        if(this.food.length <= 4 ){
            this.food.push(new Brain(), new Cherry())
        }
        requestAnimationFrame(() => this.gameLoop())
    }
}

   window.addEventListener("load", ()=> {
       const g = Game.getInstance()
       g.initialize()
    })


