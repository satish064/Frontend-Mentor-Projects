const ratingContainer = document.querySelectorAll('#rating-container li')
const sumbit = document.querySelector('#sumbit')

let value
ratingContainer.forEach((e) => {
    e.addEventListener('click', () => {
        for (let i = 0; i < ratingContainer.length; i++) {
            ratingContainer[i].classList.remove('ratingHover')
        }
        e.classList.add('ratingHover')
        isInputClicked()
    })
    e.addEventListener('click', () => {
        e.classList.remove('hoverOrange')
        e.classList.add('hover:cursor-pointer')
        value = e.innerText
    })
})

function isInputClicked() {
ratingContainer.forEach((e) => {
    if(e.classList.contains('ratingHover')){
        sumbit.addEventListener('click', () => {
      document.body.innerHTML = 
      `
      <main class="text-center bg-grey-900 rounded-3xl lg:p-8 max-w-sm p-6">
        <div class="flex items-center justify-center">
            <img src="./images/illustration-thank-you.svg" alt="thank-you-illustration" > 
        </div>
        <p class="text-Orange-500 mt-5 mb-5 bg-gray-600 inline-block px-6 py-2 rounded-full">You selected <span id="rating">${value}</span> out of 5</p>
        <h1 class="text-White lg:text-3xl font-bold mb-4">Thank you!</h1>
        <p class="text-[15px] text-grey-500 ">
            We appreciate you taking the time to give a rating. If you ever need more support,
            don’t hesitate to get in touch!
        </p>
    </main>
      `
})
    }
})
}
ratingContainer.forEach((e) => {
    if(e.classList.contains(ratingHover)){
        sumbit.addEventListener('click', () => {
      document.body.innerHTML = 
      `
      <main class="text-center bg-grey-900 rounded-3xl lg:p-8 max-w-sm p-6">
        <div class="flex items-center justify-center">
            <img src="./images/illustration-thank-you.svg" alt="thank-you-illustration" > 
        </div>
        <p class="text-Orange-500 mt-5 mb-5 bg-gray-600 inline-block px-6 py-2 rounded-full">You selected <span id="rating">${value}</span> out of 5</p>
        <h1 class="text-White lg:text-3xl font-bold mb-4">Thank you!</h1>
        <p class="text-[15px] text-grey-500 ">
            We appreciate you taking the time to give a rating. If you ever need more support,
            don’t hesitate to get in touch!
        </p>
    </main>
      `
})
    }
})








