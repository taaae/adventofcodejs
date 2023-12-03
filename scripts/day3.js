function isDigit(char) {
    return /^\d$/.test(char);
}

function getBoundaries() {
    const lines = DAY3INPUT.split('\n');
    let boundaries = Array.from({length: lines.length}, () => []);
    for (let i = 0; i < lines.length; i++) {
        let start = -1;
        for (let j = 0; j < lines[i].length; j++) {
            if (isDigit(lines[i][j])) {
                if (start == -1)
                    start = j;
            } else {
                if (start != -1) {
                    boundaries[i].push([start, j - 1]);
                    start = -1;
                }
            }
        }
        if (start != -1) {
            boundaries[i].push([start, lines[i].length - 1]);
        }
    }
    return boundaries;
}

function isAdjacent(i, j, lines) {
    const directions = [
        [-1, -1], [-1, 1], [1, -1], [1, 1],
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
    for (const [dx, dy] of directions) {
        const newi = i + dx;
        const newj = j + dy;
        if (newi >= 0 && newj >= 0 && newi < lines.length && newj < lines[newi].length) {
            if (!isDigit(lines[newi][newj]) && lines[newi][newj] != '.') {
                return true;
            }
        }
    }
    return false;
}

function addIfAdjacent(i, start, end, lines) {
    let isAdj = false;

    for (let j = start; j <= end; j++) {
        if (isAdjacent(i, j, lines))
            isAdj = true;
    }
    if (isAdj == false)
        return 0;
    return parseInt(lines[i].slice(start, end + 1));
}

function solve1() {
    let ans = 0;
    const lines = DAY3INPUT.split('\n');
    const boundaries = getBoundaries();
    for (let i = 0; i < boundaries.length; i++) {
        for (let j = 0; j < boundaries[i].length; j++) {
            ans += addIfAdjacent(i, boundaries[i][j][0], boundaries[i][j][1], lines);
        }
    }
    return ans;
}

function getStarPosHash(i, j, lines) {
    const directions = [
        [-1, -1], [-1, 1], [1, -1], [1, 1],
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
    for (const [dx, dy] of directions) {
        const newi = i + dx;
        const newj = j + dy;
        if (newi >= 0 && newj >= 0 && newi < lines.length && newj < lines[newi].length) {
            if (lines[newi][newj] === '*') {
                return newi * 100000 + newj;
            }
        }
    }
    return -1;
}

function insertIfAdjacent(i, start, end, lines, posNumMap) {
    for (let j = start; j <= end; j++) {
        const star_pos_hash = getStarPosHash(i, j, lines);
        if (star_pos_hash != -1) {
            if (posNumMap.has(star_pos_hash))
                posNumMap.set(star_pos_hash, posNumMap.get(star_pos_hash) * parseInt(lines[i].slice(start, end + 1)) * 100);
            else
                posNumMap.set(star_pos_hash, parseInt(lines[i].slice(start, end + 1)));
            return;
        }
    }
}

function solve2() {
    const lines = DAY3INPUT.split('\n');
    const boundaries = getBoundaries();
    const posNumMap = new Map();
    for (let i = 0; i < boundaries.length; i++) {
        for (let j = 0; j < boundaries[i].length; j++) {
            insertIfAdjacent(i, boundaries[i][j][0], boundaries[i][j][1], lines, posNumMap);
        }
    }
    let ans = 0;
    for (const [key, value] of posNumMap) {
        if (value > 1000)
            ans += value / 100;
    }
    return ans;
}

document.getElementById("day3_1ans").innerText = "Day 3.1 ans: " + solve1();
document.getElementById("day3_2ans").innerText = "Day 3.2 ans: " + solve2();
