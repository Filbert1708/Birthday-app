// Main Application Logic
const app = document.getElementById('app');

function showMenu() {
    memoryGame = new MemoryGame();
    quizGame = new QuizGame();
    guessGame = new GuessGame();
    catchGame = new CatchGame();

    app.innerHTML = `
        <div class="greeting-container">
            <h1>🎂 Happy Birthday! 🎂</h1>
            <p>Wishing you the most amazing day filled with joy and laughter!</p>
            <p style="font-size: 1.3em;">Let's play some games to celebrate! 🎉</p>
            
            <div class="menu-buttons">
                <button class="btn-primary" onclick="startMemoryGame()">🧠 Memory Game</button>
                <button class="btn-secondary" onclick="startQuizGame()">❓ Birthday Quiz</button>
                <button class="btn-success" onclick="startGuessGame()">🤔 Guess Number</button>
                <button class="btn-warning" onclick="startCatchGame()">🎁 Catch Gifts</button>
            </div>
        </div>
    `;
    confetti.burst();
}

function startMemoryGame() {
    currentGame = 'memory';
    renderGame();
}

function startQuizGame() {
    currentGame = 'quiz';
    renderGame();
}

function startGuessGame() {
    currentGame = 'guess';
    renderGame();
}

function startCatchGame() {
    currentGame = 'catch';
    renderGame();
    setTimeout(() => catchGame.checkCatch(), 50);
}

let currentGame = null;

function renderGame() {
    let content = '';

    if (currentGame === 'memory') {
        content = `
            <div class="game-container">
                <div class="game-header">
                    <h2>🧠 Memory Game</h2>
                    <button class="back-btn" onclick="showMenu()">Back</button>
                </div>
                ${memoryGame.getHTML()}
            </div>
        `;
    } else if (currentGame === 'quiz') {
        content = `
            <div class="game-container">
                <div class="game-header">
                    <h2>❓ Birthday Quiz</h2>
                    <button class="back-btn" onclick="showMenu()">Back</button>
                </div>
                ${quizGame.getHTML()}
            </div>
        `;
    } else if (currentGame === 'guess') {
        content = `
            <div class="game-container">
                <div class="game-header">
                    <h2>🤔 Guess the Number</h2>
                    <button class="back-btn" onclick="showMenu()">Back</button>
                </div>
                ${guessGame.getHTML()}
            </div>
        `;
    } else if (currentGame === 'catch') {
        content = `
            <div class="game-container">
                <div class="game-header">
                    <h2>🎁 Catch Gifts</h2>
                    <button class="back-btn" onclick="showMenu()">Back</button>
                </div>
                ${catchGame.getHTML()}
            </div>
        `;
    }

    app.innerHTML = content;
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    showMenu();
});
