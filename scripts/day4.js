function removeCardPreffix(card) {
    return card.split(': ')[1];
}

function intoObject(card) {
    const card_split = card.split(' | ');
    const card_numbers = card_split.map((arr) => {
        return arr.trim().split(/\s+/).map((element) => parseInt(element));
    });
    return {
        winning: card_numbers[0],
        yours: card_numbers[1]
    };
}

function parseInputIntoArrOfCards() {
    const input = document.getElementById("day4input").innerText;
    const lines = input.split('\n').map(removeCardPreffix);
    const res = lines.map(intoObject);
    return res;
}

function countMatches(card) {
    let matches = 0;
    card.winning.forEach((win_num) => {
        matches += card.yours.includes(win_num);
    });
    return matches;
}

function calculateCardPoints(card) {
    const matches = countMatches(card);
    if (matches === 0)
        return 0;
    return 2 ** (matches - 1);
}

function displayAnswer4_1() {
    const cardArr = parseInputIntoArrOfCards();
    let ans = 0;
    cardArr.forEach((card) => {
        ans += calculateCardPoints(card);
    });
    console.log(ans);
}

function addCardCount(card) {
    card.count = 1;
    return card;
}

function countMatches(card) {
    let matches = 0;
    card.winning.forEach((win_num) => {
        matches += card.yours.includes(win_num);
    });
    return matches;
}

function displayAnswer4_2() {
    const cardArr = parseInputIntoArrOfCards().map(addCardCount);
    cardArr.forEach((card, index) => {
        const matches = countMatches(card);
        for (let i = index + 1; i < index + matches + 1; i++) {
            cardArr[i].count += card.count;
        }
    });
    const ans = cardArr.reduce((total, card) => {
        return total + card.count;
    }, 0);
    console.log(ans);
}