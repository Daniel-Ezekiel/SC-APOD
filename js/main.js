// This part is to randomize the site background on site load
const body = document.querySelector('body')
// body.style.backgroundImage = 'url(images/SC-APOD-bg4.webp)'

// This part is to setup the event listener for the bg-image change
const imgBgBtn1 = document.querySelector('.bg-img1')
const imgBgBtn2 = document.querySelector('.bg-img2')
const imgBgBtn3 = document.querySelector('.bg-img3')
const imgBgBtn4 = document.querySelector('.bg-img4')
const imgBgBtn5 = document.querySelector('.bg-img5')

imgBgBtn1.addEventListener('click', () => {
    body.style.backgroundImage = 'url(images/SC-APOD-bg1.webp)'
})

imgBgBtn2.addEventListener('click', () => {
    body.style.backgroundImage = 'url(images/SC-APOD-bg2.webp)'
})

imgBgBtn3.addEventListener('click', () => {
    body.style.backgroundImage = 'url(images/SC-APOD-bg3.webp)'
})

imgBgBtn4.addEventListener('click', () => {
    body.style.backgroundImage = 'url(images/SC-APOD-bg4.webp)'
})

imgBgBtn5.addEventListener('click', () => {
    body.style.backgroundImage = 'url(images/SC-APOD-bg5.webp)'
})

// This section is the setup for the click event with which to show the APOD
const showImageBtn = document.querySelectorAll('.get-img-btn');

// This code snippet verified what the date is for each new day
const today = new Date().toISOString().slice(0, 10)

const dateInput = document.querySelector('#date')
dateInput.setAttribute('max', `${today}`)
dateInput.setAttribute('min', `1995-06-16`)

// After selecting all showImg Buttons, this part loops through each button and add a click event to each button
showImageBtn.forEach( btn => {
    btn.addEventListener('click', () => {
            const date = document.querySelector('input').value    
        
            const url = `https://api.nasa.gov/planetary/apod?api_key=i8BrM3rSBt87xfcDgMgtsmh0JdSxG00dRbuepZQ2&date=${date}` 
          
            fetch(url)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                console.log(data)

                /*To insert information and Media into the DOM */
                document.querySelector('h1').textContent = data.title;
                document.querySelector('.desc-text').textContent = data.explanation;

                /* Conditonal for situations where there are different data types which could be images or videos*/
                if(data.media_type === 'image'){
                    document.querySelector('iframe').classList.add('hidden');  
                    document.querySelector('.apod').classList.remove('hidden');                  
                    document.querySelector('.apod').src = data.url;
                    body.style.backgroundImage = `url(${data.url})`
                }else {
                    document.querySelector('.apod').classList.add('hidden');
                    document.querySelector('iframe').classList.remove('hidden');  
                    document.querySelector('iframe').src = data.url;
                }

            })
            .catch(err => {
                console.log(`error ${err}`)
            });

            document.querySelector('main.center').classList.remove('center');
            document.querySelector('.after-click').classList.remove('hidden');
            document.querySelector('.today').classList.add('hidden')
        }
    )
})