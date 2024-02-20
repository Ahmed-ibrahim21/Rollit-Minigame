'use strict';
// intialization
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const rollDice = document.querySelector('.btn--roll');
const CurrentScoreP0El = document.querySelector('#current--0');
const CurrentScoreP1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const resetbtn = document.querySelector('.btn--new');

let score0, score1, scores, currentScore, activePlayer, playing;
function init() {
  score0 = 0;
  score1 = 0;
  scores = [0, 0];
  currentScore = 0;
  diceEl.classList.add('hidden');
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  CurrentScoreP0El.textContent = 0;
  CurrentScoreP1El.textContent = 0;
}

init();

// switch the player
function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
}

//roll the dice logic
rollDice.addEventListener('click', function () {
  if (playing) {
    let dicenum = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dicenum}.png`;
    diceEl.classList.remove('hidden');
    if (dicenum != 1) {
      currentScore += dicenum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

//checking win conditions

function checkWinner() {
  // if (activePlayer == 0) {
  //   score0El.textContent = scores[0];
  //   if (scores[0] >= 100) {
  //     player0.classList.add('player--winner');
  //     playing = false;
  //   } else {
  //     switchPlayer();
  //   }
  // } else {
  //   score1El.textContent = scores[1];
  //   if (scores[1] >= 100) {
  //     player1.classList.add('player--winner');
  //     playing = false;
  //   } else {
  //     switchPlayer();
  //   }
  // }
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    playing = false;
  } else {
    switchPlayer();
  }
}

//hold logic
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    checkWinner();
  }
});

//reset game logic
resetbtn.addEventListener('click', init);
