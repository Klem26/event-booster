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

    return pagination;
  })
  .then(pagination => {
    pagination.on('afterMove', function (eventData) {
      firstEventsList.fetchRandomEvents(eventData.page - 1).then(result => {
        pageRender(result);
      });
    });
  })
  .catch(notificationError);
