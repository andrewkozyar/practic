let MAZE = []

generateMaze = (height, width) => {
    const maze = []
    const walls = []
    let currentPosition = [0,0]

    height = height % 2 == 0 ? height+1 : height;
    width = width % 2 == 0 ? width + 1 : width;

    document.getElementById('maze')
        .setAttribute('style','height:'+height*22+'px; width:'+width*22+'px');

    for (let y=0; y<height; y++) {
        maze[y] = [];
        for (let x = 0; x<width; maze[y][x++] = 'wall') {
            let el = document.getElementById('maze').appendChild(document.createElement("div"));
            el.className = 'block wall';
            el.setAttribute('id', y+'-'+x);
        }
    }

    function amaze(y,x,addBlockWalls) {
        maze[y][x] = 'maze';
        document.getElementById(y+'-'+x).className = 'block';

        if (addBlockWalls && valid(y+1,x) && (maze[y+1][x] == 'wall')) walls.push([y+1,  x , [y,x]]);
        if (addBlockWalls && valid(y-1,x) && (maze[y-1][x] == 'wall')) walls.push([y-1,  x , [y,x]]);
        if (addBlockWalls && valid(y,x+1) && (maze[y][x+1] == 'wall')) walls.push([ y , x+1, [y,x]]);
        if (addBlockWalls && valid(y,x-1) && (maze[y][x-1] == 'wall')) walls.push([ y , x-1, [y,x]]);
    }

    const valid = (a,b) => (a<height && a>=0 && b<width && b>=0) ? true : false;

    amaze(currentPosition[0],currentPosition[1], true);

    MAZE = maze;

    while(walls.length != 0) {
        let randomWall = walls [
            Math.floor(Math.random() * walls.length)],
            host = randomWall[2],
            opposite = [(host[0] + (randomWall[0]-host[0])*2),
            (host[1] + (randomWall[1]-host[1])*2)
        ];

        if (valid(opposite[0],opposite[1])) {
            if (maze[opposite[0]][opposite[1]] == 'maze') {
                walls.splice(walls.indexOf(randomWall), 1);
            } else {
                amaze(randomWall[0], randomWall[1], false)
                amaze(opposite[0], opposite[1], true);
            }
        } else {
            walls.splice(walls.indexOf(randomWall), 1);
        }
    }

    document.getElementById('0-0').className = 'block me';
    document.getElementById((parseInt(height)-1)+'-'+(parseInt(width)-1)).className = 'block finish';

    document.body.onkeydown = function(e) {
        let newPosition = [currentPosition[0] + ((e.keyCode - 39) % 2), currentPosition[1] + ((e.keyCode - 38) % 2)];
        if (valid(newPosition[0],newPosition[1]) && maze[newPosition[0]][newPosition[1]] != 'wall') {
            document.getElementById(currentPosition[0]+'-'+currentPosition[1]).className = 'block';

            currentPosition = newPosition;
            document.getElementById(currentPosition[0]+'-'+currentPosition[1]).className = 'block me';

            if (currentPosition[0] == height-1 && currentPosition[1] == width-1) {
                document.write('YOU WIN');
            }
        }
    }
}

generateMaze(35, 80)


const cleanMaze = () => {
    for (let i = 0; i <= 11; i++){
        let maze = document.getElementsByClassName('block')
        for(value of maze){
            value.parentNode.removeChild(value)
        }
    }
}

const easy = document.getElementById('easy')
const medium = document.getElementById('medium')
const hart = document.getElementById('hart')
const castomBtn = document.getElementById('castom')
const castomWidth = document.getElementById('castomWidth')
const castomHate = document.getElementById('castomHate')

easy.onclick = () => {
    cleanMaze()
    generateMaze(21, 41)
    // checkPath({ x: 0, y:0 }, checkEnd())
    // console.log(MAZE)
}

medium.onclick = () => {
    cleanMaze()
    generateMaze(31, 61)
}

hart.onclick = () => {
    cleanMaze()
    generateMaze(35, 81)
}

castomBtn.onclick = () => {
    let height = Number(castomHate.value)
    let width = Number(castomWidth.value)
    if (width > 85) { width = 85 }
    if (height > 37) { height = 37 }
    if (width < 3) { width = 3 }
    if (height < 3) { height = 3 }

    cleanMaze()
    generateMaze(height, width)
}

const checkEnd = () => {
    return { x: MAZE[0].length - 1, y: MAZE.length - 1 }
}

const checkPath = (start, end) => {
    MAZE[start.y][start.x] = 5;

    const siblings = getValidSib(start)

    for (let i = 0; i < siblings.length; i++){
        const current = siblings[i];

        const isSolved = current.x === end.x && current.y === end.y;
        const notVisited = MAZE[current.y][current.x] !== 5;

        if (isSolved || (notVisited && checkPath(current, end))){
            console.log('vau')
            return
        }
    }
}

const getValidSib = (cord) => {
    let { x, y } = cord;
    const cords = []

    if(MAZE[y-1] !== undefined){
        cords.push({ x: x, y: y-1, val: MAZE[y-1][x]})
    }

    if(MAZE[y+1] !== undefined){
        cords.push({ x: x, y: y+1, val: MAZE[y+1][x]})
    }

    if(MAZE[y][x-1] !== undefined){
        cords.push({ x: x-1, y: y, val: MAZE[y][x-1]})
    }

    if(MAZE[y][x+1] !== undefined){
        cords.push({ x: x+1, y: y, val: MAZE[y][x+1]})
    }

    return cords.filter(el => el.val === 'maze')
}



