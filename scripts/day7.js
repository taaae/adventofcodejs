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
    this.hand = parseHand(hand);
    this.bid = parseInt(bid);
}

function parseHand(hand) {
    return Array.from(hand).map(cardChrToNum);
}

function solve7_1(data) {
    const lines = data.split('\n');
    const hands = [];
    for (const line of lines) {
        hands.push(new Hand(...line.split(' ')));
    }
    hands.sort((first, second) => handCmp(first.hand, second.hand));
    let res = 0;
    for (let i = 0; i < hands.length; i++) {
        res += hands[i].bid * (i + 1);
    }
    console.log(res);
}

function cardChrToNum(chr) {
    if (chr >= '2' && chr <= '9')
        return parseInt(chr);
    switch (chr) {
        case 'T': return 10;
        case 'J': return 11;
        case 'Q': return 12;
        case 'K': return 13;
        case 'A': return 14;
    }
}

function handCmp(a, b) {
    let power_a = 0;
    let power_b = 0;
    for (let i of a) {
        power_a += Math.pow(100, countOccurrences(a, i));
    }
    for (let i of b) {
        power_b += Math.pow(100, countOccurrences(b, i));
    }
    if (power_a != power_b)
        return (power_a - power_b);
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i])
            return (a[i] - b[i]);
    }
}

function countOccurrences(arr, searchElement) {
    return arr.reduce((count, current) => {
      return current === searchElement ? count + 1 : count;
    }, 0);
}
