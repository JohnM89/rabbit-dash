import { tileSize} from './Constants.js';
export class Animation {
        constructor(game) {
            this.game = game;
            this.tileSize = tileSize * 2
            this.width = this.tileSize;
            this.height = this.tileSize;
            this.frameX = 0;
            this.frameY = 0;
            this.x = 0;
            this.y = 0;
            this.maxFrame = 0;
            this.speedX = 0;
            this.speedY = 0;
            this.maxSpeed = 1;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2
            this.collisionWidth = this.tileSize / 2;
            this.collisionHeight = this.tileSize / 2;
            this.fps = 60;
            this.frameInterval = 2000 / this.fps;
            this.frameTimer = 0;
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        hitbox(ctx) {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.collisionX, this.collisionY, this.collisionWidth, this.collisionHeight);
        }
        setSpeed(speedX, speedY) {
            this.speedX = speedX;
            this.speedY = speedY;
        }
    }