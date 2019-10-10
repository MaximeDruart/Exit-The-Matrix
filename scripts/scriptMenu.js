//Selector <div> of the menu 
const menuDiv = document.querySelector('.menuDiv')
// Selotor of the button
const buttonOpenMenu = document.querySelector('.header--ButtonMenu')
//Variable of displaying of the menu
let menuDisplayed = false;

/* PLAYER AUDIO */
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

const mute = document.querySelector('.mute')
const player = document.querySelector('audio')

mute.addEventListener('click', function(){
    if(player.paused){
        player.play()
        mute.setAttribute('src', 'images/mute.svg')
    }
    else{
        player.pause()
        mute.setAttribute('src', 'images/volume.svg')
    }
})