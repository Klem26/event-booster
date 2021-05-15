import refs from '../refs';
import EventsApiService from '../api/EventsApiService';
import renderPage from '../page-render';
import Events from './Events';

refs.containerResult.addEventListener('click', onGalleryClick);

const clientEventsBtn = refs.clientEventsBtn;
const homeButton = refs.homePageBtn;

const firstEventsList = new EventsApiService();

clientEventsBtn.addEventListener('click', onClientBtnClick);
homeButton.addEventListener('click', onHomePageClick);

function onHomePageClick() {
  const events = firstEventsList.fetchRandomEvents().then(renderPage);
}

function onClientBtnClick() {
  Events.renderList();
}

// ***

// Получить id события
function onGalleryClick(event) {
  if (event.target.nodeName === 'BUTTON') {
    const galleryElRef = event.target.closest('.event_card');
    const eventId = galleryElRef.dataset.id;

    // Отправляет событие в базу данных;
    Events.create(findEventById(eventId));
  }
}

// Получает данные из локал сторедж, массив из 20 элементов
function getLocaleStorageData() {
  const data = localStorage.getItem('data');
  const parsedData = JSON.parse(data);

  return parsedData;
}

// Принимает id, ищет по нему элемент, возвращает его
function findEventById(id) {
  const allEvents = getLocaleStorageData();
  const event = allEvents.filter(item => item.id === id);

  return event[0];
}

