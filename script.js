

document.addEventListener('DOMContentLoaded', () => {
   
    

    const character = document.querySelector(".character");
    const game = document.querySelector('.game') 
    const prompt = document.getElementById('prompt')
    
    const startScreenElem = document.querySelector('[data-start-screen]')
    window.addEventListener("keydown", startScreen,{once: true} )
 
    let characterJump = false;
    let gravity = 0.9 ;
    let isGameOver = false;
    let score = 0 
    let highScore = 0
    let lastTime
   
    
     function update(timerId){
        if (lastTime != null){
            lastTime = timerId
        }
        
       
    }
 //start screen
    function startScreen() {
        lastTime = null
        startScreenElem.classList.add("hide")
        
       
    }
    
//local storage for highscore 
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
            let userScore = document.getElementById('score');
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
    document.addEventListener('keydown', control,)
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
       
        let randomTime = (Math.random() * 3200) + 400; //generate obstacles at random 
    
        let blockPosition = 1000
        const block = document.createElement('img')
        block.dataset.block = true
        block.src = "/assets/block1.png";
        block.classList.add('block')
        game.append(block)
       


        
        
        
 
        //check if dead
       if (!isGameOver) block.classList.add('block')
        game.appendChild(block)
        block.style.left = blockPosition + 'block'




        // timer for blocks
        let timerId = setInterval(function (){
            if (blockPosition > 0 && blockPosition < 60 && position < 60) {
                clearInterval(timerId);
                prompt.innerHTML = 'Game Over'; //gameover prompt
                isGameOver = true;


                if (score > highScore) {
                    highScore = score
                }
               
                localStorage.setItem("highScore",highScore); // local storage kept for highscore

                
              
              
                //restart button
                const button = document.createElement('button');
                const text = document.createTextNode("Click to Restart");
                button.appendChild(text);
                prompt.appendChild(button);
                prompt.addEventListener("click", function(e){
                    location.reload()
                })
               
            
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
      


})


 



