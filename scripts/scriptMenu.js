const menu = document.querySelector('.menuDiv')
const buttonOpenMenu = document.querySelector('.header--ButtonMenu')
let menuDisplayed = false;

buttonOpenMenu.addEventListener('click', function(){
    if (menuDisplayed) {
        
        menu.classList.remove('displayMenu')
        menuDisplayed = false

    } else {
        

        menu.classList.add('displayMenu')
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