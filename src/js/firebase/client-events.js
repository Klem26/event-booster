import refs from '../refs';
import Events from './Events';
import startPageRender from '../first-result';
import {
  getLocalStorageData,
  getClientEvents
} from '../local-storage';
import { onAuthState } from './firebase-auth';
import notificationError from '../notification-func';

const clientEventsBtn = refs.clientEventsBtn;
const homeButton = refs.homePageBtn;

function onHomePageClick() {
  startPageRender();
  showPagination();
}

function onClientBtnClick() {
  // if (!onAuthState()) {
  //   return Promise.resolve(
  //     notificationError('Sorry!', 'Authorization required', '#ff2b3d'),
  //   );
  // }

  Events.renderList();
  hidePagination();
}

// Получить id события
function onGalleryBtnClick(event) {
  if (event.target.classList.contains('add_btn')) {
    const galleryElRef = event.target.closest('.event_card');
    const eventId = galleryElRef.dataset.id;

    // Отправляет событие в базу данных
    Events.create(findEventById(eventId));
  } else if (event.target.classList.contains('remove_btn')) {
    const galleryElRef = event.target.closest('.event_card');
    const eventId = galleryElRef.dataset.id;
    const dataId = findClientEventById(eventId).dataId;

    // Удаляем из базы данных
    Events.remove(dataId);
  }
}

// Принимает id, ищет по нему элемент, возвращает его
function findEventById(id) {
  const allEvents = getLocalStorageData();
  const event = allEvents.filter(item => item.id === id);

  return event[0];
}

function findClientEventById(id) {
  const allEvents = getClientEvents();
  const event = allEvents.filter(item => item.id === id);

  return event[0];
}

function hidePagination() {
  refs.paginationRef.classList.add('visually-hidden');
}

function showPagination() {
  refs.paginationRef.classList.remove('visually-hidden');
}

refs.containerResult.addEventListener('click', onGalleryBtnClick);
clientEventsBtn.addEventListener('click', onClientBtnClick);
homeButton.addEventListener('click', onHomePageClick);
