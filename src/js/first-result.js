import pageRender from './utils/page-render';
import EventsApiService from './api/EventsApiService';
import Pagination from 'tui-pagination';
import options from './components/pagination';
import notificationError from './utils/notification-func';
import scrollToTop from './utils/scroll-top';
import firebase from 'firebase/app';
import 'firebase/auth';
import { stopSpinner, startSpinner } from './components/spinner';

const firstEventsList = new EventsApiService();

export default function startPageRender() {
  startSpinner();
  firstEventsList
    .fetchRandomEvents()
    .then(data => {
      firebase.auth();
      pageRender(data);
      stopSpinner();
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
    .catch(error => {
      notificationError('Error', `${error}`, '#ff2b3d');
      stopSpinner();
    });
}

window.addEventListener('DOMContentLoaded', startPageRender);
