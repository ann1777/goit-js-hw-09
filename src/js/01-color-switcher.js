// Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір
// фону `<body>` на випадкове значення, використовуючи інлайн стиль. Натисканням на
// кнопку «Stop» зміна кольору фону повинна зупинятися.

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const CHANGE_COLOR_DELAY = 1000;
stopBtn.setAttribute('disabled', true);
startBtn.removeAttribute('disabled');
let setColor = null;

//  ⚠️ Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
//  Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною
//  (disabled).

function changeBackgroundColor() {
    setColor = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, CHANGE_COLOR_DELAY);
  }

function stopChangingColor() {
    clearInterval(setColor);
}

function onBtnStartChangeBodyColor() {
    changeBackgroundColor();

    stopBtn.removeAttribute('disabled');
    startBtn.setAttribute('disabled', true);
}

function onBtnStopChangeBodyColor() {
    stopChangingColor();

    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
}


startBtn.addEventListener('click', onBtnStartChangeBodyColor);
stopBtn.addEventListener('click', onBtnStopChangeBodyColor);

// Для генерування випадкового кольору використовуй функцію `getRandomHexColor`.

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

