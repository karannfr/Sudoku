let selectedCell = 'cell00';
higlight();
var id;
let mistakes = 0;
let minutes = "00";
let seconds = "00";
const sudokuData = {
  "Sudokus": {
    "Sudoku": [
      {
        "id": "1",
        "puzzle": "1..5.37..6.3..8.9......98...1.......8761..........6...........7.8.9.76.47...6.312",
        "solution": "198543726643278591527619843914735268876192435235486179462351987381927654759864312",
        "clues": "27",
        "difficulty": "2.2"
      },
      {
        "id": "2",
        "puzzle": "...81.....2........1.9..7...7..25.934.2............5...975.....563.....4......68.",
        "solution": "934817256728653419615942738176425893452398167389176542897564321563281974241739685",
        "clues": "23",
        "difficulty": "0.0"
      },
      {
        "id": "3",
        "puzzle": "..5...74.3..6...19.....1..5...7...2.9....58..7..84......3.9...2.9.4.....8.....1.3",
        "solution": "215983746387654219469271385538716924941325867726849531653198472192437658874562193",
        "clues": "25",
        "difficulty": "2.6"
      },
      {
        "id": "4",
        "puzzle": "........5.2...9....9..2...373..481.....36....58....4...1...358...42.......978...2",
        "solution": "473816925628539741195427863732948156941365278586172439217693584864251397359784612",
        "clues": "26",
        "difficulty": "1.4"
      },
      {
        "id": "5",
        "puzzle": ".4.1..............653.....1.8.9..74...24..91.......2.8...562....1..7..6...4..1..3",
        "solution": "947153682128649357653287491381926745572438916496715238839562174215374869764891523",
        "clues": "25",
        "difficulty": "1.1"
      },
      {
        "id": "6",
        "puzzle": "5...634.....7.....1...5.83.....18..7..69......43...9...............7..2.32.64.5..",
        "solution": "598163472632784159174259836259418367816937245743526981465892713981375624327641598",
        "clues": "24",
        "difficulty": "0.0"
      },
      {
        "id": "7",
        "puzzle": "..346..2..58.2...1.2.9...8...1....9.2..783.........3....9..6..........56.6..7.21.",
        "solution": "913468527458327961627915483731542698296783145584691372179256834842139756365874219",
        "clues": "26",
        "difficulty": "0.0"
      },
      {
        "id": "8",
        "puzzle": "38.1.........5.6.....9....3.4.........5.18.......9.561.6..2478.8.......6..4.8..2.",
        "solution": "386172954419853672527946813741365298695218437238497561163524789852739146974681325",
        "clues": "25",
        "difficulty": "3.7"
      },
      {
        "id": "9",
        "puzzle": ".......2...75...9.6....4........7....25.961..9......83...6..85.....1.....4.32..7.",
        "solution": "894163725137582496652974318481237569325896147976451283713649852268715934549328671",
        "clues": "23",
        "difficulty": "0.0"
      },
      {
        "id": "10",
        "puzzle": ".75.....34......1....672.....9..16.....3....5.2.56...49.7.4......38.9............",
        "solution": "275184963486935712391672548539421687764398125128567394917243856643859271852716439",
        "clues": "23",
        "difficulty": "1.5"
      },
      {
        "id": "11",
        "puzzle": "..3.8.5...4.....9.7..15.4..98...1..5..2.7983...5.6....1....6.5.8.....7..........4",
        "solution": "623984517541627398798153426987231645462579831315468972179846253854312769236795184",
        "clues": "26",
        "difficulty": "1.5"
      },
      {
        "id": "12",
        "puzzle": "7.98.5...6..1..8.........9.8..4...1.....5..4.2....7..5..6...789.2.9..........3.6.",
        "solution": "739845126654192873182376594865439217973251648241687935316524789427968351598713462",
        "clues": "24",
        "difficulty": "0.0"
      }
    ]
  }
};

function initialize() {
  seconds='00';
  minutes='00';
  mistakes=0;
  document.querySelector('.mistakes').innerHTML='Mistakes: '+mistakes+'/3';
  document.querySelector('.gameover').style.display = 'none';
  document.querySelector('.gamewon').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
  let cells = document.querySelectorAll('#cell');
  const random = Math.floor(Math.random() * 12);
  const sudoku = sudokuData.Sudokus.Sudoku[random];
  id = random;
  for (let i = 0; i < cells.length; i++) {
    if (sudoku.puzzle[i] !== '.') {
      cells[i].innerHTML = sudoku.puzzle[i];
    } else {
      cells[i].innerHTML = ''; 
    }
  }
}

// Call the initialize function to set up the board
initialize();

function playMove(value){
  const play = document.querySelector(`.${selectedCell}`);
  if(play.innerHTML === '' || play.style.color == 'red'){
    play.innerHTML = value;
  }
  const sudoku = sudokuData.Sudokus.Sudoku[id];
  let cells = document.querySelectorAll('#cell');
  let answer='';
  for (let i = 0; i < cells.length; i++) {
    answer=answer+cells[i].innerHTML;
    if (sudoku.solution[i] != cells[i].innerHTML && cells[i].innerHTML!=''){
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
  if(answer==sudoku.solution)
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

setTimeout(timer,1000);

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