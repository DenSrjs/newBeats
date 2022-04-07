const users = document.querySelectorAll(".user-avatar__item")

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

}