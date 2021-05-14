import EventsApiService from './api/EventsApiService';
import modalTpl from './templates/modalTpl.hbs';
import svg from '../icons/sprite-icons.svg';

const eventsApiService = new EventsApiService();
const galleryListRef = document.querySelector('.gallery-list');
const backdropRef = document.querySelector('.backdrop');

// galleryListRef.addEventListener('click', onGalleryClick);
// galleryListRef.addEventListener('click', onOpenModal);
// Повесить событие на кнопку закрытия модалки
backdropRef.addEventListener('click', onBackdropClick);

function onGalleryClick(event) {
  const galleryElRef = event.target;

  if (galleryElRef.nodeName !== 'DIV') {
    // Исправить div на li
    return;
  }

  const cardId = event.target.dataset.id;
  renderCard(cardId);
}

function onOpenModal() {
  backdropRef.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscPress);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscPress);

  backdropRef.classList.add('is-hidden');
  // Очистить предыдущую разметку
}

function renderCard(id) {
  eventsApiService
    .fetchEventById(id)
    .then(normalizeEventObjects)
    .then(modalTpl)
    .then(r => (document.querySelector('.backdrop').innerHTML = r));
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

function normalizeEventObjects(obj) {
  obj.posterUrl = obj.images
    .filter(image => image.ratio === '1_1')
    .map(image => image.url);
  obj.svgUrl = svg;
  return obj;
}

(() => {
  const refs = {
    card: document.querySelector('.event_card'),
    modal: document.querySelector('.backdrop'),
  };

  refs.card.addEventListener('click', toggleModal);

  function toggleModal(event) {
    let id;
    let t = event.target;
    while (t) {
      if (t.className === 'event_card') {
        id = t.dataset.id;
        break;
      }
      t = t.parentElement;
    }

    renderCard(id);
    refs.modal.classList.toggle('is-hidden');
  }
})();
