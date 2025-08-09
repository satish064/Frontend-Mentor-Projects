const addToCardFooter = document.querySelector('.button-footer')
const emptyCard = document.querySelector('.empty-card')
const totalPrice = document.querySelector('.total-price')
const cardCount = document.querySelector('.card-count')
const popUpItemContainer = document.querySelector('.popup-item-container')
const popUp = document.querySelector('.popup')
const popupTotalPrice = document.querySelector('.popup-order-total-price')
const startNewOrderBtn = document.querySelector('.start-new-order-btn')

function toggleButton() {
  const addToCardBtn = document.querySelectorAll('.addToCardBtn')
  const minusPlusBtn = document.querySelectorAll('.minusPlusBtn')
  const mainImg = document.querySelectorAll('.main-img')
  addToCardBtn.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.item-container')
      if (!(btn.classList.contains('hidden'))) {
        btn.classList.add('hidden')
        minusPlusBtn[index].classList.remove('hidden')
        mainImg[index].classList.add('ring-Red', 'ring')
      }
      addToCardContainer(item)
      emptyCard.classList.add('hidden')
      addToCardFooter.classList.remove('hidden')
    })
  })
}

function addToCardContainer(item) {
  console.log();
  const price = item.querySelector('.price').innerText.replace("$", "")
  const deciseName = item.querySelector('.food-name').innerText
  let addToCardContainer = document.querySelector('.add-to-card-container')
  const article = document.createElement("article")
  article.classList.add('add-to-card-items')
  article.innerHTML =
    `
          <div id="add-to-card-items" class=" my-3.5">
        <div class="flex justify-between">
          <div>
            <p class="font-bold text-Rose-900 mb-0.5 food-name">${deciseName}</p>
            <div class="flex">
              <p class="font-bold text-Red mr-4"><span class="add-to-card-number">1</span>x</p>
              <p class="text-Rose-400 mr-2"><span class="text-[15px] text-Rose-300">@</span class="">
                $${price}</p>
              <p class="font-bold text-Rose-500">$<span class="price">${price}</span></p>
            </div>
          </div>
          <div class="self-center w-[18px] h-[18px] rounded-full border-[1.5px] border-Rose-300 text-Rose-300 flex-center hover:cursor-pointer remove-item hover:border-Rose-900 hover:text-Rose-900" >
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="10" class="fill-current" viewBox="0 0 10 10"><path fill="" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"></path></svg>
          </div>
        </div>
        <div class="my-3 border border-Rose-50 w-full"></div>
      </div>
    `
  let div = document.createElement('div')
  div.classList.add('bg-Rose-50')
  div.innerHTML =
    `
          <div class="flex justify-between items-center">
            <div class="flex">
            <img src="${item.querySelector('.main-img').src}" alt="" class="w-[50px] rounded-md">
            <div class="flex flex-col ml-2.5">
              <p class="popuo-decise-name">${deciseName}</p>
              <div class="flex ">
                <p class="font-bold text-Red mr-3"><span class="popup-number">1</span>x</p>
                <p class="text-Rose-400 mr-2"><span class="text-[15px] text-Rose-300">@</span> $${price}</p>
              </div>
            </div>
          </div>
            <p class="font-bold text-Rose-500">$<span class="popup-price">5.50</span></p>
          </div>
           <div class="mt-4 border border-Rose-50 w-full bg-Rose-200"></div>
        `
  popUpItemContainer.append(div)

  addToCardContainer.append(article)
}

function setupCartFunctionality() {
  const itemContainer = document.querySelector('#item-container'); // assuming parent wrapper
  if (!itemContainer) {
    console.log('Item container not found');
    return;
  }

  itemContainer.addEventListener('click', (e) => {
    const incBtn = e.target.closest('.inc');
    const decBtn = e.target.closest('.dec');


    const card = e.target.closest('.flex.flex-col.relative');
    if (!card) return;

    const numberEl = card.querySelector('.number');
    const name = (card.querySelector('.food-name')).innerText
    if ((incBtn || decBtn) && numberEl) {
      let currentVal = parseInt(numberEl.textContent);

      if (incBtn) {
        currentVal++;
      } else if (decBtn) {
        if (currentVal > 1) {
          currentVal--;
        }
      }

      numberEl.textContent = currentVal;
    }
    addToCardFunction(numberEl.innerText, name, card)
  });
}

function addToCardFunction(currentVal, itemName, card) {
  let addToCardItems = document.querySelectorAll('.add-to-card-items')
  const confirmOrderBtn = document.querySelector('.confirm-order-btn')
  let updateTotalPrice = 0
  let totalCardCount = 0

  addToCardItems.forEach((items, idx) => {
    let itemCount = items.querySelector('.add-to-card-number')
    let popupNumber = document.querySelectorAll('.popup-number')
    let popupDeciseName = document.querySelectorAll('.popuo-decise-name')
    let foodName = items.querySelector('.food-name')
    let priceEl = items.querySelector('.price')
    let popupPrice = document.querySelectorAll('.popup-price')
    const removeItem = items.querySelector('.remove-item')
    let basePrice = priceEl.dataset.basePrice

    if (!basePrice) {
      // Store original price only once
      basePrice = parseFloat(priceEl.innerText);
      priceEl.dataset.basePrice = basePrice;
    } else {
      basePrice = parseFloat(basePrice);
    }


    if (foodName && itemName === foodName.innerText) {
      itemCount.innerText = currentVal
    popupNumber[idx].innerText = currentVal
      let updatePrice = parseFloat(basePrice) * parseFloat(currentVal)
      priceEl.innerText = updatePrice.toFixed(2)
      if (popupDeciseName[idx].innerText === foodName.innerText) {
        popupPrice[idx].innerText = updatePrice.toFixed(2)
      }
    }



    if (!removeItem.dataset.listenerAdded) {
      removeItem.addEventListener('click', () => {
        const addToCardBtn = card.querySelector('.addToCardBtn')
        const minusPlusBtn = card.querySelector('.minusPlusBtn')
        const number = card.querySelector('.number')
        const img = card.querySelector('.main-img')

        minusPlusBtn.classList.add('hidden')
        addToCardBtn.classList.remove('hidden')
        img.classList.remove('ring-Red', 'ring')


        updateTotalPrice = parseInt(totalPrice.innerText) - parseInt(priceEl.innerText)
        totalPrice.innerText = updateTotalPrice

        totalCardCount = parseInt(cardCount.innerText) - parseInt(number.innerText)
        cardCount.innerText = totalCardCount
        number.innerText = 1
        items.remove()

        if (parseInt(totalPrice.innerText) === 0) {
          document.querySelector('.empty-card').classList.remove('hidden')
          document.querySelector('.button-footer').classList.add('hidden')
          cardCount.innerText = 0
        }
        itemCount = 0
      })
      removeItem.dataset.listenerAdded = 'true'  // prevent adding again
    }

    confirmOrderBtn.addEventListener(('click'), (e) => {
      popUp.showModal()
    })

    startNewOrderBtn.addEventListener(('click'), (e) => {
      document.querySelector('.modal-popover').close()
        const addToCardBtn = card.querySelector('.addToCardBtn')
        const minusPlusBtn = card.querySelector('.minusPlusBtn')
        const number = card.querySelector('.number')
        const img = card.querySelector('.main-img')

        minusPlusBtn.classList.add('hidden')
        addToCardBtn.classList.remove('hidden')
        img.classList.remove('ring-Red', 'ring')

        items.remove()
          document.querySelector('.empty-card').classList.remove('hidden')
          document.querySelector('.button-footer').classList.add('hidden')
          cardCount.innerText = 0
        number.innerText = 1

        
        popUpItemContainer.innerHTML = ""
    })



    updateTotalPrice += parseFloat(priceEl.innerText)
    totalPrice.innerText = updateTotalPrice.toFixed(2)
    popupTotalPrice.innerText = `$${updateTotalPrice.toFixed(2)}`

    totalCardCount += parseFloat(itemCount.innerText)
    cardCount.innerText = totalCardCount
  })
}


async function loadJson(filePath) {
  try {
    const response = await fetch(filePath)
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`Error loading JSON: ${error.message}`)
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadJson('data.json')
  const itemContainer = document.querySelector('#item-container');
  data.forEach(item => {
    const article = document.createElement("article")
    article.classList.add('item-container')
    article.innerHTML =
      `
         <div class="flex flex-col relative ">
        <img class="w-full rounded-lg main-img" src="${item.image.desktop}" alt="${item.name}">
           <div class="button addToCardBtn flex items-center justify-center border border-Rose-500 bg-white py-2 gap-2 rounded-full max-w-[160px] relative left-[50%] translate-x-[-50%] bottom-[19px] mb-[-12px] hover:cursor-pointer hover:text-Red hover:ring-1 hover:border-Red transition-all duration-350 ease-in-out" >
          <img src="./assets/images/icon-add-to-cart.svg" alt="add-to-cart ">
          <button>Add to Cart</button>
        </div>
     <div class="button minusPlusBtn flex border border-Rose-500 bg-Red py-2 gap-1 rounded-full max-w-[160px] relative left-[50%] translate-x-[-50%] bottom-[19px] mb-[-12px]  px-4 justify-between items-center hidden transition-all duration-350 ease-in-out">
        <div class="dec border-[1.5px] border-white rounded-full h-[20px] w-[20px] flex-center hover:cursor-pointer hover:bg-white text-white hover:text-Red transition-all duration-350 ease-in-out">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="2" class="fill-current" viewBox="0 0 10 2"><path fill="" d="M0 .375h10v1.25H0V.375Z"></path></svg>
        </div>
        <p class="text-white number">1</p>
        <div class="inc border-[1.5px] border-white rounded-full h-[20px] w-[20px] flex-center hover:cursor-pointer
        hover:bg-white text-white hover:text-Red transition-all duration-350 ease-in-out">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="10" height="10" class="fill-current" viewBox="0 0 10 10"><path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"></path></svg>
        </div>
      </div>
        <p class="text-Rose-500">${item.category}</p>
        <h2 class="text-lg font-semibold food-name">${item.name}</h2>
        <p class="text-lg font-bold text-Red price">$${item.price.toFixed(2)}</p>
      </div>
      `
    itemContainer.appendChild(article)
  });
  toggleButton()
  setupCartFunctionality()
})
