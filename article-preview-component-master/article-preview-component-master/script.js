const slider = document.querySelector('.slider')
const desktopShare = document.querySelector('.desktop-share')
const share = document.querySelectorAll('.share')
const Firstshare = document.querySelector('.share')
const shareSvg = document.querySelector('.share svg')
const mediaQueryForMobile = window.matchMedia('(max-width: 600px)');
const mediaQueryForDesktop = window.matchMedia('(min-width: 600px)');


share.forEach((e) =>{
  e.addEventListener('click', () => {
    if(mediaQueryForMobile.matches) {
        if (slider.classList.contains('hidden')) {
        console.log('hide');
        slider.classList.remove('hidden')
        slider.classList.add('flex')
    } else {
        console.log('flex');
        slider.classList.remove('flex')
        slider.classList.add('hidden')
    }
    }
})  
})

share.forEach((e) =>{
  e.addEventListener('click', () => {
    if(mediaQueryForDesktop.matches) {
        if (desktopShare.classList.contains('hidden')) {
        console.log('hide');
        desktopShare.classList.remove('hidden')
        desktopShare.classList.add('flex')
        Firstshare.classList.add('bg-Very-Dark-Grayish-Blue')
        Firstshare.classList.remove('bg-Light-Grayish-Blue')
        shareSvg.classList.add('fill-white')
        shareSvg.classList.remove('fill-Very-Dark-Grayish-Blue')
    } else {
        console.log('flex');
        desktopShare.classList.remove('flex')
        desktopShare.classList.add('hidden')
        Firstshare.classList.remove('bg-Very-Dark-Grayish-Blue')
        Firstshare.classList.add('bg-Light-Grayish-Blue')
        shareSvg.classList.remove('fill-white')
        shareSvg.classList.add('fill-Very-Dark-Grayish-Blue')
    }
    }
})  
})

