
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const TIMER_DELAY = 1000;
startBtn.disabled = true;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

Notiflix.Notify.info(
    'Please, choose a date and click on start',
  );

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0]
    const now = new Date();
    if (selectedDate < now) {
      Notiflix.Notify.failure("Please choose a date in the future")
      startBtn.setAttribute('disabled', true);
      calendar.style.borderColor = "red";
    } else {
      console.log(selectedDate);
      startBtn.removeAttribute('disabled');
      Notiflix.Notify.success('Goog! You chose a date in the future');
      startBtn.addEventListener('click', timer.timerOn);
      calendar.style.borderColor = "green";
      startBtn.disabled = false;
      const setTimer = () => {
        selectedDate = selectedDates[0].getTime();
        timer.start();
      };
      startBtn.addEventListener('click', setTimer);
    }
  },
};

flatpickr(calendar, options);

const timer = {
  rootSelector: document.querySelector(".timer"),
  
  start() {
    intervalId = setInterval(() => {
      startBtn.disabled = true;
      calendar.disabled = true;
      currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;

      if((deltaTime) < 0) {
        clearInterval(intervalId);
        this.intervalId = null;
        startBtn.disabled = true;
        calendar.disabled = false;
        Notiflix.Notify.failure("Please choose a date in the future")
        return;
      }
      const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
      this.rootSelector.querySelector('[data-days]').textContent =
        this.addLeadingZero(days);
      this.rootSelector.querySelector('[data-hours]').textContent =
        this.addLeadingZero(hours);
      this.rootSelector.querySelector('[data-minutes]').textContent =
        this.addLeadingZero(minutes);
      this.rootSelector.querySelector('[data-seconds]').textContent =
        this.addLeadingZero(seconds);
    }, TIMER_DELAY);
    // startBtn.disabled = 'disabled';
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  },
  
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  },
};