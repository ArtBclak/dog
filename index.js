import res from './res.js';

window.addEventListener('DOMContentLoaded', async () => {
    const { hi, search, notFound, info } = res()
   
    const btn = document.querySelector('.button')
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition();
    recognition.lang = 'ru';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    //___________________________________
    
    const { speechSynthesis } = window;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance()
    
    let voices = [];
    
    const generateVoices = () => {
        voices = speechSynthesis.getVoices()
    } 
    
    const speak = (t) => {
        u.text = t
        u.voice = voices[18]
        u.pitch = 1.1
        u.rate = 1.1
        u.addEventListener('start', () => btn.classList.add('start'))
        u.addEventListener('end', () => btn.classList.remove('start'))
        speechSynthesis.speak(u)
    }
    
    generateVoices()
    
    
    speechSynthesis.addEventListener('voiceschanged', generateVoices)
    //___________________________________

    if ( localStorage.getItem('first') === null && localStorage.length === 0 ) {
        speak('привет, я голосовой помошник Псина, клацни по мне, чтобы задать вопрос!')
        localStorage.setItem('first', true)
    }

    let v = '';
    let find = false;
    let planeDay = [];

    if ( localStorage.getItem('plane') !== null ) {
        planeDay = JSON.parse(localStorage.getItem('plane'))
    }
    
    btn.addEventListener('click', () => recognition.start())
    recognition.onresult = (e) => {
        v = e.results[0][0].transcript.toLowerCase()
    }
    
    const answer = ( a ) => {
        find = true
        let arr = Math.floor(Math.random() * (a.r.length)); 
        speak(a.r[arr]);
    }


    recognition.addEventListener('end', () => {
        console.log(v)
        


        if (v.includes('привет')) {
            answer(hi)
            return
        }
        if (v.includes('называй меня')) {
            let txt = v.split(" ")
            txt.splice(0, txt.findIndex(i => i == "называй меня")+3)
            localStorage.setItem('name', txt.join(' '))
            speak(`хорошо ${localStorage.getItem('name')}`)
            return
        }
        if (v.includes('меня зовут') || v.includes('твой хозяин')) {
            if ( localStorage.getItem('name') ) return speak(`${localStorage.getItem('name')}`)
            return speak(' ты не назвал свое имя, скажи мне команду - называй меня - и добавь свое имя!')
        }
        if (v.includes('забудь всё')) {
            localStorage.clear()
            speak('Расеять палочкой и взмахнуть - Обливиэйт! Все, теперь я ничего не помню.')
            return 
        }
        //_____________________________open__________________
        if (v.includes('найди')) {
            answer(search)
            let txt = v.split(" ")
            txt.splice(0, txt.findIndex(i => i == "найди")+1)
            window.open(`https://www.google.com/search?q=${txt.join(' ')}`, "_blank")
            return
        }
        if (v.includes('открой')) {
            answer(search)
            let txt = v.split(" ")
            txt.splice(0, txt.findIndex(i => i == "открой")+1)
            window.open(`https://${txt.join(' ')}`, "_blank")
            return
        }
        //___________________________plan______________________
        if (v.includes('добавь план')) {
            let txt = v.split(" ")
            txt.splice(0, txt.findIndex(i => i == "добавь")+1)
            planeDay.push({ id: planeDay.length+1, txt: txt.join(' ')})
            localStorage.setItem('plane', JSON.stringify(planeDay))
            return speak('добавила')
        }
        if (v.includes('расскажи план')) {
            let plane = ''
            let get = JSON.parse(localStorage.getItem('plane'))
            if (get.length > 0) {
                get.map(i => {
                    plane += ` номер "${i.id}", задание: ${i.txt}; `
                })
                return speak(plane)
            }
            speak('список пустой')
            return 
        }
        if (v.includes('удали')) {
            let txt = v.split(" ")
            txt.splice(0, txt.findIndex(i => i == "удали")+1)
            planeDay.splice(+txt-1, 1)
            localStorage.setItem('plane', JSON.stringify(planeDay))
            speak('удалила')
            return 
        }
        if (v.includes('удали весь план')) {
            planeDay = []
            localStorage.setItem('plane', JSON.stringify(planeDay))
            speak('удалила список')
            return 
        }
        //___________________________array_____________________
        if (v !== '') {
            info.map (i => {
                if (v.includes(i.h)) {
                    answer(i)
                    return
                }
            })
            if (find === false) {
                let arr = Math.floor(Math.random() * (notFound.r.length));
                return speak(notFound.r[arr])
            }

        }
        return find = false
    }) 

})
