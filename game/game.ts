type ButtonType = "blue" | "green" | "red" | "yellow";
type PlayerState = "lost" | "playing" | "stale"
const buttons: ButtonType[] = ["blue", "green", "red", "yellow"];



class Game {
    private memory: Button[] = []
    private pressedButtons: Button[] = []
    private buttons: Button[] = [];
    private playerState: PlayerState = "stale"
    private score: number = 0

    public start() {
        this.buttons = buttons.map(btn => new Button(btn))
        this.playerState = "playing"
        this.resetMemory()
        this.resetPressedButtons()
        this.resetScore()
    }

    private compareActivatedAndPressed() {
        const pressedButtons = this.getPressedButtons()
        pressedButtons.map((btn, i) => {
            if (btn.getButtonType() !== this.memory[i].getButtonType()) {
                this.playerState = "lost"
            }
            if (btn.getButtonType() === this.memory[i].getButtonType() && pressedButtons.length === this.memory.length) {
                this.resetPressedButtons()
                this.buttons.map(btn => btn.isActivated = false)
            }
        })
    }

    private updateScore() {
        return this.getPressedButtons().length % this.memory.length   === 0 ? this.score++ : this.score
    }

    public activateButton() {
        if (this.playerState === "playing" && !this.getActivatedButton(this.buttons)) {
            let btn = this.getRandomButton(this.buttons)
            btn.isActivated = true
            btn.getSound()?.play()
            this.updateMemory(btn)
        }
    }

    public pressButton(button: Button) {
        button.isPressed = true;
        button.getSound()?.play()
        this.savePressedButtons(button)
        this.compareActivatedAndPressed()
        this.updateScore()
        button.isPressed = false;
    }

    private savePressedButtons(button: Button) {
        this.pressedButtons.push(button)
    }

    private resetPressedButtons() {
        this.pressedButtons = []
    }

    public getPressedButtons(): Button[] {
        return this.pressedButtons
    }

    private updateMemory(button: Button) {
        this.memory.push(button)
    }

    private resetMemory() {
        this.memory = []
    }

    public getScore(): number {
        return this.score
    }

    private resetScore() {
        this.score = 0
    }

    public getActivatedButton(buttons: Button[]): Button {
        return buttons.find(btn => btn.isActivated) as Button;
    }

    public getRandomButton(buttons: Button[]): Button {
        const index = Math.ceil(Math.random() * buttons.length) - 1
        return buttons[index]
    }

    public getPlayerState(): PlayerState {
        return this.playerState
    }

    public getButtons() {
        return this.buttons
    }

}


class Button {
    private buttonType: ButtonType;
    public isPressed: boolean = false;
    public isActivated: boolean = false;

    constructor(buttonType: ButtonType) {
        this.buttonType = buttonType;
    }

    public getSound() {
        return new Audio(`./sounds/${this.buttonType}.mp3`)
    }

    public getButtonType(): ButtonType {
        return this.buttonType;
    }
}




export const game = new Game()

