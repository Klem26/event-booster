import EventsApiService from './api/EventsApiService';
import notificationError from './notification-func';
import Pagination from './pagination';

// Создаём экземпляр класса
const eventsApiService = new EventsApiService();

// Список случайных событий
// eventsApiService.fetchRandomEvents().then(console.log).catch(console.log);

// Список событий по ключевому слову
eventsApiService.query = 'music';
eventsApiService.fetchEventsByKeyWord().then(console.log).catch(console.log);

// Список событий по стране
// eventsApiService.fetchEventsByCoutry('US').then(console.log).catch(console.log);

// Событие по id
// eventsApiService
//   .fetchEventById('LvZ18bkz4-UUwMYZc6OxJ')
//   .then(console.log)
//   .catch(console.log);

// Список картинок конкретного события по id
// eventsApiService
//   .fetchEventImage('Z698xZbpZ17a4oM')
//   .then(console.log)
//   .catch(console.log);

// Пагинация

const refs = {
  buttonsList: document.querySelector('.page-buttons'),
  firstPage: document.querySelector('.first-page-btn'),
  leftDots: document.querySelector('.left-dots'),
  rightDots: document.querySelector('.right-dots'),
  lastPage: document.querySelector('.last-page-btn'),
};

const pagination = new Pagination(7, refs);

const lastBtnClick = pagination.onLastBtnClick.bind(pagination);
const firstBtnClick = pagination.onFirstBtnClick.bind(pagination);

refs.lastBtnClick.addEventListener('click', lastBtnClick);
refs.firsttBtnClick.addEventListener('click', firstBtnClick);
refs.buttonsList.addEventListener('click', pagination.onPageBtnClick);
