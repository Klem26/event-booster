import refs from './utils/refs';
import EventsApiService from './api/EventsApiService';
import pageRender from './utils/page-render';
import Pagination from 'tui-pagination';
import options from './components/pagination';
import notificationError from './utils/notification-func';
import scrollToTop from './utils/scroll-top';

function searchEventsByCountry() {
  refs.containerResult.innerHTML = '';

  const queryValue = refs.searchInputRef.value;
  const country =
    refs.searchCountryRef.options[refs.searchCountryRef.selectedIndex];
  const countryCode = country.value;
  const countryEvents = new EventsApiService();
  countryEvents.query = queryValue;
  countryEvents
    .fetchEventsByCoutry(countryCode)
    .then(events => {
      if (events.length === 0) {
        notificationError;
      }
      pageRender(events);
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
    .catch(error => notificationError('Error', `${error}`, '#ff2b3d'));
}

refs.searchCountryRef.addEventListener('change', searchEventsByCountry);
