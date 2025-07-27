const inputValues = document.querySelectorAll('input')
const button = document.querySelectorAll('button')
const divs = document.querySelectorAll('form div p')

let placeholderText = ['First Name', 'Last Name', 'Email Address', 'Password']

button.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        inputValues.forEach((input, i) => {
            if (!input.value.length) {
                input.classList.add('ring-2', 'ring-Red-400', 'focus:outline-none', 'input-with-icon')
                input.classList.remove('focus:border-Purple-700', 'focus:outline-Purple-700')
                divs[i].classList.remove('hidden')
                input.placeholder = ''
                inputValues[2].placeholder = 'email@example/com'
                inputValues[2].classList.add('placeholder:text-Red-400')
            }
        })
         e.preventDefault()
    }) 
})

inputValues.forEach((input, i) => {
    input.addEventListener('input', () => {
        if (!input.value.length) {
        } else {
            input.classList.remove('ring-Purple-350', 'ring', 'ring-2', 'ring-Red-400', 'focus:outline-none', 'input-with-icon')
            divs[i].classList.add('hidden')
            input.classList.add('focus:border-Purple-700', 'focus:outline-Purple-700', 'ring-Purple-350', 'ring')
           
        }
    })
     
    input.addEventListener('click', () => {
        input.placeholder = placeholderText[i]
        if (2 == i) {
                inputValues[2].classList.remove('placeholder:text-Red-400')
            }
    })
})


