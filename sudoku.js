let selectedCell = 'cell00';
higlight();
var id;
let mistakes = 0;
let minutes = "00";
let seconds = "00";
let sudokuId = Math.floor(Math.random() * 3000000)+1;
var sudokuData;
fetchSudokuData(sudokuId);
async function fetchSudokuData(id) {
  try {
    // Make a GET request to the backend API
    const response = await fetch(`http://localhost:3000/sudoku-data/${id}`);
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    sudokuData = data.Sudoku;
    initialize();
    setTimeout(timer,1000);
  } catch (error) {
    console.error('Error:', error);
  }
}

function initialize() {
  seconds='00';
  minutes='00';
  mistakes=0;
  document.querySelector('.mistakes').innerHTML='Mistakes: '+mistakes+'/3';
  document.querySelector('.gameover').style.display = 'none';
  document.querySelector('.gamewon').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
  let cells = document.querySelectorAll('#cell');
  for (let i = 0; i < cells.length; i++) {
    if (sudokuData.puzzle[i] !== '.') {
      cells[i].innerHTML = sudokuData.puzzle[i];
    } else {
      cells[i].innerHTML = ''; 
    }
  }
}

// Call the initialize function to set up the board

function playMove(value){
  const play = document.querySelector(`.${selectedCell}`);
  if(play.innerHTML === '' || play.style.color == 'red'){
    play.innerHTML = value;
  }
  let cells = document.querySelectorAll('#cell');
  let answer='';
  for (let i = 0; i < cells.length; i++) {
    answer=answer+cells[i].innerHTML;
    if (sudokuData.solution[i] != cells[i].innerHTML && cells[i].innerHTML!=''){
      mistakes++;
      play.style.color = 'red';
      document.querySelector('.mistakes').innerHTML='Mistakes: '+mistakes+'/3';
      if(mistakes==3){
        gameover();
        return;
      }
    }
    else
      cells[i].style.color = "#3d536a";
  }
  higlight();
  if(answer==sudokuData.solution)
    gameWon();
}

function selectCell(cellValue){
  selectedCell = cellValue;
  reset();
  higlight();
}

function reset(){
  let cells = document.querySelectorAll('#cell');
  for(var i=0;i<cells.length;i++){
    cells[i].style.backgroundColor = "#fff";
  }
}

function higlight(){
  let cells = document.querySelectorAll('#cell');
  for(var i=0;i<cells.length;i++){
    if(cells[i].className == selectedCell)
      cells[i].style.backgroundColor = "#b6defa";
    else if(cells[i].className[4] == selectedCell[4] || cells[i].className[5] == selectedCell[5]){
      cells[i].style.backgroundColor = "#e1ebf3";
    }
    else if(cells[i].innerHTML == document.querySelector(`.${selectedCell}`).innerHTML && cells[i].innerHTML!=''){
      cells[i].style.backgroundColor = "#c0d7e9";
    }
  }
  let x = parseInt(selectedCell[4]);
  let y = parseInt(selectedCell[5]);
  if (x % 3 === 0) {
    if (y % 3 === 0) {
        document.querySelector(`.cell${x+1}${y+1}`).style.backgroundColor = "#e1ebf3";
        document.querySelector(`.cell${x+1}${y+2}`).style.backgroundColor = "#e1ebf3";
        document.querySelector(`.cell${x+2}${y+1}`).style.backgroundColor = "#e1ebf3";
        document.querySelector(`.cell${x+2}${y+2}`).style.backgroundColor = "#e1ebf3";
    } else if (y % 3 === 1) {
        document.querySelector(`.cell${x+1}${y+1}`).style.backgroundColor = "#e1ebf3";
        document.querySelector(`.cell${x+1}${y-1}`).style.backgroundColor = "#e1ebf3";
        document.querySelector(`.cell${x+2}${y+1}`).style.backgroundColor = "#e1ebf3";
        document.querySelector(`.cell${x+2}${y-1}`).style.backgroundColor = "#e1ebf3";
    } else if (y % 3 === 2) {
        document.querySelector(`.cell${x+1}${y-2}`).style.backgroundColor = "#e1ebf3";
        document.querySelector(`.cell${x+1}${y-1}`).style.backgroundColor = "#e1ebf3";
        document.querySelector(`.cell${x+2}${y-2}`).style.backgroundColor = "#e1ebf3";
        document.querySelector(`.cell${x+2}${y-1}`).style.backgroundColor = "#e1ebf3";
    }
  } else if (x % 3 === 1) {
      if (y % 3 === 0) {
          document.querySelector(`.cell${x+1}${y+1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x+1}${y+2}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y+1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y+2}`).style.backgroundColor = "#e1ebf3";
      } else if (y % 3 === 1) {
          document.querySelector(`.cell${x+1}${y+1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x+1}${y-1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y+1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y-1}`).style.backgroundColor = "#e1ebf3";
      } else if (y % 3 === 2) {
          document.querySelector(`.cell${x+1}${y-2}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x+1}${y-1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y-2}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y-1}`).style.backgroundColor = "#e1ebf3";
      }
  } else if (x % 3 === 2) {
      if (y % 3 === 0) {
          document.querySelector(`.cell${x-2}${y+1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-2}${y+2}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y+1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y+2}`).style.backgroundColor = "#e1ebf3";
      } else if (y % 3 === 1) {
          document.querySelector(`.cell${x-2}${y+1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-2}${y-1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y+1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y-1}`).style.backgroundColor = "#e1ebf3";
      } else if (y % 3 === 2) {
          document.querySelector(`.cell${x-2}${y-2}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-2}${y-1}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y-2}`).style.backgroundColor = "#e1ebf3";
          document.querySelector(`.cell${x-1}${y-1}`).style.backgroundColor = "#e1ebf3";
      }
  }
}

function gameover(){
  document.querySelector('.gameover').style.display = 'flex';
  document.querySelector('.overlay').style.display = 'flex';
}

function secondChance(){
  mistakes--;
  document.querySelector('.mistakes').innerHTML='Mistakes: '+mistakes+'/3';
  document.querySelector('.gameover').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
}

function  gameWon(){
  let cells = document.querySelectorAll('#cell');
  let i = 0;
  let j = 0;
  function animation(){
    if(j%2==0){
      for(var k=0;k<cells.length;k+=9){
        cells[i+k].style.backgroundColor = "#00000020";
      }
      for(var k=i*9;k<(i*9)+9;k++){
        cells[k].style.backgroundColor = "#00000020";
      }
    }
    else{
      for(var k=0;k<cells.length;k+=9){
        cells[i+k].style.backgroundColor = "#fff";
      }
      for(var k=i*9;k<(i*9)+9;k++){
        cells[k].style.backgroundColor = "#fff";
      }
      i++;
    }
    j++;
    if(i<9)
      setTimeout(animation,35);
    else
      return;
  }
  setTimeout(animation,35);
  document.querySelector('.recordTime').innerHTML = minutes + ':' + seconds;
  document.querySelector('.gamewon').style.display = 'flex';
  document.querySelector('.overlay').style.display = 'flex';
}

document.addEventListener("keydown",function(event){
  if(event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9'){
    playMove(event.key);
  }
  if(event.key == 'ArrowRight'){
    let cells = document.querySelectorAll('#cell');
    let k = 0;
    for(var i=0;i<cells.length;i++){
      if(cells[i].className==selectedCell){
        k=i;
        break;
      }
    }
    if(k%9==8)
      selectCell(cells[k-8].className);
    else
      selectCell(cells[k+1].className);
  }
  if(event.key == 'ArrowLeft'){
    let cells = document.querySelectorAll('#cell');
    let k = 0;
    for(var i=0;i<cells.length;i++){
      if(cells[i].className==selectedCell){
        k=i;
        break;
      }
    }
    if(k%9==0)
      selectCell(cells[k+8].className);
    else
      selectCell(cells[k-1].className);
  }
  if(event.key == 'ArrowUp'){
    let cells = document.querySelectorAll('#cell');
    let k = 0;
    for(var i=0;i<cells.length;i++){
      if(cells[i].className==selectedCell){
        k=i;
        break;
      }
    }
    if(k<=8)
      selectCell(cells[k+72].className);
    else
      selectCell(cells[k-9].className);
  }
  if(event.key == 'ArrowDown'){
    let cells = document.querySelectorAll('#cell');
    let k = 0;
    for(var i=0;i<cells.length;i++){
      if(cells[i].className==selectedCell){
        k=i;
        break;
      }
    }
    if(k>=72)
      selectCell(cells[k-72].className);
    else
      selectCell(cells[k+9].className);
  }
})

function timer(){
  seconds = String(parseInt(seconds)+1);
  if(seconds.length==1)
    seconds = '0'+seconds;
  if(seconds=='60'){
    minutes = String(parseInt(minutes)+1);
    if(minutes.length==1)
      minutes = '0'+minutes;
    seconds = '00';
  }
  document.querySelector('.time').innerHTML= minutes + ':' + seconds;
  setTimeout(timer, 1000);
}