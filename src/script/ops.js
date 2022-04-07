const body = document.body
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


