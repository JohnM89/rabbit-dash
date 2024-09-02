import { Animation } from './Animator.js';
export    class WaterSparkle extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/tileset/sparkle.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 0;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

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
    export    class WaterFallTop extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/tileset/waterfall.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 1;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 7;
            this.frameY = 1;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    export    class WaterFallMid extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/tileset/waterfall.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 0;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 7;
            this.frameY = 2;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    export    class WaterFallBot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/tileset/waterfall.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 0;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 7;
            this.frameY = 3;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    export        class WaterBubbleTop extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/tileset/waterfall.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 0;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameY = 6;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    export    class WaterBubbleBot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "assets/tileset/waterfall.png"
            this.spriteWidth = 16;
            this.spriteHeight = 16;
            this.frameX = 0;
            this.frameY = 0;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.x = x
            this.y = y
            this.collisionWidth = this.tileSize / 4;
            this.collisionHeight = this.tileSize / 4;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            this.frameInterval = 22000 / this.fps;

        }
        

        update(deltaTime) {
            this.maxFrame = 3;
            this.frameY = 7;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }