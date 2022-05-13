const showImageBtn = document.querySelectorAll('.get-img-btn');

const today = new Date().toISOString().slice(0, 10)

const dateInput = document.querySelector('#date')
dateInput.setAttribute('max', `${today}`)
dateInput.setAttribute('min', `1995-06-16`)

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

                /* Conditonal for situations wof different data types */
                if(data.media_type === 'image'){
                    document.querySelector('iframe').classList.add('hidden');  
                    document.querySelector('img').classList.remove('hidden');                  
                    document.querySelector('img').src = data.hdurl;
                }else {
                    document.querySelector('img').classList.add('hidden');
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