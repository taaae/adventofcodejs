const fs = require('fs');
const input_path = '../input/input8.txt';

fs.readFile(input_path, 'utf-8', (err, data) => {
    if (err) {
        console.log("error reading file");
        return;
    }
    const [directions, ...other] = data.split('\n');
    other.shift(1);
    const docs = new Map();
    other.forEach((el) => insertDoc(docs, el));
    const steps8_1 = solve8_1(directions, docs);
    console.log(steps8_1);
    let periods = get_period(directions, docs);
    console.log(lcm_multiple(periods));
});

function insertDoc(docs, el) {
    const origin = el.split(' ')[0];
    const end = el.split('= ')[1].replace(/[()]/g, '').split(', ');
    docs.set(origin, end)
}

function solve8_1(directions, docs) {
    let current = 'AAA';
    let steps = 0;
    while (true) {
        for (const direction of directions) {
            if (direction == 'L')
                current = docs.get(current)[0];
            else
                current = docs.get(current)[1];
            steps++;
            if (current == 'ZZZ')
                return steps;
        }
    }
}

function get_period(directions, docs) {
    const current = Array.from(docs.keys()).filter((el) => el[2] === 'A');
    const steps_prev_z = [0, 0, 0, 0, 0, 0];
    const dist_prev_z = [0, 0, 0, 0, 0, 0];
    let steps = 0;
    while (true) {
        for (const direction of directions) {
            if (direction === 'L') {
                current.forEach((element, index, arr) => {
                    arr[index] = docs.get(element)[0];
                })
            } else {
                current.forEach((element, index, arr) => {
                    arr[index] = docs.get(element)[1];
                })
            }
            steps++;
            for (let i = 0; i < current.length; i++) {
                if (current[i][2] === 'Z') {
                    dist_prev_z[i] = steps - steps_prev_z[i];
                    steps_prev_z[i] = steps;
                    if (steps > 50000)
                        return dist_prev_z;
                }
            }
        }
    }
}

function lcm_multiple(periods) {
    let res = 1;
    for (p of periods) {
        res = lcm(res, p);
    }
    return res;
}

function lcm(a, b) {
    return a * b / gcd(a, b);
}

function gcd(a, b) {
    if (b)
        return gcd(b, a % b);
    return Math.abs(a);
}