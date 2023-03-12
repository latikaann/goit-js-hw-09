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
isActive = true;

function onStartButtonClick(e) {
  console.log(e.target);
  if (this.isActive) {
    return;
  }
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
  this.isActive = true;
}

// setInterval(onStartButtonClick, DELAY);
function onStopButtonClick(e) {
  clearInterval(timerId);
}
