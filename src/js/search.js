import refs from './utils/refs';
import pageRender from './utils/page-render';
import EventsApiService from './api/EventsApiService';
import notificationError from './utils/notification-func';
import Pagination from 'tui-pagination';
import options from './components/pagination';
import scrollToTop from './utils/scroll-top';
const debounce = require('lodash.debounce');

const eventsApiService = new EventsApiService();
refs.searchInputRef.addEventListener('input', debounce(onSearch, 1000));
function onSearch(e) {
  e.preventDefault();
  const form = e.target;
  const search = form.value.trim().toLowerCase();
  eventsApiService.query = search;

  if (eventsApiService.query !== '') {
    clearResultContainer();
    fetchEvents();
    return;
  }
  // clearResultContainer();
}

function fetchEvents() {
  eventsApiService
    .fetchEventsByKeyWord()
    .then(events => {
      if (events.length === 0) {
        noResult();
        return;
      }
      pageRender(events);

      return events;
    })
    .then(events => {
      const pagination = new Pagination('pagination', options);
      const totalItems = eventsApiService.totalElements;
      pagination.reset(totalItems);

      pagination.on('afterMove', function (eventData) {
        eventsApiService
          .fetchEventsByKeyWord(eventData.page - 1)
          .then(events => {
            pageRender(events);
            scrollToTop();
          });
      });
    })
    .catch(error =>
      notificationError(
        'Error',
        `No results found. Please, enter a new request.`,
        '#ff2b3d',
      ),
    );
}

function clearResultContainer() {
  refs.containerResult.innerHTML = '';
}

function clearPagination() {
  refs.paginationRef.innerHTML = '';
}

function noResult() {
  refs.containerResult.innerHTML =
    '<div class=""><h2 class="resut-text">Sorry, there is no result for your request. Try again :)</h2><p class=" no-result-container"></p></div>';
}