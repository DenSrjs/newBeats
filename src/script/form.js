const myForm = document.querySelector('#my-form')

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
}