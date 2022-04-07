const btnPlayerVideo = document.querySelector('.player__btn-video')
const btnPlayerStart = document.querySelector('.player__start')
const video = document.getElementById('player')
const playerDuration = document.getElementById('player__duration')
const soundControl = document.getElementById('sound-control__level')
const sound = document.getElementById('sound')
const dynamicButton = document.getElementById('sound-dynamic')

let intervalId;
let soundLevel;

window.addEventListener('load', ()=>{
    video.addEventListener('click', playStop)

    let playBtn = document.querySelectorAll(".play")

    for(let i = 0; i < playBtn.length; i++){
        playBtn[i].addEventListener('click', playStop)
    }

    playerDuration.min = 0
    playerDuration.value = 0
    playerDuration.max = video.duration

    playerDuration.addEventListener('input', setVideoDuration);

    soundControl.min = 0
    soundControl.max = 10
    soundControl.value = soundControl.max
    soundControl.addEventListener('input', changeSoundVolume)
    changeSoundVolume()

    //отключение звука при клике по динамику
    dynamicButton.addEventListener('click', soundOff)

    //окончание видео
    video.addEventListener('ended', ()=>{
        btnPlayerVideo.classList.remove('player__btn--active')
        btnPlayerStart.classList.remove('player__active')
    })

})

//функция воспроизведения / пауза
function playStop(){
    if(video.paused){

        video.play()
        btnPlayerVideo.classList.add('player__btn--active')
        btnPlayerStart.classList.add('player__active')
        intervalId = setInterval(updateDuration, 1000 / 60)

    }else{

        clearInterval(intervalId)
        video.pause()
        btnPlayerVideo.classList.remove('player__btn--active')
        btnPlayerStart.classList.remove('player__active')
    }
}

function setVideoDuration(){
    video.currentTime = playerDuration.value
    updateDuration()
}

//функция трекинга видео
function updateDuration(){

    playerDuration.value = video.currentTime
    let step = video.duration / 100
    let percent = video.currentTime / step

    playerDuration.style.background = `linear-gradient(90deg, red 0%, red ${percent}%, #626262 ${percent}%)`
}

//функция изменеия звука
function changeSoundVolume() {

    video.volume = soundControl.value / 10
    let step = 1
    let percent = (parseInt(soundControl.value) * step) * 10

    soundControl.style.background = `linear-gradient(90deg, red 0%, red ${percent}%, #626262 ${percent}%)`

    if(video.volume === 0){
        sound.classList.add('sound__active')
    }else{
        sound.classList.remove('sound__active')
    }
}

//функция отключения звука
function soundOff(){

    if(video.volume === 0){

        video.volume = soundLevel
        soundControl.value = soundLevel * 10
        sound.classList.remove('sound__active')
    }else{

        soundLevel = video.volume
        video.volume = 0
        soundControl.value = 0
        sound.classList.add('sound__active')
    }
}
