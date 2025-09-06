import random

# -------------------------
# Function: get_guess
# -------------------------
def get_guess():
    """
    Prompt the user for a single letter guess.
    Validates input to ensure it's a single alphabetic character.
    """
    while True:
        guess = input("Enter a letter: ").strip().lower()

        # Error handling
        if len(guess) != 1:
            print("Error: Please enter exactly one letter.")
        elif not guess.isalpha():
            print("Error: Only letters are allowed.")
        else:
            return guess


# -------------------------
# Function: update_dashes
# -------------------------
def update_dashes(secret_word, dashes, guess):
    """
    Update the dashed word if the guess is correct.
    Returns the updated dashes string.
    """
    new_dashes = ""
    for i in range(len(secret_word)):
        if secret_word[i] == guess:
            new_dashes += guess
        else:
            new_dashes += dashes[i]
    return new_dashes


# -------------------------
# Function: main
# -------------------------
def main():
    """
    Main game loop for Guess the Word.
    """
    # Word bank
    word_bank = ["python", "variable", "function", "loop", "programming", "codehs"]
    secret_word = random.choice(word_bank)

    dashes = "-" * len(secret_word)
    lives = 6  # number of wrong guesses allowed
    guessed_letters = []

    print("Welcome to Guess the Word!")
    print("The word has", len(secret_word), "letters.")
    print(dashes)

    while dashes != secret_word and lives > 0:
        guess = get_guess()

        if guess in guessed_letters:
            print("You already guessed that letter.")
            continue
        guessed_letters.append(guess)

        if guess in secret_word:
            print("Correct!")
            dashes = update_dashes(secret_word, dashes, guess)
        else:
            print("Wrong guess.")
            lives -= 1

        print("Word so far:", dashes)
        print("Lives left:", lives)
        print("Guessed letters:", guessed_letters)

    # Win or lose outcome
    if dashes == secret_word:
        print("🎉 Congratulations! You guessed the word:", secret_word)
    else:
        print("❌ Out of lives. The word was:", secret_word)


# -------------------------
# Run Program
# -------------------------
if __name__ == "__main__":
    main()
