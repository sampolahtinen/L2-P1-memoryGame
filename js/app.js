// Window Onload Shuffle
window.onload = shuffleCards();

//Start Game Button
const startContainer = document.querySelector('.start');
startContainer.addEventListener('click',initiateGame);
let deck = document.querySelector('.deck');

function initiateGame() {
	deck = document.querySelector('.deck');
	deck.classList.remove('start-game');
	// Assign click handler to whole card deck
	deck.addEventListener('click',cardClickHandler);
	startContainer.style.display = 'none';

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
	clickCounter = 0;
	document.querySelector('.moves').textContent = clickCounter + ' Moves';
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
	timer.innerHTML = seconds+"s"
},1000);
}

let winningModal = document.querySelector('.winning-modal-bg');
let endStars = document.querySelector('.end-stars');
//Check Game End
function isGameEnded() {
	let cardsMatched = document.querySelectorAll('.match');
	if (cardsMatched.length === 16) {
		winningModal.style.display = 'inline-flex';
		document.querySelector('.score-info').innerHTML = "..with " + clickCounter + " moves..in..." + seconds + " seconds...";
		document.querySelector('.final-score').innerHTML = finalScore(clickCounter)+"!";
		let cloneStarTrack = starTrack.cloneNode(true); // clones the star track from score panel
		cloneStarTrack.removeChild(cloneStarTrack.lastElementChild) //removes the score panel "moves" before appending to winning modal.
		endStars.appendChild(cloneStarTrack); // appending stars to modal
		clearInterval(timerCounter);
	}
}

// Calculate Final Score based on Moves
function finalScore(clicks) {
	let score = 100;

	if(clicks < 16) {
		score = 100;
	}
	if(clicks > 16) {
		score = score - (clicks-16);
	}
	return score;
}

// Card Click Handler
let clickCounter = 0;
let starTrack = document.querySelector('.stars');
let cardsOpenArr = document.querySelectorAll('.open');
let cardsMatched = document.querySelectorAll('.match');
let matchedCards = 0;

function cardClickHandler(event) {
	let deck = document.querySelector('.deck');

	if (event.target.classList.contains("match")===true) // if cards are matched, jump out of function
		{
			return;
		}
	if (event.target.nodeName.toLowerCase() === 'li') {
		event.target.classList.add("open");
		cardsOpenArr = document.querySelectorAll('.open');
			if (cardsOpenArr.length === 2) {
					deck.removeEventListener('click',cardClickHandler);
			}
		if (event.target.classList.contains("disableClick") === false ) { //increases click counter if the target does not have disableClick class
			clickCounter++;
		}
	event.target.classList.add("disableClick");

	}
	if (cardsOpenArr.length == 2 && cardsOpenArr[0].firstElementChild.classList[1]  === cardsOpenArr[1].firstElementChild.classList[1]) {
			setTimeout(function() {
				cardsOpenArr[0].classList.add('match');			
				cardsOpenArr[0].classList.remove('open');
				cardsOpenArr[1].classList.add('match');
				cardsOpenArr[1].classList.remove('open');
				deck.addEventListener('click', cardClickHandler);
				matchedCards++;
				isGameEnded();
			},700);
			
		} else if (cardsOpenArr.length >= 2) {
				setTimeout(function(){
					cardsOpenArr[0].classList.remove("open");
					cardsOpenArr[1].classList.remove("open");
					cardsOpenArr[0].classList.remove("disableClick");
					cardsOpenArr[1].classList.remove("disableClick");
					deck.addEventListener('click', cardClickHandler);				
				},900);
		}
	document.querySelector('.moves').textContent = clickCounter + ' Moves';

	if(clickCounter > 16) { //was 20
		starTrack.childNodes[1].firstElementChild.classList.add('fa-star-o');
	}
	if (clickCounter >= 36) {
		starTrack.childNodes[3].firstElementChild.classList.add('fa-star-o');
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