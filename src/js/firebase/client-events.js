import refs from '../refs';
import EventsApiService from '../api/EventsApiService';
import renderPage from '../page-render';
import Events from './Events';

const clientEventsBtn = refs.clientEventsBtn;
const homeButton = refs.homePageBtn;
const eventsApiService = new EventsApiService();

function onHomePageClick() {
  eventsApiService.fetchRandomEvents().then(renderPage);
}

function onClientBtnClick() {
  Events.renderList();
}

// ***

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

    // Удаляем из базы данных
    Events.remove(eventId);
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

refs.containerResult.addEventListener('click', onGalleryBtnClick);
clientEventsBtn.addEventListener('click', onClientBtnClick);
homeButton.addEventListener('click', onHomePageClick);
