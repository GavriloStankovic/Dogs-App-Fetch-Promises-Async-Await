let timer
let deleteFirstPhotoDelay

async function start() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)
    } catch (e) {
        console.log('There was a problem fetching breed list');
    }
}

start()

function createBreedList(breedList){
   document.querySelector('#breed').innerHTML += 
   `
   <select onchange="loadByBreed(this.value)">
   <option>Choose a dog breed</option>
   ${Object.keys(breedList).map(breed => {
    return `<option>${breed}</option>`
   }).join('')}
   </select>

   `
}

async function loadByBreed(breed) {
    if(breed != 'Choose a dog breed') {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideShow(data.message)
    }
}

function createSlideShow(images) {
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    let currentPosition = 0

    if(images.length > 1) {
        document.querySelector('.slideshow').innerHTML = 
        `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `
        currentPosition +=2

        if(images.length == 2) currentPosition = 0

        timer = setInterval(nextSlide, 3000)
    } else {
        document.querySelector('.slideshow').innerHTML = 
        `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>
        `
    }

    function nextSlide() {
        document.querySelector('.slideshow')
        .insertAdjacentHTML('beforeend', `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
        deleteFirstPhotoDelay = setTimeout(function() {
            document.querySelector('.slide').remove()
        },1000)
        if(currentPosition +1 >= images.length) {
            currentPosition = 0
        } else {
            currentPosition++
        }
    }
}