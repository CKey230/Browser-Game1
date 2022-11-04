
document.addEventListener('DOMContentLoaded', () => {
    var canvas = document.querySelector('canvas');
  
    const character = document.querySelector(".character");
    const game = document.querySelector('.game')
    const prompt = document.getElementById('prompt')
    let characterJump = false
    let gravity = 0.9
    let isGameOver = false


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

            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function(){
                    if (count === 0){
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
                position += 40
                position = position * gravity
              character.style.bottom = position + 'px'
            
            

        }, 15)
    }
   //blocks generated
      function generateBlock() {
        let randomTime = Math.random() * 2500
        let blockPosition = 1000
        const block = document.createElement('div')
       if (!isGameOver) block.classList.add('block')
        game.appendChild(block)
        block.style.left = blockPosition + 'px'
        // timer for blocks
        let timerId = setInterval(function (){
            if (blockPosition > 0 && blockPosition < 60 && position < 60) {
                clearInterval(timerId)
                prompt.innerHTML = 'Game Over'
                isGameOver = true
                //remove div's after 'game over'
                while (game.firstChild) {
                    game.removeChild(game.lastChild)
                }
            }
            blockPosition -= 7
            block.style.left = blockPosition + 'px'
         
        },15)
       if (!isGameOver) setTimeout(generateBlock, randomTime)
      }
      generateBlock()
   
   









})






