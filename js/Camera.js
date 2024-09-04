// import { gameHeight, gameWidth } from "./Constants";

export class Camera {
    constructor(game, x, y, width, height) {
        this.game = game
        this.x = x;
        this.y = y;
        this.width = width / 2;
        this.height = height / 2;
        this.target = null;
    }

    follow(target) {
        this.target = target;
        this.update()
    }

//     draw(ctx){


//     // ctx.save();
//     ctx.translate(-this.x, -this.y);
//     // Draw your game world here
//     // ctx.restore();
// }
    

    update() {
        if (this.target) {
        this.x = Math.min(Math.max(this.target.x - this.width / 2, 0), this.game.width - this.width);
        this.y = Math.min(Math.max(this.target.y - this.height / 2, 0), this.game.height - this.height);
        }
    }
}