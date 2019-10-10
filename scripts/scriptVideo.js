const extracts = document.querySelectorAll('.extracts-section__sceneImage')
const playerDiv = document.querySelector('.playerDiv')
let playingVideo = false
let playerDivDisplayed = false

for (let i = 0; i < extracts.length; i++) {
    
    extracts[i].addEventListener('click', function(){

        playerDiv.classList.add('displayPlayerDiv')
        playerDivDisplayed = true

        if(playingVideo){

            video.pause()
            playingVideo = false

        } else {

            video.play()
            playingVideo = true
            
        }
        
    })

}


