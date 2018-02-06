
// Handling button click //
const blueButton = document.getElementsByClassName('btn-info');

blueButton[0].addEventListener('click', initiateLayout);

function cardClickHandler(elem) {
	elem.classList.toggle('flip-card');
}

function initiateLayout() {
	let htmlToAdd = '<div class="memoryCard"></div>';
	let insertedCard = "";
	const injectPlace = document.querySelector('.gridContainer');
	for (var i = 0; i < 16; i++) {
		htmlToAdd = '<div class="memoryCard '+'card' + i+'"</div>';
		injectPlace.insertAdjacentHTML('beforeend',htmlToAdd);
}	
}


/*
const memoryCardCollection = document.getElementsByClassName('memoryCard');

Array.from(memoryCardCollection).forEach(function(element) {
      element.addEventListener('click', cardClickHandler);
    });
*/