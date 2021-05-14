import refs from './refs';

export default function scrollToTop() {
    const galleryList = refs.containerResult;
    console.log(galleryList);

    window.scrollTo({
      top: 400,
      behavior: 'smooth',
    });
}