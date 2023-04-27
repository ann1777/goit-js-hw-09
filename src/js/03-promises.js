import {Notify} from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onCreatePromisesClick);

function createPromise(position, stepDelay) {
  const shouldResolve = Math.random() > 0.5;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        return resolve({ position, stepDelay });
      } else {
        return reject({ position, stepDelay });
      }
    }, stepDelay)
});
}

function onCreatePromisesClick(e) {
  e.preventDefault();

  const formEl = e.target.elements;

  if (formEl.delay.value < 0 || formEl.amount.value <= 0 || formEl.step.value < 0) {
    Notify.warning("Delay step and amount values must be positive numbers and the amount value must be more than zero");
    return;
} 
 
  const firstDelay = Number(formEl.delay.value);
  const delayStep = Number(formEl.step.value);
  const inputAmount = Number(formEl.amount.value);
  let countSuccess = 0;
  let countFailure = 0;

  for (let position = 0; position < inputAmount; position += 1) {
    let stepDelay = firstDelay + delayStep * position;
    console.log(stepDelay);
    
    createPromise(position+1, stepDelay)
      .then(({ position, stepDelay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${stepDelay}ms`);
          countSuccess = countSuccess + 1;
          console.log(`Succeded: ${countSuccess} promises`);
    })
      .catch(({ position, stepDelay }) => {    
          Notify.failure(`❌ Rejected promise ${position} in ${stepDelay}ms`);
          countFailure = countFailure + 1;
          console.log(`Failed: ${countFailure} promises`);
    })
    if(position === inputAmount - 1) setTimeout(() => {
      Notify.success(`TOTAL: ✅ Succided ${countSuccess} promises and ❌ Rejected ${countFailure} promise`);
    }, stepDelay+5000)
  } 
}

