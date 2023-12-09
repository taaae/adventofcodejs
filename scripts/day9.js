const fs = require('fs');
const input_path = '../input/input9.txt';

fs.readFile(input_path, 'utf-8', (err, data) => {
    if (err) {
        console.error("error reading file");
        return;
    }
    histories = data.split('\n').map((line) => (line.split(' ').map((el) => parseInt(el))));
    solve9_1(histories);
    solve9_2(histories);
});

function solve9_1(histories) {
    let sum_next = 0;
    for (history of histories) {
        sum_next += nextValue(history);
    }
    console.log(sum_next);
}

function solve9_2(histories) {
    let sum_prev = 0;
    for (history of histories) {
        sum_prev += prevValue(history);
    }
    console.log(sum_prev);
}

function nextValue(history) {
    const triangle = generateTriangle(history);
    let val = 0;
    for (let i = 0; i < triangle.length; i++) {
        val += triangle[i][triangle[i].length - 1];
    }
    return val;
}

function prevValue(history) {
    const triangle = generateTriangle(history);
    let val = 0;
    for (let i = triangle.length - 1; i >= 0; i--) {
        val = triangle[i][0] - val;
    }
    return val;
}

function generateTriangle(history) {
    const triangle = [];
    triangle.push(history);
    let current = history;
    while (!allZeroes(current)) {
        let next = [];
        for (let i = 1; i < current.length; i++) {
            next.push(current[i] - current[i - 1]);
        }
        current = next;
        triangle.push(current);
    }
    return triangle;
}

function allZeroes(arr) {
    return arr.every(el => el == 0);
}