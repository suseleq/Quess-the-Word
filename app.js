// Selections
const button = document.querySelector('.reset-btn');
const hint = document.querySelector('.hint');
const quessesLeft = document.querySelector('.quesses');
const wrongLetter = document.querySelector('.wrong-letters');
const input = document.querySelector('.typing-input');
const inputs = document.querySelector('.inputs')
let answer, quesses, wrongLetters = [], correctLetters = [];
// Event Listener
document.addEventListener('DOMContentLoaded', reset)
button.addEventListener('click', reset);
inputs.addEventListener("click", () => input.focus());
document.addEventListener("keydown", () => input.focus());
input.addEventListener("input", checkLetter);
// Functions
function reset(){
    let index = randomWord();
    quesses = 9;
    answer = wordList[index].word;
    quessesLeft.innerHTML = quesses;
    let letters = '';
    for (let i = 0; i < answer.length; i++) {
        letters += `<input class="letter" type="text" disabled>`; 
    }
    inputs.innerHTML = letters;
    wrongLetters = [];
    correctLetters = [];
    hint.innerHTML = wordList[index].hint;
    wrongLetter.textContent = wrongLetters;
    console.log(input.value);
}

function randomWord(){
    return Math.floor(Math.random() * (wordList.length - 1));
}

function checkLetter(e){
    let letter = e.target.value.toLowerCase();
    if (letter.match(/[a-z]/) && !checkCorrectLetter(letter) && !checkWrongLetter(letter)){
        if (answer.includes(letter)){
            let letters = document.querySelectorAll('.letter');
            for (let i = 0; i < answer.length; i++) {
                if (letter == answer[i]){
                    correctLetters.push(letter);
                    letters[i].value = letter;
                }
            }
        }else{
            wrongLetters.push(letter);
            wrongLetter.innerHTML = wrongLetters;
            quesses -= 1;
            quessesLeft.innerHTML = quesses;
        }

        input.value = '';
    }else{
        input.value = '';
    }
    setTimeout(() => {
        if (correctLetters.length == answer.length){
            alert(`You won, answer: ${answer}`);
        }else if (quesses == 0){
            alert(`You lost, answer: ${answer}`);
        }
    }, 100);

}

const checkCorrectLetter = (letter) => {return correctLetters.includes(letter)};
const checkWrongLetter = (letter) => {return wrongLetters.includes(letter)};