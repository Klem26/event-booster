import pageRender from './utils/page-render';
import EventsApiService from './api/EventsApiService';
import Pagination from 'tui-pagination';
import options from './components/pagination';
import notificationError from './utils/notification-func';
import scrollToTop from './utils/scroll-top';

const firstEventsList = new EventsApiService();

export default function startPageRender() {
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

      pagination.on('afterMove', function (eventData) {
        firstEventsList.fetchRandomEvents(eventData.page - 1).then(result => {
          pageRender(result);
          scrollToTop();
        });
      });
    })
    .catch(error => notificationError('Error', `${error}`, '#ff2b3d'));
}

window.addEventListener('DOMContentLoaded', startPageRender);
