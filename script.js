var character = document.getElementById("character");
document.addEventListener("click",jump);
function jump(){
    
    character.classList.add("animate");
    setTimeout(removeJump,400); 
};
function removeJump(){
    character.classList.remove("animate");
}



var block = document.getElementById("block");
function checkDead(){
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<10 && blockLeft>-5 && characterTop>=230){
        alert("Game over");
    }
}

setInterval(checkDead, 10);