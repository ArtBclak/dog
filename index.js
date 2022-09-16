import res from './res.js';

window.addEventListener('DOMContentLoaded', () => {
    const { hi, search, notFound, info } = res()
   
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition();
    recognition.lang = 'ru';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    //___________________________________
    
    const { speechSynthesis } = window;
    speechSynthesis.cancel();
    
    let voices = [];
    
    const generateVoices = () => {
        voices = speechSynthesis.getVoices()
    } 
    
    const speak = (t) => {
        
        const u = new SpeechSynthesisUtterance()
        u.text = t
        u.voice = voices[18]
        u.pitch = 1.1
        u.rate = 1.1
        
        speechSynthesis.speak(u)
    }
    
    generateVoices()
    
    
    speechSynthesis.addEventListener('voiceschanged', generateVoices)
    //___________________________________

    let v = '';
    let find = false

    document.querySelector('.button').addEventListener('click', () => recognition.start())
    
    recognition.onresult = (e) => {
        v = e.results[0][0].transcript.toLowerCase()
    }
    
    const answer = ( a ) => {
        find = true
        let arr = Math.floor(Math.random() * (a.r.length)); 
        speak(a.r[arr]);
    }
    
    recognition.addEventListener('end', () => {
        
        if (v.includes('привет')) {
            answer(hi)
            return
        }
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
