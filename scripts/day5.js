const dropArea = document.getElementById('dropArea');

dropArea.addEventListener('dragover', function(event) {
    event.preventDefault();
});

dropArea.addEventListener('drop', function(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        solveDay5(content);
    };
reader.readAsText(file);
});

function solveDay5(content) {
    const ans1 = solveDay5_1(content);
    // const ans2 = solveDay5_2(content);
    alert(`Part 1 ans: ${ans1}`);
}

function solveDay5_1(content) {
    const maps = parseMaps(content);
    const seeds = parseSeeds(content);
    return findLowestLocation(seeds, maps);
}

// Firefox died :c
// function solveDay5_2(content) {
//     const maps = parseMaps(content);
//     const seeds = parseSeeds(content);
//     let result = Infinity;
//     for (const seed of populateSeeds(seeds)) {
//         result = Math.min(result, findLocation(seed, maps));
//     }
//     return result;
// }

function findLowestLocation(seeds, maps) {
    let result = Infinity;
    for (const seed of seeds) {
        result = Math.min(result, findLocation(seed, maps));
    }
    return result;
}

function parseSeeds(content) {
    const seedLine = content.split('\n')[0].split(': ')[1];
    return seedLine.split(' ').map((num) => parseInt(num));
}

// function* populateSeeds(seeds) {
//     for (let i = 0; i < seeds.length; i += 2) {
//         console.log(seeds[i]);
//         for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
//             yield j;
//         }
//     }
// }

function parseMaps(content) {
    const mapsText = content.substring(content.indexOf('\n') + 2).split('\n\n');
    const maps = mapsText.map((mapText) => mapText.split(':\n')[1]).map((mapText) => mapText.split('\n').map((entry) => new Instruction (entry.split(' '))));
    return maps;
}

function Instruction(arr) {
    this.src = parseInt(arr[1]);
    this.dest = parseInt(arr[0]);
    this.range = parseInt(arr[2]);
}

function findLocation(seed, maps) {
    for (const map of maps) {
        seed = findNextLocation(seed, map);
    }
    return seed;
}

function findNextLocation(seed, map) {
    for (const inst of map) {
        if (seed >= inst.src && seed < (inst.src + inst.range))
            return seed + (inst.dest - inst.src);
    }
    return seed;
}
