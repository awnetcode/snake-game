//html elements
const boardElement = document.querySelector(".game-board");

//game variables
const gridWidth = 30;
const gridHeight = 20;

let snakeDirection = 'up';
let gameInterval;
let gameSpeed = 500;
let gameStarted = false;

let snake = [{x: 15, y: 10}];

//drawing snake and food
const drawGame = () => {
    boardElement.innerHTML = '';
    drawSnake();
};

const drawSnake = () => {
    snake.forEach((fragment) => {
        const snakeFragment = createElement("div", "snake");
        setElementPosition(snakeFragment, fragment);
        boardElement.appendChild(snakeFragment);
    });
};

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
    snake.unshift(snakeHead); // Dodaj nową głowę
    snake.pop(); // Usuń ostatni segment
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
    if (!gameStarted) {
        gameStarted = true;
        gameInterval = setInterval(() => {
            moveSnake();
            drawGame();
        }, gameSpeed);
    }
};

drawGame();
startGame();
