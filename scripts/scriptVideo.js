const extracts = document.querySelectorAll('.extracts-section__sceneImage')
const playerDiv = document.querySelector('.playerDiv')
const video = document.querySelector('.playerDiv__video')
let playingVideo = false
let playerDivDisplayed = false

for (let i = 0; i < extracts.length; i++) {
    
    extracts[i].addEventListener('click', function(){

        playerDiv.classList.add('displayPlayerDiv')
        playerDivDisplayed = true

        video.play()
        playingVideo = true
                  
    })
}

video.addEventListener('click', function(){
    if(playingVideo){

        video.pause()
        playingVideo = false

    }
    else {

        video.play()
        playingVideo = true

    }
})

