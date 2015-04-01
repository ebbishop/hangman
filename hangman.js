var newGame;

var secretWord;
var secretLen;
var isWord; //function to check for & reject numbers or special characters

var letterChoice; //hides letter after it has been chosen, checks for previous guess
var guessCheck; //checks each guess against the secret word for matches
var missCount = 0; //running count of the number of incorrect guesses

var solCheck; //checks the solution grid after each turn

var startPlay;
var resetPlay;

var revealLetter;
var buildScaffold;

var makeBlanks; //builds 'blank' spaces for letters in secret word
var lost=false; //checks for current loss
var won=false; //checks for current win

var opt = document.getElementsByClassName('opt'); //opt class (letters)
var enableLetters;

$(document).ready(function(){
	newGame();
});

var pics = 
['https://cloud.githubusercontent.com/assets/8210523/6953499/b94c87da-d897-11e4-9982-3f10fad1e897.gif', 'https://cloud.githubusercontent.com/assets/8210523/6953511/c78898fc-d897-11e4-8275-9eb4b8ca3285.gif',
 'https://cloud.githubusercontent.com/assets/8210523/6953512/c788cc0a-d897-11e4-8368-62d8eae60e2d.gif', 'https://cloud.githubusercontent.com/assets/8210523/6953514/c78b45ca-d897-11e4-8d12-8ff17e34fe72.gif',
 'https://cloud.githubusercontent.com/assets/8210523/6953516/c78c371e-d897-11e4-9593-05e6e7b46062.gif', 'https://cloud.githubusercontent.com/assets/8210523/6953515/c78b57cc-d897-11e4-8153-7c1d6dd9bf21.gif',
 'https://cloud.githubusercontent.com/assets/8210523/6953513/c78af7a0-d897-11e4-86c7-b99b55402127.gif', 'https://cloud.githubusercontent.com/assets/8210523/6953518/c7941164-d897-11e4-8f53-99ef9926adf9.gif',
 'https://cloud.githubusercontent.com/assets/8210523/6953517/c7932a10-d897-11e4-9353-204622e1d001.gif', 'https://cloud.githubusercontent.com/assets/8210523/6953519/c794a070-d897-11e4-9a7d-b1dc29421e7a.gif', 
 'https://cloud.githubusercontent.com/assets/8210523/6953520/c7952662-d897-11e4-9785-0441d3ada7d4.gif'];

newGame = function(){
	document.getElementById('secret').focus();
	document.getElementById('play').disabled=false;
	document.getElementById('play').onclick = function(){
		startPlay();
	};
	enableLetters();
	//add onclick to each letter (opt class)
	for(i=0;i<26;i++){
		opt[i].onclick = function(event){
			//check that we have a secret word
			if(secretLen===0 || secretLen===undefined){
				alert('Please enter a secret word to guess!')
			}
			else{
				letterChoice(event);
			}
		}
	};
	document.getElementById('restart').onclick = function(){
		resetPlay();
	};
};

letterChoice = function(event){
	var letter = event.target.textContent;
	var letterClass = event.target.className;
	if (won==false && lost==false){
		if(letterClass.search('guessed')<0){
			event.target.className = event.target.className + ' guessed';
			event.target.disabled = true;
			guessCheck(letter);
		}
	}else{
		alert('Click \'New Game\' below to play again!');
	}
};

guessCheck = function(letter){
	console.log(letter);
	console.log(secretWord + ' ' + secretWord.search(letter));
	document.getElementById('secret').focus();
	if(secretWord.search(letter)>=0){
		revealLetter(letter);
		winCheck();
	}
	else{
		missCount = missCount + 1;
		buildScaffold();
		loseCheck();
	}
};

loseCheck = function(){
	if(missCount==10){
		alert('You lose!! The word was ' + secretWord);
		lost = true;
	}
};

winCheck = function (){
	var correctCount = 0;
	for(i=0;i<secretLen;i++){
		idStr = 'a' + (i+1);
		var guessClass = document.getElementById(idStr).className;
		if(guessClass.search('correct')>=0){
			correctCount = correctCount+1;
		};
	}
	if(correctCount==secretLen){
		won = true;
		alert('You win!!');
	}
}

revealLetter = function(letter){
	var correctArray = [];
	for(i=0;i<secretLen;i++){
		if(secretWord[i]==letter){
			correctArray.push(i);
		}
	};
	console.log(correctArray);
	for(i=0;i<correctArray.length;i++){
		var reveal = correctArray[i] + 1;
		var revealID = 'a' + reveal;
		//broken
		document.getElementById(revealID).className = 'letter correct';
		
	}
};

buildScaffold = function(){
	document.getElementById('boardpic').src=pics[missCount];
};

startPlay = function(){
	secretWord = document.getElementById('secret').value.toUpperCase();
	secretLen = secretWord.length;	
	document.getElementById('play').disabled=true;
	isWord();
	makeBlanks();
	if (secretLen==0){
		alert('Please enter a secret word to guess!');
		resetPlay();
	}	
};

makeBlanks = function(){
	var gridStr = '';
	for(i=0;i<secretLen;i++){
		gridStr = gridStr + '<td class=\'blank letter\' id=\'a' + (i+1) + '\'>' + secretWord.charAt(i) + '</td>';
	};
	document.getElementById('solution').innerHTML = '<tr>' + gridStr + '</tr>';
};

isWord = function(){
	var nonAlph = /[^a-z]/i;
	check = secretWord.match(nonAlph);
	if(check){
		confirm('Please use only letters in your secret word!');
		resetPlay();
	};
};

resetPlay = function(){
	document.getElementById('secret').value='';
	document.getElementById('solution').innerHTML='';
	for (i=0;i<26;i++){
		opt[i].className = 'opt';
	}
	lost=false;
	won=false;
	missCount=0;
	document.getElementById('boardpic').src=pics[0];
	document.getElementById('play').disabled=false;
	enableLetters();
};

enableLetters = function(){
	for(i=0;i<26;i++){
		opt[i].disabled=false;
	};
}
/*
TO DO:
-Kill the $document.ready jQuery?
-Make letters non-existant until they are guessed
*/
