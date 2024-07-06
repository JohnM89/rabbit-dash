
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
class Rectangle extends Canvas{


    drawRectangle(){
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(10, 10, 100, 100);
}


}
// draw a 10 x 10 grid
class GameTiles extends Canvas{

    drawGrid(){


    }
}


let newCanvas = new Canvas("#canvasId")
let rectangle1 = new Rectangle("#canvasId")
rectangle1.drawRectangle()




