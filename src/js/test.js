import EventsApiService from './api/EventsApiService';
import notificationError from './notification-func';

// Для пагинации ***
import Pagination from './pagination';

const buttonRefs = {
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
    const pagination = new Pagination(eventsApiService.totalPages, buttonRefs);
    const firstPageClick = pagination.onFirstPageClick.bind(pagination);
    const lastPageClick = pagination.onLastPageClick.bind(pagination);
    const nextBtnClick = pagination.onNextBtnClick.bind(pagination);
    const prevtBtnClick = pagination.onPrevBtnClick.bind(pagination);

    buttonRefs.firstPage.addEventListener('click', firstPageClick);
    buttonRefs.lastPage.addEventListener('click', lastPageClick);
    buttonRefs.nextBtnRef.addEventListener('click', nextBtnClick);
    buttonRefs.prevBtnRef.addEventListener('click', prevtBtnClick);
    buttonRefs.pageButtonsList.addEventListener(
      'click',
      pagination.onPageBtnClick,
    );
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


