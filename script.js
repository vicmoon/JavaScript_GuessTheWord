const inputs = document.querySelector(".inputs"); 
const resetBTN = document.querySelector(".reset-btn");
const hint = document.querySelector(".hint span");
const wrongLetter = document.querySelector(".wrong-letter span");
const typingInput = document.querySelector('.typing-input');
const remainingTry= document.querySelector('.guess-left span'); 
let word, incorrect = []; 
let correct =  [];
let maxGuesses;




function randomWord() {
    let randomObject = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomObject.word;
    maxGuesses = 20;
    correct = Array(word.length).fill(""); // Initialize correct array with empty strings
    incorrect = [];
    hint.innerHTML = randomObject.hint;
    wrongLetter.innerText = "";
    remainingTry.innerHTML = maxGuesses;

    let html = '';
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}

randomWord();

function initGame(e) {
    const key = e.key.toLowerCase(); // Ensure lowercase for consistency

    if (key.match(/^[a-z]$/) && !incorrect.includes(key)) {
        let found = false; // Flag to check if the letter was found
        for (let i = 0; i < word.length; i++) {
            if (word[i].toLowerCase() === key) {
                correct[i] = word[i]; 
                inputs.querySelectorAll("input")[i].value = word[i]; 
                found = true; // Set flag to true if letter is found
            }
        }
        if (!found) {
            maxGuesses--;
            incorrect.push(key);
            wrongLetter.innerText = incorrect.join(" "); 
        }
    }

    // Check for win condition after each input
    checkIfWon();
    remainingTry.innerText = maxGuesses; // Update remaining guesses
    typingInput.value = ""; // Reset the input field
}




function checkIfWon(){
     const guessedWord = correct.join(' ').toLowerCase();

    if (guessedWord === word.toLowerCase()) {
        console.log(word);
        alert("You won!");
        randomWord();
    } else if (maxGuesses <= 0) {
        alert("Game over! No more tries left");
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }
}

resetBTN.addEventListener('click', randomWord);

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key.match(/^[A-Za-z]+$/) && !incorrect.includes(` ${key}`)) {
        typingInput.value = key; // Set the input field value to the pressed key
        initGame(e); // Pass the event object to initGame
    }
    typingInput.focus(); // Focus back on the input field
});



