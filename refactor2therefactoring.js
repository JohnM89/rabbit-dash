const tileSize = 32;
const ROWS = 15;
const COLUMNS = 10;
const gameHeight = tileSize * COLUMNS
const gameWidth = tileSize * ROWS
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
            this.width = tileSize;
            this.height = tileSize;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 0;
            this.speedX = 0;
            this.speedY = 0;
            this.maxSpeed = 2;
            //standard frame rate 
            this.fps = 60;
            //calculates the time interval between frames based on fps
            //divide fps by 1000(milliseconds btw) which gives 16.5 milliseconds for each frame duration
            //keeps everything from drawing all at once
            //2000 ms looks better actually
            this.frameInterval = 2000 / this.fps;
            this.frameTimer = 0;
        }
        draw(ctx) {
            //context aka ctx and deltaTime
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
            this.collisionX = this.x + (this.tileSize - this.collisionWidth) / 2;
            this.collisionY = this.y + (this.tileSize - this.collisionHeight) / 2
            this.collisionWidth = this.tileSize / 2;
            this.collisionHeight = this.tileSize / 2;


        }
        //test
        hitbox(ctx) {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.collisionX, this.collisionY, this.collisionWidth, this.collisionHeight);

        }
        update(deltaTime) {
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
                this.setSpeed(0, -this.maxSpeed * 0.6);
                this.maxFrame = 7;
                this.frameY = 3;
            } else if (this.game.lastKey == 'RArrowUp' && this.speedY < 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 3;
            } else if (this.game.lastKey == 'PArrowDown') {
                this.setSpeed(0, this.maxSpeed * 0.6);
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
            // horizontal boundaries
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
            // deltaTime which is (timeStamp - last time), gives context to framerTimer
            //since its continuously called by the animate function every frame
            //and framerTimer 
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
        hitbox(ctx) {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.collisionX, this.collisionY, this.collisionWidth, this.collisionHeight);


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
                // this.maxFrame = 2;
                // this.frameY = 2;
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
                // this.maxFrame = 2;
                // this.frameY = 3;
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
                // this.maxFrame = 2;
                // this.frameY = 1;
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

                // this.maxFrame = 2;
                // this.frameY = 0;
            }
            this.x += this.speedX;
            this.y += this.speedY;
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

    class Grass extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "grass2.jpg";
            this.spriteWidth = tileSize;
            this.spriteHeight = tileSize;
            this.frameX = 0;
            this.frameY = 1;
            this.x = x
            this.y = y
            this.frameInterval = 25000 / this.fps;
        }
        update(deltaTime) {
            this.maxFrame = 9;
            this.frameY = 10;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }

        }
    }
    class AltGrass extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "grass.png";
            this.spriteWidth = 32;
            this.spriteHeight = 32;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.frameInterval = 25000 / this.fps;
        }
        update(deltaTime) {


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
        hitbox(ctx) {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.collisionX, this.collisionY, this.collisionWidth, this.collisionHeight);

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
        hitbox(ctx) {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.collisionX, this.collisionY, this.collisionWidth, this.collisionHeight);

        }
        update(deltaTime) {


        }
    }

    class Burrow extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "farmerTEMP.png"
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
        hitbox(ctx) {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.collisionX, this.collisionY, this.collisionWidth, this.collisionHeight);

        }
        update(deltaTime) {


        }


    }

    class World0 extends Animation {
        constructor(game) {
            super(game)
            this.image = new Image();
            this.image.src = "tilemap1simple.png"
            this.levelImage = this.image
            this.imageColumns = this.levelImage.width / tileSize;
            this.level = [
                1, 2, 2, 3, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
    class World1 extends Animation {
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
    class World2 extends Animation {
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
    class World3 extends Animation {
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
            this.staminaTile = []
            this.level = 0
            this.carrotTimer = 0;
            this.carrotInterval = 1000;
            this.lastKey = undefined;
            this.input = new InputHandler(this);
            this.animation = new Animation(this);
            this.rabbit = new Rabbit(this);
            this.grass = []
            this.carrots = []
            this.babyCarrots = []
            this.enemies = []
            this.portals = []
            this.portalCount = 0
            this.randomInt = 0
            this.countdownInterval = 10000;
            this.time = document.querySelector("#time");
            this.score = document.querySelector("#score");
            this.scoreIncrement = 0
            this.score.textContent = parseInt(0);
            this.setTimer()

        }

        render(ctx, deltaTime) {
            this.gameObjects = [...this.grass, ...this.portals, ...this.babyCarrots, ...this.carrots, ...this.enemies, this.rabbit];
            this.checkCollision();
            this.spawnCarrot(deltaTime)
            this.spawnEnemy(deltaTime)
            this.carrotGrow();
            this.checkLevel();
            //determines draw order by height 
            // this.gameObjects.sort((a,b) => {
            //     return (a.y + a.height) - (b.y + b.height);
            // });
            this.gameObjects.forEach(obj => {
                obj.draw(ctx);
                obj.hitbox(ctx);
                obj.update(deltaTime);
            })

        }
        checkLevel() {
            if (this.portalCount > 2 && this.portals.length <= 0) {
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
                    this.countdownInterval += 4000;
                    this.score.textContent++;
                    this.portalCount++;
                    this.carrots.splice(index, 1);
                }
            });

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
                    this.grass = [];
                    this.carrots = [];
                    this.enemies = [];
                    this.babyCarrots = [];
                    if (this.level === 1) {
                        this.grass.push(new World1(this));
                    } else if (this.level === 2) {
                        this.grass.push(new World2(this));
                    } else if (this.level === 3) {
                        this.grass.push(new World3(this));
                    } else if (this.level === 4) {
                        this.grass.push(new World0(this));
                        this.level = 0;
                    }
                }
            });
        }

        init() {
            this.grass.push(new World0(this))
        }
        setTimer() {
            const timer = setInterval(() => {
                this.countdownInterval -= 10;
                this.time.textContent = this.countdownInterval
                if (this.countdownInterval <= 0) {
                    clearInterval(timer);
                    console.log("game over")
                    // this.endGame()
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
                this.babyCarrots.push(new BabyCarrot(this, x, y))
                this.carrotTimer = 0;
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
                this.spawnScheduled = true;
                let x = Math.floor(Math.random() * ROWS) * tileSize;
                let y = Math.floor(Math.random() * COLUMNS) * tileSize;
                setTimeout(() => {
                    this.enemies.push(new Farmer(this, x, y))
                    console.log('spawned')
                    this.spawnScheduled = false;
                }, 1000)
                this.scoreIncrement = 0;

            } else {
                this.carrotIncrement += deltaTime;
            }
        }
    }


    // //test class

    const game = new Game(canvas.width, canvas.height);

    game.init();


    //animation function
    // set lasttime to 0
    let lastTime = 0;
    //timestamp is handled by requestAnimationFrame API
    function animate(timeStamp) {
        // console.log(timeStamp)
        // completion time in seconds since the last frame is the current time minus the last time
        const deltaTime = timeStamp - lastTime;
        // then set last time to time stamp to update last time
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //pass delta time to render for frame context
        game.render(ctx, deltaTime)

        //use requestAnimationFrame (in lieu of setInterval or something) and pass it the animate function as an arg
        //call it inside the function to ensure the loop
        requestAnimationFrame(animate);

    }
    //when you use requestAnimationFrame the argument passed by requestAnimationFrame is always a timestamp !ALWAYS!
    //can use requestAnimationFrame again here instead of animate 0 which sets timeStamp
    requestAnimationFrame(animate);
    // animate(0)
    // let newGame = new Game('#canvasId');
});