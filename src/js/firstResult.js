import pageRender from './page-render';
import EventsApiService from './api/EventsApiService';

const firstEventsList = new EventsApiService();
firstEventsList.fetchRandomEvents().then(data => pageRender(data));
