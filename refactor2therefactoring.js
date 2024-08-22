
window.addEventListener('load', function () {
    const canvas = document.querySelector('#canvasId');
    const ctx = canvas.getContext("2d");
    canvas.height = 400
    canvas.width = 400

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
            this.width = 40;
            this.height = 40;
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
        constructor(game) {
            super(game)
            this.x = this.randomX
            this.y = 400
            this.image = new Image();
            this.image.src = "farmerTemp.png";
        }

    }

    class Grass extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "grass2.jpg";
            this.spriteWidth = 40;
            this.spriteHeight = 40;
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

    class Carrot extends Animation {
        constructor(game, x, y) {
            super(game);
            this.game = game;
            this.image = new Image();
            this.image.src = "carrotTEMP.png"
            this.spriteWidth = 92.5;
            this.spriteHeight = 50;
            this.frameX = 0;
            this.frameY = 0;
            this.x = x
            this.y = y
            this.frameInterval = 15000 / this.fps;

        }
        update(deltaTime) {
            this.maxFrame = 2;
            this.frameY = 1;
            if (this.frameTimer > this.frameInterval) {
                this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime
            }

        }
    }

    class Game {

        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.gameObjects = [];
            this.gameTiles = [];
            this.staminaTile = []
            this.lastKey = undefined;
            this.input = new InputHandler(this);
            this.animation = new Animation(this);
            this.rabbit = new Rabbit(this);
            // this.carrot = new Carrot(this);
            this.grass = []
            this.carrots= []
        }
        render(ctx, deltaTime) {
            this.gameObjects = [...this.grass,...this.carrots, this.rabbit];
            // this.gameObjects.sort((a,b) => {
            //     return (a.y + a.height) - (b.y + b.height);
            // });
            this.gameObjects.forEach(obj => {
                obj.draw(ctx);
                obj.update(deltaTime);
            })

        }
        init() {
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 10; y++) {
                    this.gameTiles.push([y * 40, x * 40])
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
        redTiles() {
            for (let i = 0; i < this.gameTiles.length; i++) {
                let min = 0;
                let max = 10;
                if (Math.floor(Math.random() * (max - min + 1)) + min === 3) {
                    if (this.gameTiles[i][0] <= 360 && this.gameTiles[i][0] >= 40 && this.gameTiles[i][1] <= 360 && this.gameTiles[i][1] >= 40) {
                        let tempTile = structuredClone(this.gameTiles[i])
                        tempTile[2] = "Red"
                        console.log(tempTile)
                        this.staminaTile.push(tempTile)
                    }
                }
            }
            this.staminaTile.forEach(tile => {
                const [x, y] = tile
                console.log(tile)
                this.carrots.push(new Carrot(this, x , y))
                })
        }
    }
    // //test class
    // class Game {

    //     constructor(width, height) {
    //         // super(canvasId);
    //         // this.canvas = new Canvas(canvasId)
    //         // this.ctx = this.canvas.ctx;
    //         this.width = width;
    //         this.height = height;
    //         this.lastKey = undefined;
    //         this.input = new InputHandler(this);
    //         this.animation = new Animation(this);
    //         //

    //         // 
    //         this.gameTiles = [];
    //         this.staminaTile = [];
    //         this.createGameTiles();
    //         this.enemySquareStart()
    //         this.time = document.querySelector("#time");
    //         this.score = document.querySelector("#score");
    //         this.highScore = document.querySelector(".highscores");
    //         this.button.addEventListener("click", () => {
    //             this.canvas.clearCanvas()
    //             this.highScore.insertAdjacentHTML("beforeend", `<li>${this.score.textContent}</li>`)
    //             this.highScore.style.display = "block"
    //         })
    //         this.score.textContent = parseInt(0);
    //         this.rabbit = [0, 0, "White"];
    //         this.farmer1 = [this.randomX, 400];
    //         this.farmer2 = [360, this.randomY];
    //         this.directionalState = true;
    //         this.img1 = new Image();
    //         this.img2 = new Image();
    //         this.img3 = new Image();
    //         this.interval = 1000;
    //         this.countdownInterval = 10000;

    //         this.img1.src = "bunnysheet5.png";
    //         this.img2.src = "carrot.png";
    //         this.img3.src = "fox1.png";
    //         //TODO

    //         //dont start till game begins
    //         this.setTimer()

    //         this.staminaLog = () => console.log(`+10 sec`);
    //         this.eventListener();
    //         //onload method because the script runs before the images is loaded
    //         this.img2.onload = () => this.drawMap();



    //     }
    //     render(context, deltaTime) {

    //     }


    //     createGameTiles() {
    //         for (let x = 0; x < 10; x++) {
    //             for (let y = 0; y < 10; y++) {
    //                 this.gameTiles.push([y * 40, x * 40])
    //             }
    //         }
    //         // Colour tiles
    //         for (let i = 0; i < this.gameTiles.length; i++) {
    //             // map checkerboard!
    //             if (Math.floor(i / 10) % 2 === 0 && i % 2 === 0) {
    //                 this.gameTiles[i].push("White")
    //             } else if (Math.floor(i / 10) % 2 === 0 && i % 2 !== 0) {
    //                 this.gameTiles[i].push("Green")
    //             } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 !== 0) {
    //                 this.gameTiles[i].push("White")
    //             } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 === 0) {
    //                 this.gameTiles[i].push("Green")
    //             }
    //         }
    //     }

    //     drawMap() {
    //         this.gameTiles.forEach(tiles => this.drawSquare(...tiles))
    //         this.drawRabbit(...this.rabbit)
    //         this.redTiles();
    //     }

    //     redTiles() {
    //         for (let i = 0; i < this.gameTiles.length; i++) {
    //             let min = 0;
    //             let max = 10;
    //             if (Math.floor(Math.random() * (max - min + 1)) + min === 3) {
    //                 if (this.gameTiles[i][0] <= 360 && this.gameTiles[i][0] >= 40 && this.gameTiles[i][1] <= 360 && this.gameTiles[i][1] >= 40) {
    //                     let tempTile = structuredClone(this.gameTiles[i])
    //                     tempTile[2] = "Red"
    //                     console.log(tempTile)
    //                     this.staminaTile.push(tempTile)
    //                 }
    //             }
    //         }
    //         this.staminaTile.forEach(tile => this.drawCarrot(...tile))
    //     }

    //     resetRedTiles = () => {
    //         for (let value of this.staminaTile) {
    //             for (let tile of this.gameTiles) {
    //                 if (value[0] === tile[0] && value[1] === tile[1]) {
    //                     value = tile
    //                     this.drawCarrot(...value)
    //                 }
    //             }
    //         }
    //     }
    //     clearSquare(x, y) {
    //         this.ctx.clearRect(x, y, 40, 40)
    //     }

    //     drawSquare(x, y, colour) {
    //         this.ctx.fillStyle = colour;
    //         this.ctx.fillRect(x, y, 40, 40);
    //     }
    //     //todo 
    //     //animation needs to happen from one point to another 
    //     drawRabbit(x, y, colour, code) {
    //         console.log("Function called with x:", x, "y:", y, "code:", code);
    //         this.oldX = this.x;
    //         this.oldY = this.y;
    //         this.z = [25, 58, 98, 134, 174]
    //         this.ctx.fillStyle = "Blue";
    //         this.ctx.fillRect(x, y, 40, 40);
    //         this.code = code;
    //         console.log(this.code)
    //         //sprite sheet one "animation" down
    //         if (code === "ArrowDown") {

    //             console.log("true")
    //             do {

    //                 this.oldX++;
    //                 this.oldY++;
    //                 this.z.forEach(z => {
    //                     this.ctx.clearRect(this.img1, z, 50, 30, 30, this.oldX, this.oldY, 40, 40);
    //                     this.ctx.drawImage(this.img1, z, 50, 30, 30, this.oldX, this.oldY, 40, 40);
    //                 })
    //             } while (this.oldX < x && this.oldY < y)
    //         }
    //         this.ctx.drawImage(this.img1, 174, 50, 30, 30, x, y, 40, 40)
    //         this.x = x;
    //         this.y = y;

    //     }
    //     drawCarrot(x, y, colour) {
    //         this.ctx.fillStyle = colour;
    //         this.ctx.fillRect(x, y, 40, 40);
    //         this.ctx.drawImage(this.img2, x, y, 40, 40)
    //     }
    //     drawFarmer(x, y) {
    //         this.ctx.fillStyle = "Orange";
    //         this.ctx.fillRect(x, y, 40, 40);
    //         this.ctx.drawImage(this.img3, 55, 35, 30, 30, x, y, 40, 40)
    //     }

    //     //TODO
    //     //timer function to real seconds
    //     setTimer() {
    //         const timer = setInterval(() => {
    //             this.countdownInterval -= 10;
    //             // console.log(this.countdownInterval)
    //             this.time.textContent = this.countdownInterval
    //             if (this.countdownInterval <= 0) {
    //                 clearInterval(timer);
    //                 console.log("game over")
    //                 this.endGame()
    //             }
    //         })
    //     }

    //     addScore() {
    //         this.score.textContent++
    //     }
    //     resetRed() {
    //         if (this.staminaTile.length === 1) {
    //             this.redTiles()
    //         }
    //     }

    //     //TODO
    //     //running into enemy function to remove stamina (time)
    //     checkTakeDamage() {
    //         if (this.rabbit[0] === this.farmer1[0] && this.rabbit[1] === this.farmer1[1] || this.rabbit[0] === this.farmer2[0] && this.rabbit[1] === this.farmer2[1]) {
    //             this.countdownInterval -= 10000

    //         }
    //     }
    //     //TODO
    //     //function to create game so that i can end it as well

    //     endGame() {
    //         this.clearCanvas()
    //     }

    //     enemySquareStart() {
    //         let step = 40
    //         let max = 10;
    //         this.randomX = Math.floor(Math.random() * max) * step;
    //         this.randomY = Math.floor(Math.random() * max) * step;
    //         console.log(this.randomX)
    //         console.log(this.randomY)
    //     }

    //     moveEnemy1() {


    //         const moveEnemyPosition1 = () => {

    //             for (let value of this.gameTiles) {
    //                 if (value[1] === this.farmer1[1] && value[0] === this.farmer1[0]) {
    //                     this.farmer1[2] = value[2]
    //                 }
    //             }


    //             this.clearSquare(...this.farmer1)
    //             this.drawSquare(...this.farmer1)

    //             for (let value of this.staminaTile) {
    //                 if (value[1] === this.farmer1[1] && value[0] === this.farmer1[0]) {
    //                     this.drawCarrot(...value)
    //                 }
    //             }
    //             0.

    //             if (this.farmer1[1] === 400) {
    //                 this.directionalState = true;
    //             }

    //             if (this.farmer1[1] === 0) {
    //                 this.directionalState = false;
    //             }

    //             console.log(...this.farmer1)
    //             if (this.directionalState) {
    //                 this.farmer1[1] -= 40
    //             }
    //             else if (!this.directionalState) {
    //                 this.farmer1[1] += 40
    //             }
    //             this.checkTakeDamage()
    //             this.drawFarmer(...this.farmer1)
    //         }
    //         setInterval(moveEnemyPosition1, this.interval)
    //     }


    //     moveEnemy2() {


    //         const moveEnemyPosition2 = () => {

    //             for (let value of this.gameTiles) {
    //                 if (value[1] === this.farmer2[1] && value[0] === this.farmer2[0]) {
    //                     this.farmer2[2] = value[2]
    //                 }
    //             }


    //             this.clearSquare(...this.farmer2)
    //             this.drawSquare(...this.farmer2)

    //             for (let value of this.staminaTile) {
    //                 if (value[1] === this.farmer2[1] && value[0] === this.farmer2[0]) {
    //                     this.drawCarrot(...value)
    //                 }
    //             }

    //             if (this.farmer2[0] === 360) {
    //                 this.directionalState = true;
    //             }

    //             if (this.farmer2[0] === 0) {
    //                 this.directionalState = false;
    //             }

    //             console.log(...this.farmer2)
    //             if (this.directionalState) {
    //                 this.farmer2[0] -= 40
    //             }
    //             else if (!this.directionalState) {
    //                 this.farmer2[0] += 40
    //             }
    //             this.checkTakeDamage()
    //             this.drawFarmer(...this.farmer2)
    //         }
    //         setInterval(moveEnemyPosition2, this.interval)
    //     }

    //     reDraw = (rabbit, code) => {
    //         this.drawRabbit(...rabbit, code)
    //         for (let value of this.gameTiles) {
    //             if (value[0] === rabbit[0] && value[1] === rabbit[1] ? rabbit[2] = value[2] : false) {
    //                 for (let i of this.staminaTile) {
    //                     if (i[0] === rabbit[0] && i[1] === rabbit[1]) {
    //                         console.log(`red square`)
    //                         let index = this.staminaTile.indexOf(i)
    //                         this.staminaTile.splice(index, 1)
    //                         this.moveEnemy1();
    //                         this.moveEnemy2();
    //                         this.countdownInterval += 2_000;
    //                         this.staminaLog();
    //                         this.addScore();
    //                         this.resetRed();
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     eventListener() {
    //         document.addEventListener("keydown", (event) => {

    //             event.preventDefault();


    //             console.log(event)
    //             console.log(event.code)

    //             if (event.code == "ArrowUp" && this.rabbit[1] >= 40) {
    //                 this.drawSquare(...this.rabbit)
    //                 this.rabbit[1] -= 40;

    //                 this.reDraw(this.rabbit);

    //             } else if (event.code == "ArrowDown" && this.rabbit[1] <= 320) {
    //                 this.drawSquare(...this.rabbit)
    //                 this.rabbit[1] += 40;
    //                 this.reDraw(this.rabbit, event.code);

    //             } else if (event.code == "ArrowLeft" && this.rabbit[0] >= 40) {
    //                 this.drawSquare(...this.rabbit)
    //                 this.rabbit[0] -= 40;
    //                 this.reDraw(this.rabbit);

    //             } else if (event.code == "ArrowRight" && this.rabbit[0] <= 320) {
    //                 this.drawSquare(...this.rabbit)
    //                 this.rabbit[0] += 40;
    //                 this.reDraw(this.rabbit);

    //             }

    //         });
    //     }


    // }
    const game = new Game(canvas.width, canvas.height);
    
    game.init();
    game.redTiles();
    
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