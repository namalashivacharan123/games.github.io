const Xclass = 'x';
const Oclass = 'o';
var xPositions = [];
var oPositions = [];
const winningPositions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let oTurn = false;
let totalSteps = 0;
const cellElements = document.querySelectorAll(".cell");
const playBoard = document.getElementById("playBoard");
const status = document.querySelector('h2');
const result = document.getElementById("result");

const endMessage = document.querySelector(".text");
const whoWon = document.getElementById("whoWon");

for(let i=0; i<9; i++)
	cellElements[i].addEventListener("click", handleClick,{once: true});

function handleClick(e)
{
	//placing mark
	if(totalSteps == 0) status.textContent = "Game has been running..!";
	totalSteps += 1;
	const cell = e.target;
	if(oTurn)
	{
		oPositions.push(e.target.id);
	}
	else
	{
		xPositions.push(e.target.id);
	}
	const currentClass = oTurn ? Oclass : Xclass;
	placeMark(cell, currentClass);
	//check for win
	if(isWin()){
		endMessage.textContent = "Game Ended";
		result.classList.add("show");
		if(oTurn){
			whoWon.textContent = "O's win!";
		}
		else{
			whoWon.textContent = "X's win!";
		}
	}
	//check for draw
	if(isDraw() && !isWin()){
		endMessage.textContent = "Game Ended";
		result.classList.add("show");
		whoWon.textContent = "Draw..!"
	}
	//swapping turn
	swapTurn();
	//hovering effect
	hoverEffect();
}

function placeMark(cell, currentClass)
{
	cell.classList.add(currentClass)
}

function swapTurn()
{
	oTurn = !(oTurn);
}

function hoverEffect()
{
	playBoard.classList.remove(Xclass);
	playBoard.classList.remove(Oclass);
	if(oTurn)
	{
		playBoard.classList.add(Oclass);
	}
	else
	{
		playBoard.classList.add(Xclass)
	}
}

function isWin(){
	if(oTurn){
		for(let subset of winningPositions){
			if(isSubset(subset, oPositions)){
				return true;
			}
		}
		return false;
	}
	else{
		for(let subset of winningPositions){
			if(isSubset(subset, xPositions)){
				return true;
			}
		}
		return false;	
	}
}

function isSubset(subset, superset){
	let count = 0;
	for(let item1 of subset){
		for(let item2 of superset){
			if(item1 == item2){
				count += 1;
				break;
			}
		}
	}
	if(count === 3){
		return true;
	}
	else{
		return false;
	}
}
function isDraw(){
	if(totalSteps === 9){
		return true;
	}
	return false;
}