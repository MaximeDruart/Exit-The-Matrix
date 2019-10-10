const extracts = document.querySelectorAll('.extracts-section__sceneImage')
const playerDiv = document.querySelector('.playerDiv')
const video = document.querySelector('.playerDiv__video')
const closeButton = document.querySelector('.playerDiv__close')
let playingVideo = false
let playerDivDisplayed = false
const videoSource = document.querySelector('.playerDiv__video>source')

for (let i = 0; i < extracts.length; i++) {
    
    extracts[i].addEventListener('click', function(){

        playerDiv.classList.add('displayPlayerDiv')
        playerDivDisplayed = true

        loadVideo(i)
        
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

closeButton.addEventListener('click', function(){   
    
    playerDiv.classList.remove('displayPlayerDiv')
    playerDivDisplayed = true
})

function loadVideo(number){

    switch (number) {
        case 0:

            videoSource.setAttribute('src', 'videos/extract_Pill.mp4')
            break;
        case 1:

            videoSource.setAttribute('src', 'videos/extract_KungFu.mp4')
            break
        case 2:

            videoSource.setAttribute('src', 'videos/extract_MrSmith.mp4')
            break
        case 3:

            videoSource.setAttribute('src', 'videos/extract_WakeUp.mp4')
            break
        case 4:

            videoSource.setAttribute('src', 'videos/extract_BulletTime.mp4')
            break
        default:
            break;
    }

    video.load();
}