import refs from './refs';
import EventsApiService from './api/EventsApiService';
import Pagination from 'tui-pagination';
import options from './pagination';
import notificationError from './notification-func';

const eventsApiService = new EventsApiService();

eventsApiService
  .fetchRandomEvents()
  .then(result => {
    // Тут функция рендера страницы

    return result;
  })
  .then(result => {
    const pagination = new Pagination('pagination', options);
    const totalItems = eventsApiService.totalElements;
    pagination.reset(totalItems);
    console.log('Мероприятия: ', result);
    console.log('Номер страницы: ', eventsApiService._page);

    return pagination;
  })
  .then(pagination => {
    pagination.on('afterMove', function (eventData) {
      eventsApiService.fetchRandomEvents(eventData.page - 1).then(result => {
        console.log('Мероприятия: ', result);
        console.log('Номер страницы: ', eventsApiService._page);
      });
    });
  })
  .catch(console.log);
