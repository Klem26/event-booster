import refs from '../utils/refs';

export function hideLoader() {
  refs.loader.classList.add('visually-hidden');
}

export function showLoader() {
  refs.loader.classList.remove('visually-hidden');
}

// function spinner() {
//   const spinnerDisplayer = document.querySelector('.spinner-displayer');
//   const btn = document.getElementById('btn');

//   btn.addEventListener('click', () => {
//     spinnerDisplayer.classList.add('loading');
//   });
// }

// spinner();

// const spinner = {
//   spinnerRef: document.querySelector('[spinner-displayer]'),

//   show() {
//     this.spinnerRef.style.display = 'inline-block';
//   },
//   hide() {
//     this.spinnerRef.style.display = 'none';
//   },
// };
