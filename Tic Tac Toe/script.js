const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

function initGame() {
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];

    boxes.forEach((box,index) => {  // UI pr empty v krna hoga
        box.innerText="";
        boxes[index].style.pointerEvents="all"; 
        // green color ko v remove krna hoga uske liye boxes k sare css property ko initialize krna hoga
        box.classList=`box box${index+1}`;
    });
    
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){

    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else if(currentPlayer==="O"){
        currentPlayer="X";
    }

    gameInfo.innerText=`Current Player -${currentPlayer}`; // UI m update kr rhe
}

function CheckGameOver(){

    let answer="";

    winningPositions.forEach((position) =>{

        // all 3 boxes are non-empty and same value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && 
    (gameGrid[position[0]]===gameGrid[position[1]] ) && (gameGrid[position[1]]===gameGrid[position[2]] ) ){

        // check if winner x
        if(gameGrid[position[0]]==="X"){
            answer="X";
        }
        else{
            answer="O";
        }

        // pointer event v disable krenge
        boxes.forEach((box) =>{
            box.style.pointerEvents="none";
        })

        // now we know x/o win
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
        
    });

    // we know who are winner
    if(answer!=""){
        gameInfo.innerText=`Winner Player-${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when tie
    let fillCount=0;
   gameGrid.forEach((box) =>{

    if(box!=""){
        fillCount++;
    }
   });

   if(fillCount===9){
    gameInfo.innerText="Game Tie !";
    newGameBtn.classList.add("active");
   }

}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";

        swapTurn();   // swap krna h turn ka
        
        CheckGameOver();
    }
}

boxes.forEach((box,index) =>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);