const countryDetailsContainer = document.querySelector('.country-details-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container')
const autoSearch = document.querySelector('.auto-search-items-container')
const divider = document.querySelector('.border-b-gray-50')
const themeChanger = document.querySelector('.theme-changer')


    if(themeChanger) {
    themeChanger.addEventListener('click' , () => {
        document.body.classList.toggle('bg-Blue-950')
        localStorage.setItem('darkBody' , 'bg-Blue-950')
        for (let child of countryDetailsContainer.children) {
            child.classList.toggle('bg-Blue-900');
        }
        document.body.classList.toggle('text-white')
    })
    localStorage.clear()
    }

async function jsonData() {
    const res = await fetch('data.json')
    let data = await res.json()
    return data
}

async function getCountryDetails() {
    let data = await jsonData()

    data.forEach(element => {
        let article = document.createElement('article')
        article.classList.add('shadow', 'country-card', 'hover:cursor-pointer')
        article.innerHTML =
            `
     <div class="country-img h-[180px] ">
                    <img src="${element.flag}" alt="" class="h-full object-cover">
      </div>
                <div class="ml-4 mt-6 w-full pb-8">
                    <h1 class="font-bold text-lg mb-2 country-name">${element.name}</h1>
                    <p class="font-semibold mb-0.25">Population: <span class="text-gray-500 font-light">${element.population.toLocaleString('en-IN')}</span></p>
                    <p class="font-semibold mb-0.25">Region: <span class="text-gray-500 font-light mb-0.25">${element.region}</span></p>
                    <p class="font-semibold ">Capital: <span class="text-gray-500 font-light">${element.capital}</span></p>
                </div>
        `
        countryDetailsContainer.append(article)
    });
}

async function getDetailsByRegion() {
    let data = await jsonData()

    filterByRegion.addEventListener(('change'), (e) => {

        countryDetailsContainer.innerHTML = ''; // clear old container

        data

            .filter(country => country.region === e.target.value)
            .forEach(country => {
                let article = document.createElement('article')
                article.classList.add('shadow', 'country-card', 'hover:cursor-pointer')
                article.innerHTML =
                    `
     <div class="country-img h-[180px] ">
                    <img src="${country.flag}" alt="" class="h-full bg-cover">
      </div>
                <div class="ml-4 mt-6 w-full pb-8">
                    <h1 class="font-bold text-lg mb-2 country-name">${country.name}</h1>
                    <p class="font-semibold mb-0.25">Population: <span class="text-gray-500 font-light">${country.population}</span></p>
                    <p class="font-semibold mb-0.25">Region: <span class="text-gray-500 font-light mb-0.25">${country.region}</span></p>
                    <p class="font-semibold ">Capital: <span class="text-gray-500 font-light">${country.capital}</span></p>
                </div>
        `
                countryDetailsContainer.append(article)
            })
        cardClick()
    })
}

async function input() {
    let data = await jsonData()

    searchInput.addEventListener('keyup', (e) => {
        autoSearch.innerHTML = ''
        data.forEach((countryName) => {
            if (e.target.value.toLowerCase().trim() === countryName.name.substr(0, e.target.value.length).toLowerCase().trim()) {
                let para = document.createElement('p')
                para.classList.add('country-name')
                para.innerHTML = countryName.name
                autoSearch.append(para)
                divider.classList.remove('hidden')
            }
            if (e.target.value.length == 0) {
                autoSearch.innerHTML = ''
                divider.classList.add('hidden')
            }
        })
        document.querySelectorAll('.country-name').forEach((ele) => {
            ele.addEventListener('click', (e) => {
                let countryName = data.find(country => country.name === e.target.innerText)
                localStorage.setItem('filterdata', JSON.stringify([countryName]));
                window.location.href = "countryDetails.html";
            })
        })
    })


}

// const borderCouontryContainer = document.querySelector('.border-container');
//         countryAllData
//         .filter(country => borderCountries.includes(country.alpha3Code))
//         .forEach(country => {
//             let div = document.createElement('div');
//             div.className = "border-countries px-6 py-1 shadow mr-2 whitespace-nowrap hover:cursor-pointer";
//             div.textContent = country.name;
//             borderCouontryContainer.append(div);
//         });


async function cardClick() {
    let data = await jsonData()
    document.querySelectorAll('.country-card').forEach((country) => {
        country.addEventListener('click', () => {
            let countryName = country.querySelector('.country-name')
            let filterdata = data.filter(country => countryName.innerText === country.name)
             localStorage.setItem('filterdata', JSON.stringify(filterdata));
                window.location.href = "countryDetails.html";
        })
    })
}


getCountryDetails()
getDetailsByRegion()
input()
cardClick()

