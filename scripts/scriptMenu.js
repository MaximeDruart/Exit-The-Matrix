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
    if(player.paused){
        player.play()
        mute.setAttribute('src', "images/mute.svg")
    }
    else{
        player.pause()
        mute.setAttribute('src', "images/volume.svg")
    }
})