const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");
let currentPlayer;
let gameGrid;

const winningPositions=
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
  
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

//lets create a function to intialize the game

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
         boxes.forEach((box,index)=>{
            box.innerText="";
            boxes[index].style.pointerEvents="all";

            //ONE MORE THING IS MISSING,INTIALIZE BOX WITH CSS PROPERTIES AGAIN

            box.classList=`box box${index+1}`;
         });
   
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`current player-${currentPlayer}`;


}
initGame();
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI update
    gameInfo.innerText=`current player-${currentPlayer}`;
}
function checkGameOver(){
   let answer="";

   winningPositions.forEach((position) =>{
    //all 3 boxes should be non empty and exactly same in value
          if((gameGrid[position[0]]!==""|| gameGrid[position[1]]!==""|| gameGrid[position[2]]!==""  ) && (gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]])){
            
//check if winner is x
if(gameGrid[position[0]]==="X")
  answer="X";
 else
     answer="0";



    boxes.forEach((box)=>{
        box.style.pointerEvents="none";
    })   
       //now we know 
       boxes[position[0]].classList.add("win");
       boxes[position[1]].classList.add("win");
       boxes[position[2]].classList.add("win");


          }
   });
   //it means we have a winner
   if(answer!==""){
    gameInfo.innerText=`winner player-${answer}`;
    newGameBtn.classList.add("active");
    return;
   }

let fillCount=0;
gameGrid.forEach((box)=>{
    if(box!=="")
        fillCount++;
});

if(fillCount===9){
    gameInfo.innerText="Game Tied!";
    newGameBtn.classList.add("active");
}


}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;

        gameGrid[index]=currentPlayer;
       boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })

});

newGameBtn.addEventListener("click",initGame);



