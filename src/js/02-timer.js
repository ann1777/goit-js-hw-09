
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure("Please choose a date in the future")
      startBtn.setAttribute('disabled', true);
      dateInput.style.borderColor = "red";
    } else {
      chosenDate = selectedDates[0];
      console.log(selectedDates[0]);
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', Timer.timerOn);
      dateInput.style.borderColor = "green";
    }
  },
};

flatpickr(calendar, options);

class Timer {
  constructor({onReboot, dataStart = 0, onStop = null}) {
    this.dataStart = dataStart;
    this.intervalId = null;
    this.onReboot = onReboot;
    this.onStop = onStop;
    this.update();
  }

  update(remainder = 0) {
    this.onReboot.addEventListener('click', () => {
      this.timer.stop;

      inputDate.disabled = false;
      btnToggle(startBtn, stopBtn);

      startBtn.disabled = false;
    })
    onReboot(this.convertMs(remainder));
  }

  timerOn() {
    let dateCurrent = Date.now();

    this.intervalId = setInterval(() => {
      dateCurrent = date.now();

      let remainder = this.dateStart - dateCurrent;

      if(remainder <= 0) {
        this.stop();
        return;
      }

      this.update(remainder);
    }, 1000);
  }
  start() {
    const startTime = Date.now();

    this.intervslId = setInterval(() => {
      const curDate = Date.now();
      this.update(curDate - startTime);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.update();
    if(this.onStop) {
      onStop();
    }
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return updateTimerData;
  }

  onReboot ({ days, hours, minutes, seconds }) {
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }  

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}


flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (flatpickr.parseDate(selectedDates[0]) < Date.now()) {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;

  const timer = new Timer({
    onReboot: Timer.updateTimerData,
    dateStart: flatpickr.parseDate(selectedDates[0]),
    onStop: Timer.stop,
  });
  startBtn.addEventListener('click', () => {
    timer.start();

    inputDate.disabled = true;
    btnToggle(startBtn, stopBtn);

    startBtn.disabled = true;
  });
}
});


// startBtn.disabled = true;
// let chosenDate = null;
// let timerId = null;
// console.log(startBtn);

// const TIMER_DELAY = 1000;
// let intervalId = null;
// let selectedDate = null;
// let currentDate = null;

// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//       if (selectedDates[0] < Date.now()) {
//         Notify.failure("Please choose a date in the future")
//         startBtn.setAttribute('disabled', true);
//         dateInput.style.borderColor = "red";
//       } else {
//         chosenDate = selectedDates[0];
//         console.log(selectedDates[0]);
//         startBtn.removeAttribute('disabled');
//         startBtn.addEventListener('click', timerOn);
//         dateInput.style.borderColor = "green";
//       }
//     },
//   };

//   flatpickr("#datetime-picker", options);

//   const timerOn = {
//     rootSelector = document.querySelector('.timer'),
//       start() {
//         intervalId = setInterval(() => {timerId = setInterval(() => {
//           startBtn.disabled = true;
//           calendar.disabled = true;
//           const currentDate = Date.now();
//           const deltaTime = selectedDate - currentDate;

//           if (deltaTime < 1000) {
//             clearInterval(intervalId);
//             startBtn.removeAttribute('disabled');
//           }
//           if (deltaTime <= 0) {
//             this.stop();
//             Report.info(
//               '👏 Congratulation! Timer stopped!',
//               'Please, if you want to start timer, choose a date and click on start or reload this page',
//               'Okay'
//             );
//             return;
//           }
//           const { days, hours, minutes, seconds } = convertMs(deltaTime);
//           updClockInterface({ days, hours, minutes, seconds });
        
//         }, TIMER_DELAY);
//       },

//       function stop() {
//         clearInterval(intervalId);
//         this.intervalId = null;
//         startBtn.disabled = true;
//         calendar.disabled = false;
//       },

//       function updClockInterface({ days, hours, minutes, seconds }) {
//         daysEl.textContent = days;
//         hoursEl.textContent = hours;
//         minutesEl.textContent = minutes;
//         secondsEl.textContent = seconds;
//       },

//       function convertMs(ms) {
//         const second = 1000;
//         const minute = second * 60;
//         const hour = minute * 60;
//         const day = hour * 24;

//         const days = this.addLeadingZero(Math.floor(ms / day));
//         const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
//         const minutes = this.addLeadingZero(
//           Math.floor(((ms % day) % hour) / minute)
//         );
//         const seconds = this.addLeadingZero(
//           Math.floor((((ms % day) % hour) % minute) / second)
//         );

//         return { days, hours, minutes, seconds };
//       },

//       function addLeadingZero(value) {
//         return String(value).padStart(2, '0');
//       });  
//   }
// }
//Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.
