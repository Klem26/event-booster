import EventsApiService from './api/EventsApiService';
import modalTpl from './templates/modalTpl.hbs';

const eventsApiService = new EventsApiService();
const galleryListRef = document.querySelector('.gallery-list');
const backdropRef = document.querySelector('.backdrop');

galleryListRef.addEventListener('click', onOpenModal);
backdropRef.addEventListener('click', onCloseModal);

function onOpenModal(e) {
  // Исправить div на li
  if (e.target.nodeName !== 'DIV') {
    return;
  }

  backdropRef.classList.remove('is-hidden');

  const cardId = e.target.dataset.id;
  renderCard(cardId);
}

function onCloseModal(e) {
  if (e.target === backdropRef) {
    backdropRef.classList.add('is-hidden');
  }
}

function renderCard(id) {
  eventsApiService
    .fetchEventById(id)
    .then(modalTpl)
    .then(r => (document.querySelector('.backdrop').innerHTML = r));
}
