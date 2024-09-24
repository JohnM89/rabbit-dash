import { gameHeight , gameWidth } from './Constants.js';
window.addEventListener('load', function () {
    const canvas = document.querySelector('#canvasScores');
    const ctx = canvas.getContext("2d");

    
    // ctx.imageSmoothingEnabled = false
    canvas.height = gameHeight + gameHeight
    canvas.width = gameWidth + gameWidth
    let levelImage = new Image();
    levelImage.src = "futureUse/background.png"


    
    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(levelImage,   0 + (gameWidth / 2.75)  , 0 + (gameHeight / 3.25) , gameWidth + (gameWidth / 4), gameHeight + (gameHeight / 2));

                

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
});