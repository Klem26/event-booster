import EventsApiService from './api/EventsApiService';
import notificationError from './notification-func';
import Pagination from 'tui-pagination';
import options from './pagination-tui';

// Создаём экземпляр класса
const eventsApiService = new EventsApiService();



// Список случайных событий
// eventsApiService.fetchRandomEvents().then(console.log).catch(console.log);

// Список событий по ключевому слову
eventsApiService.query = 'music';
eventsApiService.fetchEventsByKeyWord().then(result => {
    const pagination = new Pagination('pagination', options);
    pagination._options.totalItems = eventsApiService.totalElements;
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