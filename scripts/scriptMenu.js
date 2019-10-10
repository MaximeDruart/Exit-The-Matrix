/* ACTION OF THE MENU */

//Selector <div> of the menu 
const menuDiv = document.querySelector('.menuDiv')
// Selotor of the button
const buttonOpenMenu = document.querySelector('.header--ButtonMenu')
//Variable of displaying of the menu
let menuDisplayed = false;
//Selector of the images of extracts
const extractImages = document.querySelectorAll('.extracts-section__sceneImage')

buttonOpenMenu.addEventListener('click', function(){
    
    //If the user has click and the menu is already opened
    if (menuDisplayed) {
        
        //Removing the class of the div menu
        menuDiv.classList.remove('displayMenu')
        menuDisplayed = false

        //display extacts images of movies
        displaySceneImages()

    } else {
        
        //Adding the class displayMenu to the Div menu to display the Menu 
        menuDiv.classList.add('displayMenu')
        menuDisplayed = true

        //Hidding Images of extracts to prevent bugs
        hideSceneImages()
    }
})

/* PLAYER AUDIO */

//Selector of the audio player
const mute = document.querySelector('.mute')
const player = document.querySelector('audio')

//Adding action  to mute the music 
mute.addEventListener('click', function(){

    //If the user has paused the music else we play the music
    if(player.paused){

        //Play the music
        player.play()
        mute.setAttribute('src', 'images/mute.svg')
    }
    else{

        //Pause the music
        player.pause()
        mute.setAttribute('src', 'images/volume.svg')
    }
})

//Fonction to hidde scene images
function hideSceneImages() {
    for (let i = 0; i < extractImages.length; i++) {

        extractImages[i].style.display = 'none'
    }
}

//Fonction to display scene images
function displaySceneImages() {
    for (let i = 0; i < extractImages.length; i++) {
    
        extractImages[i].style.display = 'block'
    }
}