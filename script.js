const inputs = document.querySelector(".inputs"); 
const resetBTN = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const typingInput = document.querySelector('.typing-input');
let word; 


function randomWord(){
    // get random object from wordlist  

    let randomObject = wordList[Math.floor(Math.random()* wordList.length)];
    word = randomObject.word;
    
    hint.innerHTML =  randomObject.hint;

    let html = '' ;
    for(let i=0; i<word.length; i++ ){
        html += ` <input type="text" disabled> `
    }

    inputs.innerHTML = html; 
}
randomWord();


function initGame(e){

    //Getting user input 
    let key = e.target.value; 
    if(key.match(/^[a-zA-Z]+$/)){
        console.log(key);
        if(word.includes(key)){  // if user input is part of the word 
         for(i=0; i < word.length; i++){
          console.log('letter found');
         }
        }else{
          console.log('letter not found');
        }
    }
    

}
resetBTN.addEventListener('click', randomWord);
typingInput.addEventListener('input', initGame);
document.addEventListener('keydown', () => typingInput.focus());
