import modalTpl from './templates/modalTpl.hbs';
import svg from '../icons/sprite-icons.svg';
import refs from './utils/refs';
import { findEventById } from './utils/local-storage';

refs.containerResult.addEventListener('click', onGalleryClick);
refs.backdrop.addEventListener('click', onBackdropClick);

function onGalleryClick(event) {
  const galleryElRef = event.target.closest('.event_card');

  if (!galleryElRef || event.target.nodeName === 'BUTTON') {
    return;
  }

  const cardId = galleryElRef.dataset.id;
  renderCard(cardId);
}

function onOpenModal() {
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscPress);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscPress);

  refs.backdrop.classList.add('is-hidden');
  refs.backdrop.innerHTML = '';
}

function renderCard(id) {
  let obj = findEventById(id);

  let r = modalTpl(obj);
  refs.backdrop.innerHTML = r;
  onOpenModal();
}

function onBackdropClick(event) {
  if (event.target.className === 'close-icon') {
    onCloseModal();
  }

  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
