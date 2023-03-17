'use strict';

//Autor: Hamilton Fuzer de Oliveira

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); // '#' selector para Id dos elementos do HTML
const score1El = document.getElementById('score--1'); // Outra forma de selecionar elemento pelo Id
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Regras
console.log(
  'Dice Game é um jogo para dois jogadores que consiste em: O jogador que fizer 50 pontos primeiro vence! '
);
console.log(
  'O player 1 é quem começa e ele deve rodar o dado, cada número que ele tira é adicionado ao current(pontuação momentânea), se ele tirar 1 ele perde todos os pontos conquistados até o momento e o jogador 2 começa sua rodada'
);
console.log(
  'O jogador atual pode rodar o dado quantas vezes quiser e ir aumentando sua pontuação momentânea, caso o jogador ache que possuí pontos suficientes ele pode apertar o botão HOLD, enviado assim a sua pontuação pra pontuação permanente'
);
console.log('A pontuaação permanente é a que conta para a vitória do jogo!');

//Start conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
};

init();

//Switch player

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // Verificando quem deve ser o prox a jogar
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active'); // .toggle verifica se a classe existe ou não, retira se existe, adiciona se não existe
};

//Rolling dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
