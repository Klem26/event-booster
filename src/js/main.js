import EventsApiService from './api/EventsApiService';

// Создаём экземпляр класса
const eventsApiService = new EventsApiService();

// Список случайных событий
eventsApiService.fetchRandomEvents().then(console.log).catch(console.log);

// Список событий по ключевому слову
eventsApiService.query = 'art';
eventsApiService.fetchEventsByKeyWord().then(console.log).catch(console.log);

// Список событий по стране
eventsApiService.fetchEventsByCoutry('US').then(console.log).catch(console.log);

// Событие по id
eventsApiService
  .fetchEventById('LvZ18bAdUGQ0a38ZgzSwa')
  .then(console.log)
  .catch(console.log);
