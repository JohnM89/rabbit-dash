export class InputHandler {
        constructor(game) {
            this.game = game;
            console.log("input handler created")
            window.addEventListener('keydown', event => {
                event.preventDefault();
                this.game.lastKey = "P" + event.code;
            });
            window.addEventListener('keyup', event => {
                event.preventDefault();
                this.game.lastKey = "R" + event.code;
            });
        }
    }