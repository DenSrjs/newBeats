
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
}