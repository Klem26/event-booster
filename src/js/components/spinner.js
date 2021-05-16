import refs from '../utils/refs';

function spinner() {
  refs.btnEventCard.addEventListener('click', () => {
    refs.spinnerDisplayer.classList.add('ldld');
  });
}

spinner();
