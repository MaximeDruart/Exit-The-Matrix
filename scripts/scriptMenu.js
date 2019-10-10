const menuDiv = document.querySelector('.menuDiv')
const buttonOpenMenu = document.querySelector('.header--ButtonMenu')
let menuDisplayed = false;

buttonOpenMenu.addEventListener('click', function(){
    if (menuDisplayed) {
        
        menuDiv.classList.remove('displayMenu')
        menuDisplayed = false

    } else {
        

        menuDiv.classList.add('displayMenu')
        menuDisplayed = true
    }
})
/* PLAYER AUDIO */

var mute = document.querySelector('.mute')
var player = document.querySelector('audio')

mute.addEventListener('click', function(){
    console.log('ok')
    if(player.paused){
        player.play()
    }
    else{
        player.pause()
    }
})