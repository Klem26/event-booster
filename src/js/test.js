import EventsApiService from './api/EventsApiService';
import notificationError from './notification-func';

// Для пагинации ***
import Pagination from './pagination';

const refs = {
  pageButtonsList: document.querySelector('.page-buttons'),
  firstPage: document.querySelector('.first-page-btn'),
  prevBtnRef: document.querySelector('.prev-button'),
  nextBtnRef: document.querySelector('.next-button'),
  leftDotsRef: document.querySelector('.left-dots'),
  rightDotsRef: document.querySelector('.right-dots'),
  lastPage: document.querySelector('.last-page-btn'),
};
// ***

// Создаём экземпляр класса
const eventsApiService = new EventsApiService();

// Список случайных событий
// eventsApiService.fetchRandomEvents().then(console.log).catch(console.log);

// Список событий по ключевому слову
eventsApiService.query = 'music';
eventsApiService
  .fetchEventsByKeyWord()
  .then(r => {
    const pagination = new Pagination(eventsApiService.totalPages, refs);
    const firstPageClick = pagination.onFirstPageClick.bind(pagination);
    const lastPageClick = pagination.onLastPageClick.bind(pagination);
    const nextBtnClick = pagination.onNextBtnClick.bind(pagination);
    const prevtBtnClick = pagination.onPrevBtnClick.bind(pagination);

    refs.firstPage.addEventListener('click', firstPageClick);
    refs.lastPage.addEventListener('click', lastPageClick);
    refs.nextBtnRef.addEventListener('click', nextBtnClick);
    refs.prevBtnRef.addEventListener('click', prevtBtnClick);
    refs.pageButtonsList.addEventListener('click', pagination.onPageBtnClick);
  })
  .catch(console.log);

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

// Пагинация(тест)


