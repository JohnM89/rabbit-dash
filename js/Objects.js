import { Animation } from './Animator.js';
export     class BabyCarrot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/enviornmentSprite/cropsNew.png"
            this.spriteWidth = 32;
            this.spriteHeight = 32;
            // this.height = 32
            this.frameX = 5;
            this.frameY = 1;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;

        }

        update(deltaTime) {
            this.maxFrame = 5;
            this.frameX = 5;
            if (this.frameTimer > this.frameInterval) {
                this.frameY < this.maxFrame ? this.frameY++ : this.frameY = 0;
                this.frameTimer = 0;
                if(this.frameY === 4){

                }
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    export     class ScoreSymbol extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/enviornmentSprite/+1.png"
            this.spriteWidth = 32;
            this.spriteHeight = 32;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.speed = 5
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 20000 / this.fps;
            this.markedForDeletion = false;

        }

        update(deltaTime) {
            this.maxFrame = 6;
            this.frameY = 0;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.markedForDeletion = true;
                this.y -= this.speed
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
            this.image.src = "assets/enviornmentSprite/chests.png"
            this.spriteWidth = 32;
            this.spriteHeight = 32;
            this.randomChest = Math.floor(Math.random() * 4)
            this.frameX = 0;
            this.frameY = 4;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;
            this.markedForDeletion = false;

        }

        update(deltaTime) {

    }
}
export         class OpenChest extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/enviornmentSprite/chests.png"
            this.spriteWidth = 32;
            this.spriteHeight = 32;
            this.randomChest = Math.floor(Math.random() * 4)
            this.frameX = 0;
            this.frameY = 5;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 50000 / this.fps;
            this.markedForDeletion = false;

        }

        update(deltaTime) {
            this.maxFrame = 0;
            this.frameX = 0;
            this.frameY = 5
            if (this.frameTimer > this.frameInterval) {
                this.frameY < this.maxFrame ? this.frameY++ : this.markedForDeletion = true;
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
            this.image.src = "assets/enviornmentSprite/cropsNew.png"
            this.spriteWidth = 32;
            this.spriteHeight = 32;
            this.frameX = 5;
            this.frameY = 0;
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
            this.image.src = "assets/enviornmentSprite/cropsNew.png"
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