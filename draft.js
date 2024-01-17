// startStop.addEventListener("click", () => {
//   if (startStop.textContent === "Start") {
//     startStop.textContent = "Stop";
//     startStop.style.backgroundColor = "red";
//     startStop.style.color = "white";
//   } else {
//     startStop.textContent = "Start";
//     startStop.style.backgroundColor = "white";
//     startStop.style.color = "black";
//   }
// });

//creer un timer qui va lancer le clic en fonction du bpm
// let timer;
// let count = 0;
// let countSignature = 0;
// let isPlaying = false;

// function play() {
//   if (count === signature) {
//     count = 0;
//   }
//   clic1.play();
//   //   if (count === 0) {
//   //     clic2.play();
//   //   } else {
//   //     clic1.play();
//   //   }
//   count++;

//   // Ajustement dynamique du temps pour compenser tout retard
//   const adjustedInterval = (60 / bpm) * 1000;
//   timer = setTimeout(play, adjustedInterval);
// }

// function start() {
//   stop(); // Assurez-vous d'effacer le précédent setTimeout
//   play(); // Démarrez immédiatement le premier clic
//   isPlaying = true;
// }

// function stop() {
//   clearTimeout(timer);
//   isPlaying = false;
// }

// startStop.addEventListener("click", () => {
//   if (isPlaying) {
//     stop();
//   } else {
//     start();
//   }
// });

// Path: app.js

//audioContext designe un graphe de traitement. il faut créer un audioContext avant de faire quoi que ce soit puisque tout passe dans un context
// let audioContext;
// let isPlaying = false;
// let intervalId;

// function createAudioContext() {
//   audioContext = new window.AudioContext();
// }

// function creatGain() {
//   const gain = new GainNode(createAudioContext());
//   gain.connect(audioContext.destination);
//   gain.gain.value = 0.1;
// }

//un oscillateur permet de calculer les échantillons (tableaux d'intensité sonore)

// function playClick() {
//   let click1 = audioContext.createOscillator();
//   //audioContext.destination permet de lier le son à une destination pour envoyer le son vers les hauts parleurs
//   click1.connect(audioContext.destination);
//   click1.start();

//   //réglage de la durée du son du clic
//   setTimeout(() => {
//     click1.stop();
//     click1.disconnect(); // pas necessaire c est pour liberer des ressources
//   }, 50); // Réglage de la durée du son (50 ms dans cet exemple)
// }

// function start() {
//   if (!isPlaying) {
//     if (!audioContext) {
//       createAudioContext();
//     }

//     intervalId = setInterval(playClick, (60 / bpm) * 1000);
//     isPlaying = true;
//   }
// }

// function stop() {
//   if (isPlaying) {
//     clearInterval(intervalId);
//     isPlaying = false;
//   }
// }

// startStop.addEventListener("click", () => {
//   if (isPlaying) {
//     stop();
//   } else {
//     start();
//   }
// });
