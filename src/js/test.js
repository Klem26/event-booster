import EventsApiService from './api/EventsApiService';
import notificationError from './notification-func';

// Создаём экземпляр класса
const eventsApiService = new EventsApiService();

// Список случайных событий
eventsApiService.fetchRandomEvents().then(console.log).catch(console.log);

// Список событий по ключевому слову
// eventsApiService.query = 'music';
// eventsApiService.fetchEventsByKeyWord().then(console.log).catch(console.log);

// Список событий по стране
// eventsApiService.fetchEventsByCoutry('US').then(console.log).catch(console.log);

// Событие по id
eventsApiService
  .fetchEventById('LvZ18ba5GShwZz8ZRSmd0')
  .then(console.log)
  .catch(console.log);

// Список картинок конкретного события по id
// eventsApiService
//   .fetchEventImage('Z698xZbpZ17a4oM')
//   .then(console.log)
//   .catch(console.log);
