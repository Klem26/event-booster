import $ from 'jquery';
global.jQuery = $;
global.$ = $;
const pagination = require('paginationjs');

import EventsApiService from './api/EventsApiService';
const eventsApiService = new EventsApiService();

const API_KEY = 'qE8iBnVwihSK4QSH4hL5UNRfjujJpVDl';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

const paginContainer = $('#pagination-container');

function paginateData() {
  paginContainer.pagination({
    dataSource: `${BASE_URL}events.json?size=20&sort=random&apikey=${API_KEY}`,
    locator: '_embedded.events',
    totalNumberLocator: function (response) {
      return response.page.totalElements;
    },
    pageSize: 20,
    showPrevious: false,
    showNext: false,
    callback: function (data, pagination) {
      //   Функция отрисовки страницы
      console.log(data);
      console.log(pagination);
      console.log(pagination.pageNumber);

      this.currentPage = pagination.pageNumber;
      // console.log(this);
    },
  });
}

paginateData();
