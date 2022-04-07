
const accordionItem = document.querySelectorAll(".accordion__item")
const accordionButton = document.querySelectorAll(".accordion__button")

const getItemWidth = (btn)=>{
    let itemWidth = 524
    let btnWidth = btn.offsetWidth
    let length = accordionButton.length

    const isTablet = window.matchMedia("(max-width: 768px)").matches
    const isMobile = window.matchMedia("(max-width: 480px)").matches

    if(isTablet){
        itemWidth = window.innerWidth
        itemWidth = `${itemWidth - btnWidth * length}`
    }

    if(isMobile){
        itemWidth = window.innerWidth
        itemWidth = `${itemWidth - btnWidth}`
    }

    return `${itemWidth}px`
}

accordionItem.forEach(team => {

    team.addEventListener('click', (e)=> {

        const btnColor = team.querySelector('.accordion__button')
        const context = team.querySelector('.accordion__context')

        if(btnColor){
            if(context.classList.contains('accordion__context--active') || team.classList.contains('accordion__item--active')) {
                closeAccordion()
            }else {
                closeAccordion()

                context.style.width = getItemWidth(btnColor)
                context.firstElementChild.style.width = getItemWidth(btnColor)

                if(window.innerWidth <= 480){
                    team.classList.add('accordion__item--active')
                }
                if(window.innerWidth > 480){
                    context.classList.add('accordion__context--active')
                }
            }
        }
    })
})

function closeAccordion(){
    const accordionItem = document.querySelectorAll(".accordion__item")
    const contextItem = document.querySelectorAll('.accordion__context')

    for(let i = 0; i < contextItem.length; i++){

        if(contextItem[i].classList.contains('accordion__context--active')){
            contextItem[i].classList.remove('accordion__context--active')
            contextItem[i].style.width ='0px'
        }

        if(accordionItem[i].classList.contains('accordion__item--active')){
            console.log('close')
            accordionItem[i].classList.remove('accordion__item--active')
            contextItem[i].style.width ='0px'
        }
    }
};
const blockScroll = {
    block: ()=>{
        console.log('block')
        localStorage.setItem('isScrollLocked', true)
    },
    unblock: ()=> {
        console.log('unblock')
        localStorage.setItem('isScrollLocked', false)
    },
    toggleBlock: function(){
        if(this.isBlocked()){
            this.unblock()
        }else{
            this.block()
        }
    },
    isBlocked: ()=> {

        return JSON.parse(localStorage.getItem('isScrollLocked'))
    },
};

blockScroll.unblock();const users = document.querySelectorAll(".user-avatar__item")

users.forEach(user => {

    user.addEventListener('click', (e)=>{

        let data = e.target.dataset

        if(!user.classList.contains('user-avatar__item--active')){
            hiddenActive(data.id)
            userVisible(data.id)
            user.classList.add('user-avatar__item--active')
        }else if(user.classList.contains('user-avatar__item--active')){
            return;
        }
    })
})

function hiddenActive(){

    const users = document.querySelectorAll(".user-avatar__item")

    for(let i = 0; i < users.length; i++){

        if(users[i].classList.contains('user-avatar__item--active')){
            users[i].classList.remove('user-avatar__item--active')
        }
    }
}

function userVisible(id) {

    const feedbackUser = document.querySelectorAll('.feedback__item')

    feedbackUser.forEach(user => {

        if (user.classList.contains('feedback__active')) {
            user.classList.remove('feedback__active')
        }

    })

    feedbackUser[id - 1].classList.add('feedback__active')

};const myForm = document.querySelector('#my-form')

myForm.addEventListener('submit', (e)=>{

    e.preventDefault()
    console.log('blocked&?', localStorage.getItem('isScrollLocked'))
    blockScroll.toggleBlock()

    if(valideteForm(myForm)){

        const data = {
            name: myForm.elements.name.value,
            phone: myForm.elements.phone.value,
            comment: myForm.elements.comment.value,
            to: myForm.elements.to.value,
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(data));
        xhr.addEventListener('load', ()=>{
            let data = JSON.parse(xhr.response)
            if(data.status){
                showModal(data.message)
            }else{
                showModal(data.message)
            }
        })
    }
})

function valideteForm(form){

    let value = true

    if(!validateField(form.elements.name)){
        value = false
    }

    if(!validateField(form.elements.phone)){
        value = false
    }

    if(!validateField(form.elements.comment)){
        value = false
    }

    return value;
}

function validateField(field){
    field.nextElementSibling.textContent = field.validationMessage
    return field.checkValidity()
}

function showModal(text){
    const modal = document.querySelector('#message')
    modal.classList.add('modal-js-visible')

    const messageStatus = modal.querySelector('.message__text')
    messageStatus.textContent = text

    const close = modal.querySelector('#closeModal')
    close.addEventListener('click', ()=>{
        modal.classList.remove('modal-js-visible')
        blockScroll.toggleBlock()
    })
};let myMap;

const init = ()=>{

    myMap = new ymaps.Map("map", {
        center: [55.725146, 37.646930],
        zoom: 10,
        controls: [],
    });

    const coords = [
        [55.90, 37.64],
        [55.80, 37.74],
        [55.55, 37.84],
        [55.70, 37.94],
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './image/map-section/marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-50, -30]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    })

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');

}

ymaps.ready(init);
//============================ menu ===================================
const menu = document.querySelector(".screen-menu")
const btnMenu = document.querySelector(".gamburger-menu")
const close = document.querySelector(".close")

menu.addEventListener('click', (e)=>{
    if(e.target.classList.contains('menu__link')){
        menu.classList.remove('active')
    }
})

btnMenu.addEventListener('click', function(){
    menu.classList.add('active')
    blockScroll.toggleBlock()
})

close.addEventListener('click', function(){
    menu.classList.remove('active')
    blockScroll.toggleBlock()
    activeFirstSection()
})





;const body = document.body
const display = document.querySelector('.wrapper__content')
const sections = document.querySelectorAll('section')
const fixedItem = document.querySelectorAll('.fixed-menu__item')

const transitionOver = 800
const mouseInertiaOver = 100

let inScroll = false

activeFirstSection()

const removeClassActiveSection = () => {

    for(let i = 0; i < sections.length; i++){

        sections[i].classList.remove('active__section')
        fixedItem[i].classList.remove('fixed-menu__item--active')

    }
}

const addClassActiveSection = sectionEq => {

    fixedItem[sectionEq].classList.add('fixed-menu__item--active')
    sections[sectionEq].classList.add('active__section')

}

const performTransition = sectionEq => {

    if(blockScroll.isBlocked()){
        return;
    }

    if(!inScroll){

        inScroll = true

        const position = sectionEq * -100
        display.style.transform = `translateY(${position}%)`

        setTimeout(()=>{

            inScroll = false

            removeClassActiveSection()
            addClassActiveSection(sectionEq)

        }, transitionOver + mouseInertiaOver)
    }
}

const linkScreenMenu = e => {

    if (e.target.classList.contains('scroll-link')){

        e.preventDefault()

        const indexHash = e.target.href.indexOf('#')
        const href = e.target.href.slice(indexHash + 1)

        for(let i = 0; i < sections.length; i++){

            if(sections[i].id === href){
                blockScroll.toggleBlock()
                performTransition(i)

            }

        }
    }

    if (e.target.classList.contains('scroll-link__page')){

        e.preventDefault()

        const indexHash = e.target.href.indexOf('#')
        const href = e.target.href.slice(indexHash + 1)

        for(let i = 0; i < sections.length; i++){

            if(sections[i].id === href){
                performTransition(i)
            }

        }
    }
}

const scrollViewport = direction => {

    const active = activeSection()
    const nextActive = active.nextElementSibling
    const prevActive = active.previousElementSibling

    let section;

    if(direction === 'next' &&  nextActive){

        for(let i = 0; i < sections.length; i++) {

            if (sections[i].id === nextActive.id) {
                section = i
            }
        }

        active.classList.remove('active__section')
        performTransition(section)
    }

    if(direction === 'prev' && prevActive){

        for(let i = 0; i < sections.length; i++) {

            if (sections[i].id === prevActive.id) {
                section = i
            }
        }

        active.classList.remove('active__section')

        performTransition(section)
    }
}

const scrollKeyDown = e => {

    let key = e.code.toLowerCase()
    let targetName = e.target.tagName.toLowerCase()

    if(targetName !== 'input' && targetName !== 'textarea'){

        switch (key){

            case 'arrowup': //prev
                scrollViewport("prev")
                break;
            case 'arrowdown': //next
                scrollViewport("next")
                break;

        }
    }
}

const scrollMouse = e => {
    e.preventDefault()

    const deltaY = e.deltaY

    if(deltaY > 0){

        if(!inScroll && !blockScroll.isBlocked()){

            scrollViewport("next")
        }
    }

    if(deltaY < 0){

        if(!inScroll && !blockScroll.isBlocked()){

            scrollViewport("prev")
        }
    }
}

const activeSection = () => {

    let active;

    sections.forEach(section => {

        if(section.classList.contains('active__section')){

            active = section

        }
    })

    return active
}

body.addEventListener('click', linkScreenMenu)
window.addEventListener('wheel', scrollMouse,{ passive: false })
window.addEventListener('keydown', scrollKeyDown)

function activeFirstSection(){
    sections[0].classList.add('active__section')
}


;const btnPlayerVideo = document.querySelector('.player__btn-video')
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
;const slider = document.querySelector("#slider-list")
const btnPrev = document.querySelector('#prev')
const btnNext = document.querySelector('#next')
const slides = document.querySelectorAll(".slider__item")

const step = 100
let currentStep = 0
let maxLeft = -(slides.length -1) * step

btnNext.addEventListener('click', ()=> {

    if(currentStep > maxLeft){
        currentStep -= step
    } else if(currentStep === maxLeft){
        currentStep = 0
    }

    slider.style.left = `${currentStep}%`
})

btnPrev.addEventListener('click', ()=> {

    if(currentStep < 0){
        currentStep += step
    }else if(currentStep === 0){
        currentStep = maxLeft
    }

    slider.style.left = `${currentStep}%`
});const teamItem = document.querySelectorAll(".team__item")
const team = document.querySelectorAll(".team__general")
const triangle = document.querySelectorAll(".triangle-popup")

teamItem.forEach(team => {

    team.addEventListener('click', (e)=>{

        let targ = e.target

        if(targ.closest('.team__name')){

            const teamGeneral = team.querySelector(".team__general")
            const triangle = team.querySelector(".triangle-popup")

            if(teamGeneral.classList.contains('select')){

                hiddenGeneral()

            }else{

                hiddenGeneral()

                teamGeneral.classList.add('select')
                triangle.classList.remove('triangle-popup__inactive')
                triangle.classList.add('triangle-popup__active')
            }
        }
    })
})

function hiddenGeneral(){

    for(let i = 0; i < team.length; i++){

        if(team[i].classList.contains('select')){
            team[i].classList.remove('select')
        }

        if(triangle[i].classList.contains('triangle-popup__active')){
            triangle[i].classList.remove('triangle-popup__active')
            triangle[i].classList.add('triangle-popup__inactive')
        }
    }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjY29yZGlvbi5qcyIsImJsb2NrUGFnZVNjcm9sbC5qcyIsImZlZWRiYWNrLmpzIiwiZm9ybS5qcyIsIm1hcC5qcyIsIm1lbnUuanMiLCJvcHMuanMiLCJwbGF5ZXIuanMiLCJzbGlkZXIuanMiLCJ0ZWFtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0NqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0M1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IGFjY29yZGlvbkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjY29yZGlvbl9faXRlbVwiKVxyXG5jb25zdCBhY2NvcmRpb25CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjY29yZGlvbl9fYnV0dG9uXCIpXHJcblxyXG5jb25zdCBnZXRJdGVtV2lkdGggPSAoYnRuKT0+e1xyXG4gICAgbGV0IGl0ZW1XaWR0aCA9IDUyNFxyXG4gICAgbGV0IGJ0bldpZHRoID0gYnRuLm9mZnNldFdpZHRoXHJcbiAgICBsZXQgbGVuZ3RoID0gYWNjb3JkaW9uQnV0dG9uLmxlbmd0aFxyXG5cclxuICAgIGNvbnN0IGlzVGFibGV0ID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA3NjhweClcIikubWF0Y2hlc1xyXG4gICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDQ4MHB4KVwiKS5tYXRjaGVzXHJcblxyXG4gICAgaWYoaXNUYWJsZXQpe1xyXG4gICAgICAgIGl0ZW1XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXHJcbiAgICAgICAgaXRlbVdpZHRoID0gYCR7aXRlbVdpZHRoIC0gYnRuV2lkdGggKiBsZW5ndGh9YFxyXG4gICAgfVxyXG5cclxuICAgIGlmKGlzTW9iaWxlKXtcclxuICAgICAgICBpdGVtV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxyXG4gICAgICAgIGl0ZW1XaWR0aCA9IGAke2l0ZW1XaWR0aCAtIGJ0bldpZHRofWBcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYCR7aXRlbVdpZHRofXB4YFxyXG59XHJcblxyXG5hY2NvcmRpb25JdGVtLmZvckVhY2godGVhbSA9PiB7XHJcblxyXG4gICAgdGVhbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgYnRuQ29sb3IgPSB0ZWFtLnF1ZXJ5U2VsZWN0b3IoJy5hY2NvcmRpb25fX2J1dHRvbicpXHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRlYW0ucXVlcnlTZWxlY3RvcignLmFjY29yZGlvbl9fY29udGV4dCcpXHJcblxyXG4gICAgICAgIGlmKGJ0bkNvbG9yKXtcclxuICAgICAgICAgICAgaWYoY29udGV4dC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjY29yZGlvbl9fY29udGV4dC0tYWN0aXZlJykgfHwgdGVhbS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjY29yZGlvbl9faXRlbS0tYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlQWNjb3JkaW9uKClcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VBY2NvcmRpb24oKVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3R5bGUud2lkdGggPSBnZXRJdGVtV2lkdGgoYnRuQ29sb3IpXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpcnN0RWxlbWVudENoaWxkLnN0eWxlLndpZHRoID0gZ2V0SXRlbVdpZHRoKGJ0bkNvbG9yKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDw9IDQ4MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVhbS5jbGFzc0xpc3QuYWRkKCdhY2NvcmRpb25fX2l0ZW0tLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA+IDQ4MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jbGFzc0xpc3QuYWRkKCdhY2NvcmRpb25fX2NvbnRleHQtLWFjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KVxyXG5cclxuZnVuY3Rpb24gY2xvc2VBY2NvcmRpb24oKXtcclxuICAgIGNvbnN0IGFjY29yZGlvbkl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjY29yZGlvbl9faXRlbVwiKVxyXG4gICAgY29uc3QgY29udGV4dEl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX19jb250ZXh0JylcclxuXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgY29udGV4dEl0ZW0ubGVuZ3RoOyBpKyspe1xyXG5cclxuICAgICAgICBpZihjb250ZXh0SXRlbVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjY29yZGlvbl9fY29udGV4dC0tYWN0aXZlJykpe1xyXG4gICAgICAgICAgICBjb250ZXh0SXRlbVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY2NvcmRpb25fX2NvbnRleHQtLWFjdGl2ZScpXHJcbiAgICAgICAgICAgIGNvbnRleHRJdGVtW2ldLnN0eWxlLndpZHRoID0nMHB4J1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWNjb3JkaW9uSXRlbVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjY29yZGlvbl9faXRlbS0tYWN0aXZlJykpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY2xvc2UnKVxyXG4gICAgICAgICAgICBhY2NvcmRpb25JdGVtW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2FjY29yZGlvbl9faXRlbS0tYWN0aXZlJylcclxuICAgICAgICAgICAgY29udGV4dEl0ZW1baV0uc3R5bGUud2lkdGggPScwcHgnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiXHJcbmNvbnN0IGJsb2NrU2Nyb2xsID0ge1xyXG4gICAgYmxvY2s6ICgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Jsb2NrJylcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNTY3JvbGxMb2NrZWQnLCB0cnVlKVxyXG4gICAgfSxcclxuICAgIHVuYmxvY2s6ICgpPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd1bmJsb2NrJylcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaXNTY3JvbGxMb2NrZWQnLCBmYWxzZSlcclxuICAgIH0sXHJcbiAgICB0b2dnbGVCbG9jazogZnVuY3Rpb24oKXtcclxuICAgICAgICBpZih0aGlzLmlzQmxvY2tlZCgpKXtcclxuICAgICAgICAgICAgdGhpcy51bmJsb2NrKClcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5ibG9jaygpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGlzQmxvY2tlZDogKCk9PiB7XHJcblxyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc1Njcm9sbExvY2tlZCcpKVxyXG4gICAgfSxcclxufTtcclxuXHJcbmJsb2NrU2Nyb2xsLnVuYmxvY2soKSIsImNvbnN0IHVzZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi51c2VyLWF2YXRhcl9faXRlbVwiKVxyXG5cclxudXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcclxuXHJcbiAgICB1c2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XHJcblxyXG4gICAgICAgIGxldCBkYXRhID0gZS50YXJnZXQuZGF0YXNldFxyXG5cclxuICAgICAgICBpZighdXNlci5jbGFzc0xpc3QuY29udGFpbnMoJ3VzZXItYXZhdGFyX19pdGVtLS1hY3RpdmUnKSl7XHJcbiAgICAgICAgICAgIGhpZGRlbkFjdGl2ZShkYXRhLmlkKVxyXG4gICAgICAgICAgICB1c2VyVmlzaWJsZShkYXRhLmlkKVxyXG4gICAgICAgICAgICB1c2VyLmNsYXNzTGlzdC5hZGQoJ3VzZXItYXZhdGFyX19pdGVtLS1hY3RpdmUnKVxyXG4gICAgICAgIH1lbHNlIGlmKHVzZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCd1c2VyLWF2YXRhcl9faXRlbS0tYWN0aXZlJykpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSlcclxuXHJcbmZ1bmN0aW9uIGhpZGRlbkFjdGl2ZSgpe1xyXG5cclxuICAgIGNvbnN0IHVzZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi51c2VyLWF2YXRhcl9faXRlbVwiKVxyXG5cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB1c2Vycy5sZW5ndGg7IGkrKyl7XHJcblxyXG4gICAgICAgIGlmKHVzZXJzW2ldLmNsYXNzTGlzdC5jb250YWlucygndXNlci1hdmF0YXJfX2l0ZW0tLWFjdGl2ZScpKXtcclxuICAgICAgICAgICAgdXNlcnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgndXNlci1hdmF0YXJfX2l0ZW0tLWFjdGl2ZScpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1c2VyVmlzaWJsZShpZCkge1xyXG5cclxuICAgIGNvbnN0IGZlZWRiYWNrVXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mZWVkYmFja19faXRlbScpXHJcblxyXG4gICAgZmVlZGJhY2tVc2VyLmZvckVhY2godXNlciA9PiB7XHJcblxyXG4gICAgICAgIGlmICh1c2VyLmNsYXNzTGlzdC5jb250YWlucygnZmVlZGJhY2tfX2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIHVzZXIuY2xhc3NMaXN0LnJlbW92ZSgnZmVlZGJhY2tfX2FjdGl2ZScpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcblxyXG4gICAgZmVlZGJhY2tVc2VyW2lkIC0gMV0uY2xhc3NMaXN0LmFkZCgnZmVlZGJhY2tfX2FjdGl2ZScpXHJcblxyXG59IiwiY29uc3QgbXlGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI215LWZvcm0nKVxyXG5cclxubXlGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKT0+e1xyXG5cclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc29sZS5sb2coJ2Jsb2NrZWQmPycsIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpc1Njcm9sbExvY2tlZCcpKVxyXG4gICAgYmxvY2tTY3JvbGwudG9nZ2xlQmxvY2soKVxyXG5cclxuICAgIGlmKHZhbGlkZXRlRm9ybShteUZvcm0pKXtcclxuXHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgICAgbmFtZTogbXlGb3JtLmVsZW1lbnRzLm5hbWUudmFsdWUsXHJcbiAgICAgICAgICAgIHBob25lOiBteUZvcm0uZWxlbWVudHMucGhvbmUudmFsdWUsXHJcbiAgICAgICAgICAgIGNvbW1lbnQ6IG15Rm9ybS5lbGVtZW50cy5jb21tZW50LnZhbHVlLFxyXG4gICAgICAgICAgICB0bzogbXlGb3JtLmVsZW1lbnRzLnRvLnZhbHVlLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnaHR0cHM6Ly93ZWJkZXYtYXBpLmxvZnRzY2hvb2wuY29tL3NlbmRtYWlsJyk7XHJcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICAgICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCk9PntcclxuICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSlcclxuICAgICAgICAgICAgaWYoZGF0YS5zdGF0dXMpe1xyXG4gICAgICAgICAgICAgICAgc2hvd01vZGFsKGRhdGEubWVzc2FnZSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBzaG93TW9kYWwoZGF0YS5tZXNzYWdlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSlcclxuXHJcbmZ1bmN0aW9uIHZhbGlkZXRlRm9ybShmb3JtKXtcclxuXHJcbiAgICBsZXQgdmFsdWUgPSB0cnVlXHJcblxyXG4gICAgaWYoIXZhbGlkYXRlRmllbGQoZm9ybS5lbGVtZW50cy5uYW1lKSl7XHJcbiAgICAgICAgdmFsdWUgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGlmKCF2YWxpZGF0ZUZpZWxkKGZvcm0uZWxlbWVudHMucGhvbmUpKXtcclxuICAgICAgICB2YWx1ZSA9IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgaWYoIXZhbGlkYXRlRmllbGQoZm9ybS5lbGVtZW50cy5jb21tZW50KSl7XHJcbiAgICAgICAgdmFsdWUgPSBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gdmFsaWRhdGVGaWVsZChmaWVsZCl7XHJcbiAgICBmaWVsZC5uZXh0RWxlbWVudFNpYmxpbmcudGV4dENvbnRlbnQgPSBmaWVsZC52YWxpZGF0aW9uTWVzc2FnZVxyXG4gICAgcmV0dXJuIGZpZWxkLmNoZWNrVmFsaWRpdHkoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93TW9kYWwodGV4dCl7XHJcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZXNzYWdlJylcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWpzLXZpc2libGUnKVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2VTdGF0dXMgPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZV9fdGV4dCcpXHJcbiAgICBtZXNzYWdlU3RhdHVzLnRleHRDb250ZW50ID0gdGV4dFxyXG5cclxuICAgIGNvbnN0IGNsb3NlID0gbW9kYWwucXVlcnlTZWxlY3RvcignI2Nsb3NlTW9kYWwnKVxyXG4gICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xyXG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLWpzLXZpc2libGUnKVxyXG4gICAgICAgIGJsb2NrU2Nyb2xsLnRvZ2dsZUJsb2NrKClcclxuICAgIH0pXHJcbn0iLCJsZXQgbXlNYXA7XHJcblxyXG5jb25zdCBpbml0ID0gKCk9PntcclxuXHJcbiAgICBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJtYXBcIiwge1xyXG4gICAgICAgIGNlbnRlcjogWzU1LjcyNTE0NiwgMzcuNjQ2OTMwXSxcclxuICAgICAgICB6b29tOiAxMCxcclxuICAgICAgICBjb250cm9sczogW10sXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBjb29yZHMgPSBbXHJcbiAgICAgICAgWzU1LjkwLCAzNy42NF0sXHJcbiAgICAgICAgWzU1LjgwLCAzNy43NF0sXHJcbiAgICAgICAgWzU1LjU1LCAzNy44NF0sXHJcbiAgICAgICAgWzU1LjcwLCAzNy45NF0sXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IG15Q29sbGVjdGlvbiA9IG5ldyB5bWFwcy5HZW9PYmplY3RDb2xsZWN0aW9uKHt9LCB7XHJcbiAgICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcclxuICAgICAgICBpY29uTGF5b3V0OiAnZGVmYXVsdCNpbWFnZScsXHJcbiAgICAgICAgaWNvbkltYWdlSHJlZjogJy4vaW1hZ2UvbWFwLXNlY3Rpb24vbWFya2VyLnBuZycsXHJcbiAgICAgICAgaWNvbkltYWdlU2l6ZTogWzQ2LCA1N10sXHJcbiAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTUwLCAtMzBdXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XHJcbiAgICAgICAgbXlDb2xsZWN0aW9uLmFkZChuZXcgeW1hcHMuUGxhY2VtYXJrKGNvb3JkKSk7XHJcbiAgICB9KVxyXG5cclxuICAgIG15TWFwLmdlb09iamVjdHMuYWRkKG15Q29sbGVjdGlvbik7XHJcblxyXG4gICAgbXlNYXAuYmVoYXZpb3JzLmRpc2FibGUoJ3Njcm9sbFpvb20nKTtcclxuXHJcbn1cclxuXHJcbnltYXBzLnJlYWR5KGluaXQpIiwiXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PSBtZW51ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbmNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjcmVlbi1tZW51XCIpXHJcbmNvbnN0IGJ0bk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWJ1cmdlci1tZW51XCIpXHJcbmNvbnN0IGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbG9zZVwiKVxyXG5cclxubWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG4gICAgaWYoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51X19saW5rJykpe1xyXG4gICAgICAgIG1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgIH1cclxufSlcclxuXHJcbmJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbWVudS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgYmxvY2tTY3JvbGwudG9nZ2xlQmxvY2soKVxyXG59KVxyXG5cclxuY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgYmxvY2tTY3JvbGwudG9nZ2xlQmxvY2soKVxyXG4gICAgYWN0aXZlRmlyc3RTZWN0aW9uKClcclxufSlcclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keVxyXG5jb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXJfX2NvbnRlbnQnKVxyXG5jb25zdCBzZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlY3Rpb24nKVxyXG5jb25zdCBmaXhlZEl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZml4ZWQtbWVudV9faXRlbScpXHJcblxyXG5jb25zdCB0cmFuc2l0aW9uT3ZlciA9IDgwMFxyXG5jb25zdCBtb3VzZUluZXJ0aWFPdmVyID0gMTAwXHJcblxyXG5sZXQgaW5TY3JvbGwgPSBmYWxzZVxyXG5cclxuYWN0aXZlRmlyc3RTZWN0aW9uKClcclxuXHJcbmNvbnN0IHJlbW92ZUNsYXNzQWN0aXZlU2VjdGlvbiA9ICgpID0+IHtcclxuXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspe1xyXG5cclxuICAgICAgICBzZWN0aW9uc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmVfX3NlY3Rpb24nKVxyXG4gICAgICAgIGZpeGVkSXRlbVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdmaXhlZC1tZW51X19pdGVtLS1hY3RpdmUnKVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYWRkQ2xhc3NBY3RpdmVTZWN0aW9uID0gc2VjdGlvbkVxID0+IHtcclxuXHJcbiAgICBmaXhlZEl0ZW1bc2VjdGlvbkVxXS5jbGFzc0xpc3QuYWRkKCdmaXhlZC1tZW51X19pdGVtLS1hY3RpdmUnKVxyXG4gICAgc2VjdGlvbnNbc2VjdGlvbkVxXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmVfX3NlY3Rpb24nKVxyXG5cclxufVxyXG5cclxuY29uc3QgcGVyZm9ybVRyYW5zaXRpb24gPSBzZWN0aW9uRXEgPT4ge1xyXG5cclxuICAgIGlmKGJsb2NrU2Nyb2xsLmlzQmxvY2tlZCgpKXtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIWluU2Nyb2xsKXtcclxuXHJcbiAgICAgICAgaW5TY3JvbGwgPSB0cnVlXHJcblxyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uID0gc2VjdGlvbkVxICogLTEwMFxyXG4gICAgICAgIGRpc3BsYXkuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoJHtwb3NpdGlvbn0lKWBcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG5cclxuICAgICAgICAgICAgaW5TY3JvbGwgPSBmYWxzZVxyXG5cclxuICAgICAgICAgICAgcmVtb3ZlQ2xhc3NBY3RpdmVTZWN0aW9uKClcclxuICAgICAgICAgICAgYWRkQ2xhc3NBY3RpdmVTZWN0aW9uKHNlY3Rpb25FcSlcclxuXHJcbiAgICAgICAgfSwgdHJhbnNpdGlvbk92ZXIgKyBtb3VzZUluZXJ0aWFPdmVyKVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBsaW5rU2NyZWVuTWVudSA9IGUgPT4ge1xyXG5cclxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Njcm9sbC1saW5rJykpe1xyXG5cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXhIYXNoID0gZS50YXJnZXQuaHJlZi5pbmRleE9mKCcjJylcclxuICAgICAgICBjb25zdCBocmVmID0gZS50YXJnZXQuaHJlZi5zbGljZShpbmRleEhhc2ggKyAxKVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspe1xyXG5cclxuICAgICAgICAgICAgaWYoc2VjdGlvbnNbaV0uaWQgPT09IGhyZWYpe1xyXG4gICAgICAgICAgICAgICAgYmxvY2tTY3JvbGwudG9nZ2xlQmxvY2soKVxyXG4gICAgICAgICAgICAgICAgcGVyZm9ybVRyYW5zaXRpb24oaSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Njcm9sbC1saW5rX19wYWdlJykpe1xyXG5cclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXhIYXNoID0gZS50YXJnZXQuaHJlZi5pbmRleE9mKCcjJylcclxuICAgICAgICBjb25zdCBocmVmID0gZS50YXJnZXQuaHJlZi5zbGljZShpbmRleEhhc2ggKyAxKVxyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspe1xyXG5cclxuICAgICAgICAgICAgaWYoc2VjdGlvbnNbaV0uaWQgPT09IGhyZWYpe1xyXG4gICAgICAgICAgICAgICAgcGVyZm9ybVRyYW5zaXRpb24oaSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHNjcm9sbFZpZXdwb3J0ID0gZGlyZWN0aW9uID0+IHtcclxuXHJcbiAgICBjb25zdCBhY3RpdmUgPSBhY3RpdmVTZWN0aW9uKClcclxuICAgIGNvbnN0IG5leHRBY3RpdmUgPSBhY3RpdmUubmV4dEVsZW1lbnRTaWJsaW5nXHJcbiAgICBjb25zdCBwcmV2QWN0aXZlID0gYWN0aXZlLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcclxuXHJcbiAgICBsZXQgc2VjdGlvbjtcclxuXHJcbiAgICBpZihkaXJlY3Rpb24gPT09ICduZXh0JyAmJiAgbmV4dEFjdGl2ZSl7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlY3Rpb25zW2ldLmlkID09PSBuZXh0QWN0aXZlLmlkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWN0aW9uID0gaVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlX19zZWN0aW9uJylcclxuICAgICAgICBwZXJmb3JtVHJhbnNpdGlvbihzZWN0aW9uKVxyXG4gICAgfVxyXG5cclxuICAgIGlmKGRpcmVjdGlvbiA9PT0gJ3ByZXYnICYmIHByZXZBY3RpdmUpe1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWN0aW9uc1tpXS5pZCA9PT0gcHJldkFjdGl2ZS5pZCkge1xyXG4gICAgICAgICAgICAgICAgc2VjdGlvbiA9IGlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWN0aXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZV9fc2VjdGlvbicpXHJcblxyXG4gICAgICAgIHBlcmZvcm1UcmFuc2l0aW9uKHNlY3Rpb24pXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHNjcm9sbEtleURvd24gPSBlID0+IHtcclxuXHJcbiAgICBsZXQga2V5ID0gZS5jb2RlLnRvTG93ZXJDYXNlKClcclxuICAgIGxldCB0YXJnZXROYW1lID0gZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpXHJcblxyXG4gICAgaWYodGFyZ2V0TmFtZSAhPT0gJ2lucHV0JyAmJiB0YXJnZXROYW1lICE9PSAndGV4dGFyZWEnKXtcclxuXHJcbiAgICAgICAgc3dpdGNoIChrZXkpe1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnYXJyb3d1cCc6IC8vcHJldlxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsVmlld3BvcnQoXCJwcmV2XCIpXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXJyb3dkb3duJzogLy9uZXh0XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxWaWV3cG9ydChcIm5leHRcIilcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHNjcm9sbE1vdXNlID0gZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICBjb25zdCBkZWx0YVkgPSBlLmRlbHRhWVxyXG5cclxuICAgIGlmKGRlbHRhWSA+IDApe1xyXG5cclxuICAgICAgICBpZighaW5TY3JvbGwgJiYgIWJsb2NrU2Nyb2xsLmlzQmxvY2tlZCgpKXtcclxuXHJcbiAgICAgICAgICAgIHNjcm9sbFZpZXdwb3J0KFwibmV4dFwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZihkZWx0YVkgPCAwKXtcclxuXHJcbiAgICAgICAgaWYoIWluU2Nyb2xsICYmICFibG9ja1Njcm9sbC5pc0Jsb2NrZWQoKSl7XHJcblxyXG4gICAgICAgICAgICBzY3JvbGxWaWV3cG9ydChcInByZXZcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGFjdGl2ZVNlY3Rpb24gPSAoKSA9PiB7XHJcblxyXG4gICAgbGV0IGFjdGl2ZTtcclxuXHJcbiAgICBzZWN0aW9ucy5mb3JFYWNoKHNlY3Rpb24gPT4ge1xyXG5cclxuICAgICAgICBpZihzZWN0aW9uLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlX19zZWN0aW9uJykpe1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlID0gc2VjdGlvblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBhY3RpdmVcclxufVxyXG5cclxuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxpbmtTY3JlZW5NZW51KVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBzY3JvbGxNb3VzZSx7IHBhc3NpdmU6IGZhbHNlIH0pXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc2Nyb2xsS2V5RG93bilcclxuXHJcbmZ1bmN0aW9uIGFjdGl2ZUZpcnN0U2VjdGlvbigpe1xyXG4gICAgc2VjdGlvbnNbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlX19zZWN0aW9uJylcclxufVxyXG5cclxuXHJcbiIsImNvbnN0IGJ0blBsYXllclZpZGVvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcl9fYnRuLXZpZGVvJylcclxuY29uc3QgYnRuUGxheWVyU3RhcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyX19zdGFydCcpXHJcbmNvbnN0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcicpXHJcbmNvbnN0IHBsYXllckR1cmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcl9fZHVyYXRpb24nKVxyXG5jb25zdCBzb3VuZENvbnRyb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQtY29udHJvbF9fbGV2ZWwnKVxyXG5jb25zdCBzb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3VuZCcpXHJcbmNvbnN0IGR5bmFtaWNCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc291bmQtZHluYW1pYycpXHJcblxyXG5sZXQgaW50ZXJ2YWxJZDtcclxubGV0IHNvdW5kTGV2ZWw7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpPT57XHJcbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlTdG9wKVxyXG5cclxuICAgIGxldCBwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wbGF5XCIpXHJcblxyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlCdG4ubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHBsYXlCdG5baV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5U3RvcClcclxuICAgIH1cclxuXHJcbiAgICBwbGF5ZXJEdXJhdGlvbi5taW4gPSAwXHJcbiAgICBwbGF5ZXJEdXJhdGlvbi52YWx1ZSA9IDBcclxuICAgIHBsYXllckR1cmF0aW9uLm1heCA9IHZpZGVvLmR1cmF0aW9uXHJcblxyXG4gICAgcGxheWVyRHVyYXRpb24uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBzZXRWaWRlb0R1cmF0aW9uKTtcclxuXHJcbiAgICBzb3VuZENvbnRyb2wubWluID0gMFxyXG4gICAgc291bmRDb250cm9sLm1heCA9IDEwXHJcbiAgICBzb3VuZENvbnRyb2wudmFsdWUgPSBzb3VuZENvbnRyb2wubWF4XHJcbiAgICBzb3VuZENvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGFuZ2VTb3VuZFZvbHVtZSlcclxuICAgIGNoYW5nZVNvdW5kVm9sdW1lKClcclxuXHJcbiAgICAvL9C+0YLQutC70Y7Rh9C10L3QuNC1INC30LLRg9C60LAg0L/RgNC4INC60LvQuNC60LUg0L/QviDQtNC40L3QsNC80LjQutGDXHJcbiAgICBkeW5hbWljQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc291bmRPZmYpXHJcblxyXG4gICAgLy/QvtC60L7QvdGH0LDQvdC40LUg0LLQuNC00LXQvlxyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKT0+e1xyXG4gICAgICAgIGJ0blBsYXllclZpZGVvLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXllcl9fYnRuLS1hY3RpdmUnKVxyXG4gICAgICAgIGJ0blBsYXllclN0YXJ0LmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXllcl9fYWN0aXZlJylcclxuICAgIH0pXHJcblxyXG59KVxyXG5cclxuLy/RhNGD0L3QutGG0LjRjyDQstC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40Y8gLyDQv9Cw0YPQt9CwXHJcbmZ1bmN0aW9uIHBsYXlTdG9wKCl7XHJcbiAgICBpZih2aWRlby5wYXVzZWQpe1xyXG5cclxuICAgICAgICB2aWRlby5wbGF5KClcclxuICAgICAgICBidG5QbGF5ZXJWaWRlby5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJfX2J0bi0tYWN0aXZlJylcclxuICAgICAgICBidG5QbGF5ZXJTdGFydC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJfX2FjdGl2ZScpXHJcbiAgICAgICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKHVwZGF0ZUR1cmF0aW9uLCAxMDAwIC8gNjApXHJcblxyXG4gICAgfWVsc2V7XHJcblxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZClcclxuICAgICAgICB2aWRlby5wYXVzZSgpXHJcbiAgICAgICAgYnRuUGxheWVyVmlkZW8uY2xhc3NMaXN0LnJlbW92ZSgncGxheWVyX19idG4tLWFjdGl2ZScpXHJcbiAgICAgICAgYnRuUGxheWVyU3RhcnQuY2xhc3NMaXN0LnJlbW92ZSgncGxheWVyX19hY3RpdmUnKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRWaWRlb0R1cmF0aW9uKCl7XHJcbiAgICB2aWRlby5jdXJyZW50VGltZSA9IHBsYXllckR1cmF0aW9uLnZhbHVlXHJcbiAgICB1cGRhdGVEdXJhdGlvbigpXHJcbn1cclxuXHJcbi8v0YTRg9C90LrRhtC40Y8g0YLRgNC10LrQuNC90LPQsCDQstC40LTQtdC+XHJcbmZ1bmN0aW9uIHVwZGF0ZUR1cmF0aW9uKCl7XHJcblxyXG4gICAgcGxheWVyRHVyYXRpb24udmFsdWUgPSB2aWRlby5jdXJyZW50VGltZVxyXG4gICAgbGV0IHN0ZXAgPSB2aWRlby5kdXJhdGlvbiAvIDEwMFxyXG4gICAgbGV0IHBlcmNlbnQgPSB2aWRlby5jdXJyZW50VGltZSAvIHN0ZXBcclxuXHJcbiAgICBwbGF5ZXJEdXJhdGlvbi5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCg5MGRlZywgcmVkIDAlLCByZWQgJHtwZXJjZW50fSUsICM2MjYyNjIgJHtwZXJjZW50fSUpYFxyXG59XHJcblxyXG4vL9GE0YPQvdC60YbQuNGPINC40LfQvNC10L3QtdC40Y8g0LfQstGD0LrQsFxyXG5mdW5jdGlvbiBjaGFuZ2VTb3VuZFZvbHVtZSgpIHtcclxuXHJcbiAgICB2aWRlby52b2x1bWUgPSBzb3VuZENvbnRyb2wudmFsdWUgLyAxMFxyXG4gICAgbGV0IHN0ZXAgPSAxXHJcbiAgICBsZXQgcGVyY2VudCA9IChwYXJzZUludChzb3VuZENvbnRyb2wudmFsdWUpICogc3RlcCkgKiAxMFxyXG5cclxuICAgIHNvdW5kQ29udHJvbC5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCg5MGRlZywgcmVkIDAlLCByZWQgJHtwZXJjZW50fSUsICM2MjYyNjIgJHtwZXJjZW50fSUpYFxyXG5cclxuICAgIGlmKHZpZGVvLnZvbHVtZSA9PT0gMCl7XHJcbiAgICAgICAgc291bmQuY2xhc3NMaXN0LmFkZCgnc291bmRfX2FjdGl2ZScpXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICBzb3VuZC5jbGFzc0xpc3QucmVtb3ZlKCdzb3VuZF9fYWN0aXZlJylcclxuICAgIH1cclxufVxyXG5cclxuLy/RhNGD0L3QutGG0LjRjyDQvtGC0LrQu9GO0YfQtdC90LjRjyDQt9Cy0YPQutCwXHJcbmZ1bmN0aW9uIHNvdW5kT2ZmKCl7XHJcblxyXG4gICAgaWYodmlkZW8udm9sdW1lID09PSAwKXtcclxuXHJcbiAgICAgICAgdmlkZW8udm9sdW1lID0gc291bmRMZXZlbFxyXG4gICAgICAgIHNvdW5kQ29udHJvbC52YWx1ZSA9IHNvdW5kTGV2ZWwgKiAxMFxyXG4gICAgICAgIHNvdW5kLmNsYXNzTGlzdC5yZW1vdmUoJ3NvdW5kX19hY3RpdmUnKVxyXG4gICAgfWVsc2V7XHJcblxyXG4gICAgICAgIHNvdW5kTGV2ZWwgPSB2aWRlby52b2x1bWVcclxuICAgICAgICB2aWRlby52b2x1bWUgPSAwXHJcbiAgICAgICAgc291bmRDb250cm9sLnZhbHVlID0gMFxyXG4gICAgICAgIHNvdW5kLmNsYXNzTGlzdC5hZGQoJ3NvdW5kX19hY3RpdmUnKVxyXG4gICAgfVxyXG59XHJcbiIsImNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2xpZGVyLWxpc3RcIilcclxuY29uc3QgYnRuUHJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2JylcclxuY29uc3QgYnRuTmV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0JylcclxuY29uc3Qgc2xpZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbGlkZXJfX2l0ZW1cIilcclxuXHJcbmNvbnN0IHN0ZXAgPSAxMDBcclxubGV0IGN1cnJlbnRTdGVwID0gMFxyXG5sZXQgbWF4TGVmdCA9IC0oc2xpZGVzLmxlbmd0aCAtMSkgKiBzdGVwXHJcblxyXG5idG5OZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XHJcblxyXG4gICAgaWYoY3VycmVudFN0ZXAgPiBtYXhMZWZ0KXtcclxuICAgICAgICBjdXJyZW50U3RlcCAtPSBzdGVwXHJcbiAgICB9IGVsc2UgaWYoY3VycmVudFN0ZXAgPT09IG1heExlZnQpe1xyXG4gICAgICAgIGN1cnJlbnRTdGVwID0gMFxyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlci5zdHlsZS5sZWZ0ID0gYCR7Y3VycmVudFN0ZXB9JWBcclxufSlcclxuXHJcbmJ0blByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHtcclxuXHJcbiAgICBpZihjdXJyZW50U3RlcCA8IDApe1xyXG4gICAgICAgIGN1cnJlbnRTdGVwICs9IHN0ZXBcclxuICAgIH1lbHNlIGlmKGN1cnJlbnRTdGVwID09PSAwKXtcclxuICAgICAgICBjdXJyZW50U3RlcCA9IG1heExlZnRcclxuICAgIH1cclxuXHJcbiAgICBzbGlkZXIuc3R5bGUubGVmdCA9IGAke2N1cnJlbnRTdGVwfSVgXHJcbn0pIiwiY29uc3QgdGVhbUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRlYW1fX2l0ZW1cIilcclxuY29uc3QgdGVhbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVhbV9fZ2VuZXJhbFwiKVxyXG5jb25zdCB0cmlhbmdsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudHJpYW5nbGUtcG9wdXBcIilcclxuXHJcbnRlYW1JdGVtLmZvckVhY2godGVhbSA9PiB7XHJcblxyXG4gICAgdGVhbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xyXG5cclxuICAgICAgICBsZXQgdGFyZyA9IGUudGFyZ2V0XHJcblxyXG4gICAgICAgIGlmKHRhcmcuY2xvc2VzdCgnLnRlYW1fX25hbWUnKSl7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0ZWFtR2VuZXJhbCA9IHRlYW0ucXVlcnlTZWxlY3RvcihcIi50ZWFtX19nZW5lcmFsXCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHRyaWFuZ2xlID0gdGVhbS5xdWVyeVNlbGVjdG9yKFwiLnRyaWFuZ2xlLXBvcHVwXCIpXHJcblxyXG4gICAgICAgICAgICBpZih0ZWFtR2VuZXJhbC5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdCcpKXtcclxuXHJcbiAgICAgICAgICAgICAgICBoaWRkZW5HZW5lcmFsKClcclxuXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgICAgIGhpZGRlbkdlbmVyYWwoKVxyXG5cclxuICAgICAgICAgICAgICAgIHRlYW1HZW5lcmFsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICB0cmlhbmdsZS5jbGFzc0xpc3QucmVtb3ZlKCd0cmlhbmdsZS1wb3B1cF9faW5hY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgdHJpYW5nbGUuY2xhc3NMaXN0LmFkZCgndHJpYW5nbGUtcG9wdXBfX2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59KVxyXG5cclxuZnVuY3Rpb24gaGlkZGVuR2VuZXJhbCgpe1xyXG5cclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0ZWFtLmxlbmd0aDsgaSsrKXtcclxuXHJcbiAgICAgICAgaWYodGVhbVtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlbGVjdCcpKXtcclxuICAgICAgICAgICAgdGVhbVtpXS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QnKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHJpYW5nbGVbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCd0cmlhbmdsZS1wb3B1cF9fYWN0aXZlJykpe1xyXG4gICAgICAgICAgICB0cmlhbmdsZVtpXS5jbGFzc0xpc3QucmVtb3ZlKCd0cmlhbmdsZS1wb3B1cF9fYWN0aXZlJylcclxuICAgICAgICAgICAgdHJpYW5nbGVbaV0uY2xhc3NMaXN0LmFkZCgndHJpYW5nbGUtcG9wdXBfX2luYWN0aXZlJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
