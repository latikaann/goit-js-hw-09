//
import Notiflix from 'notiflix';
//

const refs = {
  form: document.querySelector('.form'),
  firstDelay: document.querySelector('input[name="delay"]'),
  stepDelay: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

const { form, firstDelay, stepDelay, amount } = refs;

form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitForm(e) {
  e.preventDefault();
  // console.log(e.target);
  for (let i = 0; i < amount.value; i++) {
    let position = i + 1;
    const delays = Number(firstDelay.value) + stepDelay.value * i;

    createPromise(position, delays)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  e.currentTarget.reset();
}
