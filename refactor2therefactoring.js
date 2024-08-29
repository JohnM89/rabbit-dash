const tileSize = 32;
const ROWS = 10;
const COLUMNS = 15;
const gameHeight = tileSize * ROWS
const gameWidth = tileSize * COLUMNS

window.addEventListener('load', function () {
    const canvas = document.querySelector('#canvasId');
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false
    canvas.height = gameHeight
    canvas.width = gameWidth
        class InputHandler {
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
    class Animation {
        constructor(game) {
            this.game = game;
            this.tileSize = tileSize
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
        // hitbox(ctx) {
        //     ctx.fillStyle = 'black';
        //     ctx.fillRect(this.collisionX, this.collisionY, this.collisionWidth, this.collisionHeight);
        // }
        setSpeed(speedX, speedY) {
            this.speedX =  speedX ;
            this.speedY = speedY ;
        }
    }
    class Rabbit extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image.src = "bunnysheet.png";
            this.spriteWidth = 36.2;
            this.spriteHeight = 39;
            this.frameX = 0;
            this.frameY = 1;
            this.x = 0;
            this.y = 0;
            this.maxSpeed = 2
            this.collisionWidth = this.tileSize / 2;
            this.collisionHeight = this.tileSize / 2;
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2
            this.hitBox ={
            x : this.collisionX,
            y : this.collisionY,
            w : this.collisionWidth,
            h : this.collisionHeight,
            }
        }

        update(deltaTime) {

            const prevX = this.x;
            const prevY = this.y;
            let previousKey = this.game.lastKey
            if (this.game.lastKey == 'PArrowLeft') {
                this.setSpeed(-this.maxSpeed, 0);
                this.maxFrame = 3;
                this.frameY = 7;
            } else if (this.game.lastKey == 'RArrowLeft' && this.speedX < 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 7;
            } else if (this.game.lastKey == 'PArrowRight') {
                this.setSpeed(this.maxSpeed, 0);
                this.maxFrame = 3;
                this.frameY = 5;
            } else if (this.game.lastKey == 'RArrowRight' && this.speedX > 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 5;
            } else if (this.game.lastKey == 'PArrowUp') {
                this.setSpeed(0, -this.maxSpeed);
                this.maxFrame = 7;
                this.frameY = 3;
            } else if (this.game.lastKey == 'RArrowUp' && this.speedY < 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 3;
            } else if (this.game.lastKey == 'PArrowDown') {
                this.setSpeed(0, this.maxSpeed);
                this.maxFrame = 7;
                this.frameY = 1;
            } else if (this.game.lastKey == 'RArrowDown' && this.speedY > 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 1;
            }
 
                this.x += this.speedX;
                this.y += this.speedY;
                            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;

            const collides = this.game.impassable.some((obj) => {
                const [tileX, tileY, tileWidth, tileHeight] = obj;
                return (this.collisionX + .5) < tileX + tileWidth &&
                    (this.collisionX + .5) + (this.collisionWidth + .5) > tileX &&
                    (this.collisionY + .5) < tileY + tileHeight &&
                    (this.collisionY + .5) + (this.collisionHeight + .5) > tileY;
            });

            if (collides) {
                this.maxFrame = 0
                 this.setSpeed(0, 0);
                if(previousKey ===  'PArrowLeft'){
                    this.x = prevX +2
                    this.y = prevY
                }
                if(previousKey ===  'PArrowRight'){
                    this.x = prevX -2
                    this.y = prevY
                }
                if(previousKey ===  'PArrowUp'){
                    this.y = prevY +2
                    this.x = prevX
                }
                if(previousKey ===  'PArrowDown'){
                    this.y = prevY -2
                    this.x = prevX
                }
                if(previousKey ===  'RArrowLeft'){
                    this.x = prevX +2
                    this.y = prevY
                }
                if(previousKey ===  'RArrowRight'){
                    this.x = prevX -2
                    this.y = prevY
                }
                if(previousKey ===  'RArrowUp'){
                    this.y = prevY +2
                    this.x = prevX
                }
                if(previousKey ===  'RArrowDown'){
                    this.y = prevY -2
                    this.x = prevX
                }
                             
            }
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2;
            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > this.game.width - this.width) {
                this.x = this.game.width - this.width;
            }
            //vertical
            if (this.y < 0) {
                this.y = 0;
            } else if (this.y > this.game.height - this.height) {
                this.y = this.game.height - this.height;
            }
            
            //frame animation
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    class Farmer extends Animation {
        constructor(game, x, y) {
            super(game)
            this.x = x
            this.y = y
            this.image = new Image();
            this.image.src = "imnotevensure.png";
            this.spriteWidth = 64;
            this.spriteHeight = 64;
            this.width = this.spriteWidth;
            this.height = this.spriteHeight;
            this.frameX = 0;
            this.frameY = 0;
            this.collisionWidth = this.spriteWidth / 3;
            this.collisionHeight = this.spriteHeight / 2;
            this.collisionX = this.x + (this.width - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.height - this.collisionHeight) / 1.5;
            this.frameInterval = 48000 / this.fps;
            this.randomInt = 0
            this.steps = 0;
            this.loop = 0
        }
        random(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.randomInt = Math.floor(Math.random() * 4) + 1
                this.steps = Math.floor(Math.random() * 5) + 1
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
        update(deltaTime) {
            const prevX = this.x;
            const prevY = this.y;
            if (this.randomInt == 1) {
                if (this.frameTimer > this.frameInterval) {
                    if (this.loop < this.steps) {
                        this.setSpeed(-tileSize / 80, 0)
                        this.maxFrame = 8;
                        this.frameY = 9;
                        this.loop++
                    } else {
                        this.setSpeed(0, 0)
                        this.maxFrame = 0;
                        this.frameY = 9
                        this.frameTimer = 0;
                        this.loop = 0
                    }

                } else {
                    this.frameTimer += deltaTime
                }
            } else if (this.randomInt == 2) {

                if (this.frameTimer > this.frameInterval) {
                    if (this.loop < this.steps) {
                        this.setSpeed(tileSize / 80, 0)
                        this.maxFrame = 8;
                        this.frameY = 11;
                        this.loop++
                    } else {
                        this.setSpeed(0, 0)
                        this.maxFrame = 0;
                        this.frameY = 11;
                        this.frameTimer = 0;
                        this.loop = 0
                    }
                } else {
                    this.frameTimer += deltaTime
                }
            } else if (this.randomInt == 3) {

                if (this.frameTimer > this.frameInterval) {
                    if (this.loop < this.steps) {
                        this.setSpeed(0, -tileSize / 80 * 0.6)
                        this.maxFrame = 8;
                        this.frameY = 8;
                        this.loop++
                    } else {
                        this.setSpeed(0, 0)
                        this.maxFrame = 0;
                        this.frameY = 8;
                        this.frameTimer = 0;
                        this.loop = 0
                    }

                } else {
                    this.frameTimer += deltaTime
                }
            } else if (this.randomInt == 4) {
                if (this.frameTimer > this.frameInterval) {
                    if (this.loop < this.steps) {
                        this.setSpeed(0, tileSize / 80 * 0.6)
                        this.maxFrame = 8;
                        this.frameY = 10;
                        this.loop++
                    } else {
                        this.setSpeed(0, 0)
                        this.maxFrame = 0;
                        this.frameY = 10;
                        this.frameTimer = 0;
                        this.loop = 0
                    }
                } else {
                    this.frameTimer += deltaTime
                }
            }
            this.x += this.speedX;
            this.y += this.speedY;
            this.collisionX = this.x + (this.width - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.height - this.collisionHeight) / 1.5;
            // this.random(deltaTime)
            const collides = this.game.impassable.some((obj) => {
                const [tileX, tileY, tileWidth, tileHeight] = obj;
                return (this.collisionX ) < tileX + tileWidth &&
                    (this.collisionX ) + (this.collisionWidth ) > tileX &&
                    (this.collisionY ) < tileY + tileHeight &&
                    (this.collisionY ) + (this.collisionHeight ) > tileY;
            });
            if (collides) {
                this.maxFrame = 0
                 this.setSpeed(0, 0)
                if(this.randomInt ===  1){
                    this.x = prevX +2
                    this.y = prevY
                    this.randomInt = 2
                }
                if(this.randomInt ===  2){
                    this.x = prevX -2
                    this.y = prevY
                    this.randomInt = 1
                }
                if(this.randomInt ===  3){
                    this.y = prevY +2
                    this.x = prevX
                    this.randomInt = 4
                }
                if(this.randomInt ===  4){
                    this.y = prevY -2
                    this.x = prevX
                    this.randomInt = 3
                }

            }
            this.collisionX = this.x + (this.width - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.height - this.collisionHeight) / 1.5;
            this.random(deltaTime)
            // horizontal boundaries
            if (this.x < 0) {
                this.x = 0;
                //STOP ANIMATING IF HIT BORDER
                this.maxFrame = 0;
            } else if (this.x > this.game.width - this.width) {
                this.x = this.game.width - this.width;
                this.maxFrame = 0;
            }
            //vertical
            if (this.y < 0) {
                this.y = 0;
                this.maxFrame = 0;
            } else if (this.y > this.game.height - this.height) {
                this.y = this.game.height - this.height;
                this.maxFrame = 0;
            }
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }
        }
    }
    class BabyCarrot extends Animation {
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
    class Carrot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrot3.png"
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
    class Burrow extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "crops32.png"
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
    class World0 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image1 = new Image();
            this.image1.src = "tilemap1simpleTOP.png"
            this.image.src = "tilemap1simple.png"
            this.levelTOP = this.image1
            this.levelImage = this.image
            this.imageColumns = this.levelImage.width / tileSize;
            this.level = [
                14, 0, 14, 14, 14, 14, 0, 14, 14, 14, 14, 14, 14, 14, 14,
                1, 2, 2, 2, 3, 14, 14, 14, 14, 14, 14, 14, 14, 9, 14,
                6, 7, 7, 7, 8, 9, 14, 10, 10, 14, 14, 9, 14, 0, 14,
                6, 7, 7, 7, 8, 0, 10, 14, 14, 14, 14, 14, 14, 14, 14,
                6, 7, 7, 7, 21, 3,14 , 14, 1, 2, 2, 2, 3, 14, 14,
                6, 7, 7, 7, 7, 21, 3, 14, 6, 7, 7, 7, 21, 3, 14,
                6, 0, 7, 7, 7, 7, 8, 14, 6, 0, 7, 7, 7, 21, 3,
                6, 7, 7, 24, 7, 7, 8, 14, 6, 7, 7, 7, 7, 7, 8,
                6, 7, 0, 7, 24, 7, 8, 14, 6 , 7, 7, 7, 0, 7, 8,
                11, 12, 12, 12, 12, 12, 13, 14, 11, 12, 12, 12, 12, 12, 13,
            ]
            this.groundObjects = [
              0,15,0,0,0,0,9,0,0,0,0,0,0,0,0,
              0,0,0,0,0,0,0,0,0,0,0,0,0,9,0, 
              0,0,0,0,0,9,0,10,10,0,0,9,0,15,0, 
              0,0,0,0,0,15,10,0,0,0,0,0,0,0,0, 
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
              0,23,0,0,0,0,0,0,0,23,0,0,0,0,0, 
              0,0,0,24,0,0,0,0,0,0,0,0,0,0,0, 
              0,0,23,0,24,0,0,0,0,0,0,0,18,0,0, 
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
 
            ]
            this.animated = []
            this.background = [
              0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,
              0,0,0,0,0,4,0,5,5,0,0,4,0,0,0, 
              0,0,0,0,0,0,5,0,0,0,0,0,0,0,0, 
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
              0,23,0,19,0,0,0,0,0,23,0,0,0,0,0, 
              0,0,0,0,19,0,0,0,0,0,0,0,0,0,0, 
              0,0,23,0,0,0,0,0,0,0,0,0,0,0,0, 
              0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 
  
            ]
            //for top layers            
        }
        getTile(levelImage, col, row) {
            return levelImage[row * COLUMNS + col]
        }
        drawBackground(ctx) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.level, col, row);
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        draw(ctx) {
            this.game.impassable = [];
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.groundObjects, col, row);
                    // const x = col * tileSize;
                    // const y = row * tileSize;
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                    if (tile !== 0) {
                        // ctx.fillStyle = 'black';
                        // ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
                        this.game.impassable.push([col * tileSize, row * tileSize, tileSize, tileSize])
                    }
                }
            }
        }
        drawAnimatedTile(ctx) {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.animated, col, row);
                    ctx.drawImage(this.levelTOP, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        drawForGround(ctx){
                    for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.background, col, row);
                    // const x = col * tileSize;
                    // const y = row * tileSize;
                    ctx.drawImage(this.levelTOP, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }        
        }
        update(deltaTime) {
        }
    }
    class World1 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image.src = "tilemap1simple.png"
            this.levelImage = this.image
            this.imageColumns = this.levelImage.width / tileSize;
            this.level = [
                14, 15, 14, 14, 14, 14, 9, 14, 14, 14, 14, 14, 14, 4, 14,
                1, 2, 2, 2, 3, 4, 14, 5, 5, 14, 14, 4, 14, 9, 14,
                6, 7, 7, 7, 8, 9, 5, 10, 10, 14, 14, 9, 14, 15, 14,
                6, 7, 7, 7, 8, 15, 10, 14, 14, 14, 14, 14, 14, 14, 14,
                6, 7, 7, 7, 21, 3,14 , 14, 1, 2, 2, 2, 3, 14, 14,
                6, 7, 7, 7, 7, 21, 3, 14, 6, 7, 7, 7, 21, 3, 14,
                6, 23, 7, 19, 7, 7, 8, 14, 6, 23, 7, 7, 7, 21, 3,
                6, 7, 7, 24, 19, 7, 8, 14, 6, 7, 7, 7, 7, 7, 8,
                6, 7, 23, 7, 24, 7, 8, 14, 6 , 7, 7, 7, 18, 7, 8,
                11, 12, 12, 12, 12, 12, 13, 14, 11, 12, 12, 12, 12, 12, 13,
            ]
        }
        getTile(levelImage, col, row) {
            return levelImage[row * COLUMNS + col]
        }
        draw() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.level, col, row);
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        update(deltaTime) {

        }

    }
    class World2 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image.src = "tilemap1simple.png"
            this.levelImage = this.image
            this.imageColumns = this.levelImage.width / tileSize;
            this.level = [
                14, 15, 14, 14, 14, 14, 9, 14, 14, 14, 14, 14, 14, 4, 14,
                1, 2, 2, 2, 3, 4, 14, 5, 5, 14, 14, 4, 14, 9, 14,
                6, 7, 7, 7, 8, 9, 5, 10, 10, 14, 14, 9, 14, 15, 14,
                6, 7, 7, 7, 8, 15, 10, 14, 14, 14, 14, 14, 14, 14, 14,
                6, 7, 7, 7, 21, 3,14 , 14, 1, 2, 2, 2, 3, 14, 14,
                6, 7, 7, 7, 7, 21, 3, 14, 6, 7, 7, 7, 21, 3, 14,
                6, 23, 7, 19, 7, 7, 8, 14, 6, 23, 7, 7, 7, 21, 3,
                6, 7, 7, 24, 19, 7, 8, 14, 6, 7, 7, 7, 7, 7, 8,
                6, 7, 23, 7, 24, 7, 8, 14, 6 , 7, 7, 7, 18, 7, 8,
                11, 12, 12, 12, 12, 12, 13, 14, 11, 12, 12, 12, 12, 12, 13,
            ]
        }
        getTile(levelImage, col, row) {
            return levelImage[row * COLUMNS + col]
        }
        draw() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.level, col, row);
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        update(deltaTime) {

        }

    }
    class World3 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image.src = "tilemap1simple.png"
            this.levelImage = this.image
            this.imageColumns = this.levelImage.width / tileSize;
            this.level = [
                14, 15, 14, 14, 14, 14, 9, 14, 14, 14, 14, 14, 14, 4, 14,
                1, 2, 2, 2, 3, 4, 14, 5, 5, 14, 14, 4, 14, 9, 14,
                6, 7, 7, 7, 8, 9, 5, 10, 10, 14, 14, 9, 14, 15, 14,
                6, 7, 7, 7, 8, 15, 10, 14, 14, 14, 14, 14, 14, 14, 14,
                6, 7, 7, 7, 21, 3,14 , 14, 1, 2, 2, 2, 3, 14, 14,
                6, 7, 7, 7, 7, 21, 3, 14, 6, 7, 7, 7, 21, 3, 14,
                6, 23, 7, 19, 7, 7, 8, 14, 6, 23, 7, 7, 7, 21, 3,
                6, 7, 7, 24, 19, 7, 8, 14, 6, 7, 7, 7, 7, 7, 8,
                6, 7, 23, 7, 24, 7, 8, 14, 6 , 7, 7, 7, 18, 7, 8,
                11, 12, 12, 12, 12, 12, 13, 14, 11, 12, 12, 12, 12, 12, 13,
            ]
        }
        getTile(levelImage, col, row) {
            return levelImage[row * COLUMNS + col]
        }
        draw() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.level, col, row);
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        update(deltaTime) {

        }

    }
        class World4 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image.src = "tilemap1simple.png"
            this.levelImage = this.image
            this.imageColumns = this.levelImage.width / tileSize;
            this.level = [
                1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            ]
        }
        getTile(levelImage, col, row) {
            return levelImage[row * COLUMNS + col]
        }
        draw() {
            for (let row = 0; row < ROWS; row++) {
                for (let col = 0; col < COLUMNS; col++) {
                    const tile = this.getTile(this.level, col, row);
                    ctx.drawImage(this.levelImage, ((tile - 1) * tileSize) % this.levelImage.width, Math.floor((tile - 1) / this.imageColumns) * tileSize, tileSize, tileSize, col * tileSize, row * tileSize, tileSize, tileSize);
                }
            }
        }
        update(deltaTime) {

        }

    }
    class Game {

        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.gameObjects = [];
            this.gameTiles = [];
            this.animatedTiles = []
            this.staminaTile = []
            this.level = 0
            this.carrotTimer = 0;
            this.carrotInterval = 1000;
            this.lastKey = undefined;
            this.input = new InputHandler(this);
            this.animation = new Animation(this);
            this.rabbit = new Rabbit(this);
            this.tiles = []
            this.carrots = []
            this.babyCarrots = []
            this.enemies = []
            this.portals = []
            this.impassable = []
            this.gameOver = false

            this.portalCount = 0
            this.randomInt = 0
            this.countdownInterval = 50000;
            this.time = document.querySelector("#time");
            this.score = document.querySelector("#score");
            this.scoreIncrement = 0
            this.score.textContent = parseInt(0);
            this.setTimer(ctx)
        }
        render(ctx, deltaTime) {
            this.tiles.forEach(tile => tile.drawBackground(ctx));
            this.gameObjects = [...this.tiles, ...this.portals, ...this.babyCarrots, ...this.carrots, ...this.enemies, this.rabbit];
            
            this.checkCollision();
            this.spawnCarrot(deltaTime)
            this.spawnEnemy(deltaTime)
            this.carrotGrow();
            this.checkLevel();
            this.gameObjects.sort((a,b) => {
                return (a.y + a.height) - (b.y + b.height);
            });
            this.gameObjects.forEach(obj => {
                obj.draw(ctx);
                // obj.hitbox(ctx);
                obj.update(deltaTime);
            })
            this.tiles.forEach(tile => tile.drawForGround(ctx));

        }
        checkLevel() {
            if (this.portalCount > 2 && this.portals.length === 0) {
                let x = Math.floor(Math.random() * ROWS) * tileSize;
                let y = Math.floor(Math.random() * COLUMNS) * tileSize;
                this.portals.push(new Burrow(this, x, y))
            }
        }

        checkCollision() {
            this.carrots.forEach((obj, index) => {
                    //useing colission coordinates for hitbox
                if (this.rabbit.collisionX < obj.collisionX + obj.collisionWidth &&
                    this.rabbit.collisionX + this.rabbit.collisionWidth > obj.collisionX &&
                    this.rabbit.collisionY < obj.collisionY + obj.collisionHeight &&
                    this.rabbit.collisionY + this.rabbit.collisionHeight > obj.collisionY) {
                    this.countdownInterval += 2000;
                    this.score.textContent++;
                    this.portalCount++;
                    this.carrots.splice(index, 1);
                }
            });

            this.impassable.forEach((obj) =>{
                 const [tileX, tileY, tileWidth, tileHeight] = obj
                    if (this.rabbit.collisionX < tileX + tileWidth &&
                        this.rabbit.collisionX + this.rabbit.collisionWidth > tileX &&
                        this.rabbit.collisionY < tileY + tileHeight &&
                        this.rabbit.collisionY + this.rabbit.collisionHeight > tileY){
                            console.log("colission")
 
                        }
            })

            this.enemies.forEach((obj) => {
                if (this.rabbit.collisionX < obj.collisionX + obj.collisionWidth &&
                    this.rabbit.collisionX + this.rabbit.collisionWidth > obj.collisionX &&
                    this.rabbit.collisionY < obj.collisionY + obj.collisionHeight &&
                    this.rabbit.collisionY + this.rabbit.collisionHeight > obj.collisionY) {
                    this.countdownInterval -= 4000;
                    this.score.textContent--;
                }
            });


            this.portals.forEach((obj, index) => {
                if (this.rabbit.collisionX < obj.collisionX + obj.collisionWidth &&
                    this.rabbit.collisionX + this.rabbit.collisionWidth > obj.collisionX &&
                    this.rabbit.collisionY < obj.collisionY + obj.collisionHeight &&
                    this.rabbit.collisionY + this.rabbit.collisionHeight > obj.collisionY) {
                    this.level++;
                    this.portals.splice(index, 1);
                    this.tiles = [];
                    this.carrots = [];
                    this.enemies = [];
                    this.babyCarrots = [];
                    this.impassable = []
                    if (this.level === 1) {
                        this.tiles.push(new World1(this));
                    } else if (this.level === 2) {
                        this.tiles.push(new World2(this));
                    } else if (this.level === 3) {
                        this.tiles.push(new World3(this));
                    } else if (this.level === 4) {
                        this.tiles.push(new World0(this));
                        this.level = 0;
                    }
                }
            });
        }

        init() {
            this.tiles.push(new World0(this))
        }
        setTimer() {
            const timer = setInterval(() => {
                this.countdownInterval -= 10;
                this.time.textContent = this.countdownInterval
                if (this.countdownInterval <= 0) {
                    clearInterval(timer);
                    console.log("game over")
                    this.gameOver = true



                }
            })
        }

        addScore() {
            this.score.textContent++
        }
        spawnCarrot(deltaTime) {
            if (this.carrotTimer > this.carrotInterval && this.carrots.length < 10) {
                let x = Math.floor(Math.random() * ROWS) * tileSize;
                let y = Math.floor(Math.random() * COLUMNS) * tileSize;
                let tileX = x / tileSize;
                let tileY = y / tileSize;
                let tile = this.tiles[0].getTile(this.tiles[0].groundObjects, tileX, tileY);

                if (tile === 0) { 
                    this.babyCarrots.push(new BabyCarrot(this, x, y));
                    this.carrotTimer = 0;
                }
                
            } else {
                this.carrotTimer += deltaTime;
            }
        }
        carrotGrow() {
            this.babyCarrots.forEach((carrot, index) => {
                if (carrot.frameY === 3) {
                    let x = carrot.x
                    let y = carrot.y
                    this.carrots.push(new Carrot(this, x, y))
                    this.babyCarrots.splice(index, 1)
                }
            })
        }
        spawnEnemy(deltaTime) {
            if (this.enemies.length < 2 && !this.spawnScheduled) {
                let x = Math.floor(Math.random() * ROWS) * tileSize;
                let y = Math.floor(Math.random() * COLUMNS) * tileSize;
                let tileX = x / tileSize;
                let tileY = y / tileSize;
                let tile = this.tiles[0].getTile(this.tiles[0].groundObjects, tileX, tileY);
                if (tile === 0) {
                    this.spawnScheduled = true;
                setTimeout(() => {
                    this.enemies.push(new Farmer(this, x, y))
                    console.log('spawned')
                    this.spawnScheduled = false;                    
                }, 1000)
                this.scoreIncrement = 0;
                }               
                console.log('spawned?')               
            } else {
                this.carrotIncrement += deltaTime;
            }
        }
    }
    const game = new Game(canvas.width, canvas.height);
    game.init();
    let lastTime = 0;
    //timestamp is handled by requestAnimationFrame API
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx, deltaTime)
        requestAnimationFrame(animate);

    }
    requestAnimationFrame(animate);
});