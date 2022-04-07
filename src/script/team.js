const teamItem = document.querySelectorAll(".team__item")
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