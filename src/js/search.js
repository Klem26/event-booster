import refs from './refs';
import pageRender from './page-render';
import EventsApiService from './api/EventsApiService';
import notificationError from './notification-func';
import Pagination from 'tui-pagination';
import options from './pagination';
const debounce = require('lodash.debounce');

const eventsApiService = new EventsApiService();
refs.searchInputRef.addEventListener('input', debounce(onSearch, 500));
function onSearch(e) {
  e.preventDefault();
  const form = e.target;
  eventsApiService.query = form.value;
  // console.log(form.value)
  if (eventsApiService.query !== '') {
    clearResultContainer();
    fetchEvents();
    return;
  }
  clearResultContainer();
}

function fetchEvents() {
  eventsApiService
    .fetchEventsByKeyWord()
    .then(events => {
      if (events.lenght === 0) {
        return;
      }
      pageRender(events);

      return events;
    })
    .then(events => {
      const pagination = new Pagination('pagination', options);
      const totalItems = eventsApiService.totalElements;
      pagination.reset(totalItems);
      console.log('Мероприятия: ', events);
      console.log('Номер страницы: ', eventsApiService._page);

      pagination.on('afterMove', function (eventData) {
        eventsApiService
          .fetchEventsByKeyWord(eventData.page - 1)
          .then(events => {
            pageRender(events);
            console.log('Мероприятия: ', events);
            console.log('Номер страницы: ', eventsApiService._page);
          });
      });
    })
    .catch(notificationError);
}

function clearResultContainer() {
  refs.containerResult.innerHTML = '';
}
