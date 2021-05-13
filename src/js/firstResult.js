import pageRender from './page-render';
import EventsApiService from './api/EventsApiService';

const randomNumber = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const randomEventsList = new EventsApiService();
const renderRandomPage = randomEventsList
  .fetchRandomEvents(randomNumber(1, 10))
  .then(data => pageRender(data));
