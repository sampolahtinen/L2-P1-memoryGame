// Handling button click //

// Reset Button //

const resetGameBtn = document.getElementById('reset-game');
const resetIcon = document.querySelector('.restart');

function resetGameFunc() {
	document.querySelector('.moves').textContent = 0;
	starTrack.childNodes[1].firstElementChild.classList.remove('fa-star-o');
	starTrack.childNodes[3].firstElementChild.classList.remove('fa-star-o');
	starTrack.childNodes[5].firstElementChild.classList.remove('fa-star-o');

	let matchClasses = document.querySelectorAll('.match');
	matchClasses.forEach(function(elem){
		elem.classList.remove('match');
	});
}

// Timer //
let timer = document.querySelector('.timer');
let seconds = 0;
setInterval(function() {
	seconds++;
	timer.innerHTML = seconds
},1000);

resetIcon.addEventListener('click',resetGameFunc);
// This is an alternative way of handling clicks. Assign event handler to each card and call it
// within cardClickHandler using this. property

	//const cardArray = document.querySelectorAll('.card')

	/*cardArray.forEach(function(elem) {
		elem.addEventListener('click',cardClickHandler);
	})*/ 

// Assign click handler to whole card deck

document.querySelector('.deck').addEventListener('click',cardClickHandler);

// Card Click Handler

let clickCtr = 0;
let starTrack = document.querySelector('.stars');
let cardsOpenArr = document.querySelectorAll('.open');

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
			},700);
		} else if (cardsOpenArr.length >= 2) {
				setTimeout(function(){
					cardsOpenArr[0].classList.remove("open");
					cardsOpenArr[1].classList.remove("open");
				},900);
		}
	document.querySelector('.moves').textContent = clickCtr;

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
