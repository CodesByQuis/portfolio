function sendMessage() {
    let input = document.getElementById('userInput').value.toLowerCase();
    let chatBox = document.getElementById('chatBox');
    let response = '';

    if(input.includes('skill') || input.includes('skills')) {
        response = 'I have skills in protective security, IT, cybersecurity, teamwork, and incident response. 💪';
    } else if(input.includes('project')) {
        response = 'Check out my projects in the Projects section. 🔗';
    } else if(input.includes('resume')) {
        response = 'You can download my resume from the Resume section. 📝';
    } else if(input.includes('contact')) {
        response = 'Use the Contact form to send me a message. 📬';
    } else {
        response = 'Sorry, I do not understand that yet, please contact me! 🤔';
    }

    chatBox.innerHTML += `<p><strong>Marquis:</strong> ${input}</p>`;
    chatBox.innerHTML += `<p><strong>Chat:</strong> ${response}</p>`;
    document.getElementById('userInput').value = '';
    chatBox.scrollTop = chatBox.scrollHeight; // auto scroll to latest message
}

// -------------------------
// Guess the Word Game
// -------------------------

const gameContainer = document.getElementById("guess-game");

if (gameContainer) {
    // Step 1: Pick a random word (like Part 4 in Python)
    const words = ["apple", "banana", "orange", "grape", "cherry", "eggplant"];
    let secretWord = words[Math.floor(Math.random() * words.length)];

    // Step 2: Set up game state
    let guessesLeft = 10; // like Part 3
    let guessedLetters = [];
    let displayWord = "-".repeat(secretWord.length);

    // Step 3: Function to update display
    function renderGame(message = "") {
        gameContainer.innerHTML = `
            <p>Word: ${displayWord}</p>
            <p>Guessed letters: ${guessedLetters.join(", ") || "None"}</p>
            <p>Guesses left: ${guessesLeft}</p>
            <input type="text" id="letterInput" maxlength="1" placeholder="Enter a letter">
            <button onclick="makeGuess()">Guess</button>
            <p id="gameMessage">${message}</p>
        `;
    }

    // Step 4: Update dashes (like update_dashes in Python Part 2)
    function updateWord(secret, current, guess) {
        let result = "";
        for (let i = 0; i < secret.length; i++) {
            if (secret[i] === guess) {
                result += guess;
            } else {
                result += current[i];
            }
        }
        return result;
    }

    // Step 5: Handle guesses
    window.makeGuess = function() {
        const input = document.getElementById("letterInput");
        const guess = input.value.toLowerCase();
        input.value = "";

        if (!guess.match(/^[a-z]$/)) {
            renderGame("⚠️ Please enter a single lowercase letter.");
            return;
        }

        if (guessedLetters.includes(guess)) {
            renderGame("⚠️ You already guessed that letter!");
            return;
        }

        guessedLetters.push(guess);

        if (secretWord.includes(guess)) {
            displayWord = updateWord(secretWord, displayWord, guess);
            if (displayWord === secretWord) {
                renderGame(`🎉 Congrats! You win. The word was: ${secretWord}`);
                return;
            }
            renderGame(`✅ That letter is in the word!`);
        } else {
            guessesLeft--;
            if (guessesLeft === 0) {
                renderGame(`💀 You lose! The word was: ${secretWord}`);
                return;
            }
            renderGame(`❌ That letter is not in the word.`);
        }
    };

    // Initialize game
    renderGame();
}
