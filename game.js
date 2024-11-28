//html elements
const boardElement = document.querySelector(".game-board");

//game variables
const gridWidth = 30;
const gridHeight = 20;

let snakeDirection = 'up';
let gameInterval;
let gameSpeed = 5000;
let gameStarted = false;

let snake = [{x:15, y:10}];


//drawing snake and food
const drawGame = () =>{
    boardElement.innerHTML = '';
    drawSnake();
};

const drawSnake = () =>{
    snake.forEach((fragment) =>{
        const snakeFragment = createElement("div", "snake");
        setElementPosition(snakeFragment, fragment);
        boardElement.appendChild(snakeFragment);
    })
};

//creates elements of snake or food
const createElement = (tag, className) =>{
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
}

const setElementPosition = (element, position) =>{
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

drawGame();

const snakeMove = () =>{
    const snakeHead = snake[0];
    document.addEventListener('keydown', (event)=>{
        switch (event.key){
            case 'ArrowUp':
                snakeHead.y--;
                break;
            case 'ArrowDown':
                snakeHead.y++;
                break;
            case 'ArrowLeft':
                snakeHead.x--;
                break;
            case 'ArrowRight':
                snakeHead.x++;
                break;
        }
    });
    
    gameInterval = setInterval(()=> {
        drawSnake();
        snakeMove();
    }, gameSpeed);
    snake.unshift(snakeHead); 
    snake.pop();
}

console.log(snake);
//snakeMove();