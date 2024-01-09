

//objeto contendo as variaveis principais e valores
const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    volume: document.querySelector("#volume"),
    lives: document.querySelector("#lives"),
  },

  values: {
    timeId: null,
    gameVelocity: 600,
    hitPosition: 0,
    result: 0,
    currentTime: 10,
    livesValue: 3,
  },

  actions: {
    countDownTimeId: null,
  },
};

//função que retorna mensagem 

function criarMensage(lifes) {
 
  if (lifes <= 0) {
    
    return `Game Over`;
  } else {
    return `Parabéns você venceu`;
  }
}

//Função que mostra a mensagem ao usuário
function mostrarMensagem(){

  if (state.values.result >= 5 ) {
 
    alert(criarMensage(state.values.livesValue));
  
  } else {
  
    contarVidas();
    initialize()
    
    if (state.values.livesValue <= 0) {
      
      alert(criarMensage(state.values.livesValue));
     
      state.values.livesValue = 3;
      state.view.lives.textContent = state.values.livesValue;
    }
  }
  
}

//função que faz a  contagem de vidas
function contarVidas() {

  if(state.values.livesValue > 0){
    state.values.livesValue--;
    state.view.lives.textContent = state.values.livesValue;
  }

}

//Função que zera o jogo
function zerarGame() {
    mostrarMensagem()
    
    clearInterval(state.actions.countDownTimeId);
    clearInterval(state.values.timeId);

   
    state.values.result = 0;
    state.view.score.textContent = 0;
  
    state.values.currentTime = 10;
    state.view.timeLeft.textContent = state.values.currentTime;
}

//Função que chama a função de decrementar tempo de 1 em 1 minuto
function countDownTimeId() {
  state.actions.countDownTimeId = setInterval(countDown, 1000);
}

//Função que decrementa o tempo
function countDown() {
  
  if (state.values.currentTime > 0) {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
  }else{
     zerarGame()
  }
}  

//Função que incrementa os pontos
function keepScore() {
  
  if(state.values.livesValue >= 0){
    
    state.values.result++;
    state.view.score.textContent = state.values.result;
    state.values.hitPosition = null;
 
  }
}

//Função que faz com que o detona Halph apareça em quadrados aleatórios
function randomSquare() {
  
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  //gera numeros aleatórios de 1 a 9
  let randomNumber = Math.floor(Math.random() * 9);

  //pega a posição do quadrado aleatório, baseado no numero gerado
  let randomSquare = state.view.squares[randomNumber];

  //coloca uma classe nesse quadrado , para que o Detona apareça nesse quadrado.
  randomSquare.classList.add("enemy");

  //passa o id desse quadrado para hitPosition
  state.values.hitPosition = randomSquare.id;
}

//move o Detona
function moveEnemy() {
  state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}

//adiciona um clique em todos os quadrados
function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.id === state.values.hitPosition) {
        playASound();
        keepScore();
      }
    });
  });
}

//adiciona um som

function playASound() {
  // Crie um elemento de áudio
  const audio = new Audio("./src/audios/hit.m4a"); // Substitua pelo caminho real do seu arquivo de áudio

  audio.volume = 0.01;
  // Reproduza o áudio
  audio.play();
}


// Função que inicia o jogo
function initialize() {
  countDownTimeId();
  moveEnemy();
  addListenerHitBox();
}

// Função para chamar a função de iniciar através de um botão
function playGame(){
   initialize();
}



 