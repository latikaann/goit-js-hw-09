function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};
// console.log(refs);
refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

let timerId = null;
const DELAY = 1000;
refs.stopButton.disabled = true;

function onStartButtonClick(e) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);

  refs.startButton.disabled = true;
  refs.stopButton.disabled = false;
}

function onStopButtonClick() {
  clearInterval(timerId);
  refs.startButton.disabled = false;
  refs.stopButton.disabled = true;
}
