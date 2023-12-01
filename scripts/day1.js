function displayAnswer1_1() {
    const text_input = document.getElementById('day1_1input').value;
    let ans = 0;
    text_input.split('\n').forEach(line => {
        ans += parseInt(line.match(/\d/)[0]) * 10;
        ans += parseInt(line.match(/\d/g)[line.match(/\d/g).length - 1]);
    });
    document.getElementById('day1_1ans').innerText = ans;
}

function digitToInt(str) {
    switch (str) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        case 'eno':
            return 1;
        case 'owt':
            return 2;
        case 'eerht':
            return 3;
        case 'ruof':
            return 4;
        case 'evif':
            return 5;
        case 'xis':
            return 6;
        case 'neves':
            return 7;
        case 'thgie':
            return 8;
        case 'enin':
            return 9;
        default:
            return parseInt(str);
    }
}

// No idea why this didn't work
// function displayAnswer1_2() {
//     const text_input = document.getElementById('day1_2input').value;
//     let ans = 0;
//     const regex = /\d|one|two|three|four|five|six|seven|eight|nine/g;
//     text_input.split('\n').forEach(line => {
//         console.log(line);
//         console.log(digitToInt(line.match(regex)[0]), digitToInt(line.match(regex)[line.match(regex).length - 1]));
//         ans += digitToInt(line.match(regex)[0]) * 10;
//         ans += digitToInt(line.match(regex)[line.match(regex).length - 1]);
//     });
//     document.getElementById('day1_2ans').innerText = ans;
// }

function displayAnswer1_2() {
    const text_input = document.getElementById('day1_2input').value;
    let ans = 0;
    const regex = /\d|one|two|three|four|five|six|seven|eight|nine/;
    const reregex = /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/;
    text_input.split('\n').forEach(line => {
        ans += digitToInt(line.match(regex)[0]) * 10;
        ans += digitToInt(line.split('').reverse().join('').match(reregex)[0]);
    });
    document.getElementById('day1_2ans').innerText = ans;
}
