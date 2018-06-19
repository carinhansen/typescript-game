class DeleteNotifier implements Subject{
    observers:Observer [] = []
    
    constructor(){
    }

    public subscribe(c:Observer):void{
        this.observers.push(c);
    }

    public unsubscribe(c:Observer):void {
        this.observers.splice(this.observers.indexOf(c), 1);
    }

    public update():void{
        if (Game.getInstance().powerup) {
            for(let c of this.observers){
                c.notify(true);
            }
            Game.getInstance().powerup = false;
        }
    }
}