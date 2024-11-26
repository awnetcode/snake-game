//html elements
const boardElement = document.querySelector(".game-board");

//game variables
const gridWidth = 30;
const gridHeight = 20;

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