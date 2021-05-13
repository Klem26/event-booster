import pageRender from './page-render';
import EventsApiService from './api/EventsApiService';

const firstEventsList = new EventsApiService();
const renderFirstPage = firstEventsList
  .fetchRandomEvents()
  .then(data => pageRender(data));
