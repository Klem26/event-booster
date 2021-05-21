import refs from './utils/refs';
import EventsApiService from './api/EventsApiService';
import pageRender from './utils/page-render';
import Pagination from 'tui-pagination';
import options from './components/pagination';
import notificationError from './utils/notification-func';
import scrollToTop from './utils/scroll-top';
import { stopSpinner, startSpinner } from './components/spinner';

export default function searchEventsByCountry(countryCode) {
  refs.containerResult.innerHTML = '';
  const queryValue = refs.searchInputRef.value;

  const countryEvents = new EventsApiService();
  countryEvents.query = queryValue;
  startSpinner();

  countryEvents
    .fetchEventsByCoutry(countryCode)
    .then(events => {
      if (events.length === 0) {
        notificationError;
        stopSpinner();
      }
      pageRender(events);
      stopSpinner();
      const pagination = new Pagination('pagination', options);
      pagination.reset(countryEvents.totalElements);
      pagination.on('afterMove', function (data) {
        countryEvents.page = data.page - 1;
        countryEvents.fetchEventsByCoutry(countryCode).then(events => {
          pageRender(events);
          scrollToTop();
        });
      });
    })
    .catch(error => {
      notificationError(
        'Error',
        `No results found. Please, enter a new request.`,
        '#ff2b3d',
      ),
        stopSpinner();
    });
}

refs.searchCountryRef.addEventListener('change', searchEventsByCountry);
