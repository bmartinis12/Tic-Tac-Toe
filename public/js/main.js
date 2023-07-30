// Variables 

let startMenu = document.querySelector('.start-menu');
let gameBoard = document.querySelector('.game-board');
let onePlayerBTN = document.querySelector('.one-player');
let twoPlayerBTN = document.querySelector('.two-player');
let cell = document.querySelector('.cell');
let turn = document.querySelector('.turn');
let winner = document.querySelector('.winner');
let draw = document.querySelector('.draw');
let ai = false;
let freezeClick = false;

let winningComb = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

let ticTacToeBoard = ['','','','','','','','',''];

// Start game 

onePlayerBTN.addEventListener('click', function(){
    startMenu.style.display = 'none';
    gameBoard.style.display = 'flex';
    ai = true;
})

twoPlayerBTN.addEventListener('click', function(){
    startMenu.style.display = 'none';
    gameBoard.style.display = 'flex';
});

// Reset Game 

function restart(){
    location.reload();
}

// Insert X/O in slot 

let count = 1;

async function clicked(id){
    if(document.getElementById(`${id}`).textContent == ''){
        if(freezeClick == true){
            return;
        }
        if((count%2) == 0){
            document.getElementById(`${id}`).textContent = 'O';
            ticTacToeBoard[id-1] = 'O';
            checkWinner(id, 'O');
            count++;
            turn.textContent = 'Player X Turn';
        } else {
            document.getElementById(`${id}`).textContent = 'X';
            checkWinner(id, 'X');
            if(ai){
                ticTacToeBoard[id-1] = 'X';
            }
            turn.textContent = 'Player O Turn';
            count++;
            if(ai){
                await robotTac();
            }
        }
    }
}

// Check for winner 

function checkWinner(id, letter){
    for(let arr of winningComb){
        if(arr.includes(Number(id))){
            let check = 0;
            for(let index of arr){
                if(document.getElementById(`${index}`).textContent == letter){
                    check++;
                }
                if(check == 3){
                    let html = `
                        <h4>${letter}'s have won!<h4>
                        <p onClick="restart()"'>Reset</p>
                    `
                    winner.innerHTML += html;
                    gameBoard.style.display = 'none';
                    winner.style.display = 'flex';
                    return;
                }
            }
        }
    }
    if(count >= 9){
        let html = `
            <h4>Draw!<h4>
            <p onClick="restart()">Reset</p>
        `
        draw.innerHTML += html;
        gameBoard.style.display = 'none';
        draw.style.display = 'flex';
    }
    return;
}

// Robot player 

function robotTac(){
    let cellRank = [3,2,3,2,4,2,3,2,3];

		for(let i = 0; i < ticTacToeBoard.length; i++){
		    if(ticTacToeBoard[i] !== ''){
		        cellRank[i] -= 99;
		    } 
		} 


		for(let combo = 0; combo < winningComb.length; combo++){
		    let a = winningComb[combo][0];
		    let b = winningComb[combo][1];
		    let c = winningComb[combo][2];
		    
		    
		    if(ticTacToeBoard[a] === ticTacToeBoard[b]){
		        if(ticTacToeBoard[a] !== ''){
		            if(ticTacToeBoard[c] === ''){
		                cellRank[c] += 10;
		            } 
		        } 
		    } 
		    
		    if(ticTacToeBoard[a] === ticTacToeBoard[c]){
		        if(ticTacToeBoard[a] !== ''){
		            if(ticTacToeBoard[b] === ''){
		                cellRank[b] += 10;
		            } 
		        } 
		    } 
		    
		    if(ticTacToeBoard[b] === ticTacToeBoard[c]){
		        if(ticTacToeBoard[b] !== ''){
		            if(ticTacToeBoard[a] === ''){
		                cellRank[a] += 10;
		            } 
		        } 
		    }            		    
		} 


		let bestCell = -1;
		let highest = -999;

		for(let j = 0; j < ticTacToeBoard.length; j++){
		    if(cellRank[j] > highest){
		        highest = cellRank[j];
		        bestCell = j;
		    } 
		} 
        ticTacToeBoard[bestCell] = 'O';
        return clicked(bestCell+1);
}