/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice;

init();

function init() {
  scores = [0, 0, 0];
  roundScore = 0;
  activePlayer = 1;

  // Resetting player names
  document.querySelector('#name-1').textContent = 'Player 1';
  document.querySelector('#name-2').textContent = 'Player 2';

  // Enabling buttons
  document.querySelector('.btn-roll').disabled = false;
  document.querySelector('.btn-hold').disabled = false;

  // Hiding the dice at the start of game.
  document.querySelector('.dice').style.display = 'none';

  // Making all scores 0 first.
  document.getElementById('score-1').textContent = 0;
  document.getElementById('score-2').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('current-2').textContent = 0;

  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-2-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.add('active');
}

// New game
document.querySelector('.btn-new').addEventListener('click', init);

// Rolling dice
document.querySelector('.btn-roll').addEventListener('click', function() {

  // 1. Random number
  dice = Math.floor(Math.random() * 6) + 1;

  // 2. Display the dice result
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  // 3. Update the round score IF the rolled number was NOT 1
  if (dice !== 1) {
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    if (roundScore + scores[activePlayer] >= 100) {
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.btn-roll').disabled = true;
      document.querySelector('.btn-hold').disabled = true;
      document.getElementById('score-' + activePlayer).textContent = roundScore + scores[activePlayer];
      alert('Player ' + activePlayer + ' has won the game!');
    }

  } else {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    switchPlayer();
  }

});


// On clicking the hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += roundScore;
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  roundScore = 0;
  document.getElementById('current-' + activePlayer).textContent = 0;
  switchPlayer();
});


// Switching active player
function switchPlayer() {
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

document.querySelector('.btn-rules').addEventListener('click', function() {
  document.querySelector('.rules').style.transform = 'translateY(800px)';
});

function scale() {
  document.querySelector('.rules').style.transform = 'translateY(-800px)';
}
