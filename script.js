const inputs = document.querySelector(".inputs"); 
const resetBTN = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector('.typing-input');
const remainingTry= document.querySelector('.guess-left span'); 
let word, incorrect = []; 
let correct =  [];
let maxGuesses;




function randomWord(){
    // get random object from wordlist  

    let randomObject = wordList[Math.floor(Math.random()* wordList.length)];
    word = randomObject.word;
    maxGuesses = 20; correct =[]; incorrect= []

    
    hint.innerHTML =  randomObject.hint; 
    wrongLetter.innerText = incorrect;
    remainingTry.innerHTML= maxGuesses;
    

    let html = '' ;
    for(let i=0; i<word.length; i++ ){
        html += ` <input type="text" disabled> `
    }inputs.innerHTML = html;
}
randomWord();


function initGame(e) {
    // Getting user input 
    let key = e.target.value;
    console.log(key); 
    if (key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key}`)) {
        console.log(key);
        if (word.includes(key)) {  // if user input is part of the word 
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    // showing matching letter in the input value 
                    correct += key; 
                    inputs.querySelectorAll("input")[i].value = key; 
                }
            }
        } else {
            maxGuesses--; 
            incorrect.push( ` ${key}`);     
        }
    }

    // Check for win condition after each input
    if (correct.length === word.length) {
        alert("You won! ");
        randomWord(); 
    } else if (maxGuesses <= 0 ) {
        alert("Game over! No more tries left. ")
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }
     
    typingInput.value = ""; // Reset the input field
}



resetBTN.addEventListener('click', randomWord);
typingInput.addEventListener('input', initGame);
document.addEventListener('keydown', () => typingInput.focus());
