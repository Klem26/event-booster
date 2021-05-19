import Glide from '@glidejs/glide';
import refs from '../utils/refs';
import EventsApiService from '../api/EventsApiService';
import cardSliderTpl from '../templates/card-slider-tpl.hbs';
// const sliderRef = document.querySelector('.js-slider-container');

const eventsApiService = new EventsApiService();

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 7,
  autoplay: 4000,
  hoverpause: true,
  bound: true,
  gap: 30,
  animationDuration: 1200,
  breakpoints: {
    1440: {
      perView: 16,
    },
    767: {
      perView: 10,
    },
  },
});

glide.mount();

eventsApiService
  .fetchRandomEvents()
  .then(response => {
    refs.sliderRef.innerHTML = cardSliderTpl(response);
  })
  .catch(err => {
    console.log(err);
  });
