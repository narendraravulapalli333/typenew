const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const display = document.getElementById("text")
const input = document.getElementById("input")
const timer = document.getElementById("timer")
var temp=0

input.addEventListener("input", () =>{
    const arrayqueue=display.querySelectorAll('span')
    const arrayvalue=input.value.split('')

    let correct=true
    arrayqueue.forEach((charspan, index) =>{
        const character=arrayvalue[index]
        if(character==null){
            charspan.classList.remove('correct')
            charspan.classList.remove('incorrect')
            correct=false
        }else if(character===charspan.innerText){
            charspan.classList.add('correct')
            charspan.classList.remove('incorrect')
            correct=true
        }else{
            charspan.classList.remove('correct')
            charspan.classList.add('incorrect')
            correct=false
        }
    })
    if(correct) {
        temp=1;
    }
})

function getrandom(){
    return fetch(RANDOM_QUOTE_API_URL).then((response) => response.json()).then(data =>data.content)
}
async function newquote(){
    const quote=await getrandom()
    display.innerText = ''
    quote.split('').forEach(character => {
        const charspan=document.createElement('span')
        charspan.innerText = character
        display.appendChild(charspan)
    })
    input.value=null
    temp=0
    starttimer();
}
let starttime
function starttimer() {
    timer.innerText = 0
    starttime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()},1000)
    }
function getTimerTime(){
    if(temp==0){
        return Math.floor((new Date() - starttime)/1000)
    }else{
        return timer.innerText
    }
}


    
newquote()