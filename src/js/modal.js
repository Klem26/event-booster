import modalTpl from './templates/modalTpl.hbs';
import svg from '../icons/sprite-icons.svg';
import refs from './refs';

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
  obj.svgUrl = svg;
  refs.backdrop.innerHTML = modalTpl(obj);
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

// Получает данные с локал сторедж, массив из 20 элементов
function getLocalStorageData() {
  const data = localStorage.getItem('data');
  const parsedData = JSON.parse(data);

  return parsedData;
}

// Принимает id, ищет по нему элемент, возвращает его
function findEventById(id) {
  const allEvents = getLocalStorageData();
  const event = allEvents.filter(item => item.id === id);

  return event[0];
}
