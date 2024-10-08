import { Game } from './Game.js';
import { gameHeight , gameWidth } from './Constants.js';
import { StartScreen} from './Screens.js';
import { updateScale } from './CanvasDimensions.js';

window.addEventListener('load', function () {
    const canvas = document.querySelector('#canvasId');
    const ctx = canvas.getContext("2d");
    
    ctx.imageSmoothingEnabled = false
    canvas.height = gameHeight
    canvas.width = gameWidth


    

    function resizeCanvasForMobile(){
        //breaks everything to do with entity rendering but looks scaled
      const aspectRatio = gameWidth / gameHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      if(windowWidth < canvas.width){
        canvas.width = windowWidth / aspectRatio
        canvas.height = canvas.height / aspectRatio
      }
      if(windowHeight < canvas.height){
        canvas.height = windowHeight / aspectRatio 
        canvas.width = canvas.width / aspectRatio
      }



      ctx.scale(canvas.width / gameWidth, canvas.height / gameHeight);


    }
    resizeCanvasForMobile();
    

    let game = new Game(canvas.width, canvas.height);
    game.changeState(new StartScreen(game))
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
