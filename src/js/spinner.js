import getRefs from '../js/get-refs';
let refs = getRefs();

export function hideLoader() {
  refs = getRefs();
  refs.loader.classList.add('visually-hidden');
}

export function showLoader() {
  refs = getRefs();
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
