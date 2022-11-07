

document.addEventListener('DOMContentLoaded', () => {
   
    

    const character = document.querySelector(".character");
    const game = document.querySelector('.game') 
    const prompt = document.getElementById('prompt')
    
    const startScreenElem = document.querySelector('[data-start-screen]')
    document.addEventListener("keydown", startScreen, {once: true} )
  
    let characterJump = false;
    let gravity = 0.9 ;
    let isGameOver = false;
    var score = 0 
    var highScore = 0
    let lastTime
    
     function update(time){
        if (lastTime != null){
            lastTime = time
            
        window.requestAnimationFrame(update)
        return
        }
        window.requestAnimationFrame(update)
    }
 //start screen
    function startScreen() {
        lastTime = null
        startScreenElem.classList.add("hide")
        window.requestAnimationFrame(update)
    }

    function getHighScore(){
        if(localStorage.getItem("highScore") != null)
        {
            highScore = localStorage.getItem("highScore");
        }
    }


    //keeping score
   window.onload = function () { 
        getHighScore()
        generateBlock();
        setInterval(function(){
            score += 1;
            var userScore = document.getElementById('score');
            userScore.innerHTML = "High Score: " + highScore  + " Score " + score;

        },100)


    }
//space bar for jumping
    function control(e){
        if (e.keyCode === 32){
            if (!characterJump){
                characterJump = true
                jump()
            }
        
        }
    }
    document.addEventListener('keydown', control)
    let position = 0

//jump time function
    function jump(){
        let count = 0 
        let timerId = setInterval(function () {

            if (count === 18 ) {
                clearInterval(timerId)
                let downTimerId = setInterval(function(){
                    if (count === 1){
                        clearInterval(downTimerId)
                        characterJump = false  
                    }
                    
                    position -= 5
                    count --
                    position = position * gravity
               character.style.bottom = position + 'px'
                
 
                }, 20)
            }
            

                 count ++
                position += 50 
                position = position * gravity
              character.style.bottom = position + 'px'
            
            

        }, 10)
    }
   //blocks generated
     function generateBlock() {
        let randomTime = Math.random() * 2500
        let blockPosition = 1000
        const block = document.createElement('div')
        
 
        //check if dead
       if (!isGameOver) block.classList.add('block')
        game.appendChild(block)
        block.style.left = blockPosition + 'px'


        // timer for blocks
        let timerId = setInterval(function (){
            if (blockPosition > 0 && blockPosition < 60 && position < 60) {
                clearInterval(timerId);
                prompt.innerHTML = 'Game Over';
                isGameOver = true;
                highScore = score;
                localStorage.getItem("highScore",highScore);
                
                 
                //remove div's after 'game over'
                while (game.firstChild) {
                    game.removeChild(game.lastChild)
                }
            }
            blockPosition -= 7;
            block.style.left = blockPosition + 'px';
            
        },15)
       if (!isGameOver) setTimeout(generateBlock, randomTime)
        
      }
      generateBlock();


   
   









})






