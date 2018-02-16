Memory Game
============
This project is a part of Udacity's Front-End Nanodegree program.

## Game logic
This is a classical memory game built on vanilla JavaScript. By clicking a card, its' css class is changed to open. Once two cards are flipped the logic compares whether the card's child element's classes are the same. If yes, "open" class is changed to "matched." If no, "open" class is removed and the user can try again.

## Star Rating
Star rating displays how well a player is doing. It gives a player a gut feeling how good final score they will get. The amount of stars can be 3,2, or 1, but never 0. The amount of clicks affects the star rating. 

## Final score
The game tracks the count of clicks and seconds. The game ends once all the cards have been matched. The amount of clicks affects the final score.
> If clicks <= 16, final score = 100  
> If clicks > 16, final score = 100 - (clicks - 16)


