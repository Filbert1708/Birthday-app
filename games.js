// Game Classes
class MemoryGame {
    constructor() {
        this.emojis = ['🎂', '🎁', '🎉', '🎈', '🌹', '💝', '🎊', '⭐'];
        this.cards = [];
        this.flipped = [];
        this.matched = [];
        this.moves = 0;
        this.init();
    }

    init() {
        const deck = [...this.emojis, ...this.emojis];
        this.cards = deck.sort(() => Math.random() - 0.5);
    }

    getHTML() {
        return `
            <div class="memory-grid">
                ${this.cards.map((emoji, idx) => `
                    <button class="memory-card ${this.matched.includes(idx) ? 'matched' : ''} ${this.flipped.includes(idx) ? 'flipped' : ''}"
                            onclick="memoryGame.flip(${idx})">
                        ${this.flipped.includes(idx) || this.matched.includes(idx) ? emoji : '?'}
                    </button>
                `).join('')}
            </div>
            <div class="stats">
                <p>Moves: <strong>${this.moves}</strong></p>
                ${this.matched.length === this.cards.length ? '<p style="color: #4caf50; font-size: 1.3em;">🎉 Perfect! You Won! 🎉</p>' : ''}
            </div>
        `;
    }

    flip(idx) {
        if (this.flipped.includes(idx) || this.matched.includes(idx)) return;
        if (this.flipped.length >= 2) return;

        this.flipped.push(idx);

        if (this.flipped.length === 2) {
            this.moves++;
            const [idx1, idx2] = this.flipped;
            if (this.cards[idx1] === this.cards[idx2]) {
                this.matched.push(idx1, idx2);
                if (this.matched.length === this.cards.length) {
                    setTimeout(() => confetti.burst(), 300);
                }
            }
            setTimeout(() => {
                this.flipped = [];
                renderGame();
            }, 1000);
        }
        renderGame();
    }
}

class QuizGame {
    constructor() {
        this.questions = [
            {
                q: 'What is your favorite color?',
                options: ['Red', 'Blue', 'Green', 'Purple'],
                answer: -1 // Any answer is correct for birthday fun!
            },
            {
                q: "What is your favorite season?",
                options: ['Spring', 'Summer', 'Fall', 'Winter'],
                answer: -1
            },
            {
                q: 'Pick your lucky number!',
                options: ['7', '13', '21', '42'],
                answer: -1
            },
            {
                q: "What is your spirit animal?",
                options: ['🦁 Lion', '🦊 Fox', '🐉 Dragon', '🦅 Eagle'],
                answer: -1
            },
            {
                q: 'Birthday wish?',
                options: ['Adventure', 'Health', 'Happiness', 'Love'],
                answer: -1
            }
        ];
        this.current = 0;
        this.selected = null;
        this.answered = [];
    }

    getHTML() {
        const q = this.questions[this.current];
        return `
            <div class="quiz-container">
                <h3>Question ${this.current + 1} of ${this.questions.length}</h3>
                <div class="quiz-question">${q.q}</div>
                <div class="quiz-options">
                    ${q.options.map((opt, idx) => `
                        <button class="quiz-option ${this.answered[this.current] === idx ? 'selected' : ''}"
                                onclick="quizGame.answer(${idx})">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                <div style="margin-top: 20px;">
                    ${this.current > 0 ? `<button class="btn-secondary" onclick="quizGame.prev()">← Previous</button>` : ''}
                    ${this.current < this.questions.length - 1 ? `<button class="btn-primary" onclick="quizGame.next()" ${this.answered[this.current] === null || this.answered[this.current] === undefined ? 'disabled' : ''}>Next →</button>` : ''}
                    ${this.current === this.questions.length - 1 ? `<button class="btn-success" onclick="quizGame.finish()">Finish Quiz 🎉</button>` : ''}
                </div>
            </div>
        `;
    }

    answer(idx) {
        this.answered[this.current] = idx;
        renderGame();
    }

    next() {
        if (this.current < this.questions.length - 1) {
            this.current++;
            renderGame();
        }
    }

    prev() {
        if (this.current > 0) {
            this.current--;
            renderGame();
        }
    }

    finish() {
        confetti.burst();
        showMenu();
    }
}

class GuessGame {
    constructor() {
        this.secret = Math.floor(Math.random() * 100) + 1;
        this.guesses = [];
        this.gameOver = false;
    }

    getHTML() {
        return `
            <div class="guess-container">
                <h3>🤔 Guess the Birthday Number! 🤔</h3>
                <p>I'm thinking of a number between 1 and 100...</p>
                ${!this.gameOver ? `
                    <input type="number" id="guessInput" min="1" max="100" placeholder="Enter your guess"
                           onkeypress="if(event.key==='Enter') guessGame.makeGuess()">
                    <button class="btn-primary" onclick="guessGame.makeGuess()">Guess</button>
                ` : `
                    <p style="font-size: 1.5em; color: #4caf50;">🎉 You got it! ${this.secret} is correct!</p>
                    <p>It took you ${this.guesses.length} guess${this.guesses.length > 1 ? 'es' : ''}!</p>
                    <button class="btn-secondary" onclick="showMenu()">Back to Menu</button>
                `}
                ${this.guesses.length > 0 ? `
                    <div class="stats">
                        <p>Your Guesses: ${this.guesses.join(', ')}</p>
                        <div class="guess-feedback" id="feedback"></div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    makeGuess() {
        const input = document.getElementById('guessInput');
        const guess = parseInt(input.value);

        if (!guess || guess < 1 || guess > 100) {
            alert('Please enter a number between 1 and 100!');
            return;
        }

        this.guesses.push(guess);

        if (guess === this.secret) {
            this.gameOver = true;
            confetti.burst();
        } else {
            const feedback = guess < this.secret ? 'Too low! 🔼' : 'Too high! 🔽';
            const distance = Math.abs(guess - this.secret);
            let temp = feedback + ' ';

            if (distance <= 5) {
                temp += '<span class="feedback-hot">🔥 Very hot!</span>';
            } else if (distance <= 15) {
                temp += '<span class="feedback-warm">🌡️ Getting warm...</span>';
            } else {
                temp += '<span class="feedback-cold">❄️ Ice cold!</span>';
            }

            document.getElementById('feedback').innerHTML = temp;
        }

        input.value = '';
        renderGame();
    }
}

class CatchGame {
    constructor() {
        this.score = 0;
        this.lives = 3;
        this.gameActive = true;
        this.basketX = 50;
        this.gifts = [];
        this.gameStarted = false;
    }

    getHTML() {
        if (!this.gameStarted) {
            return `
                <div style="text-align: center; padding: 40px;">
                    <h3>🎁 Catch the Birthday Gifts! 🎁</h3>
                    <p style="font-size: 1.2em; margin-bottom: 20px;">Move your mouse left and right to catch falling gifts!</p>
                    <button class="btn-success" onclick="catchGame.startGame()">Start Game</button>
                </div>
            `;
        }

        if (!this.gameActive) {
            return `
                <div style="text-align: center; padding: 40px;">
                    <h3>Game Over! 🎉</h3>
                    <p style="font-size: 1.3em; color: #667eea;">Your Score: <strong>${this.score}</strong></p>
                    <button class="btn-secondary" onclick="catchGame.reset(); renderGame();">Play Again</button>
                    <button class="btn-warning" onclick="showMenu()">Back to Menu</button>
                </div>
            `;
        }

        return `
            <div class="catch-game" id="catchGame" onmousemove="catchGame.moveMouse(event)">
                <div class="score-display">Score: ${this.score}</div>
                <div class="score-display" style="left: auto; right: 10px;">Lives: ${this.lives}</div>
                <div class="catch-basket" style="left: ${this.basketX}%;"></div>
            </div>
            <p style="text-align: center; margin-top: 10px;">Caught: ${this.score} gifts</p>
        `;
    }

    startGame() {
        this.gameStarted = true;
        this.gameActive = true;
        renderGame();
        this.spawnGift();
    }

    reset() {
        this.score = 0;
        this.lives = 3;
        this.gameActive = true;
        this.gifts = [];
        this.gameStarted = false;
    }

    moveMouse(e) {
        const game = document.getElementById('catchGame');
        if (!game) return;
        const rect = game.getBoundingClientRect();
        this.basketX = ((e.clientX - rect.left) / rect.width) * 100;
        this.basketX = Math.max(0, Math.min(100, this.basketX));
    }

    spawnGift() {
        if (!this.gameActive) return;
        const left = Math.random() * 95;
        this.gifts.push({
            x: left,
            y: 0,
            caught: false
        });

        setTimeout(() => this.spawnGift(), 600);
    }

    checkCatch() {
        if (!this.gameActive) return;

        this.gifts.forEach((gift, idx) => {
            if (!gift.caught && gift.y > 90) {
                const basketLeft = this.basketX;
                const basketRight = this.basketX + 5;

                if (gift.x + 2 > basketLeft && gift.x + 2 < basketRight) {
                    this.score++;
                    gift.caught = true;
                } else if (gift.y > 100) {
                    this.lives--;
                    if (this.lives <= 0) {
                        this.gameActive = false;
                    }
                    this.gifts.splice(idx, 1);
                }
            }
        });

        renderGame();
        requestAnimationFrame(() => this.checkCatch());
    }
}

// Initialize games
let memoryGame = new MemoryGame();
let quizGame = new QuizGame();
let guessGame = new GuessGame();
let catchGame = new CatchGame();
