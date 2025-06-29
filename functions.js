const logo = `
.------.            _     _            _    _            _    
|A_  _ |.          | |   | |          | |  (_)          | |   
|( \\/ ).-----.     | |__ | | __ _  ___| | ___  __ _  ___| | __
| \\  /|K /\\  |     | '_ \\| |/ _\` |/ __| |/ / |/ _\` |/ __| |/ /
|  \\/ | /  \\ |     | |_) | | (_| | (__|   <| | (_| | (__|   < 
\`-----| \\  / |     |_.__/|_|\\__,_|\\___|_|\\_\\ |\\__,_|\\___|_|\\_\\
      |  \\/ K|                            _/ |                
      \`------'                           |__/           
`;

const logo2 = `

██████╗ ██╗      █████╗  ██████╗██╗  ██╗     ██╗ █████╗  ██████╗██╗  ██╗    ██████╗ ██╗   ██╗    ██╗  ██╗ █████╗ ██████╗ ███████╗██╗  ██╗    
██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝     ██║██╔══██╗██╔════╝██║ ██╔╝    ██╔══██╗╚██╗ ██╔╝    ██║  ██║██╔══██╗██╔══██╗██╔════╝██║  ██║    
██████╔╝██║     ███████║██║     █████╔╝      ██║███████║██║     █████╔╝     ██████╔╝ ╚████╔╝     ███████║███████║██████╔╝███████╗███████║    
██╔══██╗██║     ██╔══██║██║     ██╔═██╗ ██   ██║██╔══██║██║     ██╔═██╗     ██╔══██╗  ╚██╔╝      ██╔══██║██╔══██║██╔══██╗╚════██║██╔══██║    
██████╔╝███████╗██║  ██║╚██████╗██║  ██╗╚█████╔╝██║  ██║╚██████╗██║  ██╗    ██████╔╝   ██║       ██║  ██║██║  ██║██║  ██║███████║██║  ██║    
╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚═════╝    ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    
                                                                                                                                             

`;

function printCard(cards, number = 5) {
    if (!cards.length) {
        console.log("No cards to display.");
        return;
    }

    const symbolMap = {
        'Hearts': '♥',
        'Diamonds': '♦',
        'Clubs': '♣',
        'Spades': '♠'
    };

    const cardsPerRow = number;
    const resultLines = [];

    for (let i = 0; i < cards.length; i += cardsPerRow) {
        const row = cards.slice(i, i + cardsPerRow);
        const asciiCards = [];

        for (const [suit, rank] of row) {
            const symbol = symbolMap[suit] || '?';
            const rankDisplay = String(rank).length <= 2 ? String(rank) : String(rank)[0];
            const card = [
                `┌─────────┐`,
                `│${rankDisplay.padEnd(2, ' ')}       │`,
                `│         │`,
                `│    ${symbol}    │`,
                `│         │`,
                `│       ${rankDisplay.padStart(2, ' ')}│`,
                `└─────────┘`
            ];
            asciiCards.push(card);
        }

        for (const lines of zip(...asciiCards)) {
            resultLines.push(lines.join('  '));
        }
    }

    console.log(resultLines.join('\n'));
    console.log('\n\n');
}

function printFirst(cards, number = 5) {
    if (!cards.length) {
        console.log("No cards to display.");
        return;
    }

    const symbolMap = {
        'Hearts': '♥',
        'Diamonds': '♦',
        'Clubs': '♣',
        'Spades': '♠'
    };

    function faceCard(suit, rank) {
        const symbol = symbolMap[suit] || '?';
        const rankDisplay = String(rank).length <= 2 ? String(rank) : String(rank)[0];
        return [
            `┌─────────┐`,
            `│${rankDisplay.padEnd(2, ' ')}       │`,
            `│         │`,
            `│    ${symbol}    │`,
            `│         │`,
            `│       ${rankDisplay.padStart(2, ' ')}│`,
            `└─────────┘`
        ];
    }

    function backCard() {
        return [
            "┌─────────┐",
            "│░░░░░░░░░│",
            "│░░░░░░░░░│",
            "│░░░░░░░░░│",
            "│░░░░░░░░░│",
            "│░░░░░░░░░│",
            "└─────────┘"
        ];
    }

    // Only show first card, rest as backs
    const renderedCards = [faceCard(...cards[0])].concat(Array(cards.length - 1).fill(backCard()));

    const cardsPerRow = number;
    const resultLines = [];

    for (let i = 0; i < renderedCards.length; i += cardsPerRow) {
        const chunk = renderedCards.slice(i, i + cardsPerRow);
        for (const row of zip(...chunk)) {
            resultLines.push(row.join('  '));
        }
    }

    console.log(resultLines.join('\n'));
    console.log('\n\n');
}

function zip(...arrays) {
    const length = Math.max(...arrays.map(arr => arr.length));
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(arrays.map(arr => arr[i] || ''));
    }
    return result;
}