/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

var totalScoreDOM = document.querySelector('#score-' + activePlayer);
var currentScoreDOM = document.querySelector('#current-' + activePlayer);

// Hiding the dice at the start of game.
document.querySelector('.dice').style.display = 'none';

// Making all scores 0 first.
document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

document.querySelector('.btn-roll').addEventListener('click', function() {

  // 1. Random number
  dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);

  // 2. Display the dice result
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  // 3. Update the round score IF the rolled number was NOT 1
  if (dice !== 1) {
    roundScore += dice;
    currentScoreDOM.textContent = roundScore;

  } else {
    roundScore = 0;
    currentScoreDOM.textContent = 0;
    switchPlayer();
  }

});


// On clicking the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += roundScore;
  totalScoreDOM.textContent = scores[activePlayer];
  roundScore = 0;
  currentScoreDOM.textContent = 0;
  switchPlayer();
});


// Switching active player
function switchPlayer() {
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}
