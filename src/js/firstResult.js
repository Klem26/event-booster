import pageRender from './page-render';
import EventsApiService from './api/EventsApiService';
import Pagination from 'tui-pagination';
import options from './pagination';
import notificationError from './notification-func';

const firstEventsList = new EventsApiService();

firstEventsList
  .fetchRandomEvents()
  .then(data => {
    pageRender(data);
    return data;
  })
  .then(data => {
    const pagination = new Pagination('pagination', options);
    const totalItems = firstEventsList.totalElements;
    pagination.reset(totalItems);
    console.log('Мероприятия: ', data);
    console.log('Номер страницы: ', firstEventsList._page);

    return pagination;
  })
  .then(pagination => {
    pagination.on('afterMove', function (eventData) {
      firstEventsList.fetchRandomEvents(eventData.page - 1).then(result => {
        pageRender(result);
        console.log('Мероприятия: ', result);
        console.log('Номер страницы: ', firstEventsList._page);
      });
    });
  })
  .catch(notificationError);
