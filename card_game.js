const readlineSync = require("readline-sync");

function getInput(prompt) {
    return readlineSync.question(`${prompt}: `);
}

// YOUR CODE STARTS HERE!!

// STEP ONE - Building A Deck.

//buildDeck.push and position array
// 1. use a function declaration to create a buildDeck function.
function buildDeck() {
    // 2. inside the buildDeck function, create an array called "suits" that lists all four suits from a deck of card as strings.
    const suits = ['Spade', 'Diamond', 'Club', 'Heart'];
    // 3. inside the buildDeck function, create a 2nd array called "ranks" that lists all 13 cards from ace to King as strings.
    const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    // 4. inside the buildDeck function, create an empty array called "deck"
    let deck = [];
    // 5. inside the buildDeck function, create a for loop INSIDE of another for loop. The outer loop should loop through the ranks. The inner loop should loop through the suits. Make sure to use different variables for your iterators.
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            // 6. inside your inner for loop, push your looped iterations of ranks and suits as OBJECTS into the empty deck array. Add a third property to this object with the key "value" and the value equal to the current iterator.
            let card = {};
            card['name'] = `${ranks[j]} of ${suits[i]}s`;
            card['suit'] = suits[i];
            card['rank'] = ranks[j];
            card['value'] = j;

            deck.push(card);

        }
    }

    // console.log("ordered deck:", deck);
    // 7. After your loops, return deck, which should now return an array full of card objects if you were to run buildDeck().
    return deck;

}

// console.log(buildDeck());

// STEP TWO - Shuffling your deck
// 1. use a function declaration to create a function called shuffle that takes deck as an argument.
function shuffle(deck) {
    // 2. Inside this function create a variable called "shuffledDeck" that takes deck as its value.
    let shuffledDeck = deck;
    // 3. Using "let" declare three new variables: currentIndex, whos value should equal the length of the deck array, and two more: temporaryValue and randomIndex, each of which should currently have no value assigned.
    let currentIndex = deck.length - 1;
    let temporaryValue, rand;
    // 4. Create a while loop whos condition is that "currentIndex" does not equal 0, so that we stop looping once we've gone through all 52 cards.
    while (currentIndex != 0) {
        // 5. Inside the while loop, use the javascript Math.methods to generate a random integer between 0 and "currentIndex"
        rand = Math.round(Math.random() * currentIndex);
        // 7. Inside the while loop, assign "temporaryValue" with "shuffledDeck" (which is an array) to the [currentIndex].
        temporaryValue = shuffledDeck[currentIndex]; //stores the current card of the organized/ordered deck
        // 8. Still inside, assign "shuffledDeck[currentIndex]" a value of shuffledDeck to the [randomIndex]
        shuffledDeck[currentIndex] = shuffledDeck[rand]; // swaps the index positions of the current card with a random index
        // 9. Still inside, assign "shuffledDeck[randomIndex]" a value of "temporaryValue".  (currentIndex //i--;)
        shuffledDeck[rand] = temporaryValue; // swaps the card at the random position with the current card
        // 6. Inside the while loop, decrement current index by 1. (should be after step 9)
        currentIndex--;

        // console.log({ rand });
    }

    // 10. Review the code from steps 7,8, and 9, and leave a comment explaining what you believe those lines of code are doing as they swap assignments of values between them.
    // 11. Finally, close the while loop and return "shuffledDeck". You should now be able to run shuffle(buildDeck()) in node and see your shuffled deck of cards.
    return shuffledDeck;
}

// shuffle(buildDeck());


// STEP THREE - Greeting the player
// 1. Declare a function called greet()

function greet() {
    // 2. Inside that function, declare a variable called "name" and use "getInput()" to welcome the user to the game, ask for their name, and assign their answer.
    let name = getInput("Hi! Welcome to my card game. \n What's your name?");
    // 3. Console.log name
    console.log(name);
    // 4. return name
    return name;
    // 5. Done.
}

// greet();


// STEP FOUR - comparing cards
// 1. declare a function called compare that takes two cards as arguments
function compare(a, b) {
    // 2. return the value property of the first card minus the value property of the second card.
    return (a.value - b.value);
}




// STEP FIVE - Respond to User Guess
// 1. declare a function called guess that takes two cards as arguments
function guess(current, next) {
    // 2. console.log the rank and suit of the current card
    console.log(`\n-----:{ ${current.name} }:-----\n`);
    // 3. declare a variable called "input" that uses getInput() to ask the user if they think the next card will be higher (h) or lower (l) than their current card and stores the user's response.
    let input = getInput("Will the next card be higher (h) or lower (l)?").toLowerCase();
    // 4. use a conditional statement to see if "input" equals "h" or "l".
    if (input == "h" || input == "higher") {
        // 5. If input equals h, return an expression that checks if the outcome of the compare function (using the same arguments as you used for guess) is a negative number.
        return compare(current, next) < 0;
    } else if (input == "l" || input == "lower") {
        // 6. If input equals l, check and see if it's a positive number.
        return compare(current, next) >= 0;
    } else {
        // 7. If input doesn't equal h or l, tell the user that they need to guess either h or l and that they get no points for this round, then return false.
        console.log("[ Invalid response. No point for this round. ]\nPlease guess higher (h) or lower (l).")
    }

}

// STEP SIX - Let's play!
// 1. declare a function called playGame
function playGame() {
    // 2. declare a variable called deck (it's okay to reuse -- remember scope!) that takes the result of the shuffle function. Remember that the shuffle function needs to take the results one of our other functions as its argument...
    let deck = shuffle(buildDeck());
    // console.log(deck);
    // 3. declare a variable called playerName that takes the result of the greet function as its value.
    let name = greet();
    // 4. using let, declare a score variable that's currently set to the number zero
    let score = 0;
    // 5. use an array method on deck to remove the last object in deck. using let, declare a variable called currentCard and assign it this value.
    let currentCard = deck.pop();

    // 6. create a while loop whos conditions are that score is less than five AND less than the amount of items still in the deck array.
    while (score < 5 && score < deck.length) {
        // 7. Inside the while loop, use an array method on deck to remove the last object and assign that value to a variable named nextCard.
        let nextCard = deck.pop();
        // 8. Inside the while loop, create a conditional statement. If the outcome of guess is true, increment the score by 1, congratulate the user, and tell them their score. If it's false, tell them they were wrong and got no points.
        // console.log({ currentCard }, { nextCard });
        if (guess(currentCard, nextCard)) {
            score++;
            console.log(`
          Good choice, ${name}! You get a point!
          Your score: ${score}
          `)
        } else {
            console.log('\nSorry! No point for you. Try again.\n');
        }

        // 9. Close the conditional statement and assign nextCard to currentCard. You may have to write this as the type of variable that's always global...
        currentCard = nextCard;
    }

    // 10. Close the while loop and use a ternary statement that checks if the length of the deck array has reached zero. If it has not, tell the user that they won. If it has reached zero, tell them that they're out of cards and they lost.
    console.log(
        deck.length != 0 ? `Good job, ${name}! You won!` : `Sorry, ${name}. You've run out of cards. Better luck next time.`
    )

}

// 11. Write a line of code to execute the playGame function.
playGame();