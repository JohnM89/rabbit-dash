import { Animation } from './Animator.js';
export     class BabyCarrot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/enviornmentSprite/carrot3.png"
            this.spriteWidth = 40;
            this.spriteHeight = 60;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;

        }

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameX = 0;
            if (this.frameTimer > this.frameInterval) {
                this.frameY < this.maxFrame ? this.frameY++ : this.frameY = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
 export            class Pot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrot3.png"
            this.spriteWidth = 40;
            this.spriteHeight = 60;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;

        }

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameY = 0;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
export         class Chest extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrot3.png"
            this.spriteWidth = 40;
            this.spriteHeight = 60;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;

        }

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameX = 0;
            if (this.frameTimer > this.frameInterval) {
                this.frameY < this.maxFrame ? this.frameY++ : this.frameY = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
export         class OpenChest extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrot3.png"
            this.spriteWidth = 40;
            this.spriteHeight = 60;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;

        }

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameX = 0;
            if (this.frameTimer > this.frameInterval) {
                this.frameY < this.maxFrame ? this.frameY++ : this.frameY = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    
export     class Carrot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/enviornmentSprite/carrot3.png"
            this.spriteWidth = 40;
            this.spriteHeight = 60;
            this.frameX = 0;
            this.frameY = 3;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 15000 / this.fps;

        }
        update(deltaTime) {
        }
    }
export    class Burrow extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/enviornmentSprite/crops32.png"
            this.spriteWidth = 32;
            this.spriteHeight = 32;
            this.frameX = 0;
            this.frameY = 9;

            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;
        }
        update(deltaTime) {
        }
    }