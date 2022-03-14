const CELL_SIZE = 20;
const CANVAS_SIZE = 500;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
var MOVE_INTERVAL = [150, 120, 100, 80, 70];
var currentLevel = 0;

let score2 = 0;

function initPosi(){
    return{
        x: 0,
        y: 0,
    } 
} 



function initLifebar(){
    return{
        ...initLifeBarCheck(),
    
    }
}

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function blankPosition(){
    return{
        x: -1,
        y: -1
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
}
function initLifeBarCheck(){
    let head = initPosi();
    let body = [{x: head.x, y: head.y}];
    return{
        head: head,
        body: body
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0
        
    }
}
let snake = initSnake("purple");


let apple1 = {
    color: "red",
    position: initPosition(),
}

let apple2 = {
    color: "red",
    position: initPosition(),
}

let lifebar = initLifebar();

let lifeIcon = {
    position: initPosition()
}
let positionObstacle = [
    { x: 3, y: Math.floor(HEIGHT * 1 / 4) }, // lvl 2
    { x: 3, y: Math.floor(HEIGHT * 3 / 4) }, // lvl 3
    { x: 3, y: Math.floor(HEIGHT * 2 / 4) }, // lvl 4
    
    // lvl 5
    { x: 0, y: Math.floor(HEIGHT * 1 / 4) }, 
    { x: 0, y: Math.floor(HEIGHT * 3 / 4) }, 
    { x: 5, y: Math.floor(HEIGHT * 2 / 4) }, 
    
];
function drawCell(ctx, x, y) {
    let img = document.getElementById('snake-head');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawCellBody(ctx, x, y) {
    let img = document.getElementById('snake-body');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawApple(ctx, x, y) {
	let img = document.getElementById('apple');
	ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawLifeBar(ctx, x, y){
    let img = document.getElementById('lifebar');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawLifeIcon(ctx, x, y){
    let img = document.getElementById('lifebar');
    ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore() {
    let scoreCanvas;
    scoreCanvas = document.getElementById("score1Board");
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "22px Arial";
    scoreCtx.fillStyle = 'black';
    scoreCtx.fillText("SCORE", scoreCanvas.scrollWidth /4, scoreCanvas.scrollHeight / 3.5);
    scoreCtx.font = "24px Arial";
    scoreCtx.fillText(score2, scoreCanvas.scrollWidth /2.2, scoreCanvas.scrollHeight / 1.5);
}

function isPrime(num) {
    for (let i = 2; i * i <= num; i++)
        if (num % i === 0)
          return false; 
    return num > 1;
}

function drawSpeed(snake){
    let speedCanvas = document.getElementById("speedBoard");
    let speedCtx = speedCanvas.getContext("2d");
    
    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "22px Arial";
    speedCtx.fillStyle = 'black';
    // speedCtx.textAlign = "start";
    speedCtx.fillText("SPEED", speedCanvas.scrollWidth /3.8, speedCanvas.scrollHeight / 3.5);
    speedCtx.font = "24px Arial";
    speedCtx.fillText(MOVE_INTERVAL[currentLevel] + " ms", speedCanvas.scrollWidth /4, speedCanvas.scrollHeight / 1.5);
}
lifebar.body.push({x: lifebar.head.x , y: lifebar.head.y});
lifebar.body.push({x: lifebar.head.x , y: lifebar.head.y});

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        
        drawCell(ctx, snake.head.x, snake.head.y, snake.color);
        for (let i = 1; i < snake.body.length; i++) {
            drawCellBody(ctx, snake.body[i].x, snake.body[i].y, snake.color);
        }
        drawApple(ctx, apple1.position.x, apple1.position.y, apple1.color);
        drawApple(ctx, apple2.position.x, apple2.position.y, apple2.color);

        checkLevel(snake, ctx);

        drawScore(snake);
        drawSpeed(snake);

        drawLifeBar(ctx,lifebar.head.x, lifebar.head.y);

        for (let i = 1; i < lifebar.body.length ; i++){
            drawLifeBar(ctx, lifebar.body[i].x + i, lifebar.body[i].y)
        }

        if(isPrime(score2) == true){
            
            drawLifeIcon(ctx, lifeIcon.position.x, lifeIcon.position.y);
           
        }

        setTimeout
    }, REDRAW_INTERVAL);
}

function drawHorizontal(ctx, x, y, width, height) {
    ctx.fillStyle = "green";
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE * width, CELL_SIZE * height);
}

function teleport() {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        score2++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
        lifeIcon.position = initPosition();
        var audio = new Audio ('assets/eat.wav');
        audio.play();
    }
    if(snake.head.x == lifeIcon.position.x && snake.head.y == lifeIcon.position.y){
        lifeIcon.position = blankPosition();
        lifebar.body.push({x: lifebar.head.x , y: lifebar.head.y});
    }
}

let levelUp = true;
var counter = 0;
function checkLevel(snake, ctx) {
    let textLevel = document.getElementById("leveling");
    if (score2 < 5) {
        //level 1
        textLevel.textContent = "1";
        currentLevel = 0;

    } else if (score2 < 10) {
        //level 2
        if(counter == 0){
            alert('level 1 complete!');
            var lvlupAudio = new Audio('assets/levelup.mp3');
            lvlupAudio.play();
            counter = 1;
        }
        textLevel.textContent = "2";
        drawHorizontal(ctx, positionObstacle[0].x, positionObstacle[0].y, 20, 0.5);
        currentLevel = 1;

        // MOVE_INTERVAL += 20;
        if (levelUp) {
            levelUp = false;
        }
    } else if (score2 < 15) {
        //level 3
        if(counter == 1){
            alert('level 2 complete!');
            var lvlupAudio = new Audio('assets/levelup.mp3');
            lvlupAudio.play();
            counter = 2;
        }
        textLevel.textContent = "3";
        drawHorizontal(ctx, positionObstacle[0].x, positionObstacle[0].y, 20, 0.5);
        drawHorizontal(ctx, positionObstacle[1].x, positionObstacle[1].y, 20, 0.5);
        currentLevel = 2;

        if (!levelUp) {
            levelUp = true;
        }

    } else if (score2 < 20) {
        //level 4
        if(counter == 2){
            alert('level 3 complete!');
            var lvlupAudio = new Audio('assets/levelup.mp3');
            lvlupAudio.play();
            counter = 3;
        }
        textLevel.textContent = "4";
        drawHorizontal(ctx, positionObstacle[0].x, positionObstacle[0].y, 20, 0.5);
        drawHorizontal(ctx, positionObstacle[1].x, positionObstacle[1].y, 20, 0.5);
        drawHorizontal(ctx, positionObstacle[2].x, positionObstacle[2].y, 20, 0.5);
        currentLevel = 3;

        if (levelUp) {
            levelUp = false;
        }

    } else {
        //level 5
        if(counter == 3){
            alert('level 4 complete!');
            var lvlupAudio = new Audio('assets/levelup.mp3');
            lvlupAudio.play();
            counter = 4;
        }
        textLevel.textContent = "5";
        drawHorizontal(ctx, positionObstacle[3].x, positionObstacle[3].y, 20, 0.5);
        drawHorizontal(ctx, positionObstacle[4].x, positionObstacle[4].y, 20, 0.5);
        drawHorizontal(ctx, positionObstacle[5].x, positionObstacle[5].y, 20, 0.5);
        lvl = 5;
        // drawHorizontal(ctx, positionObstacle[6].x, positionObstacle[6].y, 40, 0.5);

        if (!levelUp) {
            levelUp = true;
        }
    }
    
}


function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);


}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);
  


}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);
  


}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple1);
    eat(snake, apple2);



}

// collision function
function checkCollision(snakes) {
    let isCollide = false;
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                    var audio = new Audio('assets/crash.mp3');
                    audio.play();
                }
            }
        }

        // obstacle
        for (let l = 0; l < currentLevel && currentLevel <= 3; l++) {
            if ((snakes[i].head.x >= positionObstacle[l].x) && (snakes[i].head.x <= (positionObstacle[l].x + 19)) &&
                (snakes[i].head.y == positionObstacle[l].y)) {
                isCollide = true;
                var audio = new Audio('assets/crash.mp3');
                audio.play();
            }
        }
        if (currentLevel == 4) {
            if (((snakes[i].head.y >= positionObstacle[3].y) && (snakes[i].head.y <= (positionObstacle[3].y + 19)) && (snakes[i].head.x == positionObstacle[3].x)) ||
                ((snakes[i].head.y >= positionObstacle[4].y) && (snakes[i].head.y <= (positionObstacle[4].y + 19)) && (snakes[i].head.x == positionObstacle[4].x))) {
                isCollide = true;
                var audio = new Audio('assets/crash.mp3');
                audio.play();
            }

        }
        // if (currentLevel == 5) {
        //     if (((snakes[i].head.y >= positionObstacle[4].y) && (snakes[i].head.y <= (positionObstacle[4].y + 19)) && (snakes[i].head.x == positionObstacle[4].x)) ||
        //         ((snakes[i].head.y >= positionObstacle[5].y) && (snakes[i].head.y <= (positionObstacle[5].y + 19)) && (snakes[i].head.x == positionObstacle[5].x))) {
        //         isCollide = true;
        //     }

        // }
    }
    if (isCollide) {
        snake = initSnake("purple");
        lifebar.body.length-=1;
        if(lifebar.body.length == 0){
            gameOver();
            alert("Game Over");
        }
    }
    return isCollide;
}

function gameOver(){
    var audio = new Audio('assets/gameover.mp3');
    audio.play();
    lifebar.body.push({x: lifebar.head.x , y: lifebar.head.y});
    lifebar.body.push({x: lifebar.head.x , y: lifebar.head.y});
    lifebar.body.push({x: lifebar.head.x , y: lifebar.head.y});
    score2 = 0;
}


function move() {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL[currentLevel]);
    } else {
        console.log("collide", snake.color);
        if (snake) {
            snake = initSnake("purple");
            setTimeout(function() {
                move(snake);
            }, MOVE_INTERVAL[currentLevel]);
        }
    }
}

function moveBody() {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake, DIRECTION.DOWN);
    }

})

function initGame() {
    move(snake);
}



initGame();
