const tempoDisplay = document.querySelector(".tempo");
const tempoMinus = document.querySelector(".tempo-minus");
const tempoPlus = document.querySelector(".tempo-plus");
const tempoSlider = document.querySelector(".slider");
const startStop = document.querySelector(".start-stop");
const signatureMinus = document.querySelector(".signature-minus");
const signaturePlus = document.querySelector(".signature-plus");
const signatureDisplay = document.querySelector(".signature-display");

let bpm = 140;
let signature = 4;

const clic1 = new Audio("clic1.mp3");

startStop.addEventListener("click", () => {
  clic1.play();
  if (startStop.textContent === "Stop") {
    startStop.textContent = "Start";
  } else {
    startStop.textContent = "Stop";
  }
});

function updateMetronome() {
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;
}

function maxMinTempo() {
  if (bpm <= 20) {
    return;
  }
  if (bpm >= 300) {
    return;
  }
}

tempoMinus.addEventListener("click", () => {
  if (bpm <= 20) {
    return;
  }
  bpm--;
  updateMetronome();
  maxMinTempo();
});

tempoPlus.addEventListener("click", () => {
  if (bpm >= 300) {
    return;
  }
  bpm++;
  updateMetronome();
  maxMinTempo();
});

tempoSlider.addEventListener("input", () => {
  bpm = tempoSlider.value;
  updateMetronome();
  maxMinTempo();
  if (isPlaying) {
    clearInterval(intervalId);
    intervalId = setInterval(playClick, (60 / bpm) * 1000);
  }
});

signatureMinus.addEventListener("click", () => {
  if (signature <= 1) {
    return;
  }
  signature--;
  signatureDisplay.textContent = signature;
  count = 0;
});

signaturePlus.addEventListener("click", () => {
  if (signature >= 16) {
    return;
  }
  signature++;
  signatureDisplay.textContent = signature;
  count = 0;
});

////////////// CREATION DU CLIC DU METRONOME //////////////
//audioContext designe un graphe de traitement. il faut créer un audioContext avant de faire quoi que ce soit puisque tout passe dans un context. audioContext.destination permet de lier le son à une destination pour envoyer le son vers les hauts parleurs
//un oscillateur permet de calculer les échantillons (tableaux d'intensité sonore)

// const volumeSlider = document.querySelector(".volume");
// const volumeMinus = document.querySelector(".volume-minus");
// const volumePlus = document.querySelector(".volume-plus");
// let gainNode1, gainNode2;
// const oscillatorVolume = 0.5;

let audioContext;
let isPlaying = false;
let intervalId;
//compteur pour alterner les clics
let count = 0;

function createAudioContext() {
  audioContext = new window.AudioContext();
}
function createOscillators() {
  const oscillator1 = audioContext.createOscillator();
  oscillator1.connect(audioContext.destination);
  oscillator1.frequency.value = 700; // Réglage frequence son
  // oscillator1.connect(gainNode1);

  const oscillator2 = audioContext.createOscillator();
  oscillator2.connect(audioContext.destination);
  oscillator2.frequency.value = 950;
  //oscillator2.connect(gainNode2);

  return { oscillator1, oscillator2 };
}

function playClick() {
  const { oscillator1, oscillator2 } = createOscillators();
  let currentOscillator;
  // alterner les clics en fonction du compteur
  //si count est un multiple de signature alors on joue le son du osc2 sinon on joue le son du osc1
  if (count % signature === 0) {
    currentOscillator = oscillator2;
  } else {
    currentOscillator = oscillator1;
  }
  currentOscillator.start();

  //réglage de la durée du son du clic
  setTimeout(() => {
    currentOscillator.stop(); // pour arreter le son du clic;
  }, 50); // Réglage de la durée du son (ms)
  count++;
}

function start() {
  if (!isPlaying) {
    if (!audioContext) {
      createAudioContext();
    }

    // // Créer les gainNodes pour le contrôle du volume
    // gainNode1 = audioContext.createGain();
    // gainNode1.connect(audioContext.destination);
    // gainNode1.gain.value = 1;

    // gainNode2 = audioContext.createGain();
    // gainNode2.connect(audioContext.destination);
    // gainNode2.gain.value = 1;

    // intervalId permet de stocker l'id de l'interval pour pouvoir l'arreter avec clearInterval

    intervalId = setInterval(playClick, (60 / bpm) * 1000);
    isPlaying = true;
  }
}

function stop() {
  if (isPlaying) {
    clearInterval(intervalId);
    isPlaying = false;
  }
}

startStop.addEventListener("click", () => {
  if (isPlaying) {
    stop();
  } else {
    start();
  }
});

// // Event listener pour le contrôle de volume
// volumeSlider.addEventListener("input", () => {
//   gainNode1.gain.value = volumeSlider.value * oscillatorVolume;
//   gainNode2.gain.value = volumeSlider.value * oscillatorVolume;
//   volumeSlider.value = gainNode1.gain.value * 100 + "%";
// });

// volumeMinus.addEventListener("click", () => {
//   if (gainNode1.gain.value <= 0) {
//     return;
//   }
//   gainNode1.gain.value -= 0.1;
//   gainNode2.gain.value -= 0.1;
//   volumeSlider.value = gainNode1.gain.value * 100 + "%";
// });

// volumePlus.addEventListener("click", () => {
//   if (gainNode1.gain.value >= 5) {
//     return;
//   }
//   gainNode1.gain.value += 0.1;
//   gainNode2.gain.value += 0.1;
//   volumeSlider.value = gainNode1.gain.value * 100 + "%";
// });
