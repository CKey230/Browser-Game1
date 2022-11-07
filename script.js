

document.addEventListener('DOMContentLoaded', () => {
   
    //Browser scaling

    const WORLD_WIDTH = 100
    const WORLD_HEIGHT = 30




    const worldElem = document.querySelector('[data-world');
    const scoringElem = document.querySelector('[data-score');
    const startScreenElem = document.querySelector('[data-start-screen]')


    setPixentoWorldScale()
    window.addEventListener("resize",setPixentoWorldScale)
    document.addEventListener("keydown", handleStart, {once: true} )
  

   

    let lastTime
    let score
    function update(time){
        if (lastTime != null){
            lastTime = time
            
        window.requestAnimationFrame(update)
        return
        }
        const delta = time - lastTime
        lastTime = time
        window.requestAnimationFrame(update)
    }

 
    function handleStart() {
        lastTime = null
        score = 0
        startScreenElem.classList.add("hide")
        window.requestAnimationFrame(update)
    }

    //minimize expand browser
    function setPixentoWorldScale(){
        let worldToPixelScale
        if(window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT)
        {
            worldToPixelScale = window.innerWidth / WORLD_WIDTH
        } else {
            worldToPixelScale = window.innerHeight / WORLD_HEIGHT
        }
        worldElem.style.width = '${WORLD_WIDTH * worldToPixelScale}px'
        worldElem.style.height = '${WORLD_HEIGHT * worldToPixelScale}px'
    }

    const character = document.querySelector(".character");
    const game = document.querySelector('.game') 
    const prompt = document.getElementById('prompt')
    const scoreElem =document.querySelector("[data-score]")
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
        

        //check if dead
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






