import refs from './refs';
import EventsApiService from './api/EventsApiService';
import pageRender from './page-render';
import Pagination from 'tui-pagination';
import options from './pagination';
import notificationError from './notification-func';
import scrollToTop from './scroll-top';

function searchEventsByCountry() {
  /* спочатку очищуємо попередньо відмальовані результати пошуку */
  refs.containerResult.innerHTML = '';
  /* далі підтягуємо значення пошукового запиту queryValue 
    1) якщо воно непорожнє, шукаємо за цим запитом + обраною країною
    2) якщо воно порожнє, шукаємо тільки за обраною країною */
  const queryValue = refs.searchInputRef.value;
  /* потім підтягуємо значення (код) обраної країни */
  const country =
    refs.searchCountryRef.options[refs.searchCountryRef.selectedIndex];
  /*console.log(country.text, country.value)*/
  const countryCode = country.value;
  /* тепер визначаємо нового представника класу і запускаємо пошуковий процес */
  const countryEvents = new EventsApiService();
  countryEvents.query = queryValue;
  countryEvents
    .fetchEventsByCoutry(countryCode)
    .then(events => {
      /* якщо результатів не знайдемо, виводимо нотифікацію */
      if (events.length === 0) {
        notificationError;
      }
      /* інакше рендеримо першу сторінку (з індексом 0) */
      pageRender(events);
      /* і запускаємо перегляд по сторінках */
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
    .catch(notificationError);
}

refs.searchCountryRef.addEventListener('change', searchEventsByCountry);
