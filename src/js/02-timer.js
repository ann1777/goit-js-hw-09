
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const DELAY = 1000;
startBtn.disabled = 'disabled';

Notiflix.Notify.info(
    'Please, choose a date and click on start',
  );

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0]
    const now = new Date();
    if (selectedDate.getTime < now.getTime) {
      Notiflix.Notify.failure("Please choose a date in the future")
      startBtn.setAttribute('disabled', true);
      calendar.style.borderColor = "red";
    } else {
      console.log(selectedDate);
      startBtn.removeAttribute('disabled');
      Notiflix.Notify.success('Goog! You chose a date in the future');
      startBtn.addEventListener('click', Timer.timerOn);
      calendar.style.borderColor = "green";
    }
  },
};

const fltpkr = flatpickr(calendar, options);

class Timer {
  constructor({onReboot, dataStart = 0, onStop = null}) {
    this.dataStart = dataStart;
    this.intervalId = null;
    this.selectedDate = fltpkr._selectedDateObj;
    this.onReboot = onReboot;
    this.onStop = onStop;
  };
  
  start() {
    if(this.isActive) {
      return;
    }
    const startTime = selectedDate.getTime;
    const curTime = Date.now();
    console.log(curTime);
    const deltaTime = startTime - curTime;
    this.isActive = true;

    this.intervslId = setInterval(() => {
      if((deltaTime) < 0) {
        clearInterval(this.intervalId);
        startBtn.disabled = true;
        calendar.disabled = false;
        Notiflix.Notify.failure("Please choose a date in the future")
        return;
      }
      const time = this.convertMs(deltaTime);
      this.onReboot(time);
    }, DELAY);
    startBtn.disabled = 'disabled';
  };

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
  }
  
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  };
};

const timer = new Timer({
  onReboot: updateTimerData,
});

function updateTimerData ({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
};

startBtn.addEventListener("click", timer.start());

//Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.
