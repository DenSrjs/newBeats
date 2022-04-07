const slider = document.querySelector("#slider-list")
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
})