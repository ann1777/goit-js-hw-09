import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from "notiflix";

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onCreatePromisesClick);

function createPromise(position, stepDelay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
      if (shouldResolve) {
        return resolve({ position, stepDelay });
      } else {
        return reject({ position, stepDelay });
      }
  })
};

function onCreatePromisesClick(e) {
  e.preventDefault();

  const formEl = e.target.elements;

  if (formEl.delay.value < 0 || formEl.amount.value <= 0) {
    return Notiflix.Notify.warning("Delay step and amount values must be positive numbers and the amount value must be more than zero");
} 

  const inputDelay = Number(formEl.delay.value);
  const inputStep = Number(formEl.step.value);
  const inputAmount = Number(formEl.amount.value);

  for (let position = 1; position <= inputAmount; position += 1) {
    let stepDelay = inputDelay + inputStep;
    
    createPromise(position, inputDelay, stepDelay)
      .then(({ position, stepDelay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${stepDelay}ms`);
      }, stepDelay);
    })
      .catch(({ position, stepDelay }) => {
            
        setTimeout(() => {
          Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${stepDelay}ms`);
        }, stepDelay);
      })
  }
};
