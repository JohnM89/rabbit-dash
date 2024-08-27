const tileSize = 40;
const row = 10;
const column = 10;
const gameHeight = tileSize * column
const gameWidth = tileSize * row
window.addEventListener('load', function () {
    const canvas = document.querySelector('#canvasId');
    const ctx = canvas.getContext("2d");
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
            // this.spriteWidth = 36;
            // this.spriteHeight = 39.5;
            this.width = tileSize;
            this.height = tileSize;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 0;
            // this.width = this.spriteWidth;
            // this.height = this.spriteHeight;
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
            this.collisionX = this.x;
            this.collisionY = this.y;
            this.collisionWidth = this.spriteWidth;
            this.collisionHeight = this.spriteHeight;
            this.grid = tileSize;

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
            this.image.src = "farmerTemp.png";
            this.spriteWidth = 95;
            this.spriteHeight = 80;
            this.frameX = 0;
            this.frameY = 0;
            this.collisionX = this.x;
            this.collisionY = this.y;
            this.collisionWidth = this.spriteWidth;
            this.collisionHeight = this.spriteHeight;
            this.frameInterval = 8000 / this.fps;
            this.randomInt = 0;
            this.steps = 0;
        }
        random(){
            this.randomInt = Math.floor(Math.random() * 4) + 1
        }
        update(deltaTime) {

            if (this.randomInt == 1) {
                this.setSpeed(-this.maxSpeed, 0);
                this.maxFrame = 2;
                this.frameY = 2;
            } else if (this.randomInt == 1 && this.speedX < 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 2;
            } else if (this.randomInt == 2) {
                this.setSpeed(this.maxSpeed, 0);
                this.maxFrame = 2;
                this.frameY = 3;
            } else if (this.randomInt == 2 && this.speedX > 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 3;
            } else if (this.randomInt == 3) {
                this.setSpeed(0, -this.maxSpeed * 0.6);
                this.maxFrame = 2;
                this.frameY = 1;
            } else if (this.randomInt == 3 && this.speedY < 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 1;
            } else if (this.randomInt == 4) {
                this.setSpeed(0, this.maxSpeed * 0.6);
                this.maxFrame = 2;
                this.frameY = 0;
            } else if (this.randomInt == 4 && this.speedY > 0) {
                this.setSpeed(0, 0);
                this.maxFrame = 0;
                this.frameY = 0;
            }
            this.x += this.speedX;
            this.y += this.speedY;
            this.random()
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

    class BabyCarrot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrotTEMP.png"
            this.spriteWidth = 92.5;
            this.spriteHeight = 50;
            // this.width = 20;
            // this.height = 20;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.collisionX = this.x;
            this.collisionY = this.y;
            this.collisionWidth = this.spriteWidth;
            this.collisionHeight = this.spriteHeight;
            this.frameInterval = 50000 / this.fps;

        }
        update(deltaTime) {
            this.maxFrame = 2;
            this.frameY = 1;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 2;
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
            this.image.src = "carrotTEMP.png"
            this.spriteWidth = 92.5;
            this.spriteHeight = 50;
            // this.width = 20;
            // this.height = 20;
            this.frameX = 2;
            this.frameY = 1;
            this.x = x
            this.y = y
            this.collisionX = this.x;
            this.collisionY = this.y;
            this.collisionWidth = this.spriteWidth;
            this.collisionHeight = this.spriteHeight;
            this.frameInterval = 15000 / this.fps;

        }
        update(deltaTime) {
            // this.maxFrame = 2;
            // this.frameY = 1;
            // if (this.frameTimer > this.frameInterval) {
            //     this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
            //     this.frameTimer = 0;
            // } else {
            //     this.frameTimer += deltaTime
            // }

        }
    }

    class Game {

        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.gameObjects = [];
            this.gameTiles = [];
            this.staminaTile = []
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
            this.countdownInterval = 10000;
            this.time = document.querySelector("#time");
            this.score = document.querySelector("#score");
            this.scoreIncrement = 0
            this.score.textContent = parseInt(0);
            this.setTimer()

        }

        render(ctx, deltaTime) {
            this.gameObjects = [...this.grass, ...this.babyCarrots, ...this.carrots, ...this.enemies, this.rabbit];
            this.checkCollision();
            this.spawnCarrot(deltaTime)
            this.spawnEnemy(deltaTime)
            this.carrotGrow();
            //determines draw order by height 
            // this.gameObjects.sort((a,b) => {
            //     return (a.y + a.height) - (b.y + b.height);
            // });
            this.gameObjects.forEach(obj => {
                obj.draw(ctx);
                obj.update(deltaTime);
            })

        }
        checkCollision() {
            this.carrots.forEach((obj, index) => {
                if (this.rabbit.x < obj.x + obj.width &&
                    this.rabbit.x + this.rabbit.width > obj.x &&
                    this.rabbit.y < obj.y + obj.height &&
                    this.rabbit.y + this.rabbit.height > obj.y) {
                    this.countdownInterval += 4000
                    this.score.textContent++
                    this.carrots.splice(index, 1)
                }
            }
            )
            this.enemies.forEach((obj) =>{
                if (this.rabbit.x < obj.x + obj.width &&
                    this.rabbit.x + this.rabbit.width > obj.x &&
                    this.rabbit.y < obj.y + obj.height &&
                    this.rabbit.y + this.rabbit.height > obj.y)
                    {
                    this.countdownInterval -= 4000
                    this.score.textContent--

                    }

            })

        }
        init() {
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 10; y++) {
                    this.gameTiles.push([y * tileSize, x * tileSize])
                }
            }
            // colour tiles
            for (let i = 0; i < this.gameTiles.length; i++) {
                //capture x & y
                const [x, y] = this.gameTiles[i]
                // map checkerboard!
                if (Math.floor(i / 10) % 2 === 0 && i % 2 === 0) {
                    this.gameTiles[i].push("White")
                } else if (Math.floor(i / 10) % 2 === 0 && i % 2 !== 0) {
                    this.gameTiles[i].push("Green")
                    this.grass.push(new Grass(this, x, y))
                } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 !== 0) {
                    this.gameTiles[i].push("White")
                } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 === 0) {
                    this.gameTiles[i].push("Green")
                    this.grass.push(new Grass(this, x, y))
                }
            }

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
                let x = Math.floor(Math.random() * row) * tileSize;
                let y = Math.floor(Math.random() * column) * tileSize;
                this.babyCarrots.push(new BabyCarrot(this, x, y))
                this.carrotTimer = 0;
            } else {
                this.carrotTimer += deltaTime;
            }
        }
        carrotGrow() {
            this.babyCarrots.forEach((carrot, index) => {
                if (carrot.frameTimer === 2) {
                    let x = carrot.x
                    let y = carrot.y
                    this.carrots.push(new Carrot(this, x, y))
                    this.babyCarrots.splice(index, 1)
                }
            })
        }
        spawnEnemy(deltaTime) {
            if (this.enemies.length < 2) {
                let x = Math.floor(Math.random() * row) * tileSize;
                let y = Math.floor(Math.random() * column) * tileSize;
                this.enemies.push(new Farmer(this, x, y))
                console.log('spawned')
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