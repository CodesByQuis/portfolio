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
// Guess the Word - Final Version (Parts 1-4)
// -------------------------
const gameContainer = document.getElementById("guess-game");

if (gameContainer) {
    // Part 4: Word list + random choice
    const words = ["apple", "banana", "orange", "grape", "eggplant", "cherry"];
    let secretWord = words[Math.floor(Math.random() * words.length)];

    // Part 2: Dashes to show hidden word
    let dashes = "-".repeat(secretWord.length);

    // Part 1 + 3: Track guesses
    let guessesLeft = 10;
    let guessedLetters = [];

    // Part 2: Update dashes function
    function updateDashes(secret, current, guess) {
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

    // Render the game UI
    function renderGame(message = "") {
        gameContainer.innerHTML = `
            <p>Word: ${dashes}</p>
            <p>Guessed letters: ${guessedLetters.join(", ") || "None"}</p>
            <p>Guesses left: ${guessesLeft}</p>
            <input type="text" id="letterInput" maxlength="1" placeholder="Enter a letter">
            <button onclick="makeGuess()">Guess</button>
            <p id="gameMessage">${message}</p>
        `;
    }

    // Handle a guess
    window.makeGuess = function() {
        const input = document.getElementById("letterInput");
        const guess = input.value.toLowerCase();
        input.value = "";

        // Part 1: Input validation
        if (guess.length !== 1) {
            renderGame("⚠️ Your guess must have exactly one character!");
            return;
        }
        if (!/[a-z]/.test(guess)) {
            renderGame("⚠️ Your guess must be a lowercase letter!");
            return;
        }
        if (guessedLetters.includes(guess)) {
            renderGame("⚠️ You already guessed that letter!");
            return;
        }

        // Store guess
        guessedLetters.push(guess);

        // Correct guess
        if (secretWord.includes(guess)) {
            dashes = updateDashes(secretWord, dashes, guess);

            // Part 3: Win condition
            if (dashes === secretWord) {
                renderGame(`🎉 Congrats! You win. The word was: ${secretWord}`);
                return;
            }

            renderGame("✅ That letter is in the word!");
        } 
        // Incorrect guess
        else {
            guessesLeft--;

            // Part 3: Lose condition
            if (guessesLeft <= 0) {
                renderGame(`💀 You lose. The word was: ${secretWord}`);
                return;
            }

            renderGame("❌ That letter is not in the word.");
        }
    };

    // Start game
    renderGame();
}
