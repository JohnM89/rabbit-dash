
class Canvas {
    constructor(canvasId) {
        this.canvas = document.querySelector(canvasId)
        if (!this.canvas) {
            console.log(`canvas id ${canvasId} not found`)
        }
        this.ctx = this.canvas.getContext("2d");
        this.gameTiles = [];
        this.staminaTile = [];
        this.createGameTiles();
    }

    clearCanvas() {
        return
    }

    createGameTiles() {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                this.gameTiles.push([y * 40, x * 40])
            }
        }
        // Colour tiles
        for (let i = 0; i < this.gameTiles.length; i++) {
            // map checkerboard!
            if (Math.floor(i / 10) % 2 === 0 && i % 2 === 0) {
                this.gameTiles[i].push("White")
            } else if (Math.floor(i / 10) % 2 === 0 && i % 2 !== 0) {
                this.gameTiles[i].push("Green")
            } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 !== 0) {
                this.gameTiles[i].push("White")
            } else if (Math.floor(i / 10) % 2 !== 0 && i % 2 === 0) {
                this.gameTiles[i].push("Green")
            }
        }
    }

}

//test class
class Game extends Canvas {

    constructor(canvasId) {
        super(canvasId);
        
        this.rabbit = [0, 0, "White"];
        this.img1 = new Image();
        this.img2 = new Image();
        this.img1.src = "rabbit.png";
        this.img2.src = "carrot.png";
        this.staminaLog = () => console.log(`+10 sec`);
        this.eventListener();
        //onload method because the javascript runs before the images is loaded apparently, this is important 
        this.img2.onload = () => this.drawMap();
    }

    drawMap() {
        this.gameTiles.forEach(tiles => this.drawSquare(...tiles))
        this.drawRabbit(...this.rabbit)
        this.redTiles();
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
        this.staminaTile.forEach(tile => this.drawCarrot(...tile))
    }

    resetRedTiles = () => {
        for (let value of this.staminaTile) {
            for (let tile of this.gameTiles) {
                if (value[0] === tile[0] && value[1] === tile[1]) {
                    value = tile
                    this.drawCarrot(...value)
                }
            }
        }
    }


    drawSquare(x, y, colour) {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, 40, 40);
    }

    drawRabbit(x, y) {
        this.ctx.fillStyle = "Blue";
        this.ctx.fillRect(x, y, 40, 40);
        this.ctx.drawImage(this.img1, x, y, 40, 40)
    }
    drawCarrot(x, y, colour) {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, 40, 40);
        this.ctx.drawImage(this.img2, x, y, 40, 40)
    }
    reset() {
        if (this.staminaTile.length === 1) {
            this.redTiles()
        }
    }
    reDraw = (rabbit) => {
        this.drawRabbit(...rabbit)
        for (let value of this.gameTiles) {
            if (value[0] === rabbit[0] && value[1] === rabbit[1] ? rabbit[2] = value[2] : false) {
                for (let i of this.staminaTile) {
                    if (i[0] === rabbit[0] && i[1] === rabbit[1]) {
                        console.log(`red square`)
                        let index = this.staminaTile.indexOf(i)
                        this.staminaTile.splice(index, 1)
                        this.staminaLog();
                        this.reset()
                    }
                }
            }
        }
    }
    eventListener() {
        document.addEventListener("keydown", (event) => {

            event.preventDefault();



            if (event.code == "ArrowUp" && this.rabbit[1] >= 40) {
                this.drawSquare(...this.rabbit)
                this.rabbit[1] -= 40;

                this.reDraw(this.rabbit);

            } else if (event.code == "ArrowDown" && this.rabbit[1] <= 320) {
                this.drawSquare(...this.rabbit)
                this.rabbit[1] += 40;
                this.reDraw(this.rabbit);

            } else if (event.code == "ArrowLeft" && this.rabbit[0] >= 40) {
                this.drawSquare(...this.rabbit)
                this.rabbit[0] -= 40;
                this.reDraw(this.rabbit);

            } else if (event.code == "ArrowRight" && this.rabbit[0] <= 320) {
                this.drawSquare(...this.rabbit)
                this.rabbit[0] += 40;
                this.reDraw(this.rabbit);

            }

        });
    }


}

let newGame = new Game('#canvasId');
