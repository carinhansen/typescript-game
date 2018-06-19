class Game {
    private static instance: Game;
    private character: Character;
    public food:Food[] = [];
    public powerup:boolean = false;
    public subject:Subject = new DeleteNotifier();


    private constructor() {}

    public initialize(){
        this.food = this.createFood(6);
        this.character = new Character();
        this.gameLoop();
        Start.getInstance().show();
    }

    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private gameLoop() {
        this.character.update();
        this.subject.update();
        
        for(let f of this.food){
            f.update()
        }

        if(this.food.length <= 4 ){
            for (let food of this.createFood(2)) {
                this.food.push(food)
            }
        }
        requestAnimationFrame(() => this.gameLoop())
    }

    private createFood(amount:number):Food[] {
        let food:Food[] = [];
        const random = Math.floor(Math.random() * 100);
        for (let i = 0; i < amount; i ++) {
            if (random > 30) {
                food.push(new Cherry(this.subject));
            }
            else {
                food.push(new Brain());
            }
        }
        return food;
    }
}

window.addEventListener("load", ()=> {
    const g = Game.getInstance()
    g.initialize()
})


