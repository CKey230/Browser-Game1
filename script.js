var character = document.getElementById("character");
document.addEventListener("click",jump);
function jump(){
    
    character.classList.add("animate");
    setTimeout(removeJump,400); 
};
function removeJump(){
    character.classList.remove("animate");
}

