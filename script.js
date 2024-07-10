
class Canvas {
    constructor(canvasId){
        this.canvas =document.querySelector(canvasId)
        if(!this.canvas){
          console.log(  `canvas id ${canvasId} not found` )
        }
        this.ctx = this.canvas.getContext("2d");
    }

    clearCanvas(){
        return 
    }

}

//test class
class Square extends Canvas{


    drawSquare(x , y, colour ){
    this.ctx.fillStyle = colour;
    this.ctx.fillRect(x , y , 10 , 10);
}


}
// draw a 10 x 10 grid
class GameTiles extends Canvas {

    drawGrid(x, y, colour) {
        this.ctx.fillStyle = colour;
        this.ctx.fillRect(x, y, 10, 10);

    }

    
    static generateTiles() {
        const gameTiles = []
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                gameTiles.push([y * 10, x * 10])
            }
        }
        for (let i = 0; i < gameTiles.length; i++) {
            if (i % 2 === 0) {
                gameTiles[i].push("White")
            } else {
                gameTiles[i].push("Green")
            }
        }
        return gameTiles
    }
}


let newCanvas = new Canvas("#canvasId")
let square1 = new Square("#canvasId")
let newGame1 = new GameTiles('#canvasId')
square1.drawSquare()
square1.drawSquare(10, 0, 'green' )




// temp setup 

const gameTiles = []
for(let x = 0; x < 10; x++){
    for(let y = 0; y < 10; y++){
        gameTiles.push([y* 10, x * 10])
    }   
}
// DIVIDE BY 20 MAYBE AND USE MATH.FLOOR TO ROUND? NOPE LOL
for(let i = 0; i < gameTiles.length; i++){


// got it checkerboard!
    if(Math.floor(i /10) % 2 === 0 && i % 2 === 0){
        gameTiles[i].push("White")
    } else if (Math.floor(i /10) % 2 === 0 && i % 2 !== 0){
       gameTiles[i].push("Green")  
    } else if (Math.floor(i /10) % 2 !== 0 && i % 2 !== 0){
            gameTiles[i].push("White")
    } else if(Math.floor(i /10) % 2 !== 0 && i % 2 === 0){
        gameTiles[i].push("Green")
    }
}
//     for(let value of gameTiles){
//  if (value < 10 && value % 2 === 0){
//             gameTiles[i].push("White")
//     } else if (value < 10 && value % 2 !== 0){
//        gameTiles[i].push("Green")  
//     } else if (value > 10 && value / 10 % 2 === 0){
//         gameTiles[i].push("White")
//     } else if (value > 10 && value / 10 % 2 !== 0){
//         gameTiles[i].push("Green") }
//  }       

for(let i = 0; i < gameTiles.length; i++){
    for(let value of gameTiles){
        let param;
        param += value
        square1.drawSquare(param)
    }
}


const greenTiles = (gameTiles) => {
    for(let i = 0; i < gameTiles.length; i++){
        let min = 0;
        let max = 10;
        if(Math.floor(Math.random() * (max - min + 1)) + min === 3){
            gameTiles[i][2].replace(/Green|White/g, "Red")
        }
    }
}

// greenTiles(gameTiles)
//problem was i need the spread operator, i was passing the entire array as a single argument it needs to be "spread" across the 3 expected arguments
// could have also selected each subarray tiles[0] tiles[1]
//works but its a checkerboard I want
// need to iterate over the array in a way that checks the tens columns as well as the 1s for equal or odd 
gameTiles.forEach(tiles => square1.drawSquare(...tiles))


