// Window Onload
window.onload = shuffleCards();

//Start Game Button
const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click',initiateGame);
function initiateGame() {
	document.querySelector('.deck').classList.remove('start-game');
	// Assign click handler to whole card deck
	document.querySelector('.deck').addEventListener('click',cardClickHandler);
	startTimer();
}

// Reset Button //
const resetIcon = document.querySelector('.restart');
resetIcon.addEventListener('click',resetGameFunc,shuffleCards);

// Shuffle unction //
function shuffleCards() {
	let deck = document.querySelector('.deck');
	for (let i = 0; i < deck.children.length; i++) {
		deck.appendChild(deck.children[Math.random() * i | 0]);
	}
}

// Reset game function
function resetGameFunc() {
	starTrack.childNodes[1].firstElementChild.classList.remove('fa-star-o');
	starTrack.childNodes[3].firstElementChild.classList.remove('fa-star-o');
	starTrack.childNodes[5].firstElementChild.classList.remove('fa-star-o');
	let matchClasses = document.querySelectorAll('.match');
	matchClasses.forEach(function(elem){
		elem.classList.remove('match');
	});
	shuffleCards();
	winningModal.style.display = 'none';
	seconds = 0;
	document.querySelector('.timer').innerHTML = seconds;
	clickCtr = 0;
	document.querySelector('.moves').textContent = clickCtr + ' Moves';
	startTimer();
	clearInterval(timerCounter);
}

let timerCounter = 0;
let seconds = 0; 
function startTimer() {
	let timer = document.querySelector('.timer');
	seconds = 0;
	timerCounter = setInterval(function() {
	seconds++;
	timer.innerHTML = seconds
},1000);
}

let winningModal = document.querySelector('.winning-modal-bg');

//Check Game End
function isGameEnded() {
	let cardsMatched = document.querySelectorAll('.match');
	if (cardsMatched.length === 16) {
		winningModal.style.display = 'inline-flex';
		document.querySelector('.score-info').innerHTML = "..with " + clickCtr + " moves..in..." + seconds + " seconds...";
		document.querySelector('.final-score').innerHTML ="...with final Score of...\n" + finalScore();
		clearInterval(timerCounter);
	}
}

// Calculate Final Score based on Moves
function finalScore() {
	let score;
	if(clickCtr < 16) {
		score = 100;
	}
	if (clickCtr > 16) {
		score = 70;
	}
	if (clickCtr > 30 && clickCtr < 50) {
		score = 50;
	}
	if (clickCtr > 50) {
		score = 0;
	}
	return score;
}

// Card Click Handler
let clickCtr = 0;
let starTrack = document.querySelector('.stars');
let cardsOpenArr = document.querySelectorAll('.open');
let cardsMatched = document.querySelectorAll('.match');
let matchedCards = 0;

function cardClickHandler(event) {
	if (event.target.nodeName.toLowerCase() === 'li') {
		event.target.classList.add("open");
		cardsOpenArr = document.querySelectorAll('.open');
		clickCtr++;
	}
	if (cardsOpenArr.length == 2 && cardsOpenArr[0].firstElementChild.classList[1]  === cardsOpenArr[1].firstElementChild.classList[1]) {
			setTimeout(function() {
				cardsOpenArr[0].classList.add('match');			
				cardsOpenArr[0].classList.remove('open');
				cardsOpenArr[1].classList.add('match');
				cardsOpenArr[1].classList.remove('open');
				matchedCards++;
				isGameEnded();
			},700);
			
		} else if (cardsOpenArr.length >= 2) {
				setTimeout(function(){
					cardsOpenArr[0].classList.remove("open");
					cardsOpenArr[1].classList.remove("open");
				},900);
		}
	document.querySelector('.moves').textContent = clickCtr + ' Moves';

	if(clickCtr > 16) {
		starTrack.childNodes[1].firstElementChild.classList.add('fa-star-o');
	}
	if (clickCtr >= 26) {
		starTrack.childNodes[3].firstElementChild.classList.add('fa-star-o');
	}
	if (clickCtr >= 36) {
		starTrack.childNodes[5].firstElementChild.classList.add('fa-star-o');
	}
}

//Play Again button in Winning Modal window
let playAgainBtn = document.querySelector('.play-again');
playAgainBtn.addEventListener('click',resetGameFunc);
playAgainBtn.addEventListener('click',startTimer); // needs to be on its own line in order to properly start the timer

let closeModal = document.querySelector('.close');
closeModal.addEventListener('click', () => {	winningModal.style.display = 'none';
});

winningModal.addEventListener('click', () => {	winningModal.style.display = 'none';
});

// This is an alternative way of handling clicks. Assign event handler to each card and call it
// within cardClickHandler using this. property

	//const cardArray = document.querySelectorAll('.card')

	/*cardArray.forEach(function(elem) {
		elem.addEventListener('click',cardClickHandler);
	})*/ 