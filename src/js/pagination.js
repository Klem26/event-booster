import $ from 'jquery';
global.jQuery = $;
global.$ = $;
const pagination = require('paginationjs');

const API_KEY = 'qE8iBnVwihSK4QSH4hL5UNRfjujJpVDl';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

// const paginListRef = document.querySelector('.pagination-js-pages');
// paginListRef.addEventListener('click', getBtnIndex);

// function getBtnIndex(e) {
//     const btnIndex = e.target.dataset.num;
//     return btnIndex;
// }
const paginContainer = $('#pagination-container');

paginContainer.pagination({
  dataSource: `${BASE_URL}events.json?size=20&apikey=${API_KEY}`,
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
