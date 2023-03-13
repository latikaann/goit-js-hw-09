// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
//
//
import Notiflix from 'notiflix';
//

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('.value[data-days]'),
  timerHours: document.querySelector('.value[data-hours]'),
  timerMinutes: document.querySelector('.value[data-minutes]'),
  timerSeconds: document.querySelector('.value[data-seconds]'),
};
// console.log(refs);

const { input, button, timerDays, timerHours, timerMinutes, timerSeconds } =
  refs;

button.disabled = true;
let timerId = null;

button.addEventListener('click', onButtonClick);

flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (new Date() > selectedDates[0]) {
      button.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
      clearInterval(timerId);
      timerToZero();
    } else {
      button.disabled = false;
    }
  },
});

function onButtonClick(e) {
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = new Date(input.value) - currentTime;
    const timeComponents = convertMs(deltaTime);
    updateTimer(timeComponents);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = addLeadingZero(`${days}`);
  timerHours.textContent = addLeadingZero(`${hours}`);
  timerMinutes.textContent = addLeadingZero(`${minutes}`);
  timerSeconds.textContent = addLeadingZero(`${seconds}`);
}

function timerToZero() {
  timerDays.textContent = '00';
  timerHours.textContent = '00';
  timerMinutes.textContent = '00';
  timerSeconds.textContent = '00';
}
