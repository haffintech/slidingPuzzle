var allStones = new Array(5);

var holeCol = 4;
var holeRow = 4;
var countOfMoves = 0;

// create 2-dimensional array to save stones in it
function saveDivsInArray() {


  for(i = 0; i < 5; i++) {
    allStones[i] = new Array(5);

    for(j = 0; j < 5; j++){
      if(i < 4 || j < 4){
        allStones[i][j] = document.getElementById('stone' + (i*5+j+1));
        allStones[i][j].style.top = (i * 100) + 'px';
        allStones[i][j].style.left = (j * 100) + 'px';
      }
    }
  }
}

// shuffling has to be done with move() in order to keep puzzle solvable
function shuffle(shuffleMaxMovedStones){
  for(let i = 0; i < shuffleMaxMovedStones; i++){
    countOfMoves = 0;
    let stone = getMovableStone();
    if(stone == null){ // stone is a movable div if it isn't null
      continue;
    } else {
      countOfMoves = -1; // prevent winning before playing while shuffling
      move(stone);
    }
  }
  countOfMoves = 0;
  document.getElementById('counter').innerHTML = "moves: " + countOfMoves;
}

function move(stone){

  var colOfStone;
  var rowOfStone;
  var rowDifference;
  var colDifference;

  for(let i = 0; i < 5; i++){ // find stone to get row+column
    for(let j = 0; j < 5; j++) {
      if(allStones[i][j] == stone){
        rowOfStone = i;
        colOfStone = j;
      }
    }
  }
  rowDifference = Math.abs(rowOfStone - holeRow);
  colDifference = Math.abs(colOfStone - holeCol);

  // one Difference has to be zero
  // and the other has to be 1, then the stone is movable
  if((rowDifference * colDifference) == 0 && (rowDifference == 1 || colDifference == 1)){
    stone.style.top = (holeRow * 100) + 'px';
    stone.style.left = (holeCol * 100) + 'px';
    allStones[holeRow][holeCol] = stone;
    allStones[rowOfStone][colOfStone] = 0;
    holeRow = rowOfStone;
    holeCol = colOfStone;
    document.getElementById('counter').innerHTML = "moves: " + ++countOfMoves;
  }
  
  if(puzzleIsSolved()){
    setTimeout(function () {
      window.alert("you won!");
    }, 1000);
    
  }
}


function puzzleIsSolved(){
  if(countOfMoves <= 0){ //prevent "winning before playing" because of shuffle
    return false;
  }

  for(i = 0; i < 5; i++){
    for(j = 0; j < 5; j++){
      if(i == holeRow && j == holeCol){
        continue;
      }
        if(!(allStones[i][j].innerHTML == i*5+j+1)){
          return false;
        }
    }
  }
  return true;
}
// randomly chooses a stone that is movable
function getMovableStone() {
  var random = Math.floor(Math.random() * 4);
  switch (random) {
    case 0:
      if(isIndexInBound(holeRow-1, holeCol))
        return allStones[holeRow-1][holeCol];

    case 1: if(isIndexInBound(holeRow+1, holeCol))
      return allStones[holeRow+1][holeCol];

    case 2: if(isIndexInBound(holeRow, holeCol-1))
      return allStones[holeRow][holeCol-1];

    case 3: if(isIndexInBound(holeRow, holeCol+1))
      return allStones[holeRow][holeCol+1];
  }

  return null;
}

function isIndexInBound(rowToCheck, colToCheck){
  return (rowToCheck < 5 && rowToCheck >= 0 && colToCheck < 5 && colToCheck >= 0);
}

//Drag'n'Drop functionality for moving pieces
function drag(ev){
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev){
  ev.preventDefault();
}

function drop(ev){
  ev.preventDefault();
  id = ev.dataTransfer.getData("text");
  stone = document.getElementById(id);
  move(stone);
}
