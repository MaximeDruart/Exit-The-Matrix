//Selector of the images
const extracts = document.querySelectorAll('.extracts-section__sceneImage')
//Selector of the Div player
const playerDiv = document.querySelector('.playerDiv')
//Selector of the video
const video = document.querySelector('.playerDiv__video')
//Selector pf the button close
const closeButton = document.querySelector('.playerDiv__close')
//If the video is playing
let playingVideo = false
//If the video is Displauyed
let playerDivDisplayed = false
//Selector of the source of the video
const videoSource = document.querySelector('.playerDiv__video>source')
//Selector of the audio player
const playerAudio = document.querySelector('audio')

//Creating a boucle for for all images
for (let i = 0; i < extracts.length; i++) {
    
    //ading event click on all images
    extracts[i].addEventListener('click', function(){

        //adding class to display the div
        playerDiv.classList.add('displayPlayerDiv')
        playerDivDisplayed = true

        //loading the nvideo
        loadVideo(i)
        
        //Playing the video
        video.play()
        playingVideo = true
        
        playerAudio.pause()
    })
}

//Adding event click on the video
video.addEventListener('click', function(){

    //If the video is playing , we pause it
    if(playingVideo){

        video.pause()
        playingVideo = false

    }
    else {

        video.play()
        playingVideo = true

    }
})

//Close the div video
closeButton.addEventListener('click', function(){   
    
    //remove the class display PlayerDiv
    playerDiv.classList.remove('displayPlayerDiv')
    playerDivDisplayed = true
    video.pause()
    playerAudio.play()
})

//Function to load a video
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