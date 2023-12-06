const fs = require('fs');
const inputPath = '../input/input6.txt';

fs.readFile(inputPath, 'utf-8', (err, data) => {
    if (err) { 
        console.log("error reading file"); 
        return;
    }

    solve6_1(data);
    solve6_2(data);
});

function solve6_1(data) {
    let [time, distance] = data
        .split('\n')
        .map((elem) => elem.split(':')[1])
        .map((elem) => elem.trim())
        .map((elem) => elem.split(' '))
        .map((elem) => elem.filter((item) => item !== ''));
    let ans = 1;
    for (let i = 0; i < time.length; i++) {
        ans *= numberOfWays(time[i], distance[i]);
    }
    console.log(ans);
}

function numberOfWays(time, distance) {
    let ans = 0;
    for (let hold = 0; hold < time; hold++) {
        if (hold * (time - hold) > distance)
            ans++;
    }
    return ans;
}

function solve6_2(data) {
    let [time, distance] = data
        .split('\n')
        .map((elem) => elem.split(':')[1])
        .map((elem) => elem.trim())
        .map((elem) => elem.split(' '))
        .map((elem) => elem.filter((item) => item !== ''))
        .map((elem) => parseInt(elem.join('')));
    console.log(numberOfWays(time, distance));
}
