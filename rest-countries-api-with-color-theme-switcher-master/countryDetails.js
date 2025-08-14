const countryFullDetailsUpdateEl = document.querySelector('.content-container')
const themeChanger = document.querySelector('.theme-changer')


if (themeChanger) {
    themeChanger.addEventListener('click', () => {
        document.body.classList.toggle('bg-Blue-950')
        document.body.classList.toggle('text-white')
    })
}

if(localStorage.getItem('darkBody') !== null){
    document.body.classList.add('bg-Blue-950')
    document.body.classList.add('text-white')
} 

localStorage.setItem('countryfulldetails', JSON.stringify(countryFullDetailsUpdateEl))

countryFullDetailsUpdate(JSON.parse(localStorage.getItem('filterdata')))


async function jsonData() {
    const res = await fetch('data.json')
    let data = await res.json()
    return data
}


async function countryFullDetailsUpdate(data) {
    let languages = data[0].languages?.length
        ? data[0].languages.map(n => n.name).join(', ')
        : "No languages available";

    const population = data[0]?.population != null
        ? data[0].population.toLocaleString('en-IN')
        : "N/A";

    const topLevelDomain = Array.isArray(data[0]?.topLevelDomain) && data[0].topLevelDomain.length > 0
        ? data[0].topLevelDomain[0]
        : "N/A";

    const currencyName = Array.isArray(data[0]?.currencies) && data[0].currencies.length > 0
        ? data[0].currencies[0]?.name || "N/A"
        : "N/A";

    let borderCountries = data[0].borders
    let countryAllData = await jsonData()

    countryFullDetailsUpdateEl.innerHTML =
        `
   <div class="img lg:w-[40%] lg:h-[60vh]">
                <img src="${data[0].flag}" alt="" class="w-full lg:h-full">
            </div>
            <div class="country-full-details lg:w-[60%]">
                <h2 class="font-bold text-2xl my-5">${data[0].name}</h2>
                <div class="flex max-[500px]:flex-col">
                    <div class="space-y-1 lg:mr-16">
                        <p class="font-medium">Native Name: <span class="text-gray-500 font-light">${data[0].nativeName}</span></p>
                        <p class="font-medium ">Population: <span class="text-gray-500 font-light">${population}</span></p>
                        <p class="font-medium">Region: <span class="text-gray-500 font-light">${data[0].region}</span></p>
                        <p class="font-medium">Sub Region: <span class="text-gray-500 font-light">${data[0].subregion}</span></p>
                        <p class="font-medium">Capital: <span class="text-gray-500 font-light">${data[0].capital}</span></p> 
                    </div>
                    <div class="space-y-1 max-[500px]:mt-6">
                        <p class="font-medium">Top Level Domain: <span class="text-gray-500 font-light">${topLevelDomain}</span></p>
                        <p class="font-medium">Currencies: <span class="text-gray-500 font-light">${currencyName}</span></p>
                        <p class="font-medium">Languages: <span
                                class="text-gray-500 font-light">${languages}</span></p>
                    </div>
                </div>

                <div class="flex mt-7 items-center max-[500px]:flex-col max-[500px]:mb-12">
                    <p class="font-semibold">Border Countries:</p>
                    <div class="border-container ml-2 flex items-center flex-wrap space-y-2 max-[500px]:w-full mx-2"
                        
                    </div>
                </div>


            </div>
    `
    const borderCouontryContainer = document.querySelector('.border-container')
    function borderCountriesName() {

        countryAllData
            .filter(country => borderCountries.includes(country.alpha3Code))
            .forEach((country) => {
                borderCouontryContainer.innerHTML +=
                    `
                         <div class="border-countries px-6 py-1 shadow mr-2 whitespace-nowrap hover:cursor-pointer">
                            ${country.name}
                        </div>
                    `
            })
    }

    borderCountriesName()

    borderCountre(document.querySelectorAll('.border-countries'))

}

function borderCountre(nodeList) {
    nodeList.forEach(element => {
        console.log("Attaching listener to:", element.innerText);

        element.addEventListener('click', async (e) => {
            let data = await jsonData();
            let country = data.find(ele => ele.name.trim() === e.target.innerText.trim());
            if (country) {
                countryFullDetailsUpdate([country]); // Pass as array
            }
        });
    });
}

