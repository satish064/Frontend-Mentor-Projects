const icons = document.querySelectorAll('.sign img')
const para = document.querySelectorAll('.sign p')
const textContent = document.querySelectorAll('#text-content')

let icon = true


function checkIcon(i) {
    if(icon) {
        i.src = "./assets/images/icon-minus.svg"
    } else {
        i.src = "./assets/images/icon-plus.svg"
    }
}


function checkValue(arr) {
    let c = true
    let mod = arr.getAttribute('class').split(' ')
    for (let i = 0; i <= mod.length; i++) {
        if (mod[i] == 'hidden') {
            mod[i] = 'block'
            c = false
            icon = true
            break;
        } else if (mod[i] == 'block') {
            mod[i] = 'hidden'
            c = false
            icon = false
            break;
        }
    }
    if (c) {
        mod.push('hidden')
        icon = false
    }
    let newStr = ''
    for (let i = 0; i < mod.length; i++) {
        newStr += (mod[i] + ' ')
    }
    arr.setAttribute('class',newStr)
}


for (let i = 0; i < para.length; i++) {
    para[i].addEventListener('click', () => {
        checkValue(textContent[i])
        checkIcon(icons[i])
    })
    icons[i].addEventListener('click',() => {
        checkValue(textContent[i])
        checkIcon(icons[i])
    })
}
