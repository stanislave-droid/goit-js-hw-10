// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const msInput = event.target.elements.delay.value;
  const stateInput = event.target.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateInput === 'fulfilled') {
        resolve(msInput);
      } else {
        reject(msInput);
      }
    }, msInput);
  })
    .then(delay => {
      iziToast.show({
        title: 'OK',
        titleColor: 'white',
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: 'white',
        iconUrl: '/img/snackbar-ok-icon.svg',
        backgroundColor: 'green',
      });
    })
    .catch(delay => {
      iziToast.show({
        title: 'Error',
        titleColor: 'white',
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: 'white',
        iconUrl: '/img/snackbar-error-icon.svg',
        backgroundColor: 'red',
      });
    });

  event.currentTarget.reset();
}
