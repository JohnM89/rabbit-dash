
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
class GameTiles extends Canvas{

    drawGrid(x , y, colour ){
    this.ctx.fillStyle = colour;
    this.ctx.fillRect(x , y , 10 , 10);

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
for(let i = 0; i < gameTiles.length; i++){
    if(i % 2 === 0){
        gameTiles[i].push("White")
    } else {
       gameTiles[i].push("Green")  
    }
}

let tileObj =[]
    gameTiles.forEach(tile => square1.drawSquare(tile.toString()))


