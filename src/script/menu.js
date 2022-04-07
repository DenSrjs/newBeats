
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





