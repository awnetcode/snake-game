//html elements
const boardElement = document.querySelector(".game-board");

//game variables
const gridWidth = 30;
const gridHeight = 20;

let snakeDirection = 'up';
let gameInterval;
let gameSpeed = 200;
let gameStarted = false;


let snake = [{x: 15, y: 10}];

//drawing snake and food
const drawGame = () => {
    boardElement.innerHTML = '';
    drawSnake();
    drawFood();
};

const drawSnake = () => {
    snake.forEach((fragment) => {
        const snakeFragment = createElement("div", "snake");
        setElementPosition(snakeFragment, fragment);
        boardElement.appendChild(snakeFragment);
    });
};

const drawFood = () =>{
    createFood();
    const food = createElement("div", "food");
    setElementPosition(food, foodPosition);
    boardElement.appendChild(food);
}

const createFood = () =>{
    const x = Math.floor(Math.random() * gridWidth) +1;
    const y = Math.floor(Math.random() * gridHeight) +1;
    return {x,y};
}

let foodPosition = createFood();
console.log(foodPosition);

//creates elements of snake or food
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
};

const setElementPosition = (element, position) => {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
};

// Moves the snake based on direction
const moveSnake = () => {
    const snakeHead = { ...snake[0] }; // Kopiowanie aktualnej głowy węża
    if(gameStarted == true){
        switch (snakeDirection) {
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
    }
    snake.unshift(snakeHead); // Dodaj nową głowę
    if(snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y){
        foodPosition = createFood();
        clearInterval(gameInterval);
        gameInterval = setInterval(()=>{
            moveSnake();
            drawGame();
        }, gameSpeed);
    }else{
snake.pop();
    }
     // Usuń ostatni segment
};

// Obsługuje naciśnięcia klawiszy
 document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                if (snakeDirection !== 'ArrowDown') snakeDirection = 'ArrowUp';
                break;
            case 'ArrowDown':
                if (snakeDirection !== 'ArrowUp') snakeDirection = 'ArrowDown';
                break;
            case 'ArrowLeft':
                if (snakeDirection !== 'ArrowRight') snakeDirection = 'ArrowLeft';
                break;
            case 'ArrowRight':
                if (snakeDirection !== 'ArrowLeft') snakeDirection = 'ArrowRight';
                break;
        }
 });

// Startuje grę
const startGame = () => {
    gameInterval = setInterval(() => {
        moveSnake();
        drawFood();
        drawGame();
    }, gameSpeed);
    gameStarted = true;
};

const pauseGame = () =>{
    document.addEventListener("keydown", (event) => {
        if (event.key === ' ') {
            if (gameStarted) {
                clearInterval(gameInterval); // Zatrzymanie gry
                gameStarted = false;
            } else {
                startGame(); // Rozpoczęcie gry
            }
        }
    });
};

drawGame();
startGame();
pauseGame();
