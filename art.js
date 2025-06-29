function dealCard(gameDeck) {
    return gameDeck.shift();
}

function dealCardToHand(gameDeck, hand) {
    const card = gameDeck.shift();
    hand.push(card);
}

function startDealing(gameDeck, hand1, hand2) {
    for (let i = 0; i < 2; i++) {
        dealCardToHand(gameDeck, hand1);
        dealCardToHand(gameDeck, hand2);
    }
}

function calculateHandScore(hand) {
    let aces = 0;
    let value = 0;
    for (const [i, j] of hand) {
        if (j === 'Ace') {
            aces += 1;
            value += 11;
        } else if (['King', 'Queen', 'Jack'].includes(j)) {
            value += 10;
        } else {
            value += j;
        }
    }

    while (aces > 0 && value > 21) {
        aces -= 1;
        value -= 10;
    }

    return value;
}

function hit(hand, deck) {
    dealCardToHand(deck, hand);
}