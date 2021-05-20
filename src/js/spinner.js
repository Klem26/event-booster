// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });

// defaults.delay = 1000;
// defaults.icon = false;
// defaults.styling = 'material';

// const refs = getRefs();
// const newsApiService = new NewsApiService();
// refs.container.addEventListener('click', onClickImg);

// function onClickImg(e) {
//   if (e.target.nodeName != 'IMG') {
//     return;
//   }
//   const src = e.target.dataset.src;
//   console.log(src);
//   const instance = basicLightbox.create(
//     `<img src='${src}' width ="400" height="300">`,
//   );
//   console.dir(instance);
//   instance.show();
// }

// export default class LoadMoreBtn {
//   constructor({ selector, hidden = false }) {
//     this.refs = this.getRefs(selector);

//     hidden && this.hide();
//   }

//   getRefs(selector) {
//     const refs = {};
//     refs.button = document.querySelector(selector);
//     refs.event_card = refs.button.querySelector('.event_card');
//     refs.spinner = refs.button.querySelector('.spinner');

//     return refs;
//   }

//   enable() {
//     this.refs.button.disabled = false;
//     // this.refs.label.textContent = 'Показать ещё';
//     this.refs.spinner.classList.add('is-hidden');
//   }

//   disable() {
//     this.refs.button.disabled = true;
//     // this.refs.label.textContent = 'Загружаем...';
//     this.refs.spinner.classList.remove('is-hidden');
//   }

//   show() {
//     this.refs.button.classList.remove('is-hidden');
//   }

//   hide() {
//     this.refs.button.classList.add('is-hidden');
//   }
// }
// const loader = document.querySelector('.loader');
// //const btnEventCard = document.querySelector('.event_card');

// loaderRef.addEventListener('click', onCardSpinner);

// const galleryEventList = document.querySelector('.event_list');
// const spinnerDisplayer = document.querySelector('.loader');
// function spinner() {
//   refs.galleryEventList.addEventListener('click', () => {
//     refs.spinnerDisplayer.classList.add('loader');
//   });
// }

// spinner();
