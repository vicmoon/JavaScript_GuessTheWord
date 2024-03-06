const inputs = document.querySelector(".inputs"); 
const resetBTN = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector('.typing-input');
let word, incorrect = []; 
let correct =  [] ;



function randomWord(){
    // get random object from wordlist  

    let randomObject = wordList[Math.floor(Math.random()* wordList.length)];
    word = randomObject.word;
    
    hint.innerHTML =  randomObject.hint;

    let html = '' ;
    for(let i=0; i< word.length; i++ ){
        html += ` <input type="text" disabled> `
    }

    inputs.innerHTML = html; 
    
}
randomWord();


function initGame(e) {
    // Getting user input 
    let key = e.target.value;
    console.log(key); 
    if (key.match(/^[a-zA-Z]+$/) && !incorrect.includes(` ${key}`)) {
        console.log(key);
        if (word.includes(key)) {  // if user input is part of the word 
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    // showing matching letter in the input value 
                    correct.push(key);
                    inputs.querySelectorAll("input")[i].value = key; 
                }
            }
        } else {
            incorrect.push( ` ${key}`); 
            wrongLetter.innerText = incorrect; 
        }
    }
    typingInput.value = ""; // Reset the input field
}





resetBTN.addEventListener('click', randomWord);
typingInput.addEventListener('input', initGame);
document.addEventListener('keydown', () => typingInput.focus());
