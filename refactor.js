
class Canvas {
    constructor(canvasId) {
        this.canvas = document.querySelector(canvasId)
        if (!this.canvas) {
            console.log(`canvas id ${canvasId} not found`)
        }
        this.canvas.height = 400
        this.canvas.width = 400
        this.ctx = this.canvas.getContext("2d");
        this.button = document.querySelector("#resetGame");
    }

    clearCanvas() {
        console.log("clicked")
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

class InputHandler {
    constructor(game) {
        this.game = game;
        document.addEventListener("keydown", (event) => {
            event.preventDefault();
            this.game.lastKey = event.code;
        });
    }
}

class GameObject {
    constructor(game) {
        this.game = game;
        this.enemySquareStart();
        console.log("ready")
    }
    draw(context) {
        
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    enemySquareStart() {
        let step = 40
        let max = 10;
        this.randomX = Math.floor(Math.random() * max) * step;
        this.randomY = Math.floor(Math.random() * max) * step;
        console.log(this.randomX)
        console.log(this.randomY)
    }
    update() {

    }
}

class Rabbit extends GameObject {
    constructor(game) {
        super(game);
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        this.speed = 40;
        this.image = new Image();
        this.image.src = "bunnysheet5.png";
        
    }

    handleInput(eventCode) {
        if (eventCode === "ArrowUp" && this.y >= this.speed) {
            console.log("ready")
            this.y -= this.speed;
        } else if (eventCode === "ArrowDown" && this.y <= this.game.canvas.canvas.height - this.speed) {
            this.y += this.speed;
        } else if (eventCode === "ArrowLeft" && this.x >= this.speed) {
            this.x -= this.speed;
        } else if (eventCode === "ArrowRight" && this.x <= this.game.canvas.canvas.width - this.speed) {
            this.x += this.speed;
        }
    }

    update() {
        this.handleInput(this.game.lastKey);
        this.game.reDraw(this);
    }

    draw() {
        this.game.ctx.fillStyle = "Blue";
        this.game.ctx.fillRect(this.x, this.y, 40, 40);
        this.game.ctx.drawImage(this.image, 25, 50, 30, 30, this.x, this.y, this.width, this.height);
    }
}


class GameTile extends GameObject {
    constructor(game) {
        super(game);
        this.gameTiles = [];
        this.createGameTiles();
    }

    createGameTiles() {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.gameTiles.push([y * 40, x * 40]);
            }
        }
        // Color tiles
        for (let i = 0; i < this.gameTiles.length; i++) {
            if (Math.floor(i / 10) % 2 === 0 && i % 2 === 0) {
                this.gameTiles[i].push("White");
            } else if (Math.floor(i / 10) % 2 === 0 && i % 2 !== 0) {
                this.gameTiles[i].push("Green");
            } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 !== 0) {
                this.gameTiles[i].push("White");
            } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 === 0) {
                this.gameTiles[i].push("Green");
            }
        }
    }

    drawMap() {
        this.gameTiles.forEach(tile => {
            this.game.drawSquare(tile);
        });
    }
}


class Farmer extends GameObject {
    constructor(game, initialPosition) {
        super(game);
        this.x = initialPosition[0];
        this.y = initialPosition[1];
        this.width = 40;
        this.height = 40;
        this.directionalState = true;
        this.image = new Image();
        this.image.src = "fox.png"; 
    }

    move() {
        if (this.y >= 400) {
            this.directionalState = true;
        }

        if (this.y <= 0) {
            this.directionalState = false;
        }

        if (this.directionalState) {
            this.y -= 40;
        } else {
            this.y += 40;
        }

        this.checkTakeDamage();
    }

    checkTakeDamage() {
        if (this.game.rabbit.x === this.x && this.game.rabbit.y === this.y) {
            this.game.countdownInterval -= 10000;
        }
    }

    draw() {
        this.game.ctx.fillStyle = "Orange";
        this.game.ctx.fillRect(this.x, this.y, 40, 40);
        this.game.ctx.drawImage(this.image, this.x, this.y, 40, 40);
    }
}

class Carrot extends GameObject {
    constructor(game) {
        super(game);
        this.image = new Image();
        this.image.src = "carrot.png"; 
    }

    redTiles() {
        for (let i = 0; i < this.game.gameTiles.length; i++) {
            let min = 0;
            let max = 10;
            if (Math.floor(Math.random() * (max - min + 1)) + min === 3) {
                if (this.game.gameTiles[i][0] <= 360 && this.game.gameTiles[i][0] >= 40 && this.game.gameTiles[i][1] <= 360 && this.game.gameTiles[i][1] >= 40) {
                    let tempTile = structuredClone(this.game.gameTiles[i]);
                    tempTile[2] = "Red";
                    this.staminaTiles.push(tempTile);
                }
            }
        }
        this.staminaTiles.forEach(tile => this.drawCarrot(tile));
    }

    drawCarrot(tile) {
        this.game.ctx.fillStyle = tile[2];
        this.game.ctx.fillRect(tile[0], tile[1], 40, 40);
        this.game.ctx.drawImage(this.image, tile[0], tile[1], 40, 40);
    }

    resetRedTiles() {
        for (let value of this.staminaTiles) {
            for (let tile of this.game.gameTiles) {
                if (value[0] === tile[0] && value[1] === tile[1]) {
                    value = tile;
                    this.drawCarrot(tile);
                }
            }
        }
    }

    resetRed() {
        if (this.staminaTiles.length === 1) {
            this.redTiles();
        }
    }
}


class Game {
    constructor(canvasId) {
        this.canvas = new Canvas(canvasId);
        
        // this.gameTiles = new GameTile(this)
        this.ctx = this.canvas.ctx;
        this.lastKey = undefined;
        this.input = new InputHandler(this);
        this.gameTiles = [];
        this.staminaTiles = [];
        this.time = document.querySelector("#time");
        this.score = document.querySelector("#score");
        this.highScore = document.querySelector(".highscores");
        this.canvas.button.addEventListener("click", () => {
            this.canvas.clearCanvas();
            this.highScore.insertAdjacentHTML("beforeend", `<li>${this.score.textContent}</li>`);
            this.highScore.style.display = "block";
        });
        this.score.textContent = parseInt(0);
        this.Object = new GameObject(this)
        this.gameTiles = new GameTile(this)
        this.rabbit = new Rabbit(this);
        this.farmer1 = new Farmer(this, [this.randomX, 400]);
        this.farmer2 = new Farmer(this, [360, this.randomY]);
        this.carrot = new Carrot(this);
        this.interval = 1000;
        this.countdownInterval = 10000;
        this.setTimer();
        this.staminaLog = () => console.log(`+10 sec`);
        // this.img2.onload = () => this.drawMap();
        
    }

    clearSquare(x, y) {
        this.ctx.clearRect(x, y, 40, 40)
    }

    drawSquare(x, y, colour) {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, 40, 40);
    }

    setTimer() {
        const timer = setInterval(() => {
            this.countdownInterval -= 10;
            this.time.textContent = this.countdownInterval
            if (this.countdownInterval <= 0) {
                clearInterval(timer);
                console.log("game over")
                this.endGame()
            }
        })
    }

    addScore() {
        this.score.textContent++
    }

    endGame() {
        this.canvas.clearCanvas()
    }

    reDraw = (rabbit) => {
        rabbit.draw(...rabbit)
        for (let value of this.gameTiles) {
            if (value[0] === rabbit[0] && value[1] === rabbit[1] ? rabbit[2] = value[2] : false) {
                for (let i of this.staminaTiles) {
                    if (i[0] === rabbit[0] && i[1] === rabbit[1]) {
                        console.log(`red square`)
                        let index = this.staminaTiles.indexOf(i)
                        this.staminaTiles.splice(index, 1)
                        this.moveEnemy1();
                        this.moveEnemy2();
                        this.countdownInterval += 2_000;
                        this.staminaLog();
                        this.addScore();
                        this.resetRed();
                    }
                }
            }
        }
    }
}

let newGame = new Game('#canvasId');
