const fs = require('fs');
const inputPath = '../input/input7.txt';

fs.readFile(inputPath, 'utf-8', (err, data) => {
    if (err) { 
        console.log("error reading file"); 
        return;
    }
    solve7(data, hand1Cmp);
    solve7(data, hand2Cmp);
});

function Hand(hand, bid) {
    this.hand = parseHand(hand);
    this.bid = parseInt(bid);
}

function parseHand(hand) {
    return Array.from(hand).map(cardChrToNum);
}

function solve7(data, handCmp) {
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

function hand1Cmp(a, b) {
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

function hand2Cmp(a, b) {
    let max_occ_a = 0;
    let max_occ_b = 0;
    let kicker_a = undefined;
    let kicker_b = undefined;
    for (let i of a) {
        if (i === 11)
            continue;
        if (max_occ_a < countOccurrences(a, i)) {
            max_occ_a = countOccurrences(a, i);
            kicker_a = i;
        }
    }
    for (let i of b) {
        if (i === 11)
            continue;
        if (max_occ_b < countOccurrences(b, i)) {
            max_occ_b = countOccurrences(b, i);
            kicker_b = i;
        }
    }
    let power_a = 0;
    let power_b = 0;
    for (let i of a) {
        if (i === 11) {
            power_a += Math.pow(100, countOccurrences(a, i) + countOccurrences(a, kicker_a));
            continue;
        }
        let jockers = 0;
        if (i === kicker_a)
            jockers = countOccurrences(a, 11);
        power_a += Math.pow(100, countOccurrences(a, i) + jockers);
    }
    for (let i of b) {
        if (i === 11) {
            power_b += Math.pow(100, countOccurrences(b, i) + countOccurrences(b, kicker_b));
            continue;
        }
        let jockers = 0;
        if (i === kicker_b)
            jockers = countOccurrences(b, 11);
        power_b += Math.pow(100, countOccurrences(b, i) + jockers);
    }
    if (power_a != power_b)
        return (power_a - power_b);
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            if (a[i] == 11)
                return 1 - b[i];
            if (b[i] == 11)
                return a[i] - 1;
            return (a[i] - b[i]);
        }
    }
}

function countOccurrences(arr, searchElement) {
    if  (searchElement === undefined)
        return 0;
    return arr.reduce((count, current) => {
      return current === searchElement ? count + 1 : count;
    }, 0);
}
