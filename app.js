let direction = {x:0, y:0};
const foodsound = new Audio('music/food.mp3');
const gamesound = new Audio("music/music.mp3")
const movesound = new Audio('music/move.mp3');
const gameover = new Audio("music/gameover.mp3")
const speed = 5;
let lastPrintTime =0;
let score=0;
let snake = [
    {x: 10, y: 10}
];
food = {x: 5, y: 5};

// this function is making a game loop 
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime -lastPrintTime)/1000 < 1/speed){
        return;
    };
    lastPrintTime = ctime;
    gameEngine();
    
}

function isCollide(snake){
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
        if(snake[0].x >= 22 || snake[0].x <= 0 ||snake[0].y >= 22 || snake[0].y <= 0){
            return true;
        }
    }
} 

function gameEngine(){
    // update food and snake
    if(isCollide(snake)){
        gameover.play();
        gamesound.pause();
        direction={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snake = [{x: 13, y: 15}];
        gamesound.play();
        score = 0; 
    }
    // if snake have eaten the food
    if(snake[0].x === food.x && snake[0].y === food.y){
        foodsound.play();
        score += 1;
        document.getElementById("score").innerHTML = `score: ${score}`
        console.log(score.innerHTML);
        snake.unshift({x:snake[0].x + direction.x, y:snake[0].y+direction.y})
        let a = 2;
        let b = 20;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    for (let i = snake.length-2; i >=0 ; i--) {
        snake[i+1] = {...snake[i]};
        
    }
    snake[0].x += direction.x;
    snake[0].y += direction.y;

    
    // display food and snake
    box.innerHTML = "";
    snake.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('snakehead');
        }
        else{
            snakeElement.classList.add('snakebody');
        }
        box.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    box.appendChild(foodElement);

}


window.requestAnimationFrame(main);
window.addEventListener("keydown", (e)=>{
    direction = {x:0,y:1} //game started
    gamesound.play();
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("up");
            direction.x = 0;
            direction.y = -1; 
            break;
        case "ArrowDown":
            // console.log("Down");
            direction.x = 0;
            direction.y = 1; 
            break;
        case "ArrowRight":
            // console.log("Right");
            direction.x = 1;
            direction.y = 0; 
            break;
        case "ArrowLeft":
            // console.log("Left");
            direction.x = -1;
            direction.y = 0; 
            break;
    
        default:
            break;
    }
})