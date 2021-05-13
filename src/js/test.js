import EventsApiService from './api/EventsApiService';
import notificationError from './notification-func';
import Pagination from 'tui-pagination';
import options from './pagination-tui';
import pageRender from './page-render';

// Создаём экземпляр класса
const eventsApiService = new EventsApiService();



// Список случайных событий
// eventsApiService.fetchRandomEvents().then(console.log).catch(console.log);

// Список событий по ключевому слову
eventsApiService.query = 'music';
eventsApiService.fetchEventsByKeyWord().then(result => {
    const pagination = new Pagination('pagination', options);
    const totalItems = eventsApiService.totalElements;
    pagination.reset(totalItems);
   
    return result;
}).catch(console.log);

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

// проверка файла page-render.js
eventsApiService
  .fetchRandomEvents()
  .then(response => {
    console.log('response from test.js', response);
    pageRender(response);
  })
  .catch(err => {
    console.log(err);
  });
