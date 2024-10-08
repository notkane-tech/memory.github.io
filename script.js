const cardsArray = [
    { name: 'A', image: '🦁' },
    { name: 'B', image: '🐯' },
    { name: 'C', image: '🐵' },
    { name: 'D', image: '🐸' },
    { name: 'E', image: '🐻' },
    { name: 'F', image: '🐼' },
    { name: 'G', image: '🐨' },
    { name: 'H', image: '🦊' }
];

// Duplicate cards for matching pairs
let cards = [...cardsArray, ...cardsArray];

// Shuffle the cards
cards = cards.sort(() => 0.5 - Math.random());

let firstCard, secondCard;
let lockBoard = false;
let matches = 0;
let lives = 3;
let time = 10; // Time to show the images before the game starts

const gameBoard = document.getElementById('game-board');
const timerElement = document.getElementById('time');
const livesElement = document.getElementById('lives-count');

// Function to create the cards dynamically
function createBoard() {
    cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${card.image}</div>
                <div class="card-back"></div>
            </div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// Flip card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; // Prevent double-clicking the same card
    
    this.classList.add('flip'); // Adds the 'flip' class to rotate the card
    
    if (!firstCard) {
        firstCard = this;
        return;
    }
    
    secondCard = this;
    checkForMatch();
}

// Check if cards match
function checkForMatch() {
    let isMatch = firstCard.innerHTML === secondCard.innerHTML;

    if (isMatch) {
        disableCards();
        matches += 2;

        // Check for win
        if (matches === cards.length) {
            setTimeout(() => alert('You win!'), 500);
        }
    } else {
        // Wrong match
        lives--;
        livesElement.textContent = lives;
        
        if (lives === 0) {
            setTimeout(() => alert('Game Over!'), 500);
            lockBoard = true;
            return;
        }
        
        unflipCards();
    }
}

// Disable cards when they match
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

// Reset the board state after each turn
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Timer countdown for showing images
function startTimer() {
    let countdown = setInterval(() => {
        time--;
        timerElement.textContent = time;

        if (time === 0) {
            clearInterval(countdown);
            document.querySelectorAll('.card').forEach(card => card.classList.remove('flip'));
            lockBoard = false;
        }
    }, 1000);
}

// Start game
function startGame() {
    lockBoard = true;
    createBoard();
    document.querySelectorAll('.card').forEach(card => card.classList.add('flip'));

    setTimeout(() => {
        startTimer();
    }, 2000); // Show all cards for 2 seconds
}

startGame();
