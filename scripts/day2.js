function displayAnswer2_1() {
    const fileInput = document.getElementById("day2input");
    const file = fileInput.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }
    const reader = new FileReader();

    reader.onload = function(event) {
        const contents = event.target.result;
        const lines = contents.split('\n');
        let ans = 0;
        lines.forEach((line, index) => {
            if (isPossible(line))
                ans += (index + 1);
        });
        alert(`The answer is : ${ans}`);
    }

    reader.readAsText(file);
}

function isPossible(line) {
    const   rMax = 12,
            gMax = 13,
            bMax = 14;
    let is_bad_game = false;
    const games = line.split(": ")[1].split('; ');
    games.forEach((game) => {
        const itemsets = game.split(', ');
        itemsets.forEach((itemset) => {
            const quantity = parseInt(itemset.split(' ')[0]);
            const color = itemset.split(' ')[1];
            console.log(color);
            switch (color) {
                case "red":
                    if (quantity > rMax)
                        is_bad_game = true;
                    break;
                case "green":
                    if (quantity > gMax)
                        is_bad_game = true;
                    break;
                case "blue":
                    if (quantity > bMax)
                        is_bad_game = true;    
                    break;
                default:
                    throw new Error("bad color");
            }
        });
    });
    return (!is_bad_game);
}

function displayAnswer2_2() {
    const fileInput = document.getElementById("day2input");
    const file = fileInput.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }
    const reader = new FileReader();

    reader.onload = function(event) {
        const contents = event.target.result;
        const lines = contents.split('\n');
        let ans = 0;
        lines.forEach(line => {
            ans += powerMin(line);
        });
        alert(`The answer is : ${ans}`);
    }

    reader.readAsText(file);
}

function powerMin(line) {
    let min_r = 0;
    let min_g = 0;
    let min_b = 0;

    const games = line.split(': ')[1].split('; ');
    for (const game of games) {
        const item_sets = game.split(', ');
        for (const item_set of item_sets) {
            const quantity = parseInt(item_set.split(' ')[0]);
            const color = item_set.split(' ')[1];
            switch (color) {
                case "red":
                    min_r = Math.max(min_r, quantity);
                    break;
                case "green":
                    min_g = Math.max(min_g, quantity);
                    break;
                case "blue":
                    min_b = Math.max(min_b, quantity);
                    break;
                default:
                    throw new Error("bad color");
            }
        }
    }
    return min_r * min_g * min_b;
}
