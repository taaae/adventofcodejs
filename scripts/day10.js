function displayAnswer10_1() {
    solve10_1(document.getElementById("day10input").value);
}


function solve10_1(content) {
    const maze = content.split('\n').filter((el) => el !== '');
    let cur_i, cur_j; 
    outerLoop:
    for (cur_i = 0; cur_i < maze.length; cur_i++) {
        for (cur_j = 0; cur_j < maze[cur_i].length; cur_j++) {
            if (maze[cur_i][cur_j] === 'S')
                break outerLoop;
        }
    }
    let loop_size = 1;
    cur_j += 1;
    let prev_dir = 'right';
    const direction_map = new DirectionMap();
    while (maze[cur_i][cur_j] !== 'S') {
        loop_size++;
        prev_dir = direction_map[prev_dir + maze[cur_i][cur_j]];
        switch (prev_dir) {
            case 'up':
                cur_i--;
                break;
            case 'down':
                cur_i++;
                break;
            case 'left':
                cur_j--;
                break;
            case 'right':
                cur_j++;
                break;
        }
    }
    console.log(Math.floor(loop_size / 2));
}

function DirectionMap() {
    this['up|'] = 'up';
    this['down|'] = 'down';
    this['right-'] = 'right';
    this['left-'] = 'left';
    this['downL'] = 'right';
    this['leftL'] = 'up';
    this['rightJ'] = 'up';
    this['downJ'] = 'left';
    this['right7'] = 'down';
    this['up7'] = 'left';
    this['upF'] = 'right';
    this['leftF'] = 'down';
}
