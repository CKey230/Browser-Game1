document.addEventListener('DOMContentLoaded', () => {
    const character = document.querySelector(".character");
    const game = document.querySelector('.block')
    let characterJump = false
    let gravity = 0.9


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
                position += 30
                position = position * gravity
              character.style.bottom = position + 'px'
            
            

        }, 30)
    }
   











})






