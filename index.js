import * as art from './art.js';
import * as functions from './functions.js';

function replay() {
    const ask = prompt('Do you want to play again?\n')[0].toLowerCase();
    return ask === 'y';
}

function fullGame() {
    console.clear();
    console.log(art.logo2);

    const listCards = [
        ['Hearts', 'Ace'], ['Hearts', 2], ['Hearts', 3], ['Hearts', 4], ['Hearts', 5], 
        ['Hearts', 6], ['Hearts', 7], ['Hearts', 8], ['Hearts', 9], ['Hearts', 10], 
        ['Hearts', 'Jack'], ['Hearts', 'Queen'], ['Hearts', 'King'], 
        ['Diamonds', 'Ace'], ['Diamonds', 2], ['Diamonds', 3], ['Diamonds', 4], 
        ['Diamonds', 5], ['Diamonds', 6], ['Diamonds', 7], ['Diamonds', 8], 
        ['Diamonds', 9], ['Diamonds', 10], ['Diamonds', 'Jack'], ['Diamonds', 'Queen'], 
        ['Diamonds', 'King'], ['Spades', 'Ace'], ['Spades', 2], ['Spades', 3], 
        ['Spades', 4], ['Spades', 5], ['Spades', 6], ['Spades', 7], ['Spades', 8], 
        ['Spades', 9], ['Spades', 10], ['Spades', 'Jack'], ['Spades', 'Queen'], 
        ['Spades', 'King'], ['Clubs', 'Ace'], ['Clubs', 2], ['Clubs', 3], 
        ['Clubs', 4], ['Clubs', 5], ['Clubs', 6], ['Clubs', 7], ['Clubs', 8], 
        ['Clubs', 9], ['Clubs', 10], ['Clubs', 'Jack'], ['Clubs', 'Queen'], 
        ['Clubs', 'King']
    ];
    const gameDeck = listCards.sort(() => Math.random() - 0.5);

    const hand1 = [];
    const hand2 = [];

    console.log('Welcome to Blackjack!');
    for (let i = 0; i < 2; i++) {
        functions.dealCardToHand(gameDeck, hand1);
        functions.dealCardToHand(gameDeck, hand2);
    }

    function gameLoop() {
        const score1 = functions.calculateHandScore(hand1);
        const score2 = functions.calculateHandScore(hand2);
        console.log('Player');
        console.log(`Score: ${score1}`);
        art.printCard(hand1);

        console.log('Dealer');
        art.printFirst(hand2);
    }

    function gameLoopFinal() {
        const score1 = functions.calculateHandScore(hand1);
        const score2 = functions.calculateHandScore(hand2);
        console.log('Player');
        console.log(`Score: ${score1}`);
        art.printCard(hand1);

        console.log('Dealer');
        art.printCard(hand2);
    }

    gameLoop();
    let hitStand = prompt('Hit or Stand: ')[0].toLowerCase();
    while (hitStand === 'h') {
        functions.dealCardToHand(gameDeck, hand1);
        gameLoop();
        hitStand = prompt('Hit or Stand: ')[0].toLowerCase();
        if (hitStand === 's') {
            break;
        }
    }

    gameLoop();

    const score1 = functions.calculateHandScore(hand1);
    if (score1 > 21) {
        console.log('Player is busted');
    } else if (score1 === 21) {
        console.log('Player hits a blackjack');
    }

    let score2 = functions.calculateHandScore(hand2);
    while (score2 < 17) {
        functions.dealCardToHand(gameDeck, hand2);
        score2 = functions.calculateHandScore(hand2);
    }

    gameLoopFinal();
    const finalScore1 = functions.calculateHandScore(hand1);
    const finalScore2 = functions.calculateHandScore(hand2);
    if (finalScore2 > 21) {
        console.log('Dealer is busted');
    } else if (finalScore2 === 21) {
        console.log('Dealer hits a blackjack');
    } else {
        if (finalScore1 > finalScore2) {
            console.log('Player wins the hand');
        } else if (finalScore1 < finalScore2) {
            console.log('Dealer wins the hand');
        } else {
            console.log('Hand tied');
        }
    }

    if (replay()) {
        fullGame();
    }
}

fullGame();