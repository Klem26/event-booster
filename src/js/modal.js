import EventsApiService from './api/EventsApiService';
import modalTpl from './templates/modalTpl.hbs';
import svg from '../icons/sprite-icons.svg';

const eventsApiService = new EventsApiService();
const galleryListRef = document.querySelector('.gallery-list');
const backdropRef = document.querySelector('.backdrop');

galleryListRef.addEventListener('click', onGalleryClick);
backdropRef.addEventListener('click', onBackdropClick);

function onGalleryClick(event) {
  const galleryElRef = event.target.closest('.event_card');

  if (!galleryElRef) {
    return;
  }

  const cardId = galleryElRef.dataset.id;
  renderCard(cardId);
}

function onOpenModal() {
  backdropRef.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscPress);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscPress);

  backdropRef.classList.add('is-hidden');
  backdropRef.innerHTML = '';
}

function renderCard(id) {
  return eventsApiService
    .fetchEventById(id)
    .then(normalizeEventObjects)
    .then(modalTpl)
    .then(r => {
      backdropRef.innerHTML = r;
      onOpenModal();
    });
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
  obj.posterUrlSmall = obj.images
    .filter(image => image.ratio === '1_1')
    .reduce((prev, current) =>
      prev.width > current.width ? prev : current,
    ).url;
  obj.posterUrlLarge = obj.images
    .filter(image => image.ratio === '16_9')
    .reduce((prev, current) =>
      prev.width > current.width ? prev : current,
    ).url;
  obj.svgUrl = svg;
  return obj;
}
