// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
startBtn.disabled = true;

let userSelectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();

    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= currentDate) {
      iziToast.show({
        title: 'Error',
        backgroundColor: 'red',
        titleColor: 'white',
        messageColor: 'white',
        iconUrl: '/img/error-timer-icon.svg',
        iconColor: 'white',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
      return;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateInput, options);

startBtn.addEventListener('click', handleStart);

function handleStart(event) {
  event.target.disabled = true;
  dateInput.disabled = true;

  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const deltaTime = userSelectedDate - currentDate;

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      dateInput.disabled = false;
      return;
    }

    const objTime = convertMs(deltaTime);

    daysSpan.textContent = addLeadingZero(objTime.days);
    hoursSpan.textContent = addLeadingZero(objTime.hours);
    minutesSpan.textContent = addLeadingZero(objTime.minutes);
    secondsSpan.textContent = addLeadingZero(objTime.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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
