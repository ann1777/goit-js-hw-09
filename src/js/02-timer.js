
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const calendar = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

startBtn.disabled = true;

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

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
      console.log(selectedDates[0]);
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', start);
      dateInput.style.borderColor = "green";
    }
    },
  };

  flatpickr("#datetime-picker", options);

  const timer = {
    rootSelector: document.querySelector('.timer'),
    start() {
      intervalId = setInterval(() => {
        startBtn.disabled = true;
        calendar.disabled = true;
        currentDate = Date.now();
        const deltaTime = selectedDate - currentDate;

        if (deltaTime < 1000) {
          clearInterval(intervalId);
          startBtn.removeAttribute('disabled');
        }
  
        if (deltaTime <= 0) {
          this.stop();
          Report.info(
            '👏 Congratulation! Timer stopped!',
            'Please, if you want to start timer, choose a date and click on start or reload this page',
            'Okay'
          );
          return;
        }
        const { days, hours, minutes, seconds } = this.convertMs(delta);
        this.rootSelector.querySelector('[data-days]').textContent =
          this.addLeadingZero(days);
        this.rootSelector.querySelector('[data-hours]').textContent =
          this.addLeadingZero(hours);
        this.rootSelector.querySelector('[data-minutes]').textContent =
          this.addLeadingZero(minutes);
        this.rootSelector.querySelector('[data-seconds]').textContent =
          this.addLeadingZero(seconds);
      }, TIMER_DELAY);
    },
  
    stop() {
      clearInterval(intervalId);
      this.intervalId = null;
      startBtn.disabled = true;
      calendar.disabled = false;
    },
  
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
  
      return { days, hours, minutes, seconds };
    },
  
    addLeadingZero(value) {
      return String(value).padStart(2, 0);
    },
  };
  
  /* console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
 */
  //Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто, якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію addLeadingZero(value), яка використовує метод padStart() і перед рендерингом інтефрейсу форматує значення.

