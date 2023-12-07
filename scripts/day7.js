const fs = require('fs');
const inputPath = '../input/input7.txt';

fs.readFile(inputPath, 'utf-8', (err, data) => {
    if (err) { 
        console.log("error reading file"); 
        return;
    }

    solve7_1(data);
    // solve7_2(data);
});

function Hand(hand, bid) {
    this.hand = hand;
    this.bid = parseInt(bid);
}

function solve7_1(data) {
    const lines = data.split('\n');
    const hands = [];
    for (const line of lines) {
        hands.push(new Hand(...line.split(' ')));
    }
    for (const hand of hands) {
        addStrength(hand);
    }
    hands.sort((a, b) => a.strength - b.strength);
    let res = 0;
    for (let i = 0; i < hands.length; i++) {
        res += hands[i].bid * (i + 1);
    }
    console.log(res);
}

function addStrength(hand) {
    let strength = 0;
    for (const card of hand.hand) {
        strength += Math.pow(1000000000000, countOccurences(hand.hand, card)) * cardChrToNum(card);
    }
    hand.strength = strength;
}

function cardChrToNum(chr) {
    if (chr >= '2' && chr <= '9')
        return Math.pow(2, parseInt(chr) - 1);
    switch (chr) {
        case 'T': return Math.pow(2, 9);
        case 'J': return Math.pow(2, 10);
        case 'Q': return Math.pow(2, 11);
        case 'K': return Math.pow(2, 12);
        case 'A': return Math.pow(2, 13);
    }
}

// unsafe if chr not found
function countOccurences(str, chr) {
    const regex = new RegExp(chr, 'g');
    return str.match(regex).length;
}
