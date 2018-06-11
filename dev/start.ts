class Start {

    private static instance: Start
    private start:HTMLElement
    private button:HTMLElement

    private constructor() {}

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Start()
            
        }
        return this.instance
    }

    public show() {
        this.start = document.createElement('div')
        this.start.classList.add('start')

        this.button = document.createElement('button')
        this.button.classList.add('button')
        this.button.innerText = "Start"
        this.start.appendChild(this.button)

        this.button.addEventListener("click", () => {
            this.hide()
        }, false);

        document.body.appendChild(this.start);
    }

    playAudio(){
        let audio = new Audio();
        audio.src = "audio/soundtrack.mp3";
        audio.load();
        audio.play();
    }

    public hide() {
        document.body.removeChild(this.start);
        this.playAudio();
    }
}