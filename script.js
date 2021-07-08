'use strict';

//Buttons

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

//Elements
const diceEl = document.querySelector('.dice');
const score01 = document.querySelector('#score--0');
const score02 = document.querySelector('#score--1');
const currentScore01 = document.querySelector('#current--0');
const currentScore02 = document.querySelector('#current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

//Global Variables

let currentScore = 0;
let diceRoll;
let playing = true;
let activePlayer = 0;
let scores;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  currentScore01.textContent = currentScore02.textContent = 0;
  score01.textContent = 0;
  score02.textContent = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  player2.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  activePlayer = activePlayer == 0 ? 1 : 0;
};

rollBtn.addEventListener('click', function () {
  if (playing) {
    diceRoll = Math.trunc(Math.random() * 6 + 1);
    diceEl.src = `dice-${diceRoll}.png`;
    diceEl.classList.remove('hidden');

    if (diceRoll != 1) {
      currentScore += diceRoll;
      // scores[activePlayer] = currentScore;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
    if (diceRoll == 1) {
      switchPlayer();
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
